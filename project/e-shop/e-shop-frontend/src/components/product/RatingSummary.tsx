import { RatingStats } from "../types/rating";

interface RatingSummaryProps {
  stats: RatingStats;
  className?: string;
}

export function RatingSummary({ stats, className = "" }: RatingSummaryProps) {
  if (stats.count === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-sm text-zinc-500">No ratings yet</p>
        <p className="text-xs text-zinc-400 mt-1">Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Average + Count */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-black text-zinc-900">
          {stats.average.toFixed(1)}
        </span>
        <div className="flex flex-col">
          <span className="text-sm text-zinc-500">out of 5</span>
          <span className="text-xs text-zinc-400">
            {stats.count} rating{stats.count > 1 ? "s" : ""}
            {stats.verifiedCount > 0 && ` • ${stats.verifiedCount} verified`}
          </span>
        </div>
      </div>

      {/* Distribution Bars */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = stats.distribution[star as keyof typeof stats.distribution];
          const percentage = stats.count > 0 ? (count / stats.count) * 100 : 0;
          
          return (
            <div key={star} className="flex items-center gap-2 text-sm">
              <span className="w-8 text-zinc-500">{star} ★</span>
              <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-zinc-400 text-xs">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}