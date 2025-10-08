import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

Deno.serve(async (req) => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Create or get a sample seller user (idempotent)
    let sellerId: string
    const { data: sellerAuth, error: sellerAuthError } = await supabaseAdmin.auth.admin.createUser({
      email: 'seller@arenamarket.com',
      password: 'seller123',
      email_confirm: true,
      user_metadata: {
        full_name: 'Arena Market Seller'
      }
    })

    if (sellerAuthError) {
      // If the user already exists, find their ID instead of failing
      const { data: list, error: listError } = await supabaseAdmin.auth.admin.listUsers()
      if (listError) throw sellerAuthError
      const existing = list.users.find((u: any) => u.email === 'seller@arenamarket.com')
      if (!existing) throw sellerAuthError
      sellerId = existing.id
    } else {
      sellerId = sellerAuth.user.id
    }

    // Upsert seller profile
    const { error: sellerProfileError } = await supabaseAdmin
      .from('profiles')
      .upsert({ id: sellerId, email: 'seller@arenamarket.com', role: 'seller', full_name: 'Arena Market Seller' })

    if (sellerProfileError) {
      throw sellerProfileError
    }

    // Get categories
    const { data: categories, error: categoriesError } = await supabaseAdmin
      .from('categories')
      .select('id, name')

    if (categoriesError) {
      throw categoriesError
    }

    // Sample products data
    const sampleProducts = [
      { name: 'iPhone 13 Pro', category: 'Electronics', price: 450000, stock: 15, image: '/src/assets/product-iphone.jpg' },
      { name: 'Samsung Galaxy Buds', category: 'Electronics', price: 45000, stock: 30, image: '/src/assets/product-charger.jpg' },
      { name: 'JBL Speaker', category: 'Electronics', price: 35000, stock: 20, image: '/src/assets/product-speaker.jpg' },
      
      { name: 'Polo Shirt', category: 'Fashion & Clothing', price: 8500, stock: 50, image: '/src/assets/product-polo.jpg' },
      { name: 'Ankara Dress', category: 'Fashion & Clothing', price: 15000, stock: 25, image: '/src/assets/product-ankara.jpg' },
      { name: 'Sneakers', category: 'Fashion & Clothing', price: 22000, stock: 18, image: '/src/assets/product-sneakers.jpg' },
      { name: 'Gold Necklace', category: 'Fashion & Clothing', price: 45000, stock: 10, image: '/src/assets/product-necklace.jpg' },
      
      { name: 'Bag of Rice (50kg)', category: 'Groceries & Food', price: 42000, stock: 100, image: '/src/assets/product-rice.jpg' },
      { name: 'Palm Oil (5L)', category: 'Groceries & Food', price: 8500, stock: 75, image: '/src/assets/product-palmoil.jpg' },
      { name: 'Fresh Tomatoes (1 basket)', category: 'Groceries & Food', price: 5500, stock: 40, image: '/src/assets/product-tomatoes.jpg' },
      
      { name: 'Mop & Bucket Set', category: 'Home & Household', price: 12000, stock: 35, image: '/src/assets/product-mop-bucket.jpg' },
    ]

    // Clean existing products for this seller to avoid duplicates
    await supabaseAdmin.from('products').delete().eq('seller_id', sellerId)

    // Prepare products to insert (set image_url to null so frontend resolver maps bundled assets)
    const productsToInsert = sampleProducts.map(product => {
      const category = categories?.find(c => c.name === product.category)
      return {
        name: product.name,
        description: `High quality ${product.name.toLowerCase()} available at Arena Market`,
        price: product.price,
        stock_quantity: product.stock,
        category_id: category?.id,
        seller_id: sellerId,
        image_url: null,
        is_active: true
      }
    })

    const { error: productsError } = await supabaseAdmin
      .from('products')
      .insert(productsToInsert)

    if (productsError) {
      throw productsError
    }

    return new Response(
      JSON.stringify({ 
        message: 'Sample data seeded successfully',
        seller_email: 'seller@arenamarket.com',
        seller_password: 'seller123',
        products_count: sampleProducts.length
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
