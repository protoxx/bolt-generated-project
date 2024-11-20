import { useState, useEffect } from 'react'
import { Tool } from '../../types'
import Button from '../ui/Button'
import ToolForm from './ToolForm'
import { adminActions } from '../../api/admin/actions'

export default function AdminToolList() {
  const [tools, setTools] = useState<Tool[]>([])
  const [isAddingTool, setIsAddingTool] = useState(false)
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    loadTools()
  }, [])

  const loadTools = async () => {
    setIsLoading(true)
    const toolsList = await adminActions.tools.getAll()
    setTools(toolsList)
    setIsLoading(false)
  }

  const handleSubmit = async (toolData: Partial<Tool>) => {
    if (selectedTool) {
      // Update existing tool
      const result = await adminActions.tools.update(selectedTool.id, toolData)
      if (result.success) {
        await loadTools()
        setSelectedTool(null)
      }
    } else {
      // Create new tool
      const result = await adminActions.tools.create(toolData)
      if (result.success) {
        await loadTools()
        setIsAddingTool(false)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      const result = await adminActions.tools.delete(id)
      if (result.success) {
        await loadTools()
      }
    }
  }

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* ... (reste du code existant) ... */}

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
              onClose={() => {
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
