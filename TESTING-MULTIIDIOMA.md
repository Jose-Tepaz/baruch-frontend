# Guía de Testing - Implementación Multiidioma sin /en

## Resumen de Cambios Implementados

Se ha reestructurado la aplicación para servir inglés en la raíz (/) sin redirección, mientras otros idiomas mantienen sus prefijos (/es, /fr, etc.).

## Archivos Modificados

### 1. Middleware (`middleware.ts`)
- ✅ Eliminada redirección automática de `/` a `/en`
- ✅ Eliminada detección automática de idioma del navegador
- ✅ Ahora permite acceso directo a la raíz

### 2. Layout Raíz (`app/layout.tsx`)
- ✅ Creado layout para rutas en inglés
- ✅ Configurado con `lang="en"` hardcodeado
- ✅ Metadata SEO optimizada con hreflang

### 3. Páginas Wrapper Creadas
- ✅ `app/page.tsx` - Homepage
- ✅ `app/about-us/page.tsx`
- ✅ `app/contact/page.tsx`
- ✅ `app/properties/page.tsx`
- ✅ `app/property/[property]/page.tsx`
- ✅ `app/services/page.tsx`
- ✅ `app/services/[id]/page.tsx`
- ✅ `app/testimonials/page.tsx`
- ✅ `app/privacy-policy/page.tsx`
- ✅ `app/private-properties/page.tsx`
- ✅ `app/login/page.tsx`
- ✅ `app/categories/[categoryId]/page.tsx`

### 4. LanguageSelector (`components/elements/LanguageSelector.tsx`)
- ✅ Actualizado para manejar inglés sin prefijo
- ✅ Otros idiomas agregan/reemplazan prefijo correctamente

### 5. SEO Components
- ✅ Creado `components/elements/HreflangLinks.tsx`
- ✅ Generado `app/sitemap.ts` dinámico
- ✅ Actualizado `public/robots.txt`

### 6. Layout [lang] (`app/[lang]/layout.tsx`)
- ✅ Metadata actualizada con hreflang correcto
- ✅ Canonical URLs apuntan a x-default=/

## Plan de Testing

### 1. Verificación de Rutas

#### A. Rutas en Inglés (sin prefijo)
Visita estas URLs y verifica que carguen correctamente:

```
✅ http://localhost:3000/
✅ http://localhost:3000/about-us
✅ http://localhost:3000/contact
✅ http://localhost:3000/properties
✅ http://localhost:3000/services
✅ http://localhost:3000/testimonials
✅ http://localhost:3000/privacy-policy
✅ http://localhost:3000/private-properties
✅ http://localhost:3000/login
```

**Esperado:** Todas deben cargar contenido en inglés sin redirigir.

#### B. Rutas en Otros Idiomas (con prefijo)
Visita estas URLs y verifica que carguen correctamente:

```
✅ http://localhost:3000/es
✅ http://localhost:3000/es/about-us
✅ http://localhost:3000/fr
✅ http://localhost:3000/fr/properties
✅ http://localhost:3000/de/contact
```

**Esperado:** Todas deben cargar contenido en el idioma correspondiente.

#### C. Rutas Dinámicas
```
✅ http://localhost:3000/property/[slug]
✅ http://localhost:3000/es/property/[slug]
✅ http://localhost:3000/categories/[categoryId]
✅ http://localhost:3000/fr/categories/[categoryId]
```

**Esperado:** Las rutas dinámicas funcionan en todos los idiomas.

### 2. Selector de Idiomas

#### Prueba desde Raíz (/)
1. Estar en `http://localhost:3000/`
2. Cambiar a Español → Debe ir a `/es`
3. Cambiar a Francés → Debe ir a `/fr`
4. Cambiar a Inglés → Debe volver a `/`

#### Prueba desde Ruta en Español
1. Estar en `http://localhost:3000/es/about-us`
2. Cambiar a Francés → Debe ir a `/fr/about-us`
3. Cambiar a Inglés → Debe ir a `/about-us` (sin prefijo)

#### Prueba desde Ruta en Inglés
1. Estar en `http://localhost:3000/properties`
2. Cambiar a Español → Debe ir a `/es/properties`
3. Cambiar a Francés → Debe ir a `/fr/properties`
4. Cambiar de vuelta a Inglés → Debe quedarse en `/properties`

### 3. Verificación de Metadata SEO

#### En el navegador (Inspeccionar):
1. Ir a cualquier página
2. Abrir DevTools > Elements
3. Buscar en el `<head>`:

