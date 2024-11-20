import { Tool } from '../types'

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {tool.imageUrl && (
        <img 
          src={tool.imageUrl} 
          alt={tool.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
      <p className="text-gray-600 mb-4">{tool.description}</p>
      <div className="flex justify-between items-center">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {tool.category}
        </span>
        {tool.pricing && (
          <span className="text-gray-500 text-sm">
            {tool.pricing}
          </span>
        )}
      </div>
      <a
        href={tool.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Visit Website
      </a>
    </div>
  )
}
