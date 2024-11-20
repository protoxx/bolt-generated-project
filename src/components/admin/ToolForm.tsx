import { useState } from 'react'
import { Tool } from '../../types'
import Button from '../ui/Button'

interface ToolFormProps {
  tool?: Tool;
  onClose: () => void;
  onSubmit: (toolData: Partial<Tool>) => void;
}

export default function ToolForm({ tool, onClose, onSubmit }: ToolFormProps) {
  const [formData, setFormData] = useState({
    name: tool?.name || '',
    description: tool?.description || '',
    website: tool?.website || '',
    category: tool?.category || '',
    pricing: tool?.pricing || '',
    imageUrl: tool?.imageUrl || '',
    features: tool?.features?.join('\n') || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      description: formData.description,
      website: formData.website,
      category: formData.category,
      pricing: formData.pricing,
      imageUrl: formData.imageUrl,
      features: formData.features.split('\n').filter(f => f.trim())
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={e => setFormData({ ...formData, website: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="">Select a category</option>
            <option value="Language Models">Language Models</option>
            <option value="Image Generation">Image Generation</option>
            <option value="Writing">Writing</option>
            <option value="Audio Processing">Audio Processing</option>
            <option value="Video Creation">Video Creation</option>
            <option value="Development">Development</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Pricing</label>
          <input
            type="text"
            value={formData.pricing}
            onChange={e => setFormData({ ...formData, pricing: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Features (one per line)
        </label>
        <textarea
          value={formData.features}
          onChange={e => setFormData({ ...formData, features: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          onClick={onClose}
          variant="ghost"
        >
          Cancel
        </Button>
        <Button
          type="submit"
        >
          {tool ? 'Save Changes' : 'Add Tool'}
        </Button>
      </div>
    </form>
  )
}
