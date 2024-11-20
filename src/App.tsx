import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ToolDetail from './pages/ToolDetail'
import Compare from './pages/Compare'
import Search from './pages/Search'
import AdminDashboard from './pages/admin/Dashboard'

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="tool/:id" element={<ToolDetail />} />
            <Route path="compare" element={<Compare />} />
            <Route path="search" element={<Search />} />
          </Route>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </FavoritesProvider>
    </AuthProvider>
  )
}
