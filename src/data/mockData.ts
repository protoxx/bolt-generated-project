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
        comment: 'Incredible tool for content creation and brainstorming. The responses are very natural and helpful.',
        createdAt: '2023-12-01',
        user: { id: '1', name: 'John Doe', email: 'john@example.com' },
        tool: { id: '1', name: 'ChatGPT' } as Tool
      },
      {
        id: '2',
        rating: 4,
        comment: 'Great for most tasks, but sometimes needs fact-checking.',
        createdAt: '2023-11-28',
        user: { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        tool: { id: '1', name: 'ChatGPT' } as Tool
      },
      {
        id: '3',
        rating: 3,
        comment: 'Good for basic tasks, but can be inconsistent.',
        createdAt: '2023-11-25',
        user: { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
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
    reviews: [
      {
        id: '4',
        rating: 5,
        comment: 'The image quality is outstanding. Best AI art generator available.',
        createdAt: '2023-12-02',
        user: { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com' },
        tool: { id: '2', name: 'Midjourney' } as Tool
      },
      {
        id: '5',
        rating: 5,
        comment: 'Amazing tool for creating unique artwork. The community is great too.',
        createdAt: '2023-11-30',
        user: { id: '5', name: 'David Brown', email: 'david@example.com' },
        tool: { id: '2', name: 'Midjourney' } as Tool
      }
    ]
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
    reviews: [
      {
        id: '6',
        rating: 4,
        comment: 'Great for quick marketing copy, saves a lot of time.',
        createdAt: '2023-12-01',
        user: { id: '6', name: 'Emma Davis', email: 'emma@example.com' },
        tool: { id: '3', name: 'Copy.ai' } as Tool
      },
      {
        id: '7',
        rating: 3,
        comment: 'Useful but needs some editing to match brand voice.',
        createdAt: '2023-11-29',
        user: { id: '7', name: 'Tom Wilson', email: 'tom@example.com' },
        tool: { id: '3', name: 'Copy.ai' } as Tool
      }
    ]
  }
]
