import { Star, StarHalf } from "lucide-react";
import { getStarDisplay } from "../utils/ratingAlgorithm";

interface RatingStarsProps {
  average: number;  // 0-5
  showCount?: boolean;
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RatingStars({ 
  average, 
  showCount = true, 
  count = 0,
  size = "md",
  className = ""
}: RatingStarsProps) {
  const { full, half, empty } = getStarDisplay(average);
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {[...Array(full)].map((_, i) => (
          <Star 
            key={`full-${i}`} 
            className={`${sizeClasses[size]} fill-amber-400 text-amber-400`} 
          />
        ))}
        {half && (
          <StarHalf 
            className={`${sizeClasses[size]} fill-amber-400 text-amber-400`} 
          />
        )}
        {[...Array(empty)].map((_, i) => (
          <Star 
            key={`empty-${i}`} 
            className={`${sizeClasses[size]} text-zinc-300`} 
          />
        ))}
      </div>
      
      {showCount && (
        <span className="text-xs text-zinc-500 ml-1">
          {average.toFixed(1)} ({count})
        </span>
      )}
    </div>
  );
}