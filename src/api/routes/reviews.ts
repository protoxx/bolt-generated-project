import { Router } from 'express'
import { z } from 'zod'
import { validateRequest } from '../middleware/validate'

const router = Router()

const reviewSchema = z.object({
  toolId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).optional()
})

// GET /api/reviews
router.get('/', async (req, res) => {
  try {
    const { toolId } = req.query
    // TODO: Implement database query
    res.json({ reviews: [] })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
})

// POST /api/reviews
router.post('/', validateRequest(reviewSchema), async (req, res) => {
  try {
    const reviewData = req.body
    // TODO: Implement database creation
    res.status(201).json({ message: 'Review created successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' })
  }
})

// DELETE /api/reviews/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    // TODO: Implement database deletion
    res.json({ message: 'Review deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' })
  }
})

export default router
