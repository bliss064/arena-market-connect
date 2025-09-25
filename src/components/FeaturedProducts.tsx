import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, MapPin } from "lucide-react";
import iphoneImage from "@/assets/product-iphone.jpg";
import ankaraImage from "@/assets/product-ankara.jpg";
import riceImage from "@/assets/product-rice.jpg";
import speakerImage from "@/assets/product-speaker.jpg";
import necklaceImage from "@/assets/product-necklace.jpg";
import palmoilImage from "@/assets/product-palmoil.jpg";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Bag of Rice (25kg)",
      price: "₦24,000",
      image: riceImage,
      vendor: "Mama Chinedu Store, Arena Market",
      rating: 4.8,
      reviews: 45,
      category: "Foodstuff"
    },
    {
      id: 2,
      name: "Fresh Tomatoes Basket",
      price: "₦7,500",
      image: palmoilImage, // Using palm oil image as placeholder for now
      vendor: "Arena Fresh Foods",
      rating: 4.7,
      reviews: 32,
      category: "Foodstuff"
    },
    {
      id: 3,
      name: "Men's Polo Shirt",
      price: "₦5,500",
      image: ankaraImage,
      vendor: "Arena Trends",
      rating: 4.6,
      reviews: 28,
      category: "Fashion"
    },
    {
      id: 4,
      name: "Sneakers",
      price: "₦18,000",
      image: necklaceImage, // Using necklace image as placeholder for now
      vendor: "Arena Footwears",
      rating: 4.9,
      reviews: 67,
      category: "Fashion"
    },
    {
      id: 5,
      name: "Mop & Bucket Set",
      price: "₦4,200",
      image: speakerImage, // Using speaker image as placeholder for now
      vendor: "Arena Home Supplies",
      rating: 4.5,
      reviews: 19,
      category: "Household"
    },
    {
      id: 6,
      name: "Phone Charger",
      price: "₦2,500",
      image: iphoneImage, // Using iPhone image as placeholder for now
      vendor: "Arena Gadgets",
      rating: 4.7,
      reviews: 84,
      category: "Electronics"
    }
  ];

  const handleAddToCart = (product: any) => {
    // TODO: Implement cart functionality when Supabase is connected
    console.log('Add to cart:', product);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Featured Products
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Best Selling Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked products from our most trusted Arena Market vendors
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group hover:shadow-hover transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-product"
            >
              <CardContent className="p-0">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  
                  {/* Category */}
                  <Badge className="absolute top-3 right-3 bg-white/20 text-white border-white/30">
                    {product.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Product Name */}
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Vendor Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.vendor}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-primary">{product.price}</span>
                  </div>

                  {/* Action Button */}
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;