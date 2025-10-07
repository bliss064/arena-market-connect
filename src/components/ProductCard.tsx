import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { resolveProductImage } from "@/lib/imageResolver";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url: string;
  stock_quantity: number;
}

export const ProductCard = ({ id, name, price, image_url, stock_quantity }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="group hover:shadow-product transition-all duration-300">
      <CardContent className="p-4">
        <div className="aspect-square overflow-hidden rounded-lg mb-4">
          <img
            src={resolveProductImage(name, image_url)}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
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
