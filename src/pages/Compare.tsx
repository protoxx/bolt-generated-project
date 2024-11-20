import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Tool } from '../types'
import { mockTools } from '../data/mockData'
import Button from '../components/ui/Button'
import ComparisonMetrics from '../components/compare/ComparisonMetrics'
import ReviewsComparison from '../components/compare/ReviewsComparison'

// ... (previous code remains the same)

export default function Compare() {
  // ... (previous code remains the same)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ... (previous code remains the same) */}

      {selectedTools.length > 0 ? (
        <div className="space-y-8">
          {/* ... (previous comparison sections) */}
          
          {/* Reviews Comparison */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">User Reviews Comparison</h2>
            <ReviewsComparison tools={selectedTools} />
          </div>

          {/* ... (rest of the code remains the same) */}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">Select tools to start comparing</p>
        </div>
      )}
    </div>
  )
}
