import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tool } from '../types'
import { mockTools } from '../data/mockData'
import ToolSelector from '../components/compare/ToolSelector'
import ComparisonTable from '../components/compare/ComparisonTable'

export default function Compare() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedTools, setSelectedTools] = useState<Tool[]>([])

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
    }
  }

  const handleRemoveTool = (toolId: string) => {
    const newTools = selectedTools.filter(t => t.id !== toolId)
    setSelectedTools(newTools)
    setSearchParams({ tools: newTools.map(t => t.id) })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Compare AI Tools</h1>
      
      {selectedTools.length < 3 && (
        <div className="mb-8">
          <ToolSelector
            tools={mockTools.filter(tool => !selectedTools.find(t => t.id === tool.id))}
            onSelect={handleAddTool}
          />
        </div>
      )}

      {selectedTools.length > 0 ? (
        <ComparisonTable tools={selectedTools} onRemove={handleRemoveTool} />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">Select tools to compare</p>
        </div>
      )}
    </div>
  )
}
