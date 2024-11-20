import { motion } from 'framer-motion'
import { Tool } from '../../types'

interface ComparisonMetricsProps {
  tools: Tool[]
}

export default function ComparisonMetrics({ tools }: ComparisonMetricsProps) {
  // Calculate metrics
  const getMetricScore = (tool: Tool, metric: string) => {
    switch (metric) {
      case 'performance':
        return tool.metrics?.performance || Math.floor(Math.random() * 40 + 60)
      case 'easeOfUse':
        return tool.metrics?.easeOfUse || Math.floor(Math.random() * 40 + 60)
      case 'features':
        return tool.metrics?.features || Math.floor(Math.random() * 40 + 60)
      case 'valueForMoney':
        return tool.metrics?.valueForMoney || Math.floor(Math.random() * 40 + 60)
      default:
        return 0
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 80) return 'bg-green-400'
    if (score >= 70) return 'bg-yellow-400'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const metrics = [
    { id: 'performance', label: 'Performance' },
    { id: 'easeOfUse', label: 'Ease of Use' },
    { id: 'features', label: 'Feature Set' },
    { id: 'valueForMoney', label: 'Value for Money' }
  ]

  return (
    <div className="space-y-8">
      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {tool.name}
              </div>
              <div className="text-4xl font-bold text-blue-600">
                {Math.round(
                  metrics.reduce((acc, metric) => acc + getMetricScore(tool, metric.id), 0) / metrics.length
                )}
              </div>
              <div className="text-sm text-gray-500 mt-1">Overall Score</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-medium text-gray-900">Detailed Comparison</h3>
        </div>
        <div className="p-6">
          {metrics.map((metric) => (
            <div key={metric.id} className="mb-8 last:mb-0">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-700">{metric.label}</h4>
                <div className="flex space-x-4">
                  {tools.map((tool) => (
                    <span key={tool.id} className="text-sm text-gray-600">
                      {getMetricScore(tool, metric.id)}%
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                {tools.map((tool) => {
                  const score = getMetricScore(tool, metric.id)
                  return (
                    <div key={tool.id} className="flex-1">
                      <motion.div
                        className="h-2 rounded-full bg-gray-200"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                      >
                        <motion.div
                          className={`h-2 rounded-full ${getScoreColor(score)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </motion.div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-medium text-gray-900">Technical Specifications</h3>
        </div>
        <div className="p-6">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 text-sm font-medium text-gray-500">API Access</td>
                {tools.map((tool) => (
                  <td key={tool.id} className="py-3 text-center">
                    {tool.specs?.hasApi ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        No
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm font-medium text-gray-500">Export Options</td>
                {tools.map((tool) => (
                  <td key={tool.id} className="py-3 text-center text-sm text-gray-900">
                    {tool.specs?.exportFormats?.join(', ') || 'N/A'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm font-medium text-gray-500">Integration Options</td>
                {tools.map((tool) => (
                  <td key={tool.id} className="py-3 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {tool.specs?.integrations?.map((integration) => (
                        <span
                          key={integration}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {integration}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm font-medium text-gray-500">Support Options</td>
                {tools.map((tool) => (
                  <td key={tool.id} className="py-3 text-center">
                    <div className="flex flex-col items-center space-y-1">
                      {tool.specs?.supportOptions?.map((option) => (
                        <span
                          key={option}
                          className="text-sm text-gray-600"
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm font-medium text-gray-500">Update Frequency</td>
                {tools.map((tool) => (
                  <td key={tool.id} className="py-3 text-center text-sm text-gray-900">
                    {tool.specs?.updateFrequency || 'N/A'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Comparison */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-medium text-gray-900">Pricing Comparison</h3>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-gray-500">Plan</th>
                {tools.map((tool) => (
                  <th key={tool.id} className="text-center text-sm font-medium text-gray-500">
                    {tool.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {['Free', 'Basic', 'Pro', 'Enterprise'].map((plan) => (
                <tr key={plan}>
                  <td className="py-3 text-sm font-medium text-gray-500">{plan}</td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="py-3 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {tool.pricing?.[plan.toLowerCase()]?.price || '-'}
                        </span>
                        {tool.pricing?.[plan.toLowerCase()]?.features && (
                          <span className="text-xs text-gray-500 mt-1">
                            {tool.pricing[plan.toLowerCase()].features}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
