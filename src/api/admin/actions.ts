import { mockTools, mockUsers, mockReviews } from '../../data/mockData'
import { Tool, User, Review } from '../../types'

export const adminActions = {
  // Tools actions
  tools: {
    getAll: () => {
      return Promise.resolve(mockTools)
    },

    create: (toolData: Partial<Tool>) => {
      const newTool = {
        id: crypto.randomUUID(),
        ...toolData,
        reviews: [],
        createdAt: new Date().toISOString()
      } as Tool
      
      mockTools.push(newTool)
      return Promise.resolve({ success: true, id: newTool.id })
    },

    update: (id: string, toolData: Partial<Tool>) => {
      const index = mockTools.findIndex(tool => tool.id === id)
      if (index !== -1) {
        mockTools[index] = { ...mockTools[index], ...toolData }
        return Promise.resolve({ success: true })
      }
      return Promise.resolve({ success: false, error: 'Tool not found' })
    },

    delete: (id: string) => {
      const index = mockTools.findIndex(tool => tool.id === id)
      if (index !== -1) {
        mockTools.splice(index, 1)
        return Promise.resolve({ success: true })
      }
      return Promise.resolve({ success: false, error: 'Tool not found' })
    }
  },

  // Users actions
  users: {
    getAll: () => {
      return Promise.resolve(mockUsers)
    },

    updateRole: (userId: string, role: string) => {
      const user = mockUsers.find(u => u.id === userId)
      if (user) {
        user.role = role
        return Promise.resolve({ success: true })
      }
      return Promise.resolve({ success: false, error: 'User not found' })
    },

    delete: (userId: string) => {
      const index = mockUsers.findIndex(u => u.id === userId)
      if (index !== -1) {
        mockUsers.splice(index, 1)
        return Promise.resolve({ success: true })
      }
      return Promise.resolve({ success: false, error: 'User not found' })
    }
  },

  // Reviews actions
  reviews: {
    getAll: () => {
      return Promise.resolve(mockReviews)
    },

    updateStatus: (reviewId: string, status: string) => {
      const review = mockReviews.find(r => r.id === reviewId)
      if (review) {
        review.status = status
        return Promise.resolve({ success: true })
      }
      return Promise.resolve({ success: false, error: 'Review not found' })
    },

    delete: (reviewId: string) => {
      const index = mockReviews.findIndex(r => r.id === reviewId)
      if (index !== -1) {
        mockReviews.splice(index, 1)
        return Promise.resolve({ success: true })
      }
      return Promise.resolve({ success: false, error: 'Review not found' })
    }
  }
}
