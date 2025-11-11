import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { resolveProductImage } from "@/lib/imageResolver";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url: string;
  stock_quantity: number;
}

export const ProductCard = ({ id, name, price, image_url, stock_quantity }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-product transition-all duration-300">
      <CardContent className="p-4">
        <div className="aspect-square overflow-hidden rounded-lg mb-4 relative">
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
            onClick={() => toggleWishlist(id)}
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist(id) ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <img
            src={resolveProductImage(name, image_url)}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate(`/product/${id}`)}
            onError={(e) => {
              if (e.currentTarget.src !== "/placeholder.svg") {
                e.currentTarget.src = "/placeholder.svg";
              }
            }}
          />
        </div>
        <h3
          className="font-semibold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
          onClick={() => navigate(`/product/${id}`)}
        >
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-xl">₦{price.toLocaleString()}</span>
          {stock_quantity > 0 ? (
            <Button size="sm" onClick={() => addToCart(id)}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          ) : (
            <span className="text-sm text-muted-foreground">Out of stock</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
