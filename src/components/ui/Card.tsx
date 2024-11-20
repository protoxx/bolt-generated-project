import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export default function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -5 } : undefined}
      className={twMerge(
        'bg-white rounded-xl shadow-sm overflow-hidden',
        hover && 'transition-shadow hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
