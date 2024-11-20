import { Tool } from '../types'

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
    reviews: [
      {
        id: '1',
        rating: 5,
        comment: 'Incredible tool for content creation and brainstorming.',
        createdAt: '2023-12-01',
        user: { id: '1', name: 'John Doe', email: 'john@example.com' },
        tool: { id: '1', name: 'ChatGPT' } as Tool
      }
    ]
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
  },
  {
    id: '3',
    name: 'Copy.ai',
    description: 'AI writing assistant for marketing copy',
    website: 'https://copy.ai',
    category: 'Writing',
    pricing: 'Freemium',
    imageUrl: 'https://example.com/copyai.jpg',
    features: [
      'Marketing copy generation',
      'Blog post writing',
      'Social media content'
    ],
    reviews: []
  }
]
