# Diagnóstico de funcionamiento web

## Estado general

- `npm run lint`, `npm run type-check` y `npm run build` ejecutan correctamente.
- La navegación principal (`/ -> /bios -> /glitch -> /login -> /desktop`) funciona en desarrollo.

## Problemas detectados

1. **Inconsistencia en variables de entorno de boot**
   - `app/page.tsx` solo evaluaba `NEXT_PUBLIC_SKIP_BOOT`.
   - El README y `.env.local.example` documentaban `NEXT_PUBLIC_ENABLE_BOOT_SEQUENCE` como variable principal.
   - Resultado: aunque se desactive boot sequence en env, la home seguía enviando a `/bios`.

2. **Asset de sonido faltante en boot**
   - `GlitchLogo` dispara `playSound('glitch')`.
   - `SOUNDS.glitch` apuntaba a `/sounds/effects/glitch.mp3`, pero el archivo no existía.
   - Resultado: errores 404 en navegador y warning de reproducción.

3. **CORS en desarrollo cuando se usa 127.0.0.1**
   - `lib/api/client.ts` usaba fallback absoluto `http://localhost:3000/api/mock`.
   - Al abrir la app en `http://127.0.0.1:3000`, las llamadas cruzaban origen (`127.0.0.1` -> `localhost`) y el navegador bloqueaba por CORS.
   - Resultado: errores en consola al cargar gamificación inicial.

## Ajustes aplicados

- Se amplió el mock local para cubrir endpoints base de WordPress/WooCommerce (`wp/v2/posts`, `wp/v2/divas`, `wp/v2/lookbook`, `wp/v2/tipo-diva`, `wp/v2/pages`, `wc/v3/products`, `wc/v3/products/categories`, `wc/v3/products/{id}`).
- El endpoint mock de productos ahora respeta filtros comunes (`category`, `search`, `featured`, `on_sale`) y paginación (`per_page`, `page`) para aproximar mejor el comportamiento real.
- Home ahora respeta ambos flags:
  - `NEXT_PUBLIC_ENABLE_BOOT_SEQUENCE=false` => entra directo a `/desktop`.
  - `NEXT_PUBLIC_SKIP_BOOT=true` => entra directo a `/desktop`.
- Se añadió `NEXT_PUBLIC_SKIP_BOOT=false` al `.env.local.example`.
- Se reemplazó el sonido `glitch` por audio sintético generado con Web Audio API (sin archivo binario en repositorio).
- Se cambió el fallback de API a relativo (`/api/mock`) para evitar problemas de origen cruzado en local.
- Se añadió `app/api/mock/[...path]/route.ts` con respuestas mock para gamificación básica (`user/gamification`, `ranks`, `points/*/history`).

## Pendientes recomendados

- Para plataformas que bloquean binarios en PR, mantener sonidos críticos como síntesis en runtime o alojados externamente.
- Agregar los demás assets de sonido definidos en `lib/constants/sounds.ts` para evitar futuros 404 cuando se usen otros eventos.
- Añadir un checklist de variables obligatorias vs opcionales en README para primer arranque.
