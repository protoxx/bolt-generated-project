import { Redis } from 'ioredis'

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL
  }

  throw new Error('REDIS_URL is not defined')
}

export const redis = new Redis(getRedisUrl(), {
  maxRetriesPerRequest: 3,
})

export const CACHE_KEYS = {
  TOOLS: 'tools',
  TOOL: (id: string) => `tool:${id}`,
  REVIEWS: (toolId: string) => `reviews:${toolId}`,
  USER_FAVORITES: (userId: string) => `favorites:${userId}`,
}

export const CACHE_TTL = {
  TOOLS: 60 * 5, // 5 minutes
  TOOL: 60 * 60, // 1 hour
  REVIEWS: 60 * 15, // 15 minutes
  USER_FAVORITES: 60 * 60 * 24, // 24 hours
}
