import { queries } from '../../lib/db'

export const adminToolsApi = {
  // Get all tools with pagination and filters
  getAllTools: (params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
  }) => {
    const { page = 1, limit = 10, search, category, status } = params
    const offset = (page - 1) * limit

    let query = `
      SELECT 
        t.*,
        COUNT(DISTINCT r.id) as review_count,
        COUNT(DISTINCT f.user_id) as favorite_count,
        AVG(r.rating) as average_rating
      FROM tools t
      LEFT JOIN reviews r ON t.id = r.tool_id
      LEFT JOIN favorites f ON t.id = f.tool_id
    `

    const conditions = []
    const params = []

    if (search) {
      conditions.push(`(t.name LIKE ? OR t.description LIKE ?)`)
      params.push(`%${search}%`, `%${search}%`)
    }

    if (category) {
      conditions.push(`t.category = ?`)
      params.push(category)
    }

    if (status) {
      conditions.push(`t.status = ?`)
      params.push(status)
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`
    }

    query += `
      GROUP BY t.id
      ORDER BY t.created_at DESC
      LIMIT ? OFFSET ?
    `

    params.push(limit, offset)

    const stmt = db.prepare(query)
    return stmt.all(...params)
  },

  // Get tool details with reviews and stats
  getToolDetails: (id: string) => {
    const tool = queries.getToolById.get(id)
    if (!tool) return null

    const stats = db.prepare(`
      SELECT 
        COUNT(DISTINCT r.id) as review_count,
        COUNT(DISTINCT f.user_id) as favorite_count,
        AVG(r.rating) as average_rating,
        COUNT(CASE WHEN r.status = 'pending' THEN 1 END) as pending_reviews
      FROM tools t
      LEFT JOIN reviews r ON t.id = r.tool_id
      LEFT JOIN favorites f ON t.id = f.tool_id
      WHERE t.id = ?
    `).get(id)

    const reviews = db.prepare(`
      SELECT r.*, u.name as user_name, u.email as user_email
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.tool_id = ?
      ORDER BY r.created_at DESC
      LIMIT 10
    `).all(id)

    return {
      ...tool,
      stats,
      reviews
    }
  },

  // Create new tool
  createTool: (toolData: {
    name: string;
    description: string;
    website: string;
    category: string;
    pricing?: string;
    imageUrl?: string;
    features?: string[];
    status?: string;
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

    return queries.getToolById.get(id)
  },

  // Update tool
  updateTool: (id: string, toolData: {
    name?: string;
    description?: string;
    website?: string;
    category?: string;
    pricing?: string;
    imageUrl?: string;
    features?: string[];
    status?: string;
  }) => {
    const currentTool = queries.getToolById.get(id)
    if (!currentTool) throw new Error('Tool not found')

    const updatedTool = {
      ...currentTool,
      ...toolData,
      features: JSON.stringify(toolData.features || JSON.parse(currentTool.features || '[]'))
    }

    queries.updateTool.run(
      updatedTool.name,
      updatedTool.description,
      updatedTool.website,
      updatedTool.category,
      updatedTool.pricing,
      updatedTool.imageUrl,
      updatedTool.features,
      id
    )

    return queries.getToolById.get(id)
  },

  // Delete tool
  deleteTool: (id: string) => {
    // First delete related records
    db.prepare('DELETE FROM reviews WHERE tool_id = ?').run(id)
    db.prepare('DELETE FROM favorites WHERE tool_id = ?').run(id)
    
    // Then delete the tool
    queries.deleteTool.run(id)
    return { success: true }
  },

  // Bulk operations
  bulkUpdateStatus: (toolIds: string[], status: string) => {
    const stmt = db.prepare(`
      UPDATE tools
      SET status = ?
      WHERE id IN (${toolIds.map(() => '?').join(',')})
    `)
    
    stmt.run(status, ...toolIds)
    return { success: true }
  },

  // Get tool statistics
  getToolStats: (id: string) => {
    return db.prepare(`
      SELECT
        COUNT(DISTINCT r.id) as total_reviews,
        COUNT(DISTINCT f.user_id) as total_favorites,
        AVG(r.rating) as average_rating,
        COUNT(CASE WHEN r.rating = 5 THEN 1 END) as five_star_reviews,
        COUNT(CASE WHEN r.rating = 4 THEN 1 END) as four_star_reviews,
        COUNT(CASE WHEN r.rating = 3 THEN 1 END) as three_star_reviews,
        COUNT(CASE WHEN r.rating = 2 THEN 1 END) as two_star_reviews,
        COUNT(CASE WHEN r.rating = 1 THEN 1 END) as one_star_reviews,
        COUNT(CASE WHEN r.status = 'pending' THEN 1 END) as pending_reviews,
        COUNT(CASE WHEN r.status = 'approved' THEN 1 END) as approved_reviews,
        COUNT(CASE WHEN r.status = 'rejected' THEN 1 END) as rejected_reviews
      FROM tools t
      LEFT JOIN reviews r ON t.id = r.tool_id
      LEFT JOIN favorites f ON t.id = f.tool_id
      WHERE t.id = ?
      GROUP BY t.id
    `).get(id)
  },

  // Get category statistics
  getCategoryStats: () => {
    return db.prepare(`
      SELECT
        category,
        COUNT(*) as tool_count,
        AVG(
          (SELECT AVG(rating) FROM reviews WHERE tool_id = t.id)
        ) as average_rating,
        COUNT(DISTINCT r.id) as total_reviews,
        COUNT(DISTINCT f.user_id) as total_favorites
      FROM tools t
      LEFT JOIN reviews r ON t.id = r.tool_id
      LEFT JOIN favorites f ON t.id = f.tool_id
      GROUP BY category
      ORDER BY tool_count DESC
    `).all()
  }
}
