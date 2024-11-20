import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Tool } from '../types'
import { mockTools } from '../data/mockData'
import Button from '../components/ui/Button'

export default function Compare() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedTools, setSelectedTools] = useState<Tool[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showToolSelector, setShowToolSelector] = useState(false)

  useEffect(() => {
    const toolIds = searchParams.getAll('tools')
    const tools = mockTools.filter(tool => toolIds.includes(tool.id))
    setSelectedTools(tools)
  }, [searchParams])

  const handleAddTool = (tool: Tool) => {
    if (selectedTools.length < 3) {
      const newTools = [...selectedTools, tool]
      setSelectedTools(newTools)
      setSearchParams({ tools: newTools.map(t => t.id) })
      setShowToolSelector(false)
      setSearchTerm('')
    }
  }

  const handleRemoveTool = (toolId: string) => {
    const newTools = selectedTools.filter(t => t.id !== toolId)
    setSelectedTools(newTools)
    setSearchParams({ tools: newTools.map(t => t.id) })
  }

  const filteredTools = mockTools.filter(tool => 
    !selectedTools.find(t => t.id === tool.id) &&
    (tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Compare AI Tools
        </h1>
        <p className="text-lg text-gray-600">
          Select up to 3 tools to compare their features side by side
        </p>
      </motion.div>

      {/* Tool Selector */}
      {selectedTools.length < 3 && (
        <div className="mb-8">
          <Button
            onClick={() => setShowToolSelector(!showToolSelector)}
            className="w-full py-4"
          >
            {showToolSelector ? 'Cancel' : 'Add Tool to Compare'}
          </Button>
          
          {showToolSelector && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <input
                type="text"
                placeholder="Search for a tool..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="mt-2 bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {filteredTools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => handleAddTool(tool)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-4 border-b border-gray-100"
                  >
                    {tool.imageUrl && (
                      <img
                        src={tool.imageUrl}
                        alt={tool.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-sm text-gray-500">{tool.category}</div>
                    </div>
                  </button>
                ))}
                {filteredTools.length === 0 && (
                  <div className="px-4 py-3 text-gray-500">
                    No tools found matching your search
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Comparison Table */}
      {selectedTools.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-1/4">
                  Features
                </th>
                {selectedTools.map(tool => (
                  <th key={tool.id} className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    <div className="flex items-center justify-between">
                      <span>{tool.name}</span>
                      <button
                        onClick={() => handleRemoveTool(tool.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Basic Info */}
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-500">Category</td>
                {selectedTools.map(tool => (
                  <td key={tool.id} className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {tool.category}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-500">Pricing</td>
                {selectedTools.map(tool => (
                  <td key={tool.id} className="px-6 py-4">
                    {tool.pricing}
                  </td>
                ))}
              </tr>

              {/* Features */}
              {Array.from(new Set(selectedTools.flatMap(tool => tool.features || []))).map(feature => (
                <tr key={feature}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-500">
                    {feature}
                  </td>
                  {selectedTools.map(tool => (
                    <td key={tool.id} className="px-6 py-4">
                      {tool.features?.includes(feature) ? (
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Links */}
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-500">Website</td>
                {selectedTools.map(tool => (
                  <td key={tool.id} className="px-6 py-4">
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Visit Website
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">Select tools to start comparing</p>
        </div>
      )}

      {/* Share Comparison */}
      {selectedTools.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          <Button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert('Comparison link copied to clipboard!')
            }}
          >
            Share Comparison
          </Button>
        </motion.div>
      )}
    </div>
  )
}
