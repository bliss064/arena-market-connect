import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductReviews } from "@/components/ProductReviews";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Loader2, ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { resolveProductImage } from "@/lib/imageResolver";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string;
  stock_quantity: number;
  is_active: boolean;
  categories: { name: string } | null;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name)")
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      toast.error("Product not found");
      navigate("/");
      return;
    }

    setProduct(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={resolveProductImage(product.name, product.image_url)}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                if (e.currentTarget.src !== "/placeholder.svg") {
                  e.currentTarget.src = "/placeholder.svg";
                }
              }}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.categories && (
              <p className="text-sm text-muted-foreground">
                {product.categories.name}
              </p>
            )}
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-3xl font-bold text-primary">
              ₦{product.price.toLocaleString()}
            </p>

            {product.description && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-sm">
                <span className="font-semibold">Availability:</span>{" "}
                {product.stock_quantity > 0 ? (
                  <span className="text-green-600">
                    In Stock ({product.stock_quantity} available)
                  </span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>

              <div className="flex gap-3">
                {product.stock_quantity > 0 && (
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
