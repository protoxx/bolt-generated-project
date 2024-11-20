import { motion } from 'framer-motion'
import { Tool, Review } from '../../types'

interface ReviewsComparisonProps {
  tools: Tool[]
}

export default function ReviewsComparison({ tools }: ReviewsComparisonProps) {
  const getAverageRating = (reviews: Review[] = []) => {
    if (reviews.length === 0) return 0
    return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  }

  const getSentimentClass = (rating: number) => {
    if (rating >= 4) return 'text-green-600'
    if (rating >= 3) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getReviewDistribution = (reviews: Review[] = []) => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++
    })
    return distribution
  }

  const getHighlightReviews = (reviews: Review[] = []) => {
    const sorted = [...reviews].sort((a, b) => b.rating - a.rating)
    return sorted.slice(0, 3)
  }

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">{tool.name}</h3>
              <div className="text-4xl font-bold mb-2">
                {getAverageRating(tool.reviews).toFixed(1)}
              </div>
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= getAverageRating(tool.reviews)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                Based on {tool.reviews?.length || 0} reviews
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="mt-6 space-y-2">
              {Object.entries(getReviewDistribution(tool.reviews))
                .reverse()
                .map(([rating, count]) => {
                  const percentage = tool.reviews?.length
                    ? (count / tool.reviews.length) * 100
                    : 0
                  return (
                    <div key={rating} className="flex items-center">
                      <div className="w-12 text-sm text-gray-600">
                        {rating} ★
                      </div>
                      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded">
                        <motion.div
                          className="h-2 bg-blue-600 rounded"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                      <div className="w-12 text-sm text-gray-600 text-right">
                        {percentage.toFixed(0)}%
                      </div>
                    </div>
                  )
                })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Review Highlights */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-medium text-gray-900">Review Highlights</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.id} className="space-y-4">
                <h4 className="font-medium text-gray-900">{tool.name}</h4>
                {getHighlightReviews(tool.reviews).map((review) => (
                  <div
                    key={review.id}
                    className="bg-gray-50 rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                    <div className="text-sm text-gray-500">
                      - {review.user.name}
                    </div>
                  </div>
                ))}
                {(!tool.reviews || tool.reviews.length === 0) && (
                  <div className="text-center py-4 text-gray-500">
                    No reviews yet
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-medium text-gray-900">Review Sentiment Analysis</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const reviews = tool.reviews || []
              const positiveReviews = reviews.filter((r) => r.rating >= 4).length
              const neutralReviews = reviews.filter((r) => r.rating === 3).length
              const negativeReviews = reviews.filter((r) => r.rating <= 2).length
              const total = reviews.length || 1

              return (
                <div key={tool.id} className="space-y-4">
                  <h4 className="font-medium text-gray-900">{tool.name}</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-600">Positive</span>
                        <span>{((positiveReviews / total) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded">
                        <motion.div
                          className="h-2 bg-green-500 rounded"
                          initial={{ width: 0 }}
                          animate={{ width: `${(positiveReviews / total) * 100}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-yellow-600">Neutral</span>
                        <span>{((neutralReviews / total) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded">
                        <motion.div
                          className="h-2 bg-yellow-500 rounded"
                          initial={{ width: 0 }}
                          animate={{ width: `${(neutralReviews / total) * 100}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-600">Negative</span>
                        <span>{((negativeReviews / total) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded">
                        <motion.div
                          className="h-2 bg-red-500 rounded"
                          initial={{ width: 0 }}
                          animate={{ width: `${(negativeReviews / total) * 100}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
