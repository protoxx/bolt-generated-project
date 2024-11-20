import { motion } from 'framer-motion'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gray-900 px-6 py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-gray-900" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-blue-500 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-500 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Discover the Best AI Tools
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-300"
          >
            Find, compare, and choose the perfect AI tools for your needs.
            Our curated collection helps you make informed decisions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button size="lg">
              Explore Tools
            </Button>
            <Button variant="ghost" size="lg" className="text-white">
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
