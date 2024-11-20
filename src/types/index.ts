export interface Tool {
  id: string;
  name: string;
  description: string;
  website: string;
  category: string;
  pricing?: string;
  imageUrl?: string;
  features?: string[];
  reviews: Review[];
  createdAt?: string;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role?: string;
}

export interface Review {
  id: string;
  toolId: string;
  userId: string;
  rating: number;
  comment?: string;
  status?: string;
  createdAt: string;
  user: User;
  tool: Tool;
}
