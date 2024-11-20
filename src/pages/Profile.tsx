import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'
import { mockTools } from '../data/mockData'
import ToolCard from '../components/ToolCard'

export default function Profile() {
  const { user } = useAuth()
  const { favorites } = useFavorites()
  const [activeTab, setActiveTab] = useState<'favorites' | 'reviews'>('favorites')

  const favoriteTools = mockTools.filter(tool => favorites.includes(tool.id))

  if (!user) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-blue-600">
              {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-4 px-2 ${
              activeTab === 'favorites'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Favorites
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 px-2 ${
              activeTab === 'reviews'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Reviews
          </button>
        </nav>
      </div>

      {activeTab === 'favorites' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
          {favoriteTools.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-8">
              No favorite tools yet
            </p>
          )}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {user.reviews?.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {(!user.reviews || user.reviews.length === 0) && (
            <p className="text-gray-500 text-center py-8">
              No reviews yet
            </p>
          )}
        </div>
      )}
    </div>
  )
}
