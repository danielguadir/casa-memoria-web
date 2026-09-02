# Informe Detallado de Seguridad - Casa de la Memoria Cumbal

Este documento proporciona una auditoría técnica y un desglose exhaustivo de la capa de seguridad implementada en la plataforma web **Casa de la Memoria Cumbal**. La arquitectura ha sido diseñada siguiendo estándares de la industria, garantizando confidencialidad, integridad y disponibilidad de la información patrimonial e indígena del sur de Colombia.

---

## 1. Autenticación y Control de Acceso

### 1.1 Hashing de Contraseñas (Bcrypt)
- **Algoritmo**: Utiliza `bcryptjs` con salado automático (*Salt Rounds*) para la encriptación unidireccional de contraseñas.
- **Protección**: Previene ataques de fuerza bruta, diccionarios y tablas arcoíris (*rainbow tables*). Las contraseñas en texto plano nunca se almacenan en la base de datos ni se registran en los logs del servidor.

### 1.2 Tokens de Sesión (JWT - JSON Web Tokens)
- **Firma Digital**: Firma mediante una clave secreta (`JWT_SECRET`) configurada en el entorno seguro del servidor.
- **Expiración de Tokens**: Los tokens cuentan con tiempo de vida limitado para minimizar la ventana de vulnerabilidad ante posible interceptación.
- **Verificación en Servidor**: El middleware de autenticación (`AuthContext.tsx`) valida la firma y vigencia de la sesión antes de procesar cualquier solicitud a rutas protegidas (`/admin`, endpoints de gestión del archivo).

### 1.3 Integración con Autenticación Delegada (Google OAuth 2.0)
- **Autenticación Delegada**: Permite a los archivistas e historiadores iniciar sesión mediante sus cuentas institucionales sin exponer credenciales.
- **Validación del Lado del Servidor**: Sanitización y validación estricta de datos provistos por proveedores de identidad antes de conceder privilegios administrativos.

---

## 2. Protección de Datos e Inyecciones

### 2.1 Validación Estricta de Datos (Zod & TypeScript)
- **Schemas de Validación**: Cada entrada de formulario (*Consulta Pública, Inicio de Sesión, Registro de Archivos*) se valida mediante esquemas estrictos construidos en TypeScript y Zod.
- **Prevención de Inyección**: Impide la inyección de SQL / NoSQL y código malicioso rechazando payloads no estructurados o con propiedades inesperadas.

### 2.2 Prevención de XSS (Cross-Site Scripting)
- **Escapado Automático en React**: El renderizado a través de React / Next.js 14 escapa de forma nativa todo el contenido HTML, evitando la ejecución involuntaria de scripts inyectados en la interfaz del usuario.
- **Sanitización de Consultas**: Módulo de seguridad dedicado (`src/lib/security.ts`) que limpia de forma proactiva términos de búsqueda e inyecciones de código.

### 2.3 Aislamiento de Variables de Entorno
- **Secretos del Servidor**: Las claves de API, tokens privados y cadenas de conexión a base de datos están confinadas en `.env.local` y son inaccesibles desde el paquete JavaScript del cliente (*Client Bundle*).

---

## 3. Seguridad en la Capa de Red y Servidor (Next.js 14)

### 3.1 Encabezados de Seguridad HTTP Estrictos (`next.config.mjs`)
- **Content-Security-Policy (CSP)**: Define fuentes permitidas de scripts, fuentes e imágenes, bloqueando código no autorizado.
- **X-Frame-Options (`DENY`)**: Previene ataques de Clickjacking impidiendo que la plataforma sea embebida en iFrames maliciosos.
- **X-Content-Type-Options (`nosniff`)**: Bloquea la suplantación de tipos MIME (*MIME Sniffing*).
- **Strict-Transport-Security (HSTS)**: Forzado de HTTPS en todos los subdominios (`max-age=63072000; includeSubDomains; preload`).
- **Permissions-Policy**: Desactiva el acceso no autorizado a sensores de cámara, micrófono y geolocalización.

### 3.2 Protección Anti-Bots y Scrapers (`src/app/robots.ts`)
- **Filtro de Agentes Maliciosos**: Configuración dinámica de `robots.txt` que bloquea explícitamente rastreadores agresivos y bots de scraping masivo (`GPTBot`, `CCBot`, `MJ12bot`, `AhrefsBot`, `SemrushBot`, `Baiduspider`) preservando la infraestructura y protegiendo el catálogo patrimonial.

### 3.3 Manejo Seguro de Errores
- **Sanitización de Respuestas**: Las excepciones en los controladores devuelven mensajes genéricos estructurados en lugar de *stack traces* o detalles de infraestructura, evitando la fuga de información sensible (*Information Disclosure*).

### 3.4 Degradación Graciosa / Fail-safe Memory Store
- **Resiliencia ante Caídas**: Si la base de datos principal no se encuentra disponible, el sistema conmuta a un almacén de memoria controlado, garantizando que la aplicación continúe respondiendo de manera segura sin exponer estados inconsistentes.

---

## 4. Matriz de Controles de Seguridad

| Dimensión | Mecanismo Implementado | Beneficio Principal |
| :--- | :--- | :--- |
| **Contraseñas** | Bcrypt Hashing + Salt | Protección contra robo de credenciales en base de datos |
| **Sesiones** | JWT (JSON Web Tokens) | Sesiones sin estado (*stateless*) verificadas criptográficamente |
| **Entradas de Usuario** | Zod Schemas + TypeScript + `security.ts` | Blindaje contra inyecciones y datos malformados |
| **Protección XSS** | JSX Auto-escaping + Sanitizador de Consultas | Previene ejecución de código malicioso en navegadores |
| **Secretos** | Environment Variable Isolation (`.env.local`) | Evita la exposición de API Keys en el cliente |
| **Conexiones** | HTTPS / TLS + HSTS | Cifrado en tránsito para todos los datos transmitidos |
| **Protección Anti-Bot** | Robots Manifest Dinámico (`robots.ts`) | Bloqueo de scrapers maliciosos y rastreadores agresivos |
| **Clickjacking** | HTTP Header `X-Frame-Options: DENY` | Impide que el sitio sea incrustado de forma malintencionada |

---

## 5. Recomendaciones de Seguridad para el Dominio Propio Futuro

1. **Configuración de Dominio Personalizado con SSL/TLS (HTTPS)**:
   - Al vincular el dominio institucional definitivo (ej: `casamemoria.gov.co`), asegurar la emisión de un certificado SSL/TLS con renovación automática (Wildcard Let's Encrypt / Vercel Managed SSL).
2. **Limitación de Tasa (Rate Limiting)**:
   - Implementar políticas de restricción de peticiones por IP en endpoints públicos de login y consulta para mitigar posibles ataques de denegación de servicio (DDoS) o spam.
3. **Capa CDN y Protección DDoS (Cloudflare / Vercel WAF)**:
   - Activar protección WAF en la capa de red DNS para bloquear automáticamente tráfico malicioso antes de tocar los servidores principales.
4. **Rotación de JWT Secret**:
   - Asegurar que la variable `JWT_SECRET` en el servidor de producción utilice una cadena criptográfica aleatoria de al menos 64 caracteres.

---
*Informe generado profesionalmente para Casa de la Memoria Cumbal.*
