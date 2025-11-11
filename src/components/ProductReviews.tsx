import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  buyer_id: string;
}

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [canReview, setCanReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
    if (user) {
      checkCanReview();
    }
  }, [productId, user]);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReviews(data);
    }
  };

  const checkCanReview = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("order_items")
      .select("order_id, orders!inner(status, buyer_id)")
      .eq("product_id", productId)
      .eq("orders.buyer_id", user.id)
      .eq("orders.status", "delivered")
      .limit(1);

    if (!error && data && data.length > 0) {
      const { data: existingReview } = await supabase
        .from("reviews")
        .select("id")
        .eq("product_id", productId)
        .eq("buyer_id", user.id)
        .single();

      setCanReview(!existingReview);
    }
  };

  const handleSubmit = async () => {
    if (!user || rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);

    const { data: orderItem } = await supabase
      .from("order_items")
      .select("order_id")
      .eq("product_id", productId)
      .eq("orders.buyer_id", user.id)
      .eq("orders.status", "delivered")
      .limit(1)
      .single();

    if (!orderItem) {
      toast.error("You must have purchased this item to review it");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("reviews").insert({
      product_id: productId,
      buyer_id: user.id,
      order_id: orderItem.order_id,
      rating,
      comment: comment || null,
    });

    if (error) {
      toast.error("Failed to submit review");
    } else {
      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
      setCanReview(false);
      fetchReviews();
    }

    setLoading(false);
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-bold">Customer Reviews</h3>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= averageRating
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>
        )}
      </div>

      {canReview && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-semibold">Write a Review</h4>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer transition-colors ${
                    star <= (hoverRating || rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            <Textarea
              placeholder="Share your experience with this product (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
            <Button onClick={handleSubmit} disabled={loading || rating === 0}>
              Submit Review
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              {review.comment && <p className="text-sm">{review.comment}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
