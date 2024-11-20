import { useState, useEffect } from 'react'
import { adminActions } from '../../api/admin/actions'

export default function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    setIsLoading(true)
    const reviewsList = await adminActions.reviews.getAll()
    setReviews(reviewsList)
    setIsLoading(false)
  }

  const handleStatusChange = async (reviewId: string, status: string) => {
    const result = await adminActions.reviews.updateStatus(reviewId, status)
    if (result.success) {
      await loadReviews()
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const result = await adminActions.reviews.delete(reviewId)
      if (result.success) {
        await loadReviews()
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Reviews</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tool
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review: any) => (
              <tr key={review.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {review.tool_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {review.user_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {review.rating} / 5
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={review.status}
                    onChange={(e) => handleStatusChange(review.id, e.target.value)}
                    className="rounded-md border-gray-300 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
