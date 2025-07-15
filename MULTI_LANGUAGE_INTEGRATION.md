# Integración Multiidioma - Guía de Uso

## Resumen

El proyecto Baruch ahora tiene soporte completo para múltiples idiomas. La API de Strapi ha sido actualizada para incluir el parámetro `locale` en todas las consultas, permitiendo que el frontend obtenga contenido en diferentes idiomas.

## Idiomas Soportados

- **Español (es)** - Idioma por defecto
- **Inglés (en)**
- **Francés (fr)**
- **Alemán (de)**
- **Italiano (it)**
- **Portugués (pt)**

## Configuración del Backend (Strapi)

### Content Types con Soporte i18n

Los siguientes content types ya tienen configurado el soporte multiidioma:

1. **Properties** (`api::propertie.propertie`)
   - `title` - localizado
   - `description` - localizado

2. **Status** (`api::status.status`)
   - `Title` - localizado

3. **Home** (`api::home.home`)
   - `Title` - localizado
   - `Subtitle` - localizado
   - `abouttitle` - localizado

4. **Categories** (`api::category.category`)
   - Actualmente no localizado (pendiente de configuración)

## Servicios Frontend Actualizados

### 1. Properties Service (`services/properties.ts`)

```typescript
// Obtener propiedades con filtros (locale automático)
getProperties({ 
  categorySlug?: string, 
  propertyStatus?: string, 
  locale?: string  // Opcional - usa el selector si no se especifica
})

// Obtener propiedades por categoría (locale automático)
getPropertiesByCategory(categorySlug: string, propertyStatus?: string, locale?: string)

// Obtener propiedad por ID (locale automático)
getPropertyByDocumentId(documentId: string, locale?: string)
```

### 2. Categories Service (`services/categories.ts`)

```typescript
// Obtener categorías (locale automático)
getCategories(locale?: string)  // Opcional - usa el selector si no se especifica
```

### 3. Property Status Service (`services/property-status.ts`)

```typescript
// Obtener estados de propiedades (locale automático)
getPropertyStatuses(locale?: string)  // Opcional - usa el selector si no se especifica
```

### 4. Property Service (`services/property.ts`)

```typescript
// Obtener propiedad por ID (locale automático)
getPropertyById(documentId: string, locale?: string)  // Opcional - usa el selector si no se especifica
```

### 5. Home Info Service (`services/get-home-info.ts`)

```typescript
// Obtener información del home (locale automático)
getHomeInfo(locale?: string)  // Opcional - usa el selector si no se especifica
```

### 6. Get Properties Service (`services/get-properties.ts`) - ✅ ACTUALIZADO

```typescript
// Obtener propiedades por categoría con detección automática de idioma
getProperties({ categoryId: string, locale?: string })
```

**Características actualizadas:**
- ✅ **Detección automática de idioma** desde URL
- ✅ **Manejo de errores mejorado** con fallbacks
- ✅ **Compatibilidad con `useLanguageData`** para recarga automática
- ✅ **Optimización de consultas** con paginación
- ✅ **Logs de debug** solo en desarrollo
- ✅ **Respuesta estructurada** con propiedades y paginación

**Ejemplo de uso:**
```typescript
// En una página de servidor (SSR)
const { properties } = await getProperties({ categoryId: 'apartments', locale: 'en' });

// En un componente cliente (con recarga automática)
const { data: propertiesData, loading, error } = useLanguageData(
    (locale: string) => getProperties({ categoryId: 'apartments', locale }),
    { properties: [], pagination: {} },
    ['apartments']
);
```

**Componente de ejemplo:** `components/pages/CategoryContent.tsx`
- Usa `useLanguageData` para recarga automática
- Maneja estados de carga y error
- Compatible con SSR y cambio de idioma

## Hooks Personalizados para Idiomas

### useLanguage Hook (`hooks/useLanguage.ts`)

```typescript
import { useLanguage } from '@/hooks/useLanguage';

const { 
  currentLanguage,      // Idioma actual
  changeLanguage,       // Función para cambiar idioma
  availableLanguages,   // Lista de idiomas disponibles
  getCurrentLocale      // Función para obtener el locale actual
} = useLanguage();
```

