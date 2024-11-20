import { toolQueries, userQueries, reviewQueries } from '../../lib/db'

export const adminActions = {
  // Tools actions
  tools: {
    getAll: () => {
      try {
        return toolQueries.getAll.all(100, 0) // Récupère tous les outils pour l'admin
      } catch (error) {
        console.error('Error getting tools:', error)
        return []
      }
    },

    create: (toolData: any) => {
      try {
        const id = crypto.randomUUID()
        const features = JSON.stringify(toolData.features || [])
        
        toolQueries.create.run(
          id,
          toolData.name,
          toolData.description,
          toolData.website,
          toolData.category,
          toolData.pricing,
          toolData.imageUrl,
          features
        )
        
        return { success: true, id }
      } catch (error) {
        console.error('Error creating tool:', error)
        return { success: false, error: 'Failed to create tool' }
      }
    },

    update: (id: string, toolData: any) => {
      try {
        const features = JSON.stringify(toolData.features || [])
        
        toolQueries.update.run(
          toolData.name,
          toolData.description,
          toolData.website,
          toolData.category,
          toolData.pricing,
          toolData.imageUrl,
          features,
          id
        )
        
        return { success: true }
      } catch (error) {
        console.error('Error updating tool:', error)
        return { success: false, error: 'Failed to update tool' }
      }
    },

    delete: (id: string) => {
      try {
        toolQueries.delete.run(id)
        return { success: true }
      } catch (error) {
        console.error('Error deleting tool:', error)
        return { success: false, error: 'Failed to delete tool' }
      }
    }
  },

  // Users actions
  users: {
    getAll: () => {
      try {
        return db.prepare('SELECT * FROM users ORDER BY created_at DESC').all()
      } catch (error) {
        console.error('Error getting users:', error)
        return []
      }
    },

    updateRole: (userId: string, role: string) => {
      try {
        db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, userId)
        return { success: true }
      } catch (error) {
        console.error('Error updating user role:', error)
        return { success: false, error: 'Failed to update user role' }
      }
    },

    delete: (userId: string) => {
      try {
        db.prepare('DELETE FROM users WHERE id = ?').run(userId)
        return { success: true }
      } catch (error) {
        console.error('Error deleting user:', error)
        return { success: false, error: 'Failed to delete user' }
      }
    }
  },

  // Reviews actions
  reviews: {
    getAll: () => {
      try {
        return db.prepare(`
          SELECT r.*, t.name as tool_name, u.name as user_name
          FROM reviews r
          JOIN tools t ON r.tool_id = t.id
          JOIN users u ON r.user_id = u.id
          ORDER BY r.created_at DESC
        `).all()
      } catch (error) {
        console.error('Error getting reviews:', error)
        return []
      }
    },

    updateStatus: (reviewId: string, status: string) => {
      try {
        reviewQueries.updateStatus.run(status, reviewId)
        return { success: true }
      } catch (error) {
        console.error('Error updating review status:', error)
        return { success: false, error: 'Failed to update review status' }
      }
    },

    delete: (reviewId: string) => {
      try {
        db.prepare('DELETE FROM reviews WHERE id = ?').run(reviewId)
        return { success: true }
      } catch (error) {
        console.error('Error deleting review:', error)
        return { success: false, error: 'Failed to delete review' }
      }
    }
  }
}
