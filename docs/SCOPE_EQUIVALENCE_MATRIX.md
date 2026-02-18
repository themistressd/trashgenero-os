# Matriz de equivalencias de alcance (plan original ↔ implementación actual)

Fecha: 2026-02-18

## Objetivo

Cerrar explícitamente la equivalencia entre el naming del plan original y las apps/módulos efectivamente implementados en TrashGènero OS, para evitar ambigüedad de scope durante QA, roadmap y release.

## Convenciones

- **Estado**
  - ✅ Equivalencia cerrada: el objetivo del plan está cubierto por un módulo actual.
  - 🟡 Equivalencia parcial: existe cobertura base, pero falta cierre productivo o paridad.
  - ❌ No equivalente: no se encontró implementación suficiente para cerrar alcance.

## Matriz

| Fase/objetivo del plan | Nombre/idea original | Implementación actual en repo | Estado | Observaciones |
|---|---|---|---|---|
| Fase 4 Boot Sequence | BIOS + intro + login | `app/(boot)/*` + `components/boot/*` | ✅ | Flujo `/bios -> /glitch -> /login` operativo. |
| Fase 5 Desktop Shell | Escritorio principal | `app/(desktop)/desktop/page.tsx`, `components/desktop/*` | ✅ | Taskbar, start menu, reloj y wallpaper presentes. |
| Fase 6 Window System | Ventanas Win95 con gestión de foco | `components/desktop/Window.tsx`, `lib/store/windowStore.ts`, `lib/hooks/useWindowManager.ts` | ✅ | Min/max/close + z-index/estado por store. |
| Fase 7 Desktop Icons | Iconos de escritorio y apertura de apps | `components/desktop/DesktopIcon.tsx`, `lib/store/desktopStore.ts` | ✅ | Doble click + drag&drop + persistencia local. |
| Fase 8 Gamification app | App de progreso/rangos | `components/apps/SectaTrash/*` | 🟡 | UI y lógica base completas; integración backend aún condicionada por fallback policy. |
| Fase 9 Shop app | Tienda + carrito + checkout | `components/apps/Trashtienda/*`, `components/apps/Carrito/Carrito.tsx`, `lib/api/woocommerce.ts` | 🟡 | Flujo UI cerrado; falta endurecer checkout transaccional real. |
| Fase 10 About/Manifest | Página institucional | `components/apps/MistressD/MistressD.tsx` | ✅ | Cubre el objetivo de “about”/manifiesto. |
| Fase 10 Lore/Blog | Blog/lore de universo | `components/apps/Divas/Divas.tsx`, `components/apps/Grimorio/Grimorio.tsx`, `components/apps/Transmisiones/Transmisiones.tsx` | 🟡 | Cobertura funcional por varias apps de contenido; cierre depende de endpoints WP y contrato editorial final. |
| Fase 10 Lookbook/Galería | Galería/centerfolds | `components/apps/Centerfolds/Centerfolds.tsx`, `components/apps/Altar/Altar.tsx` | 🟡 | Implementado visualmente; validar contrato de contenido final y paridad móvil. |
| Fase 11 Interactive | Experiencias interactivas | `components/apps/XXXperience/XXXperience.tsx`, `components/apps/StalkerZone/StalkerZone.tsx`, `components/apps/Rituales/Rituales.tsx` | ✅ | Objetivo interactivo del plan cubierto. |
| Fase 12 Responsive móvil | “Trash-Mate” | `components/mobile/TrashMateShell.tsx`, `styles/themes/trash-mate.css` | ✅ | Shell móvil dedicado y navegación base. |

## Equivalencias específicas de nomenclatura

- **`SectaTrash.exe`** = módulo de gamificación (rango, logros, stats, inventario).
- **`Trashtienda.exe` + `Carrito.exe`** = alcance e-commerce (catálogo, detalle, carrito y checkout).
- **`TRASH_VISION.exe` + `TRASH-ZINE.pdf` + `Divas.rar` + `CENTERFOLDS.zip`** = alcance de contenido editorial (video/transmisiones, publicaciones, lore y lookbook).
- **`XXXperience.zip` + `STsLK3R_Z0NE`** = bloque de experiencias interactivas.

## Fuera de alcance explícito (esta iteración)

- Reintroducir módulos separados adicionales si el objetivo ya está cubierto por apps fusionadas actuales.
- Declarar “producción lista” mientras persistan pendientes de checkout real, e2e y observabilidad.

## Próximo paso recomendado

Usar esta matriz como checklist de release: cada fila 🟡 debe convertirse en criterios verificables (DoD) con owner y fecha, empezando por shop/gamificación/contenido backend real.
