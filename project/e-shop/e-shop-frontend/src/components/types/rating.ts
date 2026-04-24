export type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface Rating {
  id: string;
  userId: string;
  productId: string;
  rating: RatingValue;
  comment?: string;
  createdAt: string;
  verified: boolean; // Was this from a verified purchase?
}

export interface RatingStats {
  average: number;        // 0-5
  count: number;          // Total ratings
  distribution: {         // How many per star
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  verifiedCount: number;  // Verified purchases only
}

export interface ProductWithRatings {
  id: string;
  name: string;
  // ... other product fields
  ratingStats: RatingStats;
}