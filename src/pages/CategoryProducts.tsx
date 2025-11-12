import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const CategoryProducts = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryId = searchParams.get("id");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryAndProducts();
    }
  }, [categoryId]);

  const fetchCategoryAndProducts = async () => {
    try {
      setLoading(true);
      
      // Fetch category details
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("*")
        .eq("id", categoryId)
        .single();

      if (categoryError) throw categoryError;
      setCategory(categoryData);

      // Fetch products in this category
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", categoryId)
        .eq("is_active", true)
        .gt("stock_quantity", 0)
        .order("created_at", { ascending: false });

      if (productsError) throw productsError;
      setProducts(productsData || []);
      
      // Calculate max price
      if (productsData && productsData.length > 0) {
        const max = Math.max(...productsData.map(p => p.price));
        setMaxPrice(Math.ceil(max / 1000) * 1000);
        setPriceRange([0, Math.ceil(max / 1000) * 1000]);
      }
    } catch (error) {
      console.error("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...products];

    // Filter by price range
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{category?.name || "Products"}</h1>
            <p className="text-muted-foreground">
              {category?.description || "Browse our products"}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products available in this category yet</p>
            <Button className="mt-4" onClick={() => navigate("/")}>
              Browse Other Categories
            </Button>
          </div>
        ) : (
          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <Card className="w-64 p-6 h-fit sticky top-4">
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name: A to Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Price Range: ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
                  </Label>
                  <Slider
                    min={0}
                    max={maxPrice}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>
              </div>
            </Card>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryProducts;
