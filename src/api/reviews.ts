import { queries } from '../lib/db'

export const createReview = (reviewData: {
  userId: string
  toolId: string
  rating: number
  comment?: string
}) => {
  const id = crypto.randomUUID()
  
  queries.createReview.run(
    id,
    reviewData.userId,
    reviewData.toolId,
    reviewData.rating,
    reviewData.comment
  )

  return queries.getToolReviews.get(id)
}

export const getToolReviews = (toolId: string, page = 1, limit = 10) => {
  const offset = (page - 1) * limit
  return queries.getToolReviews.all(toolId, limit, offset)
}
