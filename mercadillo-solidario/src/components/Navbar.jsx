import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
  const { user } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🛍️ Mercadillo Solidario
        </Link>

        <div className="flex gap-4 items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Catálogo
          </Link>

          {user ? (
            <>
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                Panel Admin
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
