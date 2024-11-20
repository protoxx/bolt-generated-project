import { toolQueries, userQueries } from './index'
import bcrypt from 'bcryptjs'

async function seed() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  userQueries.create.run(
    'admin1',
    'Admin User',
    'admin@example.com',
    adminPassword,
    'admin'
  )

  // Create some initial tools
  const tools = [
    {
      id: '1',
      name: 'ChatGPT',
      description: 'Advanced language model for conversation and text generation',
      website: 'https://chat.openai.com',
      category: 'Language Models',
      pricing: 'Free/Premium',
      imageUrl: 'https://example.com/chatgpt.jpg',
      features: JSON.stringify([
        'Natural language processing',
        'Content generation',
        'Code assistance'
      ])
    },
    {
      id: '2',
      name: 'Midjourney',
      description: 'AI-powered image generation tool',
      website: 'https://midjourney.com',
      category: 'Image Generation',
      pricing: 'Paid',
      imageUrl: 'https://example.com/midjourney.jpg',
      features: JSON.stringify([
        'Text-to-image generation',
        'Style customization',
        'High-quality outputs'
      ])
    }
  ]

  tools.forEach(tool => {
    toolQueries.create.run(
      tool.id,
      tool.name,
      tool.description,
      tool.website,
      tool.category,
      tool.pricing,
      tool.imageUrl,
      tool.features
    )
  })
}

seed().catch(console.error)
