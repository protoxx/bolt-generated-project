export interface Tool {
  id: string;
  name: string;
  description: string;
  website: string;
  category: string;
  pricing?: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  name?: string;
  email: string;
}
