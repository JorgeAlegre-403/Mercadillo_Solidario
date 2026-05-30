import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Button } from '../components/ui/Button'
import { Card, CardTitle, CardContent } from '../components/ui/Card'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: authError } = isSignUp
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password })

      if (authError) throw authError
      
      if (isSignUp) {
        setError('¡Registro exitoso! Revisa tu email para confirmar.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--cream)',
      padding: '1.5rem',
    }}>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{
          fontSize: '1.75rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          color: 'var(--slate)',
          marginBottom: '1rem',
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}>
          {isSignUp ? 'Crear Cuenta' : 'Bienvenido'}
        </h1>
        <p style={{
          textAlign: 'center',
          color: 'var(--slate-light)',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
        }}>
          {isSignUp 
            ? 'Regístrate para crear tu cuenta'
            : 'Inicia sesión en tu cuenta'}
        </p>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--slate)',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-body)',
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2.5px solid var(--slate)',
                borderRadius: 'var(--radius)',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                backgroundColor: 'var(--warm-white)',
                color: 'var(--slate)',
                boxShadow: '2px 2px 0px var(--slate)',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '3px 3px 0px var(--amber)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '2px 2px 0px var(--slate)';
              }}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--slate)',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-body)',
            }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2.5px solid var(--slate)',
                borderRadius: 'var(--radius)',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                backgroundColor: 'var(--warm-white)',
                color: 'var(--slate)',
                boxShadow: '2px 2px 0px var(--slate)',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '3px 3px 0px var(--amber)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '2px 2px 0px var(--slate)';
              }}
              required
            />
          </div>

          {error && (
            <div style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius)',
              fontSize: '0.9rem',
              border: '2.5px solid',
              fontWeight: 500,
              backgroundColor: error.includes('exitoso') 
                ? 'var(--sage-light)' 
                : 'var(--terracotta-light)',
              borderColor: error.includes('exitoso')
                ? 'var(--sage)'
                : 'var(--terracotta)',
              color: error.includes('exitoso')
                ? 'var(--sage)'
                : 'var(--terracotta)',
            }}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {loading ? 'Cargando...' : (isSignUp ? 'Registrarse' : 'Iniciar Sesión')}
          </Button>

          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            style={{
              width: '100%',
              padding: '10px 12px',
              color: 'var(--amber)',
              fontWeight: 600,
              fontSize: '0.95rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s ease',
              textDecoration: 'underline',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--amber-dark)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--amber)'}
          >
            {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </form>
      </Card>
    </div>
  )
}
