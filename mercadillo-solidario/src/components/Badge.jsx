const badgeStyles = {
  Disponible: {
    background: 'var(--sage-light)',
    color: 'var(--sage)',
    border: '2px solid var(--sage)',
  },
  Reservado: {
    background: 'var(--amber-light)',
    color: '#A05A00',
    border: '2px solid var(--amber-dark)',
  },
  Vendido: {
    background: 'var(--terracotta-light)',
    color: 'var(--terracotta)',
    border: '2px solid var(--terracotta)',
  },
}

export const Badge = ({ children, variant }) => {
  const style = badgeStyles[variant] || {
    background: 'var(--cream)',
    color: 'var(--slate-mid)',
    border: '2px solid var(--slate-light)',
  }
  return (
    <span style={{
      ...style,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: '0.72rem',
      padding: '2px 8px',
      borderRadius: '20px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      display: 'inline-block',
    }}>
      {children}
    </span>
  )
}