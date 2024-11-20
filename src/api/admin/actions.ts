import { dbQueries } from '../../lib/db'

export const adminActions = {
  // Tools actions
  tools: {
    getAll: () => {
      try {
        return dbQueries.tools.getAll.all()
      } catch (error) {
        console.error('Error getting tools:', error)
        return []
      }
    },

    create: (toolData: any) => {
      try {
        const id = crypto.randomUUID()
        const features = JSON.stringify(toolData.features || [])
        
        dbQueries.tools.create.run(
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
        
        dbQueries.tools.update.run(
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
        dbQueries.tools.delete.run(id)
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
        return dbQueries.users.getAll.all()
      } catch (error) {
        console.error('Error getting users:', error)
        return []
      }
    },

    updateRole: (userId: string, role: string) => {
      try {
        dbQueries.users.updateRole.run(role, userId)
        return { success: true }
      } catch (error) {
        console.error('Error updating user role:', error)
        return { success: false, error: 'Failed to update user role' }
      }
    },

    delete: (userId: string) => {
      try {
        dbQueries.users.delete.run(userId)
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
        return dbQueries.reviews.getAll.all()
      } catch (error) {
        console.error('Error getting reviews:', error)
        return []
      }
    },

    updateStatus: (reviewId: string, status: string) => {
      try {
        dbQueries.reviews.updateStatus.run(status, reviewId)
        return { success: true }
      } catch (error) {
        console.error('Error updating review status:', error)
        return { success: false, error: 'Failed to update review status' }
      }
    },

    delete: (reviewId: string) => {
      try {
        dbQueries.reviews.delete.run(reviewId)
        return { success: true }
      } catch (error) {
        console.error('Error deleting review:', error)
        return { success: false, error: 'Failed to delete review' }
      }
    }
  }
}
