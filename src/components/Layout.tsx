import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-blue-600">
                AI Tools Hub
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-white border-t mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          © 2023 AI Tools Hub. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
