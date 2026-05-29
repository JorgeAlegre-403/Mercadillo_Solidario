export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  )
}

export const CardImage = ({ src, alt = 'Imagen' }) => {
  return (
    <img 
      src={src} 
      alt={alt}
      className="w-full h-48 object-cover rounded-lg"
    />
  )
}

export const CardHeader = ({ children }) => {
  return <div className="mb-4">{children}</div>
}

export const CardTitle = ({ children }) => {
  return <h3 className="text-xl font-bold text-gray-800">{children}</h3>
}

export const CardContent = ({ children }) => {
  return <div className="text-gray-600">{children}</div>
}
