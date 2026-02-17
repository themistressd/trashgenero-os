# Análisis de brechas de implementación para funcionamiento correcto

Fecha: 2026-02-17

## Resumen ejecutivo

El repositorio es **ejecutable y estable a nivel técnico** (lint, type-check y build pasan), pero para un funcionamiento "correcto" en entorno real todavía depende de varios fallbacks mock y de integraciones incompletas de negocio.

**Conclusión corta:**
- Núcleo visual/arquitectónico: ✅ sólido.
- Integraciones reales (auth, contenido, shop, gamificación): ⚠️ parciales.
- Calidad de entrega productiva (tests e2e, accesibilidad, performance observability): ⚠️ pendiente.

Validación local:
- `npm run lint` ✅
- `npm run type-check` ✅
- `npm run build` ✅

---

## Qué falta por implementar (prioridad alta)

## 1) Integraciones backend "reales" sin dependencia de mock

### Falta
- Reducir o eliminar fallback mock en contenido WordPress (páginas/posts/divas/lookbooks).
- Eliminar fallback de catálogo WooCommerce en producción (hoy hace degradación a mock products).
- Completar integración GamiPress real en todos los endpoints y estados de error.
- Endurecer autenticación real con WordPress/NextAuth para expiración/errores de sesión.

### Evidencia en código
- Hooks con fallback local de contenido:
  - `lib/hooks/usePage.ts`
  - `lib/hooks/usePosts.ts`
  - `lib/hooks/useDivas.ts`
  - `lib/hooks/useLookbooks.ts`
- WooCommerce con productos mock y warnings de fallback:
  - `lib/api/woocommerce.ts`
- Gamificación con retorno mock cuando falla API:
  - `lib/api/gamification.ts`
- Cliente API con base URL mock por defecto (`/api/mock`) si no hay env:
  - `lib/api/client.ts`

## 2) Flujo e-commerce end-to-end

### Falta
- Checkout transaccional real: creación de orden, pago, estados de orden y confirmación sincronizada con backoffice.
- Manejo robusto de errores de checkout (reintentos, errores de pasarela, recuperación de carrito).

### Evidencia en código
- UI de tienda/carrito/checkout implementada en:
  - `components/apps/Trashtienda/*`
  - `components/apps/Carrito/Carrito.tsx`
- Integración API base en `lib/api/woocommerce.ts`, pero con fallback a mock en fallos.

## 3) Paridad funcional desktop ↔ móvil

### Falta
- Cerrar diferencias funcionales entre Trash OS (desktop) y Trash-Mate (móvil), especialmente en apps con flujos largos.
- Validar UX de overflow, navegación y estados vacíos/error en pantallas pequeñas.

### Evidencia en código
- Shell móvil existe (`components/mobile/TrashMateShell.tsx`) pero no hay matriz de paridad funcional documentada por app.

## 4) Contrato final de apps y nomenclatura de producto

### Falta
- Definir oficialmente si apps planificadas (p. ej. video player/blog dedicados) están fusionadas en apps actuales o siguen pendientes como módulos separados.

### Evidencia
- README y estructura actual muestran apps de contenido implementadas, pero no existe documento de "scope final" que cierre equivalencias contra el plan original.

## 5) Calidad productiva (fase de polish)

### Falta
- Suite de tests automatizados funcionales/e2e (no hay scripts de test en `package.json`).
- Auditoría de accesibilidad (teclado, contraste, semántica, lectores de pantalla).
- Presupuesto y monitoreo de performance en producción (Core Web Vitals, alertas).
- Estrategia uniforme de observabilidad y errores (logging/metrics/tracing).

### Evidencia
- `package.json` incluye `lint`, `type-check`, `build`, pero no scripts de test.

---

## Qué ya está bien implementado

- Base técnica moderna con Next.js + TypeScript + Tailwind y arquitectura modular clara.
- Boot sequence, desktop shell, sistema de ventanas e iconos funcionales.
- Efectos visuales y theming consolidados.
- Build de producción compila correctamente.

---

## Plan recomendado (orden de ejecución)

1. **Integraciones reales primero:** WordPress auth + GamiPress + WooCommerce sin fallback mock en producción.
2. **Checkout completo:** orden/pago/confirmación + recuperación ante errores.
3. **Paridad móvil:** checklist por app y corrección de gaps UX.
4. **Polish de release:** e2e + a11y + performance + observabilidad.
5. **Cierre de alcance:** documento de equivalencias entre plan original y apps finales.

---

## Definición práctica de "funcionamiento correcto"

Se recomienda considerar el proyecto listo cuando cumpla simultáneamente:

- Sin dependencia de mocks en producción para flujos críticos (auth, shop, gamificación).
- Checkout real con transacción verificable.
- Cobertura mínima automatizada (smoke e2e + regresión crítica).
- A11y básica aprobada y monitoreo de performance activo.
- Paridad funcional aceptable entre desktop y móvil en las apps core.