### useLanguageData Hook (`hooks/useLanguageData.ts`)

**Nuevo hook para componentes que necesitan recargar datos al cambiar idioma:**

```typescript
import { useLanguageData } from '@/hooks/useLanguageData';
import { getProperties } from '@/services/properties';

// En un componente cliente
const { data: properties, loading, error } = useLanguageData(
  (locale: string) => getProperties({ locale }),
  initialProperties || [],
  [] // Dependencias adicionales
);
```

**Características del hook:**

- ✅ **Recarga automática** - Se ejecuta cuando cambia el idioma
- ✅ **Estado de carga** - Proporciona `loading` y `error` 
- ✅ **Datos iniciales** - Usa datos del servidor como fallback
- ✅ **Dependencias** - Recarga cuando cambian otras variables
- ✅ **Gestión de errores** - Mantiene datos anteriores si hay error

## Utilidad para Servicios

### getCurrentLocale (`utils/get-current-locale.ts`)

```typescript
import { 
  getCurrentLocale, 
  getLocaleWithFallback, 
  updateCurrentLocale 
} from '@/utils/get-current-locale';

// Obtener el idioma actual directamente
const currentLocale = getCurrentLocale();

// Obtener locale con fallback (para servicios)
const locale = getLocaleWithFallback(providedLocale);

// Actualizar el idioma global (usado internamente por LanguageSelector)
updateCurrentLocale('en');
```

### Funcionamiento Interno

El sistema mantiene una variable global `currentLocale` que:
- Se inicializa desde `localStorage` al cargar la página
- Se actualiza automáticamente cuando cambias el idioma en el `LanguageSelector`
- Es compatible con Server-Side Rendering (SSR)
- No usa hooks de React, evitando errores de hidratación

## Ejemplo de Uso

### Componente que Usa los Servicios (Automático)

```typescript
'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { getProperties } from '@/services/properties';
import { useEffect, useState } from 'react';

export default function PropertiesPage() {
  const { currentLanguage } = useLanguage();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const loadProperties = async () => {
      // Los servicios ahora usan automáticamente el idioma seleccionado
      const data = await getProperties({}); // Sin especificar locale
      setProperties(data);
    };
    
    loadProperties();
  }, [currentLanguage]); // Recargar cuando cambie el idioma

  return (
    <div>
      <h1>Propiedades ({currentLanguage})</h1>
      {properties.map(property => (
        <div key={property.id}>
          <h2>{property.title}</h2>
          <p>{property.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Ejemplo con Locale Específico (Opcional)

```typescript
// Si necesitas un idioma específico, aún puedes pasarlo:
const spanishProperties = await getProperties({ locale: 'es' });
const englishCategories = await getCategories('en');
```

## Selector de Idioma

El componente `LanguageSelector` ya está configurado y funciona correctamente:

```typescript
import LanguageSelector from '@/components/elements/LanguageSelector';

