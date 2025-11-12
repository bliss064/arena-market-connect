import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
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
}

const Search = () => {
  const [params] = useSearchParams();
  const q = params.get("q")?.trim() || "";
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    document.title = q ? `Search: ${q} | Arena Market Connect` : "Search | Arena Market Connect";
    fetchCategories();
  }, [q]);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("id, name");
    if (data) setCategories(data);
  };

  useEffect(() => {
    const run = async () => {
      if (!q) {
        setResults([]);
        setFilteredResults([]);
        return;
      }
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("id,name,price,image_url,stock_quantity,category_id")
          .or(`name.ilike.%${q}%,description.ilike.%${q}%`)
          .eq("is_active", true);
        if (error) throw error;
        setResults(data || []);
        
        // Calculate max price from results
        if (data && data.length > 0) {
          const max = Math.max(...data.map(p => p.price));
          setMaxPrice(Math.ceil(max / 1000) * 1000);
          setPriceRange([0, Math.ceil(max / 1000) * 1000]);
        }
      } catch (e) {
        console.error("Search error", e);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [q]);

  useEffect(() => {
    let filtered = [...results];

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(p => p.category_id === categoryFilter);
    }

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
        // Already sorted by created_at desc from query
        break;
    }

    setFilteredResults(filtered);
  }, [results, sortBy, categoryFilter, priceRange]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Search results {q && <>for "{q}"</>}</h1>
        {loading ? (
          <p className="text-muted-foreground">Searching...</p>
        ) : results.length === 0 ? (
          <p className="text-muted-foreground">{q ? "No products found." : "Type in the search box to find products."}</p>
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
                  <Label className="text-base font-semibold mb-3 block">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
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
                    Showing {filteredResults.length} of {results.length} products
                  </p>
                </div>
              </div>
            </Card>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Search;
