import { Link } from 'react-router-dom'
import { Tool } from '../types'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const { user } = useAuth()
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(tool.id)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {tool.imageUrl && (
        <img 
          src={tool.imageUrl} 
          alt={tool.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
        {user && (
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(tool.id)
            }}
            className={`p-2 rounded-full ${
              isFavorite 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            <svg 
              className="w-5 h-5 fill-current" 
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        )}
      </div>
      <p className="text-gray-600 mb-4">{tool.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {tool.category}
        </span>
        {tool.pricing && (
          <span className="text-gray-500 text-sm">
            {tool.pricing}
          </span>
        )}
      </div>
      <Link
        to={`/tool/${tool.id}`}
        className="block text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        View Details
      </Link>
    </div>
  )
}
