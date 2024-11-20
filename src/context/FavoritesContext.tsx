import { createContext, useContext, useState, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const { user } = useAuth()

  const toggleFavorite = (toolId: string) => {
    if (!user) return

    setFavorites(prev => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId)
      }
      return [...prev, toolId]
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
