import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ToolFiltersProps {
  onFilterChange: (filters: any) => void
}

export default function ToolFilters({ onFilterChange }: ToolFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    pricing: [],
    categories: [],
    features: []
  })

  const handleFilterChange = (type: string, value: string) => {
    const newFilters = { ...filters }
    const array = newFilters[type as keyof typeof filters] as string[]
    
    if (array.includes(value)) {
      newFilters[type as keyof typeof filters] = array.filter(item => item !== value)
    } else {
      newFilters[type as keyof typeof filters] = [...array, value]
    }
    
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Filters</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-500"
        >
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 space-y-6"
          >
            {/* Pricing Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Pricing</h4>
              <div className="space-y-2">
                {['Free', 'Freemium', 'Paid'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.pricing.includes(option)}
                      onChange={() => handleFilterChange('pricing', option)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Categories</h4>
              <div className="space-y-2">
                {[
                  'Language Models',
                  'Image Generation',
                  'Video Creation',
                  'Audio & Music',
                  'Productivity',
                  'Development'
                ].map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleFilterChange('categories', category)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Features Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
              <div className="space-y-2">
                {[
                  'API Access',
                  'Mobile App',
                  'Browser Extension',
                  'Team Collaboration',
                  'Custom Training'
                ].map((feature) => (
                  <label key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.features.includes(feature)}
                      onChange={() => handleFilterChange('features', feature)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
