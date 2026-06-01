import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
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
    <>
      <Helmet>
        <title>Catálogo - Mercadillo Solidario</title>
        <meta name="description" content="Explora nuestro catálogo de productos usados. Compra artículos de segunda mano y contribuye a causas solidarias." />
        <meta name="keywords" content="catálogo, productos usados, compra online, solidario" />
        <meta property="og:title" content="Catálogo - Mercadillo Solidario" />
        <meta property="og:description" content="Explora nuestro catálogo completo de productos de segunda mano con propósito solidario" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
      </Helmet>
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--cream)',
      padding: '3rem 1.5rem',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
      }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            color: 'var(--slate)',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
          }}>
            Mercadillo Solidario
          </h1>
          <p style={{
            color: 'var(--slate-light)',
            fontSize: '1.1rem',
          }}>
            Productos de segunda mano con fines benéficos
          </p>
        </div>

        
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2.5px solid var(--slate)',
              borderRadius: 'var(--radius)',
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              backgroundColor: 'var(--warm-white)',
              color: 'var(--slate)',
              transition: 'all 0.2s ease',
              boxShadow: '2px 2px 0px var(--slate)',
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '4px 4px 0px var(--slate)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '2px 2px 0px var(--slate)';
              e.target.style.transform = 'translateY(0)';
            }}
          />
        </div>

        
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
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

        
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            fontSize: '1.1rem',
            color: 'var(--slate-light)',
          }}>
            Cargando productos...
          </div>
        ) : filtrados.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            backgroundColor: 'var(--warm-white)',
            borderRadius: 'var(--radius)',
            border: '2.5px dashed var(--slate)',
            color: 'var(--slate-light)',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>No hay productos disponibles en esta categoría</div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {filtrados.map(producto => (
              <Card key={producto.id}>
                <CardImage src={producto.imagen_url} alt={producto.nombre} />
                <div style={{ marginTop: '1rem' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--slate)',
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-display)',
                  }}>
                    {producto.nombre}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--slate-light)',
                    marginBottom: '0.75rem',
                    lineHeight: 1.5,
                  }}>
                    {producto.descripcion?.substring(0, 80)}...
                  </p>
                  <p style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: 'var(--amber)',
                    marginBottom: '1rem',
                  }}>
                    {producto.precio.toFixed(2)}€
                  </p>
                  <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none' }}>
                    <Button style={{ width: '100%', border: '2px solid black', borderRadius: 'var(--radius)' }} >
                      Ver Detalle
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  )
}
