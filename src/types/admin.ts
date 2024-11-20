// Add these queries to the existing queries object

export const queries = {
  // ... (previous queries)

  // Admin tool queries
  getToolWithStats: db.prepare(`
    SELECT 
      t.*,
      COUNT(DISTINCT r.id) as review_count,
      COUNT(DISTINCT f.user_id) as favorite_count,
      AVG(r.rating) as average_rating
    FROM tools t
    LEFT JOIN reviews r ON t.id = r.tool_id
    LEFT JOIN favorites f ON t.id = f.tool_id
    WHERE t.id = ?
    GROUP BY t.id
  `),

  updateToolStatus: db.prepare(`
    UPDATE tools
    SET status = ?
    WHERE id = ?
  `),

  // Admin review queries
  getPendingReviewCount: db.prepare(`
    SELECT COUNT(*) as count
    FROM reviews
    WHERE status = 'pending'
  `),

  getReviewsByStatus: db.prepare(`
    SELECT r.*, t.name as tool_name, u.name as user_name
    FROM reviews r
    JOIN tools t ON r.tool_id = t.id
    JOIN users u ON r.user_id = u.id
    WHERE r.status = ?
    ORDER BY r.created_at DESC
    LIMIT ? OFFSET ?
  `),

  updateReviewStatus: db.prepare(`
    UPDATE reviews
    SET status = ?
    WHERE id = ?
  `)
}
