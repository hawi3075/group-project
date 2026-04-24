import { useState } from "react";
import { Star } from "lucide-react";
import { RatingValue } from "../types/rating";

interface RatingInputProps {
  productId: string;
  onSubmit: (rating: RatingValue, comment?: string) => Promise<void>;
  maxCommentLength?: number;
}

export function RatingInput({ 
  productId, 
  onSubmit,
  maxCommentLength = 500 
}: RatingInputProps) {
  const [rating, setRating] = useState<RatingValue | null>(null);
  const [hoverRating, setHoverRating] = useState<RatingValue | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    
    setSubmitting(true);
    try {
      await onSubmit(rating, comment.trim() || undefined);
      setRating(null);
      setComment("");
    } catch (error) {
      console.error("Failed to submit rating:", error);
      alert("Failed to submit rating. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Star Selection */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star as RatingValue)}
            onMouseEnter={() => setHoverRating(star as RatingValue)}
            onMouseLeave={() => setHoverRating(null)}
            className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                (hoverRating || rating) !== null && star <= (hoverRating || rating)!
                  ? "fill-amber-400 text-amber-400"
                  : "text-zinc-300 hover:text-amber-300"
              }`}
            />
          </button>
        ))}
        {rating && (
          <span className="ml-2 text-sm font-medium text-zinc-700">
            {rating} star{rating > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Comment */}
      <div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience (optional)..."
          maxLength={maxCommentLength}
          rows={3}
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400 resize-none"
        />
        <p className="mt-1 text-xs text-zinc-400 text-right">
          {comment.length}/{maxCommentLength}
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!rating || submitting}
        className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Submit Rating"}
      </button>
    </form>
  );
}