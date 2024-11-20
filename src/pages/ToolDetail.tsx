import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'
import { mockTools } from '../data/mockData'

export default function ToolDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { favorites, toggleFavorite } = useFavorites()
  
  const tool = mockTools.find(t => t.id === id)
  
  if (!tool) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-xl text-gray-600">Tool not found</p>
      </div>
    )
  }

  const isFavorite = favorites.includes(tool.id)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {tool.imageUrl && (
          <img 
            src={tool.imageUrl} 
            alt={tool.name}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold mb-4">{tool.name}</h1>
            {user && (
              <button
                onClick={() => toggleFavorite(tool.id)}
                className={`p-2 rounded-full ${
                  isFavorite 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-400 hover:text-gray-500'
                }`}
              >
                <svg 
                  className="w-6 h-6 fill-current" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {tool.category}
            </span>
            {tool.pricing && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {tool.pricing}
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-6">{tool.description}</p>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {tool.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
