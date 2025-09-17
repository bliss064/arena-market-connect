import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, MapPin } from "lucide-react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      price: "₦850,000",
      originalPrice: "₦950,000",
      image: "/placeholder.svg",
      vendor: "TechHub Arena",
      rating: 4.8,
      reviews: 24,
      location: "Shop 45, Arena Market",
      category: "Electronics",
      isNew: true,
    },
    {
      id: 2,
      name: "Premium Ankara Fabric",
      price: "₦8,500",
      originalPrice: "₦12,000",
      image: "/placeholder.svg",
      vendor: "Mama Kemi Fabrics",
      rating: 4.9,
      reviews: 67,
      location: "Shop 12, Arena Market",
      category: "Fashion",
      isHot: true,
    },
    {
      id: 3,
      name: "50kg Bag of Rice",
      price: "₦45,000",
      originalPrice: "₦50,000",
      image: "/placeholder.svg",
      vendor: "Alhaji Grains Store",
      rating: 4.7,
      reviews: 89,
      location: "Shop 78, Arena Market",
      category: "Foodstuff",
      isBestSeller: true,
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: "₦15,500",
      originalPrice: "₦20,000",
      image: "/placeholder.svg",
      vendor: "SoundMax Electronics",
      rating: 4.6,
      reviews: 31,
      location: "Shop 23, Arena Market",
      category: "Electronics",
      isNew: false,
    },
    {
      id: 5,
      name: "Gold Chain Necklace",
      price: "₦75,000",
      originalPrice: "₦90,000",
      image: "/placeholder.svg",
      vendor: "Royal Jewelry",
      rating: 4.9,
      reviews: 15,
      location: "Shop 67, Arena Market",
      category: "Accessories",
      isHot: false,
    },
    {
      id: 6,
      name: "Palm Oil (25 Litres)",
      price: "₦28,000",
      originalPrice: "₦32,000",
      image: "/placeholder.svg",
      vendor: "Fresh Oil Depot",
      rating: 4.8,
      reviews: 53,
      location: "Shop 34, Arena Market",
      category: "Foodstuff",
      isBestSeller: false,
    },
  ];

  const handleOrderNow = (product: any) => {
    const message = `Hi! I'm interested in ordering the ${product.name} for ${product.price} from ${product.vendor}. Is it available?`;
    const whatsappUrl = `https://wa.me/2348123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-accent text-accent-foreground">New</Badge>
                    )}
                    {product.isHot && (
                      <Badge className="bg-red-500 text-white">🔥 Hot</Badge>
                    )}
                    {product.isBestSeller && (
                      <Badge className="bg-primary text-primary-foreground">Best Seller</Badge>
                    )}
                  </div>

                  {/* Category */}
                  <Badge className="absolute top-3 right-3 bg-white/20 text-white border-white/30">
                    {product.category}
                  </Badge>

                  {/* Discount */}
                  {product.originalPrice && (
                    <div className="absolute bottom-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded text-sm font-semibold">
                      Save ₦{parseInt(product.originalPrice.replace(/[₦,]/g, '')) - parseInt(product.price.replace(/[₦,]/g, ''))}
                    </div>
                  )}
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
                      <p className="text-xs text-muted-foreground">{product.location}</p>
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
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button 
                    onClick={() => handleOrderNow(product)}
                    className="w-full bg-success hover:bg-success/90 text-success-foreground"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Order via WhatsApp
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