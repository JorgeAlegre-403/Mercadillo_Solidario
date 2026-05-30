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
  return (
    <div style={{
      width: '100%',
      height: '200px',
      overflow: 'hidden',
      borderRadius: '4px',
      border: '2px solid var(--slate)',
      background: 'var(--cream)',
    }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
        }}
        onError={e => {
          e.target.style.display = 'none'
          e.target.parentElement.style.display = 'flex'
          e.target.parentElement.style.alignItems = 'center'
          e.target.parentElement.style.justifyContent = 'center'
          e.target.parentElement.innerHTML = '<span style="font-size:2.5rem">[ Imagen ]</span>'
        }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      />
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