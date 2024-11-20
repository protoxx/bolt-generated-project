export interface Tool {
  id: string;
  name: string;
  description: string;
  website: string;
  category: string;
  pricing?: string;
  imageUrl?: string;
  features?: string[];
  reviews?: Review[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: User;
  tool: Tool;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role?: string;
}
