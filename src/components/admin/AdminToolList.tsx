import { useState } from 'react'
import { mockTools } from '../../data/mockData'
import AdminToolForm from './AdminToolForm'

export default function AdminToolList() {
  const [isAddingTool, setIsAddingTool] = useState(false)
  const [editingTool, setEditingTool] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Delete tool:', id)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Tools</h2>
        <button
          onClick={() => setIsAddingTool(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Tool
        </button>
      </div>

      {(isAddingTool || editingTool) && (
        <AdminToolForm
          tool={editingTool ? mockTools.find(t => t.id === editingTool) : undefined}
          onClose={() => {
            setIsAddingTool(false)
            setEditingTool(null)
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Pricing</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockTools.map((tool) => (
              <tr key={tool.id} className="border-b">
                <td className="px-6 py-4 whitespace-nowrap">{tool.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tool.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tool.pricing}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => setEditingTool(tool.id)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tool.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
