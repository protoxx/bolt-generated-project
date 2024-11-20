import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate()

  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth')
    if (!isAdmin) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-md fixed">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
          <nav className="mt-4">
            <a
              href="/admin/dashboard"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              Dashboard
            </a>
            <a
              href="/admin/tools"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              Manage Tools
            </a>
            <a
              href="/admin/reviews"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              Manage Reviews
            </a>
            <a
              href="/admin/users"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              Manage Users
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
