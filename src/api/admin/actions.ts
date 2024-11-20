import { mockTools, mockUsers, mockReviews } from '../../data/mockData'
import { Tool, User, Review } from '../../types'

export const adminActions = {
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
        mockTools[index] = {
          ...mockTools[index],
          ...toolData,
          reviews: mockTools[index].reviews // Preserve existing reviews
        }
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

  // ... (reste du code existant) ...
}
