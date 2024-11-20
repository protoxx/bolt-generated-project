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
        {/* Main Content */}
        {children}
      </div>
    </div>
  )
}
