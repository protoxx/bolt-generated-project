import { motion } from 'framer-motion'
import { Tool } from '../../types'
import Card from '../ui/Card'

interface TrendingToolsProps {
  tools: Tool[]
}

export default function TrendingTools({ tools }: TrendingToolsProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900"
          >
            Trending This Week
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-gray-600"
          >
            Discover the most popular AI tools everyone is talking about
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.slice(0, 3).map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="relative">
                  {tool.imageUrl && (
                    <img
                      src={tool.imageUrl}
                      alt={tool.name}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                  )}
                  <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-sm font-medium text-gray-600">
                    #{index + 1} Trending
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{tool.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tool.category}
                    </span>
                    <span className="text-gray-500 text-sm">{tool.pricing}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
