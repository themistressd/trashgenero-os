# 🖥️ TrashGènero OS

> **Digital Witchcraft meets Windows 95**

Sistema Operativo de Moda, Culto y Caos - Un sistema operativo web inmersivo construido con Next.js 16, que combina la estética retro de Windows 95 con efectos visuales glitcheados y un sistema de gamificación completo.

![Version](https://img.shields.io/badge/version-0.1.0-pink)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/license-Custom-purple)

---

## ✨ Características

### 🎨 Visual & Estética
- **Toxic Palette**: Colores vibrantes (Void Black, System Gray, Bubblegum Pink, Hacker Green, Glitch Blue)
- **Efectos CRT**: Curvatura de monitor CRT, scanlines animadas, y efectos de parpadeo
- **Glitch Effects**: Distorsión RGB, chromatic aberration, y glitches aleatorios
- **Windows 95 UI**: Ventanas, botones, y taskbar estilo Win95 con biselado auténtico
- **Responsive Design**: Desktop (Trash OS) y móvil (Trash-Mate con estética GameBoy/Sidekick)

### 🚀 Boot Sequence
- **BIOS Screen**: Simulación de POST con detección de hardware
- **Glitch Logo**: Logo animado con efectos de glitch y chromatic aberration
- **Auto-Login**: Secuencia de autenticación automática
- **Skip Boot**: Opción de saltar la secuencia en visitas posteriores (localStorage)

### 🏗️ Arquitectura
- **Next.js 16 App Router**: Estructura moderna con rutas agrupadas
- **TypeScript**: Tipado completo en todo el proyecto
- **Zustand**: Gestión de estado global (ventanas, carrito, boot, notificaciones)
- **SWR**: Data fetching con caché y revalidación automática
- **Framer Motion**: Animaciones fluidas y declarativas
- **Tailwind CSS**: Estilos utilitarios con configuración custom

### 🎮 Gamificación
- **Triple Currency**: Pesetrash (🪙), Estampitas (🃏), Reliquias (💎)
- **Sistema de Rangos**: Progresión basada en GamiPress
- **Achievements**: Sistema de logros y recompensas
- **Points History**: Historial completo de transacciones

### 🛍️ E-Commerce
- **WooCommerce Integration**: Integración completa con WooCommerce REST API
- **Shopping Cart**: Carrito persistente con Zustand
- **Product Catalog**: Catálogo de productos con filtros y búsqueda
- **Checkout Flow**: Proceso de compra completo

---

## 🚀 Quick Start

### Prerequisitos

- Node.js 18+ 
- npm o yarn
- WordPress con WooCommerce y GamiPress (opcional para desarrollo)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/themistressd/trashgenero-os.git
cd trashgenero-os

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus configuraciones

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts Disponibles

```bash
npm run dev        # Inicia servidor de desarrollo
npm run build      # Construye para producción
npm run start      # Inicia servidor de producción
npm run lint       # Ejecuta ESLint
npm run type-check # Verifica tipos TypeScript
```

---

## 📁 Estructura del Proyecto

```
trashgenero-os/
├── app/
│   ├── (boot)/              # Rutas de secuencia de arranque
│   │   ├── bios/
│   │   ├── glitch/
│   │   └── login/
│   ├── (desktop)/           # Rutas del desktop
│   │   └── desktop/
│   ├── api/                 # API routes
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página de entrada
├── components/
│   ├── boot/                # Componentes de boot sequence
│   ├── desktop/             # Componentes del desktop
│   ├── windows/             # Sistema de ventanas
│   ├── apps/                # Aplicaciones individuales
│   ├── gamification/        # Componentes de gamificación
│   ├── effects/             # Efectos visuales (CRT, Glitch, etc.)
│   └── ui/                  # Componentes UI reutilizables
├── lib/
│   ├── api/                 # Clientes API (WordPress, WooCommerce, GamiPress)
│   ├── hooks/               # Custom hooks (SWR, stores)
│   ├── store/               # Zustand stores
│   ├── utils/               # Utilidades (animations, cn)
│   └── constants/           # Configuraciones (icons, currency, sounds, routes)
├── styles/
│   ├── themes/              # Temas (trash-os.css, trash-mate.css)
│   └── effects/             # CSS de efectos (crt, glitch, scanlines)
├── types/                   # TypeScript types
└── public/                  # Assets estáticos
```

---

## 🎨 Theming

### Toxic Palette

```css
--void-black: #000000      /* Fondo principal */
--system-gray: #C0C0C0     /* Texto y elementos UI */
--bubblegum-pink: #FF00FF  /* Acentos y highlights */
--hacker-green: #00FF00    /* Texto terminal y success */
--glitch-blue: #0000FF     /* Efectos y errors */
```

### Fuentes

- **VT323**: Texto de terminal y body
- **Pixelify Sans**: Texto pixelado y displays
- **Permanent Marker**: Acentos manuscritos
- **Courier New**: Fallback monospace

---

## 🔌 Integración Backend

### WordPress API

```env
NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com/wp-json
JWT_SECRET_KEY=your-jwt-secret
```

### WooCommerce

```env
WOOCOMMERCE_CONSUMER_KEY=ck_your_key
WOOCOMMERCE_CONSUMER_SECRET=cs_your_secret
```

### GamiPress

El sistema consume los siguientes endpoints:

- `GET /trashgenero/v1/user/gamification` - Datos de gamificación del usuario
- `GET /trashgenero/v1/ranks` - Todos los rangos disponibles
- `GET /trashgenero/v1/points/{type}/history` - Historial de puntos

---

## 🎮 Desarrollo

### Añadir una Nueva App

1. Crear componente en `components/apps/`
2. Crear ruta en `app/(desktop)/apps/`
3. Añadir configuración en `lib/constants/icons.ts`
4. Añadir ruta en `lib/constants/routes.ts`

### Añadir Nuevo Efecto Visual

1. Crear CSS en `styles/effects/`
2. Crear componente en `components/effects/`
3. Importar y usar en páginas/layouts

### Añadir Nuevo Store

1. Crear store en `lib/store/`
2. Definir types en `types/`
3. Crear hook wrapper en `lib/hooks/` si es necesario

---

## 🐛 Debugging

### Boot Sequence no se muestra

Verifica que en `.env.local`:
```env
NEXT_PUBLIC_ENABLE_BOOT_SEQUENCE=true
```

Para forzar reset del boot:
```javascript
localStorage.removeItem('trash-os-boot')
```

### Errores de API

El sistema usa mock data cuando las APIs no están disponibles. Los errores de API se manejan gracefully sin romper la UI.

---

## 📝 To-Do

- [ ] Implementar sistema completo de ventanas con drag & drop
- [ ] Añadir las 9 aplicaciones del desktop
- [ ] Integrar sonidos del sistema
- [ ] Añadir sistema de notificaciones toast
- [ ] Implementar wallpaper selector
- [ ] Crear modo Trash-Mate (móvil) completo
- [ ] Añadir Easter eggs y BSOD triggers
- [ ] Testing completo

---

## 🤝 Contribuir

Este es un proyecto privado de La Secta. Para contribuir, contacta a Mistress D.

---

## 📄 Licencia

Copyright © 2024 Mistress D / TrashGènero
Todos los derechos reservados.

---

## 🔗 Enlaces

- **Website**: [trashgenero.com](https://trashgenero.com)
- **Instagram**: [@trashgenero](https://instagram.com/trashgenero)
- **Backend WordPress**: Configuración requerida por separado

---

**Built with 💀✨ by La Secta**
