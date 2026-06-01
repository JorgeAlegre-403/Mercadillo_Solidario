import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Button } from '../components/ui/Button'
import { Card, CardTitle, CardContent } from '../components/ui/Card'

export const AdminPanel = () => {
  const [productos, setProductos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: 'Otros',
    imagen_url: '',
    estado: 'Disponible'
  })

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('productos')
        .select('*')

      if (error) throw error
      setProductos(data || [])
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      if (editingId) {
        const { error } = await supabase
          .from('productos')
          .update(formData)
          .eq('id', editingId)
        if (error) throw error
        setEditingId(null)
      } else {
        const { error } = await supabase
          .from('productos')
          .insert([formData])
        if (error) throw error
      }

      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: 'Otros',
        imagen_url: '',
        estado: 'Disponible'
      })
      setShowForm(false)
      cargarProductos()
    } catch (err) {
      console.error('Error:', err)
      alert('Error guardando producto')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (producto) => {
    setFormData(producto)
    setEditingId(producto.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return

    try {
      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id)
      if (error) throw error
      cargarProductos()
    } catch (err) {
      console.error('Error:', err)
      alert('Error eliminando producto')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--cream)',
      padding: '2rem 1.5rem',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            color: 'var(--slate)',
            letterSpacing: '-0.02em',
          }}>
            Panel de Administración
          </h1>
          <Button onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            if (showForm) {
              setFormData({
                nombre: '',
                descripcion: '',
                precio: '',
                categoria: 'Otros',
                imagen_url: '',
                estado: 'Disponible'
              })
            }
          }}>
            {showForm ? 'Cancelar' : 'Nuevo Producto'}
          </Button>
        </div>


        {showForm && (
          <Card style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: 'var(--slate)',
              marginBottom: '1.5rem',
            }}>
              {editingId ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--slate)',
                    marginBottom: '0.5rem',
                  }}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
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
                  }}>
                    Categoría
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
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
                    }}
                  >
                    <option>Libros</option>
                    <option>Ropa</option>
                    <option>Tecnología</option>
                    <option>Otros</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--slate)',
                  marginBottom: '0.5rem',
                }}>
                  Descripción
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
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
                    minHeight: '100px',
                    resize: 'vertical',
                  }}
                  rows="3"
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--slate)',
                    marginBottom: '0.5rem',
                  }}>
                    Precio
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
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
                  }}>
                    Estado
                  </label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
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
                    }}
                  >
                    <option>Disponible</option>
                    <option>Reservado</option>
                    <option>Vendido</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--slate)',
                  marginBottom: '0.5rem',
                }}>
                  URL Imagen
                </label>
                <input
                  type="url"
                  value={formData.imagen_url}
                  onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
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
                  }}
                />
              </div>

              <Button type="submit" disabled={loading} style={{ width: '100%', marginTop: '0.5rem', border: '2px solid black', borderRadius: 'var(--radius)', boxShadow: '2px 2px 0px var(--slate)' }}>
                {loading ? 'Guardando...' : 'Guardar Producto'}
              </Button>
            </form>
          </Card>
        )}


        {loading && !showForm ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            fontSize: '1.1rem',
            color: 'var(--slate-light)',
          }}>
            Cargando productos...
          </div>
        ) : productos.length === 0 ? (
          <Card>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: 'var(--slate-light)',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>No hay productos</div>
              <p>No hay productos aún. Crea uno para empezar.</p>
            </div>
          </Card>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            {productos.map(producto => (
              <Card key={producto.id}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <h3 style={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: 'var(--slate)',
                      marginBottom: '0.5rem',
                      fontFamily: 'var(--font-display)',
                    }}>
                      {producto.nombre}
                    </h3>
                    <p style={{
                      color: 'var(--slate-light)',
                      marginBottom: '0.75rem',
                      lineHeight: 1.5,
                    }}>
                      {producto.descripcion}
                    </p>
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--slate-mid)',
                      display: 'flex',
                      gap: '1.5rem',
                      flexWrap: 'wrap',
                    }}>
                      <span><strong>Categoría:</strong> {producto.categoria}</span>
                      <span><strong>Precio:</strong> {producto.precio.toFixed(2)}€</span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: producto.estado === 'Disponible' ? 'var(--sage-light)' : 'var(--terracotta-light)',
                        color: producto.estado === 'Disponible' ? 'var(--sage)' : 'var(--terracotta)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                      }}>
                        {producto.estado}
                      </span>
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end',
                  }}>
                    <Button onClick={() => handleEdit(producto)} variant="secondary">
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(producto.id)} variant="danger">
                      Eliminar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
