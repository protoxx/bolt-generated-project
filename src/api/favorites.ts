import { queries } from '../lib/db'

export const addFavorite = (userId: string, toolId: string) => {
  queries.addFavorite.run(userId, toolId)
  return { success: true }
}

export const removeFavorite = (userId: string, toolId: string) => {
  queries.removeFavorite.run(userId, toolId)
  return { success: true }
}

export const getUserFavorites = (userId: string) => {
  return queries.getUserFavorites.all(userId)
}
