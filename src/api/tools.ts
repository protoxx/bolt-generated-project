import { queries } from '../lib/db'

export const getTools = (page = 1, limit = 10, category?: string) => {
  const offset = (page - 1) * limit
  
  let query = queries.getAllTools
  if (category) {
    query = db.prepare(`
      SELECT * FROM tools
      WHERE category = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `)
    return query.all(category, limit, offset)
  }
  
  return query.all(limit, offset)
}

export const getToolById = (id: string) => {
  const tool = queries.getToolById.get(id)
  if (!tool) return null

  // Get reviews
  const reviews = queries.getToolReviews.all(id, 10, 0)
  
  return {
    ...tool,
    reviews
  }
}

export const createTool = (toolData: {
  name: string
  description: string
  website: string
  category: string
  pricing?: string
  imageUrl?: string
  features?: string[]
}) => {
  const id = crypto.randomUUID()
  const features = JSON.stringify(toolData.features || [])
  
  queries.createTool.run(
    id,
    toolData.name,
    toolData.description,
    toolData.website,
    toolData.category,
    toolData.pricing,
    toolData.imageUrl,
    features
  )

  return getToolById(id)
}

export const updateTool = (id: string, toolData: {
  name: string
  description: string
  website: string
  category: string
  pricing?: string
  imageUrl?: string
  features?: string[]
}) => {
  const features = JSON.stringify(toolData.features || [])
  
  queries.updateTool.run(
    toolData.name,
    toolData.description,
    toolData.website,
    toolData.category,
    toolData.pricing,
    toolData.imageUrl,
    features,
    id
  )

  return getToolById(id)
}

export const deleteTool = (id: string) => {
  queries.deleteTool.run(id)
  return { success: true }
}
