import { useState, useEffect } from 'react'
import { Tool } from '../../types'
import Button from '../ui/Button'
import ToolForm from './ToolForm'
import { mockTools } from '../../data/mockData'

export default function AdminToolList() {
  const [tools, setTools] = useState<Tool[]>(mockTools)
  const [isAddingTool, setIsAddingTool] = useState(false)
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(tools.map(tool => tool.category)))

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      setTools(tools.filter(tool => tool.id !== id))
    }
  }

  const handleSubmit = (data: Partial<Tool>) => {
    if (selectedTool) {
      // Edit existing tool
      setTools(tools.map(tool => 
        tool.id === selectedTool.id 
          ? { ...tool, ...data }
          : tool
      ))
    } else {
      // Add new tool
      const newTool: Tool = {
        id: crypto.randomUUID(),
        name: data.name!,
        description: data.description!,
        website: data.website!,
        category: data.category!,
        pricing: data.pricing,
        imageUrl: data.imageUrl,
        features: data.features,
      }
      setTools([...tools, newTool])
    }
    setIsAddingTool(false)
    setSelectedTool(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Tools</h2>
        <Button onClick={() => setIsAddingTool(true)}>
          Add New Tool
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tools Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tool
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pricing
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reviews
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTools.map((tool) => (
              <tr key={tool.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {tool.imageUrl && (
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={tool.imageUrl}
                          alt={tool.name}
                        />
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {tool.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {tool.website}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {tool.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tool.pricing}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tool.reviews?.length || 0} reviews
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedTool(tool)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tool.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Tool Modal */}
      {(isAddingTool || selectedTool) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">
              {selectedTool ? 'Edit Tool' : 'Add New Tool'}
            </h3>
            <ToolForm
              tool={selectedTool || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsAddingTool(false)
                setSelectedTool(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
