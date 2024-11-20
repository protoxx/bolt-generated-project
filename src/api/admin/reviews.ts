import { queries } from '../../lib/db'

export const adminReviewsApi = {
  // Get pending reviews
  getPendingReviews: (params: {
    page?: number;
    limit?: number;
    toolId?: string;
  }) => {
    const { page = 1, limit = 10, toolId } = params
    const offset = (page - 1) * limit

    let query = `
      SELECT r.*, t.name as tool_name, u.name as user_name, u.email as user_email
      FROM reviews r
      JOIN tools t ON r.tool_id = t.id
      JOIN users u ON r.user_id = u.id
      WHERE r.status = 'pending'
    `

    if (toolId) {
      query += ` AND r.tool_id = ?`
      return db.prepare(query + ` ORDER BY r.created_at DESC LIMIT ? OFFSET ?`)
        .all(toolId, limit, offset)
    }

    return db.prepare(query + ` ORDER BY r.created_at DESC LIMIT ? OFFSET ?`)
      .all(limit, offset)
  },

  // Update review status
  updateReviewStatus: (reviewId: string, status: 'approved' | 'rejected') => {
    return db.prepare(`
      UPDATE reviews
      SET status = ?
      WHERE id = ?
    `).run(status, reviewId)
  },

  // Bulk update review status
  bulkUpdateReviewStatus: (reviewIds: string[], status: 'approved' | 'rejected') => {
    const stmt = db.prepare(`
      UPDATE reviews
      SET status = ?
      WHERE id IN (${reviewIds.map(() => '?').join(',')})
    `)
    
    stmt.run(status, ...reviewIds)
    return { success: true }
  },

  // Delete review
  deleteReview: (reviewId: string) => {
    return db.prepare('DELETE FROM reviews WHERE id = ?').run(reviewId)
  }
}
