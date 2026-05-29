# 🚀 GUÍA DE DESPLIEGUE EN VERCEL

## OPCIÓN 1: Despliegue Automático (Recomendado)

### Paso 1: Preparar GitHub
1. Inicializa git en tu proyecto:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Crea un repositorio nuevo en GitHub
3. Push de tu código:
   ```bash
   git remote add origin https://github.com/tu-usuario/mercadillo-solidario.git
   git branch -M main
   git push -u origin main
   ```

### Paso 2: Conectar Vercel
1. Accede a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Haz clic en "New Project"
4. Selecciona tu repositorio `mercadillo-solidario`
5. Vercel detectará automáticamente que es un proyecto Vite/React

### Paso 3: Configurar Variables de Entorno
1. En Vercel, ve a **Settings → Environment Variables**
2. Agrega estas variables:
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
   ```
3. Haz clic en "Deploy"

### Paso 4: ¡Listo!
Tu app estará disponible en `https://mercadillo-solidario.vercel.app` (o tu dominio personalizado)

---

## OPCIÓN 2: Despliegue Manual con CLI

### Paso 1: Instalar CLI de Vercel
```bash
npm install -g vercel
```

### Paso 2: Login
```bash
vercel login
```

### Paso 3: Deploy
```bash
vercel --env VITE_SUPABASE_URL=tu-url --env VITE_SUPABASE_ANON_KEY=tu-key
```

---

## TIPS IMPORTANTES

### ✅ Antes de desplegar, asegúrate:
- [ ] Tu `.env.local` NO está en el commit (debe estar en `.gitignore`)
- [ ] Tienes `.env.example` con placeholders
- [ ] Las variables de entorno están configuradas en Vercel
- [ ] La BD de Supabase tiene las tablas creadas

### 🔒 Mantener seguras tus keys:
- NUNCA hagas commit de `.env.local`
- Usa siempre variables de entorno en plataformas de producción
- Rota tus keys periódicamente en Supabase

### 📊 Monitoreo después del deploy:
1. Ve a Vercel Dashboard
2. Selecciona tu proyecto
3. Revisa **Deployments** y **Analytics**
4. Monitorea errores en **Function Logs**

---

## DOMINIOS PERSONALIZADOS

Para usar tu propio dominio:
1. En Vercel: **Settings → Domains**
2. Agrega tu dominio
3. Actualiza DNS según las instrucciones de Vercel
4. Espera propagación DNS (hasta 48 horas)

---

## SOLUCIÓN DE PROBLEMAS

### Error: "Cannot find modules"
→ Verifica que todas las dependencias están en `package.json`
→ Ejecuta `npm install` localmente

### Error: "VITE_SUPABASE_URL is not defined"
→ Agrega las variables de entorno en Vercel
→ Usa `VITE_` como prefijo

### Sitio en blanco después del deploy
→ Abre DevTools y revisa la consola de errores
→ Verifica los logs en Vercel

### Base de datos no sincroniza
→ Verifica que el RLS está deshabilitado o correctamente configurado
→ Revisa las políticas de seguridad en Supabase

---

¿Necesitas ayuda? Revisa:
- [Documentación Vercel](https://vercel.com/docs)
- [Documentación Supabase](https://supabase.com/docs)
- [Documentación React](https://react.dev)
