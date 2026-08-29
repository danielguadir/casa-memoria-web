# Guía de Despliegue: GitHub y Vercel (Casa de la Memoria - Archivo General)

Esta guía detalla los pasos para subir el proyecto a **GitHub** y desplegarlo en **Vercel** de manera rápida, escalable y mantenible.

---

## 1. Subir cambios a GitHub

### Paso 1: Inicializar / Verificar repositorio Git
Asegúrate de estar en la carpeta principal del proyecto web `casa-memoria-web`:
```bash
cd casa-memoria-web
git status
```

### Paso 2: Crear el commit con las mejoras del Design System y Panel Admin
```bash
git add .
git commit -m "feat: implementar Design System modular, Login modal con clave 123 y Panel Admin tipo Archivo General"
```

### Paso 3: Conectar tu repositorio remoto de GitHub (si aún no lo has vinculado)
Crea un nuevo repositorio en [GitHub.com](https://github.com/new) llamado `casa-memoria-web` y ejecuta:
```bash
git remote add origin https://github.com/TU-USUARIO/casa-memoria-web.git
git branch -M main
git push -u origin main
```

---

## 2. Despliegue Automático en Vercel

### Opción A: Despliegue mediante la plataforma web de Vercel (Recomendado)
1. Inicia sesión en [Vercel.com](https://vercel.com).
2. Haz clic en **"Add New..."** -> **"Project"**.
3. Selecciona tu repositorio `casa-memoria-web` de GitHub.
4. En la configuración de Build Settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (o `casa-memoria-web`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Haz clic en **"Deploy"**. En 1 o 2 minutos tu plataforma estará en vivo con HTTPS gratuito.

---

### Opción B: Despliegue rápido por consola (Vercel CLI)
Si prefieres desplegar directamente desde la terminal de comandos:
```bash
npx vercel
```
Sigue las instrucciones en pantalla y selecciona las opciones por defecto para publicar inmediatamente a entorno de producción:
```bash
npx vercel --prod
```

---

## 3. Credenciales Demo para Pruebas

- **Correo**: `admin@casamemoria.gov.co` (o cualquier correo válido)
- **Contraseña**: `123`
