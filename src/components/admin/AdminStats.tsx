import { mockTools } from '../../data/mockData'

export default function AdminStats() {
  const totalTools = mockTools.length
  const totalReviews = mockTools.reduce((acc, tool) => acc + (tool.reviews?.length || 0), 0)
  const averageRating = mockTools.reduce((acc, tool) => {
    const toolRatings = tool.reviews?.map(r => r.rating) || []
    return acc + (toolRatings.reduce((sum, r) => sum + r, 0) / (toolRatings.length || 1))
  }, 0) / totalTools

  const stats = [
    { label: 'Total Tools', value: totalTools },
    { label: 'Total Reviews', value: totalReviews },
    { label: 'Average Rating', value: averageRating.toFixed(1) },
    { label: 'Active Users', value: '124' },
  ]

  const recentActivity = [
    { type: 'New Tool', name: 'ChatGPT', date: '2 hours ago' },
    { type: 'New Review', name: 'Midjourney', date: '4 hours ago' },
    { type: 'New User', name: 'John Doe', date: '6 hours ago' },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {stat.label}
            </dt>
            <dd className="mt-2 text-3xl font-semibold text-gray-900">
              {stat.value}
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, idx) => (
                <li key={idx}>
                  <div className="relative pb-8">
                    {idx !== recentActivity.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <svg
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {activity.type}{' '}
                            <span className="font-medium text-gray-900">
                              {activity.name}
                            </span>
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          <time>{activity.date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Popular Categories
          </h3>
          <div className="space-y-4">
            {[
              { name: 'AI Chat', count: 12 },
              { name: 'Image Generation', count: 8 },
              { name: 'Text Analysis', count: 6 },
              { name: 'Video Creation', count: 4 },
            ].map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between"
              >
                <span className="text-gray-600">{category.name}</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-100 rounded-full mr-2">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{
                        width: `${(category.count / 12) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-500">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
