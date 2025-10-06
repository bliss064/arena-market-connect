import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shirt, Smartphone, UtensilsCrossed, Home, Watch } from "lucide-react";
import fashionImage from "@/assets/fashion-category.jpg";
import electronicsImage from "@/assets/electronics-category.jpg";
import foodstuffImage from "@/assets/foodstuff-category.jpg";
import householdImage from "@/assets/household-category.jpg";
import accessoriesImage from "@/assets/accessories-category.jpg";

interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Category image and icon mapping
  const categoryAssets: Record<string, { image: string; icon: any; color: string }> = {
    "Foodstuff": { image: foodstuffImage, icon: UtensilsCrossed, color: "bg-orange-500" },
    "Fashion": { image: fashionImage, icon: Shirt, color: "bg-pink-500" },
    "Household": { image: householdImage, icon: Home, color: "bg-green-500" },
    "Electronics": { image: electronicsImage, icon: Smartphone, color: "bg-blue-500" },
    "Accessories": { image: accessoriesImage, icon: Watch, color: "bg-purple-500" },
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category?id=${categoryId}`);
  };

  if (loading) {
    return (
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            Popular Categories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of products from trusted Arena Market vendors
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category, index) => {
            const assets = categoryAssets[category.name] || { 
              image: category.image_url || "/placeholder.svg", 
              icon: Smartphone, 
              color: "bg-blue-500" 
            };
            const IconComponent = assets.icon;
            
            return (
              <Card 
                key={category.id} 
                className="group hover:shadow-hover transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-product"
                onClick={() => handleCategoryClick(category.id)}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardContent className="p-0">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={assets.image}
                      alt={`${category.name} category products`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Icon */}
                    <div className={`absolute top-4 left-4 w-12 h-12 ${assets.color} rounded-full flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.description || `Browse ${category.name} products`}
                    </p>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Browse {category.name}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;