## 🚀 INSTRUCCIONES - Configurar Supabase

### 1. OBTENER TUS KEYS DE SUPABASE

1. Accede a tu proyecto en [Supabase](https://supabase.com)
2. Ve a **Settings → API**
3. Copia estos dos valores:
   - **URL del Proyecto** (VITE_SUPABASE_URL)
   - **Anon Public Key** (VITE_SUPABASE_ANON_KEY)

### 2. AGREGAR LAS KEYS AL ARCHIVO .env.local

Edita el archivo `.env.local` en la raíz del proyecto y reemplaza con tus valores:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 3. CREAR LAS TABLAS EN SUPABASE

Ve a **SQL Editor** en tu proyecto de Supabase y ejecuta este script:

```sql
-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  imagen_url TEXT,
  estado VARCHAR(20) DEFAULT 'Disponible',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de reservas/contactos
CREATE TABLE IF NOT EXISTS reservas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
  nombre_usuario VARCHAR(255) NOT NULL,
  email_usuario VARCHAR(255) NOT NULL,
  mensaje TEXT,
  estado VARCHAR(20) DEFAULT 'Pendiente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;

-- Políticas públicas para lectura
CREATE POLICY "Allow public read on productos" ON productos 
FOR SELECT USING (true);

CREATE POLICY "Allow anyone to read reservas" ON reservas 
FOR SELECT USING (true);

CREATE POLICY "Allow anyone to insert reservas" ON reservas 
FOR INSERT WITH CHECK (true);

-- Políticas para autenticación (admin)
CREATE POLICY "Allow authenticated users to manage productos" ON productos 
FOR ALL USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage reservas" ON reservas 
FOR UPDATE USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');
```

### 4. HABILITAR AUTENTICACIÓN

1. Ve a **Authentication → Providers**
2. Habilita **Email** provider
3. En **Email Templates**, verifica que estén configuradas

### 5. CONFIGURAR STORAGE (Opcional - Para subir imágenes)

1. Ve a **Storage → New bucket**
2. Crea un bucket llamado `productos`
3. Marca como **Public**

### 6. INICIAR EL PROYECTO

```bash
npm run dev
```

### 7. ACCEDER A LA APP

- **Catálogo público**: http://localhost:5173/
- **Panel admin**: http://localhost:5173/admin (necesitas estar autenticado)
- **Login**: http://localhost:5173/login

---

**¿Listo?** Una vez completes estos pasos, ¡el proyecto debería estar funcionando! 🎉

Para cualquier error, verifica la consola de Supabase y los logs de la aplicación.
