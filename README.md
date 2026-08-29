# 🏰 Casa Memoria Web

Aplicación web profesional, mantenible y escalable construida con **Next.js 14 (App Router)**, **React**, **TypeScript**, y **Tailwind CSS**. Diseñada con arquitectura modular y preparada para despliegue automatizado en **Vercel**.

---

## 🚀 Tecnologías y Arquitectura

- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS & Glassmorphism
- **Despliegue recomendando:** Vercel
- **Repositorio:** [https://github.com/danielguadir/casa-memoria-web.git](https://github.com/danielguadir/casa-memoria-web.git)

---

## 🛠️ Instalación y Desarrollo Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/danielguadir/casa-memoria-web.git
   cd casa-memoria-web
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Copia el archivo `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔒 Seguridad y Buenas Prácticas

- **Cabeceras de Seguridad:** Configuradas en `next.config.mjs` (`Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`).
- **Protección de Credenciales:** Los archivos `.env*` y secretos están excluidos de Git en `.gitignore`.
- **Modo Estricto:** React Strict Mode habilitado.

---

## 🌐 Despliegue en Vercel

1. Importa este repositorio desde tu panel de [Vercel](https://vercel.com).
2. Vercel detectará la configuración automáticamente como proyecto Next.js.
3. En la sección **Environment Variables** de Vercel, agrega las variables necesarias basándote en `.env.example`.
4. Cada `git push` a la rama `main` desplegará la versión a producción.

---

## 📂 Estructura del Proyecto

```
casa-memoria-web/
├── src/
│   ├── app/           # Rutas, Layouts y CSS global (App Router)
│   ├── components/    # Componentes reutilizables y modulares
│   └── assets/        # Recursos estáticos
├── public/            # Archivos públicos estáticos
├── .env.example       # Plantilla de variables de entorno
├── next.config.mjs    # Configuración de Next.js y Headers de seguridad
├── tailwind.config.ts # Tokens y configuración del sistema de diseño
└── package.json
```
