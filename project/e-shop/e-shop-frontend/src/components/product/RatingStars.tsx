import { Star, StarHalf } from "lucide-react";
import { getStarDisplay } from "../utils/ratingAlgorithm";

interface RatingStarsProps {
  average: number;  // 0-5
  showCount?: boolean;
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  interactive?: boolean;  // ✅ Add for future click handling
  onRatingClick?: (rating: number) => void;
}

export function RatingStars({ 
  average, 
  showCount = true, 
  count = 0,
  size = "md",
  className = "",
  interactive = false,
  onRatingClick
}: RatingStarsProps) {
  // ✅ Clamp average to 0-5 range
  const clampedAverage = Math.max(0, Math.min(5, average));
  const { full, half, empty } = getStarDisplay(clampedAverage);
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  } as const;

  const starSize = sizeClasses[size];

  // ✅ Common star props for lucide-react
  const getStarProps = (isFilled: boolean) => ({
    className: `${starSize} ${isFilled ? "text-amber-400" : "text-zinc-300"}`,
    fill: isFilled ? "currentColor" : "none",
    strokeWidth: isFilled ? 0 : 2,
  });

  return (
    <div className={`flex items-center gap-1 ${className}`} role="img" aria-label={`Rating: ${clampedAverage.toFixed(1)} out of 5 stars`}>
      <div className="flex">
        {/* Full stars */}
        {[...Array(full)].map((_, i) => (
          <Star 
            key={`full-${i}`} 
            {...getStarProps(true)}
            {...(interactive && { 
              onClick: () => onRatingClick?.(full),
              className: `${starSize} text-amber-400 cursor-pointer hover:scale-110 transition-transform`
            })}
          />
        ))}
        
        {/* Half star */}
        {half && (
          <StarHalf 
            key="half"
            {...getStarProps(true)}
            {...(interactive && {
              onClick: () => onRatingClick?.(full + 0.5),
              className: `${starSize} text-amber-400 cursor-pointer hover:scale-110 transition-transform`
            })}
          />
        )}
        
        {/* Empty stars */}
        {[...Array(empty)].map((_, i) => (
          <Star 
            key={`empty-${i}`} 
            {...getStarProps(false)}
            {...(interactive && {
              onClick: () => onRatingClick?.(full + (half ? 1 : 0) + i + 1),
              className: `${starSize} text-zinc-300 cursor-pointer hover:text-amber-300 hover:scale-110 transition-all`
            })}
          />
        ))}
      </div>
      
      {showCount && (
        <span className="text-xs text-zinc-500 ml-1" aria-hidden="true">
          {clampedAverage.toFixed(1)} ({count})
        </span>
      )}
    </div>
  );
}