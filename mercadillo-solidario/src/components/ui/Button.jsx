export const Button = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  type = 'button',
  size = 'md',
  ...props
}) => {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    borderRadius: 'var(--radius)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s ease',
    border: '2.5px solid var(--slate)',
    outline: 'none',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  }

  const sizes = {
    sm: { padding: '4px 12px', fontSize: '0.8rem' },
    md: { padding: '8px 18px', fontSize: '0.9rem' },
    lg: { padding: '12px 28px', fontSize: '1rem' },
  }

  const variants = {
    primary: {
      background: disabled ? '#ccc' : 'var(--amber)',
      color: 'var(--slate)',
      boxShadow: disabled ? 'none' : 'var(--shadow-offset)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--slate)',
      border: '2.5px solid var(--slate)',
      boxShadow: 'none',
    },
    danger: {
      background: disabled ? '#ccc' : 'var(--terracotta)',
      color: 'white',
      borderColor: disabled ? '#aaa' : 'var(--terracotta)',
      boxShadow: disabled ? 'none' : '3px 3px 0px #8B2A1A',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--slate)',
      border: '2px solid transparent',
      boxShadow: 'none',
    },
    outline: {
      background: 'var(--cream)',
      color: 'var(--slate)',
      border: '2.5px solid var(--slate)',
      boxShadow: 'none',
    },
  }

  const handleMouseEnter = (e) => {
    if (disabled) return
    if (variant === 'primary') {
      e.currentTarget.style.transform = 'translate(-2px, -2px)'
      e.currentTarget.style.boxShadow = '6px 6px 0px var(--slate)'
    } else if (variant === 'secondary' || variant === 'outline') {
      e.currentTarget.style.background = 'var(--amber-light)'
      e.currentTarget.style.boxShadow = 'var(--shadow-offset-sm)'
    } else if (variant === 'danger') {
      e.currentTarget.style.transform = 'translate(-2px, -2px)'
      e.currentTarget.style.boxShadow = '6px 6px 0px #8B2A1A'
    } else if (variant === 'ghost') {
      e.currentTarget.style.background = 'var(--amber-light)'
    }
  }

  const handleMouseLeave = (e) => {
    if (disabled) return
    e.currentTarget.style.transform = ''
    if (variant === 'primary') {
      e.currentTarget.style.boxShadow = 'var(--shadow-offset)'
    } else if (variant === 'secondary' || variant === 'outline') {
      e.currentTarget.style.background = variants[variant].background
      e.currentTarget.style.boxShadow = 'none'
    } else if (variant === 'danger') {
      e.currentTarget.style.boxShadow = '3px 3px 0px #8B2A1A'
    } else if (variant === 'ghost') {
      e.currentTarget.style.background = 'transparent'
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ ...base, ...sizes[size], ...variants[variant] }}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}