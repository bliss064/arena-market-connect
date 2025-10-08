import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  stock_quantity: number;
}

const Search = () => {
  const [params] = useSearchParams();
  const q = params.get("q")?.trim() || "";
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    document.title = q ? `Search: ${q} | Arena Market Connect` : "Search | Arena Market Connect";
  }, [q]);

  useEffect(() => {
    const run = async () => {
      if (!q) {
        setResults([]);
        return;
      }
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("id,name,price,image_url,stock_quantity")
          .or(`name.ilike.%${q}%,description.ilike.%${q}%`)
          .eq("is_active", true);
        if (error) throw error;
        setResults(data || []);
      } catch (e) {
        console.error("Search error", e);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [q]);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Search;
