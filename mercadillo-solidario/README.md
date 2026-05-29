# 🛍️ Mercadillo Solidario - Plataforma Web

Una aplicación web moderna para gestionar un mercadillo de productos de segunda mano con fines benéficos.

## 📋 Características

### Panel Público
- ✅ Catálogo de productos con visualización en grid
- ✅ Filtrado por categorías (Libros, Ropa, Tecnología, Otros)
- ✅ Búsqueda de productos
- ✅ Detalle ampliado de cada producto
- ✅ Sistema de reservas/contacto
- ✅ Vista responsiva (mobile-first)

### Panel de Administración
- ✅ Autenticación segura
- ✅ CRUD completo de productos
- ✅ Gestión de estados (Disponible, Reservado, Vendido)
- ✅ Control de imágenes

### Características Bonus
- ✅ Sistema de reservas con almacenamiento
- ✅ Interfaz responsive y accesible
- ✅ Autenticación con Supabase

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS
- **Backend/Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Validación**: Zod
- **QR Codes**: qrcode.react

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repo>
cd mercadillo-solidario
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

Ver [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) para obtener estas keys.

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
mercadillo-solidario/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   └── Card.jsx
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Catalog.jsx
│   │   ├── ProductDetail.jsx
│   │   └── AdminPanel.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

## 🚀 Uso

### Acceso a la aplicación

- **Catálogo público**: `/` - Acceso sin autenticación
- **Detalle de producto**: `/producto/:id` - Ver completo y hacer reserva
- **Iniciar sesión**: `/login` - Registro e inicio de sesión
- **Panel admin**: `/admin` - Requiere autenticación

### Panel de Administración

1. Accede a `/login`
2. Crea una cuenta o inicia sesión
3. Ve a `/admin`
4. Aquí puedes:
   - Crear nuevos productos
   - Editar productos existentes
   - Cambiar estado (Disponible/Reservado/Vendido)
   - Eliminar productos

### Hacer una Reserva (Público)

1. Navega al catálogo (`/`)
2. Busca o filtra productos
3. Haz clic en "Ver Detalle"
4. Completa el formulario y envía tu reserva
5. El administrador recibirá la solicitud

## 🔐 Seguridad

- Autenticación mediante Supabase Auth
- Row Level Security (RLS) en bases de datos
- Variables de entorno para credenciales sensibles
- Rutas protegidas en el frontend

## 📱 Responsividad

La aplicación está optimizada para:
- Móviles (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Ultra-wide (1400px+)

## 🌐 Despliegue

### Desplegar en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Conecta tu repositorio GitHub
3. Agrega las variables de entorno en Vercel
4. ¡Deployment automático! 🚀

### Desplegar en Netlify

1. Crea una cuenta en [Netlify](https://netlify.com)
2. Conecta tu repositorio GitHub
3. Configura:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Agrega variables de entorno
5. ¡Deploy completo!

## 🛠️ Scripts disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Preview de la build de producción
npm run lint     # Ejecuta linter (si está configurado)
```

## 💾 Base de Datos

Ver [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) para el script SQL completo.

Tablas principales:
- `productos` - Catálogo de artículos
- `reservas` - Sistema de contacto/reservas

## 📝 Notas Importantes

- Las imágenes se almacenan como URLs (puede usarse Supabase Storage)
- El sistema de autenticación usa email/contraseña
- Las reservas se almacenan en la BD para que el admin las revise
- Los estados de productos se actualizan en tiempo real

## 🤝 Contribuciones

Para reportar bugs o sugerir mejoras, abre un issue en GitHub.

## 📄 Licencia

Este proyecto es de código abierto bajo licencia MIT.

## 👨‍💻 Autor

Desarrollado para IES Albarregas - Curso DAW2 2025/26

---

**Fecha de entrega**: 2 de Junio de 2026
**Versión**: 1.0.0
