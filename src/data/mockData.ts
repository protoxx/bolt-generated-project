import { Tool, User, Review } from '../types'

export const mockTools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced language model for conversation and text generation',
    website: 'https://chat.openai.com',
    category: 'Language Models',
    pricing: 'Free/Premium',
    imageUrl: 'https://example.com/chatgpt.jpg',
    features: [
      'Natural language processing',
      'Content generation',
      'Code assistance'
    ],
    reviews: []
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'AI-powered image generation tool',
    website: 'https://midjourney.com',
    category: 'Image Generation',
    pricing: 'Paid',
    imageUrl: 'https://example.com/midjourney.jpg',
    features: [
      'Text-to-image generation',
      'Style customization',
      'High-quality outputs'
    ],
    reviews: []
  }
]

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  }
]

export const mockReviews: Review[] = [
  {
    id: '1',
    toolId: '1',
    userId: '2',
    rating: 5,
    comment: 'Great tool!',
    status: 'approved',
    createdAt: new Date().toISOString(),
    user: mockUsers[1],
    tool: mockTools[0]
  }
]
