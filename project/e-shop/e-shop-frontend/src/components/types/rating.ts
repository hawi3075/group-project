// ✅ Make sure this file exists and exports these types:

export type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface Rating {
  id: string;
  userId: string;
  productId: string;
  rating: RatingValue;
  comment?: string;
  createdAt: string; // ISO date string
  verified: boolean;
}

export interface RatingStats {
  average: number;
  count: number;
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  verifiedCount: number;
}

// ✅ These are COMPONENTS, not types - keep them in separate files:
// - RatingInput.tsx (the form component)
// - RatingStars.tsx (the display component)  
// - RatingSummary.tsx (the stats component)