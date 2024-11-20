import { useState } from 'react'
import AdminToolList from '../../components/admin/AdminToolList'
import AdminReviews from '../../components/admin/AdminReviews'
import AdminStats from '../../components/admin/AdminStats'
import AdminUsers from '../../components/admin/AdminUsers'

type TabType = 'overview' | 'tools' | 'reviews' | 'users'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminStats />
      case 'tools':
        return <AdminToolList />
      case 'reviews':
        return <AdminReviews />
      case 'users':
        return <AdminUsers />
      default:
        return <AdminStats />
    }
  }

  return (
    <div>
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'tools', name: 'Tools' },
            { id: 'reviews', name: 'Reviews' },
            { id: 'users', name: 'Users' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {renderContent()}
    </div>
  )
}