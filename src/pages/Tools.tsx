import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ToolFilters from '../components/tools/ToolFilters'
import ToolGrid from '../components/ToolGrid'
import { mockTools } from '../data/mockData'

export default function Tools() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({})
  const category = searchParams.get('category')

  // Apply filters and category filter from URL
  const filteredTools = mockTools.filter(tool => {
    if (category && tool.category !== category) {
      return false
    }
    // Add more filter logic here
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">
          {category ? `${category} Tools` : 'All AI Tools'}
        </h1>
        <p className="mt-2 text-gray-600">
          Discover and compare the best AI tools for your needs
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ToolFilters onFilterChange={setFilters} />
        </div>
        <div className="md:col-span-3">
          <ToolGrid tools={filteredTools} />
        </div>
      </div>
    </div>
  )
}
