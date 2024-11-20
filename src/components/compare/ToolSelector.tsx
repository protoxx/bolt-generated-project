import { useState } from 'react'
import { Tool } from '../../types'

interface ToolSelectorProps {
  tools: Tool[]
  onSelect: (tool: Tool) => void
}

export default function ToolSelector({ tools, onSelect }: ToolSelectorProps) {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for a tool to compare..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-auto">
          {filteredTools.map(tool => (
            <button
              key={tool.id}
              onClick={() => {
                onSelect(tool)
                setSearch('')
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-4"
            >
              {tool.imageUrl && (
                <img
                  src={tool.imageUrl}
                  alt={tool.name}
                  className="w-10 h-10 object-cover rounded"
                />
              )}
              <div>
                <div className="font-medium">{tool.name}</div>
                <div className="text-sm text-gray-500">{tool.category}</div>
              </div>
            </button>
          ))}
          {filteredTools.length === 0 && (
            <div className="px-4 py-2 text-gray-500">No tools found</div>
          )}
        </div>
      )}
    </div>
  )
}
