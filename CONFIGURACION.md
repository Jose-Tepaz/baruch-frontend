# Configuración del Proyecto Baruch

## Problema Actual: Error de Hidratación Resuelto ✅

Hemos solucionado el error de hidratación separando los componentes servidor y cliente correctamente.

## Próximo Paso: Configurar Strapi

### 1. Crear archivo `.env.local`

Crea un archivo `.env.local` en la carpeta `baruch-frontend` con este contenido:

```env
# Strapi Configuration
STRAPI_HOST=http://localhost:1337
STRAPI_TOKEN=tu_token_de_api_aqui

# Next.js Configuration (opcional)
NEXT_PUBLIC_STRAPI_HOST=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=tu_token_de_api_aqui
```

### 2. Configurar Strapi Backend

1. **Iniciar Strapi:**
   ```bash
   cd baruch-backend
   npm run develop
   ```

2. **Acceder al panel de administración:**
   - Ir a: http://localhost:1337/admin
   - Crear cuenta de administrador

3. **Crear token de API:**
   - Settings → API Tokens
   - Create new token
   - Permisos necesarios:
     - `categories:find`
     - `properties:find`
   - Copiar el token generado

4. **Actualizar .env.local:**
   - Reemplazar `tu_token_de_api_aqui` con el token real

### 3. Crear Categorías de Propiedades

El backend actualmente tiene categorías de blog. Necesitas crear categorías de propiedades:

```javascript
// En Strapi admin, crear estas categorías manualmente:
- Houses
- Apartments  
- Condos
- Villas
- Townhouses
- Penthouses
- Lofts
- Cottages
```

### 4. Crear Propiedades de Ejemplo

En el panel de Strapi, crear algunas propiedades con:
- Título
- Descripción
- Precio
- Dirección
- Estado (sale/rent)
- Categoría
- Imagen principal

### 5. Reiniciar el Frontend

```bash
cd baruch-frontend
npm run dev
```

## Estado Actual

✅ Error de hidratación solucionado
✅ Componentes separados correctamente (servidor/cliente)
✅ Filtro simplificado sin problemas de hidratación
✅ Manejo de errores mejorado
⏳ Configuración de Strapi pendiente
⏳ Creación de datos de ejemplo pendiente

## Siguientes Pasos

1. Configurar variables de entorno
2. Crear categorías y propiedades en Strapi
3. Probar la funcionalidad completa
4. Agregar más funciones si es necesario 