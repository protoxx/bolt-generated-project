import { Tool } from '../types'

export const mockTools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced language model for conversation and text generation. Capable of understanding and generating human-like text across a wide range of topics and tasks.',
    website: 'https://chat.openai.com',
    category: 'Language Models',
    pricing: 'Free/Premium',
    imageUrl: 'https://example.com/chatgpt.jpg',
    features: [
      'Natural language processing',
      'Content generation',
      'Code assistance',
      'Multiple language support',
      'Context awareness'
    ]
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'AI-powered image generation tool that creates stunning artwork and illustrations from text descriptions.',
    website: 'https://midjourney.com',
    category: 'Image Generation',
    pricing: 'Paid',
    imageUrl: 'https://example.com/midjourney.jpg',
    features: [
      'Text-to-image generation',
      'High-quality outputs',
      'Style customization',
      'Multiple iterations',
      'Community features'
    ]
  }
]
