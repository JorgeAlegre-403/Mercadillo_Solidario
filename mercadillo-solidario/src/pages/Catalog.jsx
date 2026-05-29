import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { Card, CardImage, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const CATEGORIES = ['Todos', 'Libros', 'Ropa', 'Tecnología', 'Otros']

export const Catalog = () => {
  const [productos, setProductos] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('estado', 'Disponible')

      if (error) throw error
      setProductos(data || [])
      setFiltrados(data || [])
    } catch (err) {
      console.error('Error cargando productos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let resultado = productos

    if (selectedCategory !== 'Todos') {
      resultado = resultado.filter(p => p.categoria === selectedCategory)
    }

    if (searchTerm) {
      resultado = resultado.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFiltrados(resultado)
  }, [selectedCategory, searchTerm, productos])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Mercadillo Solidario
          </h1>
          <p className="text-gray-600">
            Productos de segunda mano con fines benéficos
          </p>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Filtros */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              variant={selectedCategory === cat ? 'primary' : 'secondary'}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Productos */}
        {loading ? (
          <div className="text-center py-8">Cargando...</div>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No hay productos disponibles
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtrados.map(producto => (
              <Card key={producto.id} className="hover:shadow-lg transition">
                <CardImage src={producto.imagen_url} alt={producto.nombre} />
                <div className="mt-4">
                  <CardTitle>{producto.nombre}</CardTitle>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">
                      {producto.descripcion}
                    </p>
                    <p className="text-lg font-bold text-blue-600 mb-3">
                      ${producto.precio}
                    </p>
                    <Link to={`/producto/${producto.id}`}>
                      <Button className="w-full">
                        Ver Detalle
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
