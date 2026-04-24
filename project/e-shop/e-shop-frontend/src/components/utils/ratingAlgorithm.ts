import { Rating, RatingStats, RatingValue } from '../types/rating';

/**
 * 🎯 Bayesian Average Rating Algorithm
 * Prevents manipulation from products with few reviews
 * Formula: (C * m + ΣR) / (m + n)
 * - C = global average rating
 * - m = minimum reviews threshold (confidence weight)
 * - ΣR = sum of this product's ratings
 * - n = number of this product's ratings
 */
export const calculateBayesianRating = (
  productRatings: Rating[],
  globalAverage: number = 4.2, // Platform-wide average
  minReviews: number = 5       // Confidence threshold
): number => {
  if (productRatings.length === 0) return 0;
  
  const sum = productRatings.reduce((acc, r) => acc + r.rating, 0);
  const count = productRatings.length;
  
  // Bayesian formula
  const bayesian = ((minReviews * globalAverage) + sum) / (minReviews + count);
  
  return Math.round(bayesian * 10) / 10; // Round to 1 decimal
};

/**
 * 📊 Calculate full rating statistics
 */
export const calculateRatingStats = (ratings: Rating[]): RatingStats => {
  if (ratings.length === 0) {
    return {
      average: 0,
      count: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      verifiedCount: 0
    };
  }

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<RatingValue, number>;
  let sum = 0;
  let verifiedCount = 0;

  ratings.forEach(r => {
    distribution[r.rating]++;
    sum += r.rating;
    if (r.verified) verifiedCount++;
  });

  return {
    average: Math.round((sum / ratings.length) * 10) / 10,
    count: ratings.length,
    distribution: distribution as RatingStats['distribution'],
    verifiedCount
  };
};

/**
 * ⭐ Get star display value (for UI)
 */
export const getStarDisplay = (average: number): {
  full: number;
  half: boolean;
  empty: number;
} => {
  const full = Math.floor(average);
  const hasHalf = average % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  
  return { full, half: hasHalf, empty };
};

/**
 * 🛡️ Anti-manipulation: Require verified purchase for "trusted" rating
 */
export const getTrustedRating = (stats: RatingStats): number => {
  // If < 3 verified reviews, fall back to Bayesian average
  if (stats.verifiedCount < 3) {
    return calculateBayesianRating(
      // You'd fetch these from your backend
      [], 
      stats.average, 
      5
    );
  }
  return stats.average;
};