// En cualquier componente
<LanguageSelector />
```

## Configuración de Strapi

### Parámetros de Query

Todos los servicios ahora incluyen el parámetro `locale` en las consultas:

```
// Ejemplo de query generada
properties?populate=main_image&populate=category&locale=es
```

### Campos Localizados

Para que un campo soporte múltiples idiomas en Strapi, debe tener esta configuración en el schema:

```json
{
  "title": {
    "type": "string",
    "pluginOptions": {
      "i18n": {
        "localized": true
      }
    }
  }
}
```

## Flujo de Trabajo

1. **Usuario selecciona idioma** → `LanguageSelector` cambia el idioma en i18n
2. **Sistema actualiza idioma global** → `updateCurrentLocale()` actualiza variable global
3. **Componentes detectan cambio** → `useLanguageData` hook reacciona al cambio
4. **Servicios son llamados** → Con el nuevo `locale` automáticamente
5. **Strapi retorna contenido** → En el idioma solicitado
6. **UI se actualiza** → Con el contenido localizado

### Ventajas del Sistema Reactivo

- ✅ **Recarga automática** - Los componentes se actualizan cuando cambia el idioma
- ✅ **Menos código repetitivo** - El hook `useLanguageData` maneja todo
- ✅ **Consistencia** - Todos los componentes reaccionan de la misma forma
- ✅ **Flexibilidad** - Puedes anular el idioma cuando sea necesario
- ✅ **Mantenimiento** - Un solo lugar para cambiar el comportamiento
- ✅ **SSR Compatible** - Funciona tanto en servidor como en cliente

## Componente de Ejemplo

Se ha creado un componente de ejemplo en `components/examples/PropertiesWithLocale.tsx` que demuestra:

- Cómo usar el hook `useLanguage`
- Cómo llamar a los servicios con locale
- Cómo reaccionar a cambios de idioma
- Filtrado por categorías con locale
- Obtención de detalles de propiedades con locale

## Consideraciones Importantes

1. **Idioma por defecto**: Los servicios ahora usan automáticamente el idioma seleccionado en el `LanguageSelector`
2. **SSR Compatible**: El sistema es compatible con Server-Side Rendering, no causa errores de hidratación
3. **Sincronización automática**: El idioma global se sincroniza automáticamente con el `LanguageSelector`
4. **Fallback**: Si no hay contenido en un idioma, Strapi puede devolver el contenido en el idioma por defecto
5. **Caching**: Considerar que el cache debe ser por idioma
6. **SEO**: Las URLs deberían incluir el idioma para SEO
7. **Automático**: Ya no necesitas pasar el parámetro `locale` - se obtiene automáticamente del selector

## Convertir Componentes Existentes

### Para componentes que muestran datos dinámicos:

1. **Agregar 'use client'** al inicio del archivo
2. **Importar el hook**: `import { useLanguageData } from '@/hooks/useLanguageData'`
3. **Reemplazar props directas** con el hook:

```typescript
// ANTES
export default function MyComponent({ data }: { data: any[] }) {
  return (
    <div>
      {data.map(item => <div key={item.id}>{item.title}</div>)}
    </div>
  );
}

// DESPUÉS
'use client'
import { useLanguageData } from '@/hooks/useLanguageData';
import { getMyData } from '@/services/myService';

export default function MyComponent({ data: initialData }: { data: any[] }) {
  const { data, loading, error } = useLanguageData(
    (locale: string) => getMyData({ locale }),
    initialData || [],
    []
  );
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {data.map(item => <div key={item.id}>{item.title}</div>)}
    </div>
  );
}
```

### Para componentes que NO cambian con idioma:

- **Mantener como están** - No necesitan cambios
- **Ejemplos**: Layouts, botones, elementos puramente visuales

## Páginas de Debug

### `/debug/properties`
- Prueba el cambio de idioma
- Muestra logs de debug
- Verifica la carga de datos

## Próximos Pasos

1. Configurar localización para Categories
2. Agregar más campos localizados según necesidades
3. Implementar URLs con idioma para SEO
4. Configurar fallbacks apropiados en Strapi
5. Optimizar caching por idioma

## Solución de Errores SSR

### Error: "useEffect only works in client components"

**Problema**: Los servicios importaban funciones que usan hooks de React, causando errores en Server-Side Rendering.

**Solución**: El sistema ahora usa una variable global que:
- No depende de hooks de React
- Se inicializa automáticamente desde `localStorage`
- Se actualiza cuando cambia el idioma en el `LanguageSelector`
- Es compatible con SSR

```typescript
// ✅ Correcto - Sin hooks de React
export function getCurrentLocale(): string {
  if (typeof window !== 'undefined') {
    return currentLocale; // Variable global
  }
  return 'es'; // Fallback para servidor
}
```

## Debugging

Para debug, todos los servicios incluyen logs que muestran:
- El locale utilizado
- La query string generada
- Los datos recibidos

```javascript
console.log('=== Service DEBUG ===');
console.log('Locale:', locale);
console.log('Query string:', queryString);
``` 