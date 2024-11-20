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
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-md fixed">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
          </div>
          <nav className="mt-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'tools', label: 'Manage Tools' },
              { id: 'reviews', label: 'Manage Reviews' },
              { id: 'users', label: 'Manage Users' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full text-left px-4 py-2 ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
