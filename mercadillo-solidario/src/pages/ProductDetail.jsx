import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../lib/supabaseClient'
import { Card, CardImage, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showReservationForm, setShowReservationForm] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    cargarProducto()
  }, [id])

  const cargarProducto = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setProducto(data)
    } catch (err) {
      console.error('Error:', err)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleReservation = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const { error } = await supabase
        .from('reservas')
        .insert([{
          producto_id: id,
          nombre_usuario: formData.nombre,
          email_usuario: formData.email,
          mensaje: formData.mensaje
        }])

      if (error) throw error
      setSuccess(true)
      setFormData({ nombre: '', email: '', mensaje: '' })
      setShowReservationForm(false)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Error:', err)
      alert('Error al enviar la reserva')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: 'var(--slate-light)',
        fontSize: '1.1rem',
      }}>
        Cargando...
      </div>
    )
  }

  if (!producto) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: 'var(--slate-light)',
        fontSize: '1.1rem',
      }}>
        Producto no encontrado
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{producto?.nombre} - Mercadillo Solidario</title>
        <meta name="description" content={`${producto?.descripcion?.substring(0, 160)}... Compra este producto en Mercadillo Solidario`} />
        <meta property="og:title" content={`${producto?.nombre} - Mercadillo Solidario`} />
        <meta property="og:description" content={producto?.descripcion?.substring(0, 160)} />
        {producto?.imagen_url && <meta property="og:image" content={producto.imagen_url} />}
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={producto?.precio} />
        <meta property="product:price:currency" content="EUR" />
      </Helmet>
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--cream)',
        padding: '2rem 1.5rem',
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          <Button onClick={() => navigate('/')} variant="secondary" style={{ marginBottom: '2rem' }}>
            ← Volver al Catálogo
          </Button>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            <Card>
              <CardImage src={producto.imagen_url} alt={producto.nombre} />
            </Card>

            <Card>
              <h1 style={{
                fontSize: '1.8rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                color: 'var(--slate)',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
              }}>
                {producto.nombre}
              </h1>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}>
                <div>
                  <label style={{
                    fontSize: '0.85rem',
                    color: 'var(--slate-light)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                    display: 'block',
                  }}>
                    Categoría
                  </label>
                  <p style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--slate)',
                  }}>
                    {producto.categoria}
                  </p>
                </div>

                <div>
                  <label style={{
                    fontSize: '0.85rem',
                    color: 'var(--slate-light)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                    display: 'block',
                  }}>
                    Descripción
                  </label>
                  <p style={{
                    color: 'var(--slate-mid)',
                    lineHeight: 1.7,
                    fontSize: '1rem',
                  }}>
                    {producto.descripcion}
                  </p>
                </div>

                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--amber-light)',
                  border: '2.5px solid var(--amber)',
                  borderRadius: 'var(--radius)',
                  boxShadow: '3px 3px 0px var(--amber-dark)',
                }}>
                  <label style={{
                    fontSize: '0.85rem',
                    color: 'var(--amber-dark)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}>
                    Precio Sugerido
                  </label>
                  <p style={{
                    fontSize: '2.2rem',
                    fontWeight: 900,
                    color: 'var(--amber-dark)',
                    fontFamily: 'var(--font-display)',
                  }}>
                    {producto.precio.toFixed(2)}€
                  </p>
                </div>

                <div>
                  <label style={{
                    fontSize: '0.85rem',
                    color: 'var(--slate-light)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                    display: 'block',
                  }}>
                    Estado
                  </label>
                  <div style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    backgroundColor: producto.estado === 'Disponible' ? 'var(--sage-light)' : 'var(--terracotta-light)',
                    color: producto.estado === 'Disponible' ? 'var(--sage)' : 'var(--terracotta)',
                    border: '2px solid',
                    borderColor: producto.estado === 'Disponible' ? 'var(--sage)' : 'var(--terracotta)',
                  }}>
                    {producto.estado === 'Disponible' ? 'Disponible' : producto.estado}
                  </div>
                </div>

                {producto.estado === 'Disponible' && (
                  <Button
                    onClick={() => setShowReservationForm(!showReservationForm)}
                    style={{ width: '100%', marginTop: '0.5rem',border: '2px solid black', borderRadius: 'var(--radius)' }}
                  >
                    {showReservationForm ? 'Cancelar Reserva' : 'Reservar Este Producto'}
                  </Button>
                )}

                {success && (
                  <div style={{
                    padding: '1rem 1.5rem',
                    backgroundColor: 'var(--sage-light)',
                    border: '2.5px solid var(--sage)',
                    borderRadius: 'var(--radius)',
                    color: 'var(--sage)',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}>
                    ¡Reserva enviada exitosamente!
                  </div>
                )}
              </div>

              {showReservationForm && producto.estado === 'Disponible' && (
                <form onSubmit={handleReservation} style={{
                  marginTop: '2rem',
                  paddingTop: '2rem',
                  borderTop: '2.5px solid var(--slate)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}>
                  <h3 style={{
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: 'var(--slate)',
                    fontFamily: 'var(--font-display)',
                    marginBottom: '0.5rem',
                  }}>
                    Formulario de Reserva
                  </h3>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--slate)',
                      marginBottom: '0.5rem',
                    }}>
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
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
                      Tu Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                      Mensaje (Opcional)
                    </label>
                    <textarea
                      value={formData.mensaje}
                      onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                      placeholder="Cuéntanos por qué estás interesado en este producto..."
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

                  <Button type="submit" disabled={submitting} style={{ width: '100%', marginTop: '0.5rem' }}>
                    {submitting ? 'Enviando...' : 'Enviar Reserva'}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
