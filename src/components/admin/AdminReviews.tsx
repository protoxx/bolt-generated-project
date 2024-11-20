import { mockTools } from '../../data/mockData'

export default function AdminReviews() {
  const allReviews = mockTools.flatMap(tool => 
    (tool.reviews || []).map(review => ({
      ...review,
      toolName: tool.name
    }))
  )

  const handleDelete = (reviewId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete review:', reviewId)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Reviews</h2>
      
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tool</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Rating</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Comment</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allReviews.map((review) => (
              <tr key={review.id} className="border-b">
                <td className="px-6 py-4 whitespace-nowrap">{review.toolName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{review.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${
                          star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate">{review.comment}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-red-600 hover:text-red-800"
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
