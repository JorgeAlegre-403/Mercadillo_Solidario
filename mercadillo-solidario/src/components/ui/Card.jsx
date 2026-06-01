import { useState } from 'react'

export const Card = ({ children, className = '', style = {} }) => {
  return (
    <div
      className={className}
      style={{
        background: 'var(--warm-white)',
        border: 'var(--border-heavy)',
        borderRadius: 'var(--radius)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-offset)',
        transition: 'all 0.2s ease',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export const CardImage = ({ src, alt = 'Imagen' }) => {
  const [imageError, setImageError] = useState(false)

  return (
    <div style={{
      width: '100%',
      height: '200px',
      overflow: 'hidden',
      borderRadius: '4px',
      border: '2px solid var(--slate)',
      background: imageError ? 'linear-gradient(135deg, #E8A020 0%, #F5F0E8 100%)' : 'var(--cream)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          onError={() => setImageError(true)}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
      ) : (
        <div style={{
          textAlign: 'center',
          color: 'var(--slate)',
          fontSize: '3rem',
        }}>
          📦
        </div>
      )}
    </div>
  )
}

export const CardHeader = ({ children }) => (
  <div style={{ marginBottom: '1rem' }}>{children}</div>
)

export const CardTitle = ({ children, style = {} }) => (
  <h3 style={{
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '1.2rem',
    color: 'var(--slate)',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    ...style,
  }}>
    {children}
  </h3>
)

export const CardContent = ({ children }) => (
  <div style={{ color: 'var(--slate-mid)' }}>{children}</div>
)