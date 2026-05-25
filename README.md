# RutaYa - Sistema de Transporte Público en Vivo

Una aplicación moderna de transporte público para Popayán, Colombia. Con rastreo en tiempo real de autobuses, alertas de congestión y gestión de tarjeta de transporte.

## Características

### 🗺️ Mapa Interactivo
- Visualización en tiempo real de autobuses en la ciudad
- Animaciones suaves de movimiento de buses
- Información detallada de rutas al seleccionar un bus
- Controles de zoom intuitivos
- Estados de bus: En ruta, Llegando, Parada

### 🚌 Módulo de Rutas
- Listado completo de todas las rutas disponibles
- Búsqueda por número, nombre o punto de partida
- Filtros por zona de la ciudad
- Información expandible de cada ruta
- Ocupación en tiempo real
- Detalles de paradas y horarios

### 🚨 Alertas y Notificaciones
- Alertas de congestión detectada
- Notificaciones de buses en camino
- Confirmaciones de llegada
- Avisos de cambios de ruta
- Filtrado por tipo de alerta

### 💳 Gestión de Tarjeta
- Visualización elegante de saldo
- Historial de transacciones
- Estadísticas mensuales de gasto
- Control de recarga de saldo
- Información de pase mensual

### 🔐 Autenticación
- Sistema de login/registro
- Autenticación persistente
- Interfaz intuitiva y fluida

## Tecnología

- **Framework:** Next.js 16 (App Router)
- **Estilo:** Tailwind CSS + Shadcn UI
- **Animaciones:** Framer Motion
- **Estado:** Zustand
- **Iconos:** Lucide React
- **Lenguaje:** TypeScript

## Estructura del Proyecto

```
/app
  /layout.tsx           # Root layout
  /page.tsx             # Página principal
  /globals.css          # Estilos globales

/components
  /auth
    /AuthForm.tsx       # Formulario de autenticación
  /layout
    /AppLayout.tsx      # Layout principal de la app
  /modules
    /MapModule.tsx      # Módulo de mapa
    /RoutesModule.tsx   # Módulo de rutas
    /AlertsModule.tsx   # Módulo de alertas
    /CardModule.tsx     # Módulo de tarjeta
  /common
    /LoadingSpinner.tsx # Spinner de carga
    /Card.tsx           # Componente de tarjeta reutilizable
    /Badge.tsx          # Componente de badge
    /EmptyState.tsx     # Estado vacío
    /WelcomeBanner.tsx  # Banner de bienvenida

/lib
  /store.ts             # Zustand store (autenticación)
  /utils.ts             # Utilidades

/hooks
  /useResponsive.ts     # Hook responsivo
```

## Características de Diseño

### Tema Dark Mode
- Paleta de colores: Negro (#0A0A0A) + Verde Acentuado (#10B981)
- Cards oscuras (#1A1A1A)
- Texto claro para máximo contraste
- Interfaz moderna y elegante

### Responsividad
- Diseño mobile-first
- Optimizado para dispositivos de 320px a 768px+
- Navigation adaptativa
- Componentes fluidos

### Animaciones
- Transiciones suaves entre pantallas
- Efectos de hover en botones
- Movimiento fluido de elementos
- Indicadores visuales de estado

## Uso

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Ejecutar en desarrollo:**
   ```bash
   pnpm dev
   ```

3. **Compilar para producción:**
   ```bash
   pnpm build
   ```

## Credenciales de Demo

Para acceder a la aplicación, puedes usar cualquier email y contraseña:
- Email: `usuario@test.com`
- Contraseña: `123456`

(O cualquier combinación, ya que es un demo)

## Características Futuras

- [ ] Integración con backend real
- [ ] Autenticación con JWT
- [ ] Integración con Google Maps
- [ ] Notificaciones push
- [ ] Historial de viajes
- [ ] Sistema de pases mensuales
- [ ] Integración de pagos
- [ ] Sistema de reseñas de rutas
- [ ] Modo offline

## Notas Técnicas

- La aplicación utiliza localStorage para persistencia de estado de demo
- Los buses se simulan con movimiento aleatorio
- Las alertas son ejemplos estáticos para demostración
- El sistema de tarjeta usa datos ficticios

## Licencia

Este proyecto está bajo licencia MIT.

---

**Desarrollado con ❤️ usando v0**
