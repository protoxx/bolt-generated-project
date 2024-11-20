import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import { Tool } from '../../types'

interface FeaturedToolsProps {
  tools: Tool[]
}

export default function FeaturedTools({ tools }: FeaturedToolsProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Featured AI Tools
          </h2>
          <p className="text-lg text-gray-600">
            Discover our hand-picked selection of the most powerful AI tools
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tools.map((tool) => (
            <Card key={tool.id} className="h-full">
              <div className="aspect-w-16 aspect-h-9">
                {tool.imageUrl && (
                  <img
                    src={tool.imageUrl}
                    alt={tool.name}
                    className="w-full h-48 object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {tool.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    {tool.category}
                  </span>
                  {tool.pricing && (
                    <span className="text-sm text-gray-500">
                      {tool.pricing}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
