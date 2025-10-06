
-- Drop trigger first, then function, then recreate with proper search_path
DROP TRIGGER IF EXISTS assign_products_to_first_seller ON profiles;
DROP FUNCTION IF EXISTS assign_seller_to_products();

CREATE OR REPLACE FUNCTION assign_seller_to_products()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role = 'seller' AND NOT EXISTS (SELECT 1 FROM products WHERE seller_id IS NOT NULL LIMIT 1) THEN
    UPDATE products SET seller_id = NEW.id WHERE seller_id IS NULL;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER assign_products_to_first_seller
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION assign_seller_to_products();
