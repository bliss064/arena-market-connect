import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shirt, Smartphone, UtensilsCrossed, Home, Watch } from "lucide-react";
import fashionImage from "@/assets/fashion-category.jpg";
import electronicsImage from "@/assets/electronics-category.jpg";
import foodstuffImage from "@/assets/foodstuff-category.jpg";
import householdImage from "@/assets/household-category.jpg";
import accessoriesImage from "@/assets/accessories-category.jpg";

const Categories = () => {
  const categories = [
    {
      id: "foodstuff",
      name: "Foodstuff",
      description: "Rice, beans, cooking oil",
      icon: UtensilsCrossed,
      image: foodstuffImage,
      productCount: "200+",
      color: "bg-orange-500",
    },
    {
      id: "fashion",
      name: "Fashion",
      description: "Ankara, sneakers, accessories",
      icon: Shirt,
      image: fashionImage,
      productCount: "500+",
      color: "bg-pink-500",
    },
    {
      id: "household",
      name: "Household",
      description: "Kitchen items, cleaning supplies",
      icon: Home,
      image: householdImage,
      productCount: "150+",
      color: "bg-green-500",
    },
    {
      id: "electronics",
      name: "Electronics", 
      description: "Phones, speakers, power banks",
      icon: Smartphone,
      image: electronicsImage,
      productCount: "300+",
      color: "bg-blue-500",
    },
  ];

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
            const IconComponent = category.icon;
            
            return (
              <Card 
                key={category.id} 
                className="group hover:shadow-hover transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-product"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardContent className="p-0">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
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
                    <div className={`absolute top-4 left-4 w-12 h-12 ${category.color} rounded-full flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    
                    {/* Product Count */}
                    <Badge className="absolute top-4 right-4 bg-white/20 text-white border-white/30">
                      {category.productCount} items
                    </Badge>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.description}
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

        {/* View All Categories Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="px-8">
            View All Categories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;