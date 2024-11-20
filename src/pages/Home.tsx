import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import ToolGrid from '../components/ToolGrid'
import { Tool } from '../types'

// Temporary mock data
const mockTools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced language model for conversation and text generation',
    website: 'https://chat.openai.com',
    category: 'Language Models',
    pricing: 'Free/Premium',
    imageUrl: 'https://example.com/chatgpt.jpg'
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'AI-powered image generation tool',
    website: 'https://midjourney.com',
    category: 'Image Generation',
    pricing: 'Paid',
    imageUrl: 'https://example.com/midjourney.jpg'
  }
]

const categories = ['Language Models', 'Image Generation', 'Audio Processing', 'Video Generation']

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredTools = mockTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Discover AI Tools
      </h1>
      <SearchBar onSearch={setSearchQuery} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ToolGrid tools={filteredTools} />
    </div>
  )
}
