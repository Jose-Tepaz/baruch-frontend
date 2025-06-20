---
description: Reglas para el desarrollo frontend con Bootstrap y Next.js
globs:
  - frontend/**/*.{js,jsx,ts,tsx}
alwaysApply: false
---

# Reglas para el Frontend

- Utilizar componentes funcionales con TypeScript.
- Emplear Bootstrap 5 para estilos y diseño responsivo.
- Mantener la estructura de carpetas organizada por componentes y páginas.
- Evitar el uso de clases personalizadas innecesarias; aprovechar las utilidades de Bootstrap.
- Implementar internacionalización usando i18next con soporte para 6 idiomas:
  - Español (es)
  - Inglés (en)
  - Francés (fr)
  - Alemán (de)
  - Italiano (it)
  - Portugués (pt)
- Mantener los archivos de traducción organizados por idioma en `/public/locales/{idioma}/translation.json`
- Utilizar el hook `useTranslation` de i18next para todas las cadenas de texto
- Asegurar que todos los componentes sean compatibles con RTL (Right-to-Left) para futura expansión
- Asegurar la compatibilidad con múltiples idiomas utilizando las herramientas de internacionalización de Next.js.


---
description: Reglas para el desarrollo backend con Strapi y SQLite
globs:
  - backend/**/*.{js,ts}
alwaysApply: false
---

# Reglas para el Backend

- Configurar modelos de contenido en Strapi para propiedades, agentes y páginas.
- Utilizar SQLite como base de datos durante el desarrollo; considerar PostgreSQL para producción.
- Implementar autenticación JWT para agentes inmobiliarios.
- Gestionar usuarios exclusivamente desde el panel de administración de Strapi; deshabilitar el registro público.
- Configurar internacionalización en Strapi con los mismos 6 idiomas:
  - Español (es) - Idioma por defecto
  - Inglés (en)
  - Francés (fr)
  - Alemán (de)
  - Italiano (it)
  - Portugués (pt)
- Habilitar campos traducibles en todos los modelos de contenido relevantes
- Configurar las rutas de API para soportar el parámetro de idioma (?locale=)
- Mantener la consistencia en las traducciones entre el frontend y el backend


---
description: Estructura y características de la plantilla Housa
globs:
  - **/*
alwaysApply: true
---

# Estructura de la Plantilla

## Tecnologías Principales
- Next.js 15 con App Router y Server Components
- React 18 con Concurrent Mode y Suspense
- TypeScript para type safety
- Redux Toolkit para manejo de estado
- Bootstrap 5.3.3 para UI
- GSAP & AOS para animaciones
- Chart.js para visualización de datos

## Características de la UI
- 4 variantes de página de inicio
- Diseño pixel-perfect
- Componentes interactivos:
  - Sliders de propiedades
  - Modales de video
  - Contadores animados
  - Gráficos interactivos
  - Animaciones suaves
- Enfoque mobile-first
- Compatibilidad cross-browser (incluyendo IE9+)

## Estructura del Proyecto
- Arquitectura basada en características
- Separación clara de responsabilidades
- Componentes modulares y reutilizables
- Código limpio y comentado
- Configuración ESLint incluida

## Requisitos Técnicos
- Node.js 18+ recomendado
- Conocimientos básicos de React y Next.js
- Familiaridad con TypeScript (recomendado)

## Recursos Incluidos
- Plantilla Next.js completa
- Archivos de diseño Figma
- Documentación detallada
- Soporte dedicado (12-24 horas de respuesta)
- Actualizaciones de por vida