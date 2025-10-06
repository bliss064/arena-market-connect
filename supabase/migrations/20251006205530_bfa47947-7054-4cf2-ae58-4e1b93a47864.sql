
-- Update products table to allow null seller_id temporarily
ALTER TABLE products ALTER COLUMN seller_id DROP NOT NULL;

-- Add sample products with null seller_id
INSERT INTO products (name, description, price, stock_quantity, category_id, image_url, is_active)
SELECT 
  CASE 
    WHEN c.name = 'Electronics' AND gs.n = 1 THEN 'iPhone 13 Pro'
    WHEN c.name = 'Electronics' AND gs.n = 2 THEN 'Samsung Galaxy Buds'
    WHEN c.name = 'Electronics' AND gs.n = 3 THEN 'JBL Bluetooth Speaker'
    WHEN c.name = 'Fashion & Clothing' AND gs.n = 1 THEN 'Designer Polo Shirt'
    WHEN c.name = 'Fashion & Clothing' AND gs.n = 2 THEN 'Ankara Fabric'
    WHEN c.name = 'Fashion & Clothing' AND gs.n = 3 THEN 'Nike Sneakers'
    WHEN c.name = 'Groceries & Food' AND gs.n = 1 THEN 'Bag of Rice 50kg'
    WHEN c.name = 'Groceries & Food' AND gs.n = 2 THEN 'Palm Oil 5L'
    WHEN c.name = 'Groceries & Food' AND gs.n = 3 THEN 'Fresh Tomatoes'
    WHEN c.name = 'Home & Household' AND gs.n = 1 THEN 'Mop & Bucket Set'
    WHEN c.name = 'Home & Household' AND gs.n = 2 THEN 'Gold Necklace'
    WHEN c.name = 'Books & Stationery' AND gs.n = 1 THEN 'Office Supplies Set'
    WHEN c.name = 'Health & Beauty' AND gs.n = 1 THEN 'Skincare Products'
    ELSE 'Sample ' || c.name || ' Product'
  END,
  'High quality product available at Arena Market. Fresh stock delivered daily.',
  CASE 
    WHEN c.name = 'Electronics' THEN (RANDOM() * 150000 + 50000)::numeric(10,2)
    WHEN c.name = 'Fashion & Clothing' THEN (RANDOM() * 30000 + 10000)::numeric(10,2)
    WHEN c.name = 'Groceries & Food' THEN (RANDOM() * 20000 + 5000)::numeric(10,2)
    WHEN c.name = 'Home & Household' THEN (RANDOM() * 25000 + 8000)::numeric(10,2)
    ELSE (RANDOM() * 15000 + 5000)::numeric(10,2)
  END,
  (RANDOM() * 80 + 20)::integer,
  c.id,
  '/placeholder.svg',
  true
FROM categories c
CROSS JOIN generate_series(1, 3) gs(n)
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);

-- Create a function to update product seller_ids when a seller signs up
CREATE OR REPLACE FUNCTION assign_seller_to_products()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'seller' AND NOT EXISTS (SELECT 1 FROM products WHERE seller_id IS NOT NULL LIMIT 1) THEN
    UPDATE products SET seller_id = NEW.id WHERE seller_id IS NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to assign seller when first seller signs up
CREATE TRIGGER assign_products_to_first_seller
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION assign_seller_to_products();
