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

---
description: Estado actual del proyecto Baruch
globs:
  - **/*
alwaysApply: true
---

# Estado del Proyecto Baruch

## Progreso General
**Última actualización:** Enero 2025

### Tecnologías Implementadas
- ✅ Next.js 15 con App Router
- ✅ React 18 con TypeScript
- ✅ Redux Toolkit para estado global
- ✅ Bootstrap 5.3.3 para estilos
- ✅ Strapi 5.13.1 como CMS
- ✅ SQLite como base de datos
- ✅ i18next para internacionalización
- ✅ GSAP y AOS para animaciones

## Checklist de Desarrollo

### ✅ COMPLETADO

#### Frontend - Estructura Base
- [x] Configuración de Next.js 15 con App Router
- [x] Configuración de TypeScript
- [x] Configuración de Redux Toolkit
- [x] Configuración de Bootstrap 5.3.3
- [x] Estructura de carpetas organizada
- [x] Configuración de ESLint

#### Frontend - Internacionalización
- [x] Configuración de i18next
- [x] Proveedor I18nProvider
- [x] Archivos de traducción para 6 idiomas (es, en, fr, de, it, pt)
- [x] Configuración de detección de idioma
- [x] Utilidades de i18n

#### Frontend - Páginas Principales
- [x] Página de inicio (4 variantes: index, index2, index3, index4)
- [x] Página Acerca de (about-us)
- [x] Página de contacto (contact)
- [x] Página de blog (blog, blog-detail, blog-detail-2, blog-grid)
- [x] Páginas de propiedades (properties, property-details múltiples versiones)
- [x] Dashboard de usuario (dashboard)
- [x] Perfil de usuario (my-profile)
- [x] Favoritos (my-favorites)
- [x] Mis propiedades (my-property)
- [x] Agregar propiedad (add-property)
- [x] Precios (pricing)
- [x] FAQ (faq)
- [x] Servicios (our-service)
- [x] Política de privacidad (privacy-policy)
- [x] Reseñas (reviews)
- [x] Mensajería (message)
- [x] Resultados de búsqueda (search-results)
- [x] Vistas con mapa (topmap-grid, topmap-list, property-halfmap-grid, property-halfmap-list)
- [x] Vistas con sidebar (sidebar-grid, sidebar-list)
- [x] Página 404 (not-found)

#### Frontend - Componentes
- [x] Layout principal (layout.tsx)
- [x] Loading spinner (loading.tsx)
- [x] Headers (Header1, Header2, Header3, Header4, Header5)
- [x] Footers (Footer1, Footer2, Footer3, Footer4)
- [x] Selectores de header y footer
- [x] Componentes de héroe (Hero1, Hero2, Hero3, Hero4)
- [x] Componentes de propiedades (Properties1-6, múltiples detalles)
- [x] Componentes de blog (Blog, Blog1, Blog2, Blog3, BlogDetail, BlogDetail2, BlogGrid)
- [x] Componentes de equipo (Team1, Team2, Team3, Team4)
- [x] Componentes de testimonios (Testimonial1, Testimonial2, Testimonial3, Testimonial4)
- [x] Componentes de servicios (Service1, Service2)
- [x] Componentes de categorías (Category1, Category2)
- [x] Componentes de about (About1, About2, About3)
- [x] Componentes de contacto (Contact1)
- [x] Componentes de dashboard (DashboardArea, DashboardChat, DashboardMessage, DashboardReviews)
- [x] Componentes de FAQ (Faq1, Faq2)
- [x] Componentes de pricing (Pricing1)
- [x] Componentes de ubicación (PropertyLocation1, PropertyLocation2, PropertyLocation3)
- [x] Componentes de listado (Listing1, PropertieList1)
- [x] Componentes de búsqueda (SearchBox)
- [x] Componentes de pasos (Step1)
- [x] Componentes CTA (Cta1, Cta2)
- [x] Componentes de casos (Case1)
- [x] Componentes de privacidad (PrivacyPolicy)
- [x] Componentes de perfil (Profile1)
- [x] Componentes de otros (Others2, Others3, Others4)
- [x] Componentes de agregar propiedad (AddProperty)

#### Frontend - Elementos y Utilidades
- [x] Hooks personalizados (useClickOutside, useElementOnScreen, useLayoutEffects)
- [x] Elementos de animación (animateText, BackToTop)
- [x] Utilidades de contador (useOdometerCounter)
- [x] Componentes de slider (slick-arrow)
- [x] Componente de spinner de carga (LoadingSpinner)
- [x] Configuración de clases CSS (AddClassBody)

#### Frontend - Estado y Servicios
- [x] Redux store configurado
- [x] Slice de propiedades (propertySlice)
- [x] Slice de filtros (filterSlice)
- [x] Proveedor de estado (StoreProvider)
- [x] Servicios de configuración (config.ts)
- [x] Servicios de categorías (categories.ts)
- [x] Servicios de información del home (get-home-info.ts)
- [x] Tipos de TypeScript (property.ts)

#### Backend - Configuración Base
- [x] Configuración de Strapi 5.13.1
- [x] Configuración de SQLite
- [x] Configuración de TypeScript
- [x] Configuración de administración (admin.ts)
- [x] Configuración de API (api.ts)
- [x] Configuración de base de datos (database.ts)
- [x] Configuración de middleware, server, plugins

#### Backend - Modelos de Contenido
- [x] Modelo About (schema, controller, routes, services)
- [x] Modelo Category (schema, controller, routes, services)
- [x] Modelo Global (schema, controller, routes, services)
- [x] Modelo Home (schema, controller, routes, services)
- [x] Modelo Propertie (schema, controller, routes, services)
- [x] Modelo Status (schema, controller, routes, services)

#### Backend - Componentes Compartidos
- [x] Componentes de elementos (about-component, about-home)
- [x] Componentes compartidos (media, quote, rich-text, seo, slider)

#### Backend - Tipos y Migraciones
- [x] Tipos generados (components.d.ts, contentTypes.d.ts)
- [x] Carpeta de migraciones configurada
- [x] Script de seed (seed.js)

#### Backend - Archivos y Datos
- [x] Datos de ejemplo (data.json)
- [x] Carpeta de uploads con imágenes
- [x] Favicon configurado
- [x] Robots.txt

#### Frontend - Internacionalización COMPLETADA ✅
- [x] Sistema de i18n funcionando correctamente con carga estática
- [x] Selector de idioma integrado en header
- [x] Cambio de idioma en tiempo real
- [x] Traducciones para todos los componentes (AboutHero, LanguageSelector)
- [x] Persistencia de idioma seleccionado
- [x] Fallbacks y manejo de errores

### 🔄 EN PROGRESO

#### Frontend - Conexión con Backend
- [ ] Integración completa con APIs de Strapi
- [ ] Manejo de errores en servicios
- [ ] Carga dinámica de contenido
- [ ] Optimización de imágenes desde Strapi

#### Frontend - Funcionalidades Avanzadas
- [ ] Filtros de búsqueda avanzados
- [ ] Paginación de resultados
- [ ] Favoritos persistentes
- [ ] Notificaciones en tiempo real
- [ ] Sistema de comentarios/reseñas

### ❌ PENDIENTE

#### Frontend - Optimizaciones
- [ ] Optimización de SEO
- [ ] Sitemap dinámico
- [ ] Mejoras de performance
- [ ] Lazy loading de componentes
- [ ] Optimización de imágenes
- [ ] PWA configuration

#### Frontend - Funcionalidades Adicionales
- [ ] Sistema de autenticación completo
- [ ] Pasarela de pagos
- [ ] Sistema de citas/tours
- [ ] Chat en tiempo real
- [ ] Sistema de calificaciones
- [ ] Comparador de propiedades
- [ ] Calculadora de hipoteca
- [ ] Mapa interactivo avanzado
- [ ] Sistema de alertas
- [ ] Exportación de datos (PDF/Excel)

#### Backend - Configuraciones Avanzadas
- [ ] Configuración de producción
- [ ] Migración a PostgreSQL
- [ ] Configuración de CDN
- [ ] Backup automático
- [ ] Monitoreo y logs
- [ ] Configuración de CORS
- [ ] Rate limiting
- [ ] Seguridad avanzada

#### Backend - Funcionalidades Adicionales
- [ ] Sistema de roles avanzado
- [ ] API de notificaciones
- [ ] Sistema de reportes
- [ ] Integración con servicios de email
- [ ] API de métricas
- [ ] Sistema de audit trail
- [ ] Webhooks
- [ ] API de estadísticas

#### Testing y Documentación
- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Tests E2E
- [ ] Documentación de API
- [ ] Guía de desarrollo
- [ ] Manual de usuario
- [ ] Documentación de deployment

#### Deployment y DevOps
- [ ] Configuración de CI/CD
- [ ] Dockerización
- [ ] Configuración de staging
- [ ] Monitoreo de producción
- [ ] Configuración de dominio
- [ ] Certificados SSL
- [ ] Backup y recuperación

## Métricas del Proyecto

### Estadísticas Actuales
- **Páginas implementadas:** 25+
- **Componentes creados:** 72+ (incluye AboutHero, LanguageSelector)
- **Modelos de contenido:** 6
- **Idiomas soportados:** 6 (totalmente funcionales)
- **Sistema i18n:** ✅ Completamente implementado
- **Líneas de código:** ~52,000+
- **Progreso estimado:** 78%

### Próximos Hitos
1. **Conectividad completa** - Integración frontend-backend
2. **Autenticación** - Sistema de usuarios completo
3. **Funcionalidades avanzadas** - Filtros, favoritos, notificaciones
4. **Optimización** - Performance y SEO
5. **Testing** - Cobertura de tests
6. **Deployment** - Configuración de producción

### Tiempo Estimado Restante
- **Conectividad:** 1-2 semanas
- **Funcionalidades core:** 2-3 semanas
- **Optimizaciones:** 1-2 semanas
- **Testing y deployment:** 1-2 semanas
- **Total estimado:** 5-9 semanas

## Notas Importantes

### Configuración Actual
- Variables de entorno configuradas para Strapi
- Conexión establecida entre frontend y backend
- Estructura de datos preparada para contenido multiidioma
- Sistema de tipos TypeScript implementado

### Consideraciones Técnicas
- El proyecto utiliza las últimas versiones de Next.js y React
- Strapi está configurado para desarrollo con SQLite
- La internacionalización está preparada pero necesita contenido
- Los componentes están listos para recibir datos dinámicos

### Recomendaciones
1. ✅ **COMPLETADO**: Sistema de internacionalización funcional
2. Priorizar la conexión completa con las APIs de Strapi
3. Implementar el sistema de autenticación completo
4. Agregar contenido real multiidioma a través de Strapi
5. Optimizar componentes para mejor performance
6. Implementar testing antes del deployment