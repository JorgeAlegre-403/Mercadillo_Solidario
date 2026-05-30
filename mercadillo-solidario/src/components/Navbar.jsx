import { Link, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
  const { user } = useAuth()
  const location = useLocation()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      background: 'var(--slate)',
      borderBottom: '2.5px solid var(--slate)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}>
          <span style={{
            background: 'var(--amber)',
            color: 'var(--slate)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.25rem',
            padding: '4px 10px',
            borderRadius: '4px',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>MS</span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: 'var(--cream)',
            letterSpacing: '-0.02em',
          }}>Mercadillo Solidario</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <NavLink to="/" active={isActive('/')}>Catálogo</NavLink>

          {user ? (
            <>
              <NavLink to="/admin" active={isActive('/admin')}>Admin</NavLink>
              <button
                onClick={handleLogout}
                style={{
                  background: 'var(--terracotta)',
                  color: 'white',
                  border: '2px solid transparent',
                  borderRadius: 'var(--radius)',
                  padding: '6px 16px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = '2px solid var(--cream)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = '2px solid transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" style={{
              background: 'var(--amber)',
              color: 'var(--slate)',
              textDecoration: 'none',
              borderRadius: 'var(--radius)',
              padding: '6px 16px',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all 0.15s ease',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--amber-dark)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--amber)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ to, children, active }) => (
  <Link to={to} style={{
    color: active ? 'var(--amber)' : 'rgba(245,240,232,0.7)',
    textDecoration: 'none',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '0.9rem',
    padding: '6px 12px',
    borderRadius: 'var(--radius)',
    transition: 'all 0.15s ease',
    borderBottom: active ? '2px solid var(--amber)' : '2px solid transparent',
  }}
  onMouseEnter={e => {
    if (!active) e.currentTarget.style.color = 'var(--cream)'
  }}
  onMouseLeave={e => {
    if (!active) e.currentTarget.style.color = 'rgba(245,240,232,0.7)'
  }}
  >
    {children}
  </Link>
)