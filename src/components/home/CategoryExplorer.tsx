import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const categories = [
  {
    name: 'Language Models',
    icon: '🤖',
    description: 'Chat, write, and create with AI language models',
    count: 24
  },
  {
    name: 'Image Generation',
    icon: '🎨',
    description: 'Create and edit images with AI',
    count: 18
  },
  {
    name: 'Video Creation',
    icon: '🎥',
    description: 'Generate and edit videos using AI',
    count: 12
  },
  {
    name: 'Audio & Music',
    icon: '🎵',
    description: 'Create and process audio with AI',
    count: 15
  },
  {
    name: 'Productivity',
    icon: '⚡',
    description: 'Boost your workflow with AI tools',
    count: 30
  },
  {
    name: 'Development',
    icon: '👨‍💻',
    description: 'Code faster and better with AI',
    count: 20
  }
]

export default function CategoryExplorer() {
  const navigate = useNavigate()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900"
          >
            Explore by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-gray-600"
          >
            Find the perfect AI tool for your specific needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/tools?category=${encodeURIComponent(category.name)}`)}
              className="cursor-pointer group"
            >
              <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{category.icon}</span>
                  <span className="text-sm text-gray-500">{category.count} tools</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                  {category.name}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
