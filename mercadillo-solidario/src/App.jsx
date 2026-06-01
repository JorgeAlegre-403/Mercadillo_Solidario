import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Login } from './pages/Login'
import { Catalog } from './pages/Catalog'
import { ProductDetail } from './pages/ProductDetail'
import { AdminPanel } from './pages/AdminPanel'
import { Navbar } from './components/Navbar'
import './index.css'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AppContent() {
  const location = window.location.pathname
  const showNavbar = !location.includes('/login')

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Catalog />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
