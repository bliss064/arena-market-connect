-- ============================================
-- SECURITY FIX: Move roles to separate table
-- ============================================

-- 1. Create user_roles table using existing user_role enum
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- 2. Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. RLS policies for user_roles - users can only view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- No INSERT, UPDATE, or DELETE policies - only system/admins manage roles

-- 4. Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role user_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 5. Migrate existing roles from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, role
FROM public.profiles
ON CONFLICT (user_id, role) DO NOTHING;

-- 6. Create function to auto-assign buyer role on signup
CREATE OR REPLACE FUNCTION public.assign_default_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Assign buyer role by default
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'buyer'::user_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 7. Create trigger to auto-assign role on new user
DROP TRIGGER IF EXISTS on_auth_user_created_assign_role ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_role
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_default_role();

-- ============================================
-- SECURITY FIX: Seller order access control
-- ============================================

-- 8. Create function to check if seller owns products in order
CREATE OR REPLACE FUNCTION public.seller_owns_order_items(_order_id uuid, _seller_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.order_items
    WHERE order_id = _order_id
      AND seller_id = _seller_id
  )
$$;

-- 9. Add RLS policy for sellers to update order status
CREATE POLICY "Sellers can update orders containing their products"
ON public.orders
FOR UPDATE
TO authenticated
USING (public.seller_owns_order_items(id, auth.uid()))
WITH CHECK (
  public.seller_owns_order_items(id, auth.uid()) AND
  status IN ('pending', 'confirmed', 'delivered', 'cancelled')
);

-- ============================================
-- SECURITY FIX: Restrict category management to admins
-- ============================================

-- 10. Drop the overly permissive category policy
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON public.categories;

-- 11. Add admin-only policies for categories
CREATE POLICY "Admins can manage categories"
ON public.categories
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- Update profiles table RLS to prevent role modification
-- ============================================

-- 12. Drop existing update policy
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- 13. Create new update policy that excludes role column
CREATE POLICY "Users can update their own profile except role"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND
  -- Prevent role modification by checking it hasn't changed
  role = (SELECT role FROM public.profiles WHERE id = auth.uid())
);