import { Tool } from '../../types'

interface ComparisonTableProps {
  tools: Tool[]
  onRemove: (toolId: string) => void
}

export default function ComparisonTable({ tools, onRemove }: ComparisonTableProps) {
  const features = Array.from(
    new Set(tools.flatMap(tool => tool.features || []))
  )

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-1/4">
              Features
            </th>
            {tools.map(tool => (
              <th key={tool.id} className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center justify-between">
                  <span>{tool.name}</span>
                  <button
                    onClick={() => onRemove(tool.id)}
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
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-gray-500">Category</td>
            {tools.map(tool => (
              <td key={tool.id} className="px-6 py-4">
                {tool.category}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-gray-500">Pricing</td>
            {tools.map(tool => (
              <td key={tool.id} className="px-6 py-4">
                {tool.pricing}
              </td>
            ))}
          </tr>
          {features.map((feature, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-sm font-medium text-gray-500">
                {feature}
              </td>
              {tools.map(tool => (
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
        </tbody>
      </table>
    </div>
  )
}
