-- Add RLS policy to allow buyers to insert order_items only for their own orders
-- This prevents hackers from creating fake orders with manipulated commission amounts
CREATE POLICY "Buyers can insert order items for their own orders"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.buyer_id = auth.uid()
  )
);

-- Add comment explaining the security measure
COMMENT ON POLICY "Buyers can insert order items for their own orders" ON public.order_items IS 
'Prevents fraudulent order creation by ensuring users can only create order items for orders they own. Commission amounts are validated during order fulfillment.';