```html
<!-- Debe tener canonical correcto -->
<link rel="canonical" href="https://www.baruchrealestate.com/..." />

<!-- Debe tener hreflang para cada idioma -->
<link rel="alternate" hreflang="en" href="https://www.baruchrealestate.com/..." />
<link rel="alternate" hreflang="es" href="https://www.baruchrealestate.com/es/..." />
<link rel="alternate" hreflang="fr" href="https://www.baruchrealestate.com/fr/..." />
<!-- ... más idiomas ... -->
<link rel="alternate" hreflang="x-default" href="https://www.baruchrealestate.com/..." />
```

#### Verificar Open Graph:
```html
<meta property="og:url" content="https://www.baruchrealestate.com/..." />
<meta property="og:locale" content="en_US" /> <!-- o es_ES, fr_FR, etc. -->
```

### 4. Sitemap XML

Visita: `http://localhost:3000/sitemap.xml`

**Verificar:**
- ✅ Aparecen rutas en inglés SIN prefijo (/)
- ✅ Aparecen rutas en otros idiomas CON prefijo (/es, /fr, etc.)
- ✅ Incluye propiedades dinámicas
- ✅ Incluye categorías
- ✅ Tiene prioridades y changeFrequency

### 5. Robots.txt

Visita: `http://localhost:3000/robots.txt`

**Verificar:**
- ✅ Contiene: `Sitemap: https://www.baruchrealestate.com/sitemap.xml`
- ✅ Permite acceso a rutas principales
- ✅ Bloquea /api/, /_next/, /login

### 6. Funcionalidad General

#### A. Navegación
- ✅ Links internos funcionan correctamente
- ✅ No hay errores 404
- ✅ Breadcrumbs muestran rutas correctas

#### B. Cookies
- ✅ La cookie `NEXT_LOCALE` se guarda al cambiar idioma
- ✅ Se mantiene el idioma seleccionado al navegar

#### C. Sin Errores en Consola
- ✅ Abrir DevTools > Console
- ✅ No debe haber errores de hidratación
- ✅ No debe haber warnings críticos

### 7. Llamadas a Strapi (API)

En DevTools > Network:
- ✅ Las llamadas a Strapi incluyen `?locale=en` para inglés
- ✅ Las llamadas incluyen `?locale=es` para español
- ✅ Los datos retornados están en el idioma correcto

### 8. Testing de Producción

Si vas a hacer build de producción:

```bash
cd baruch-frontend
npm run build
npm start
```

Verifica:
- ✅ Build completa sin errores TypeScript
- ✅ Todas las rutas generan correctamente
- ✅ El sitemap se genera dinámicamente

## Checklist Final

### URLs Limpias
- [ ] `/` sirve contenido en inglés (no redirige)
- [ ] `/about-us` sirve contenido en inglés
- [ ] `/es` sirve contenido en español
- [ ] `/fr/properties` sirve propiedades en francés

### Selector de Idiomas
- [ ] Cambiar de inglés a español funciona
- [ ] Cambiar de español a inglés funciona (quita el prefijo)
- [ ] Cambiar entre idiomas con prefijo funciona
- [ ] Cookie se guarda correctamente

### SEO
- [ ] Canonical URLs apuntan correctamente
- [ ] Hreflang tags presentes en todas las páginas
- [ ] x-default apunta a la raíz (/)
- [ ] Sitemap accesible y completo
- [ ] Robots.txt referencia el sitemap

### Sin Errores
- [ ] No hay errores en consola
- [ ] No hay errores de hidratación
- [ ] No hay warnings de TypeScript
- [ ] Linter pasa sin errores

## Beneficios Implementados

1. ✅ **SEO Mejorado**: URLs limpias sin `/en` para inglés
2. ✅ **Mejor Indexación**: Sitemap completo con todas las rutas
3. ✅ **Hreflang Correcto**: Google entiende las versiones de idiomas
4. ✅ **UX Mejorada**: URLs más cortas y limpias
5. ✅ **Autoridad del Dominio**: La raíz tiene contenido directo
6. ✅ **Estándares**: Cumple con mejores prácticas de Google

## Comandos Útiles

### Iniciar desarrollo
```bash
cd baruch-frontend
npm run dev
```

### Verificar tipos
```bash
npm run type-check
```

### Build de producción
```bash
npm run build
```

### Linter
```bash
npm run lint
```

## Notas Importantes

- ⚠️ Las llamadas a Strapi NO se vieron afectadas
- ⚠️ Todos los servicios siguen recibiendo el parámetro `locale` correctamente
- ⚠️ No hay cambios en la lógica de negocio, solo en routing y SEO
- ⚠️ Si encuentras errores, verifica que el backend (Strapi) esté corriendo

## Soporte

Si encuentras problemas:
1. Revisa la consola del navegador
2. Verifica que Strapi esté corriendo
3. Limpia el cache del navegador
4. Verifica las cookies (NEXT_LOCALE)
5. Revisa los logs del servidor de desarrollo
