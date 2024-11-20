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

  useEffect(() => {
    loadTools()
  }, [])

  const loadTools = async () => {
    setIsLoading(true)
    const toolsList = await adminActions.tools.getAll()
    setTools(toolsList)
    setIsLoading(false)
  }

  const handleSubmit = async (toolData: any) => {
    if (selectedTool) {
      const result = await adminActions.tools.update(selectedTool.id, toolData)
      if (result.success) {
        await loadTools()
      }
    } else {
      const result = await adminActions.tools.create(toolData)
      if (result.success) {
        await loadTools()
      }
    }
    setIsAddingTool(false)
    setSelectedTool(null)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      const result = await adminActions.tools.delete(id)
      if (result.success) {
        await loadTools()
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    // ... reste du code existant ...
  )
}
