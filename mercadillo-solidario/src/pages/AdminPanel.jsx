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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
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
            {showForm ? 'Cancelar' : '+ Nuevo Producto'}
          </Button>
        </div>

        {/* Formulario */}
        {showForm && (
          <Card className="mb-8">
            <CardTitle>
              {editingId ? 'Editar Producto' : 'Nuevo Producto'}
            </CardTitle>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Categoría</label>
                    <select
                      value={formData.categoria}
                      onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                      <option>Libros</option>
                      <option>Ropa</option>
                      <option>Tecnología</option>
                      <option>Otros</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Descripción</label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    rows="3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Precio</label>
                    <input
                      type="number"
                      value={formData.precio}
                      onChange={(e) => setFormData({...formData, precio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Estado</label>
                    <select
                      value={formData.estado}
                      onChange={(e) => setFormData({...formData, estado: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                      <option>Disponible</option>
                      <option>Reservado</option>
                      <option>Vendido</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">URL Imagen</label>
                  <input
                    type="url"
                    value={formData.imagen_url}
                    onChange={(e) => setFormData({...formData, imagen_url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Guardando...' : 'Guardar Producto'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Lista de productos */}
        {loading && !showForm ? (
          <div className="text-center py-8">Cargando...</div>
        ) : (
          <div className="space-y-4">
            {productos.map(producto => (
              <Card key={producto.id}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{producto.nombre}</h3>
                    <p className="text-gray-600">{producto.descripcion}</p>
                    <p className="text-sm text-gray-500">
                      Categoría: {producto.categoria} | Precio: ${producto.precio} | Estado: {producto.estado}
                    </p>
                  </div>
                  <div className="flex gap-2">
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
