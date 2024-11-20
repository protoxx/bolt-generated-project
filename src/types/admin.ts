export interface ToolStats {
  total_reviews: number;
  total_favorites: number;
  average_rating: number;
  five_star_reviews: number;
  four_star_reviews: number;
  three_star_reviews: number;
  two_star_reviews: number;
  one_star_reviews: number;
  pending_reviews: number;
  approved_reviews: number;
  rejected_reviews: number;
}

export interface CategoryStats {
  category: string;
  tool_count: number;
  average_rating: number;
  total_reviews: number;
  total_favorites: number;
}

export interface AdminToolFilters {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface AdminReviewFilters {
  toolId?: string;
  status?: string;
  page?: number;
  limit?: number;
}
