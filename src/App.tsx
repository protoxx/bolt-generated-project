import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import Layout from './components/layout/Navbar'
import Home from './pages/Home'
import Tools from './pages/Tools'
import Compare from './pages/Compare'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ToolDetail from './pages/ToolDetail'
import Search from './pages/Search'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminLayout from './components/admin/AdminLayout'

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Routes>
          {/* Main Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tool/:id" element={<ToolDetail />} />
            <Route path="/search" element={<Search />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin">
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            } />
          </Route>
        </Routes>
      </FavoritesProvider>
    </AuthProvider>
  )
}
