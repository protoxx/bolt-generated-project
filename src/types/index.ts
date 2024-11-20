export interface Tool {
  id: string;
  name: string;
  description: string;
  website: string;
  category: string;
  pricing?: {
    free?: PricingTier;
    basic?: PricingTier;
    pro?: PricingTier;
    enterprise?: PricingTier;
  };
  imageUrl?: string;
  features?: string[];
  metrics?: {
    performance: number;
    easeOfUse: number;
    features: number;
    valueForMoney: number;
  };
  specs?: {
    hasApi: boolean;
    exportFormats?: string[];
    integrations?: string[];
    supportOptions?: string[];
    updateFrequency?: string;
  };
}

interface PricingTier {
  price: string;
  features: string;
}

export interface User {
  id: string;
  name?: string;
  email: string;
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
