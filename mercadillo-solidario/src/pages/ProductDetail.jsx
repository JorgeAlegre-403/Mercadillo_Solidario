import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { Card, CardImage, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Navbar } from '../components/Navbar'

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
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          Cargando...
        </div>
      </>
    )
  }

  if (!producto) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          Producto no encontrado
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Button onClick={() => navigate('/')} variant="secondary" className="mb-6">
            ← Volver al Catálogo
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imagen */}
            <Card>
              <CardImage src={producto.imagen_url} alt={producto.nombre} />
            </Card>

            {/* Detalles */}
            <Card>
              <CardTitle className="mb-4">{producto.nombre}</CardTitle>

              <div className="text-left space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Categoría</label>
                  <p className="text-lg font-semibold">{producto.categoria}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Descripción</label>
                  <p className="text-gray-700">{producto.descripcion}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Precio Sugerido</label>
                  <p className="text-3xl font-bold text-blue-600">${producto.precio}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Estado</label>
                  <p className={`text-lg font-semibold ${
                    producto.estado === 'Disponible' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {producto.estado}
                  </p>
                </div>

                {producto.estado === 'Disponible' && (
                  <Button
                    onClick={() => setShowReservationForm(!showReservationForm)}
                    className="w-full"
                  >
                    {showReservationForm ? 'Cancelar' : 'Reservar'}
                  </Button>
                )}

                {success && (
                  <div className="p-4 bg-green-100 text-green-800 rounded">
                    ¡Reserva enviada exitosamente!
                  </div>
                )}
              </div>

              {/* Formulario de Reserva */}
              {showReservationForm && producto.estado === 'Disponible' && (
                <form onSubmit={handleReservation} className="mt-6 pt-6 border-t space-y-4">
                  <h3 className="font-bold text-lg">Formulario de Reserva</h3>

                  <div>
                    <label className="block text-sm font-medium mb-1">Tu Nombre</label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Tu Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Mensaje (Opcional)</label>
                    <textarea
                      value={formData.mensaje}
                      onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      rows="3"
                      placeholder="Cuéntanos por qué estás interesado..."
                    />
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full">
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
