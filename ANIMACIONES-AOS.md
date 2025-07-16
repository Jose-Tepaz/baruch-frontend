# Guía Completa de Animaciones AOS (Animate On Scroll)

## **Efectos de Animación (`data-aos`)**

### **Fade (Desvanecimiento)**
- `fade-up` - Aparece desde abajo
- `fade-down` - Aparece desde arriba  
- `fade-right` - Aparece desde la derecha
- `fade-left` - Aparece desde la izquierda
- `fade-up-right` - Aparece diagonal desde abajo-derecha
- `fade-up-left` - Aparece diagonal desde abajo-izquierda
- `fade-down-right` - Aparece diagonal desde arriba-derecha
- `fade-down-left` - Aparece diagonal desde arriba-izquierda

### **Flip (Volteo)**
- `flip-left` - Voltea desde la izquierda
- `flip-right` - Voltea desde la derecha
- `flip-up` - Voltea desde abajo
- `flip-down` - Voltea desde arriba

### **Slide (Deslizamiento)**
- `slide-up` - Se desliza desde abajo
- `slide-down` - Se desliza desde arriba
- `slide-right` - Se desliza desde la izquierda
- `slide-left` - Se desliza desde la derecha

### **Zoom (Escalado)**
- `zoom-in` - Se agranda desde el centro
- `zoom-in-up` - Se agranda desde abajo
- `zoom-in-down` - Se agranda desde arriba
- `zoom-in-left` - Se agranda desde la izquierda
- `zoom-in-right` - Se agranda desde la derecha
- `zoom-out` - Se encoge desde el centro
- `zoom-out-up` - Se encoge hacia arriba
- `zoom-out-down` - Se encoge hacia abajo
- `zoom-out-left` - Se encoge hacia la izquierda
- `zoom-out-right` - Se encoge hacia la derecha

## **Propiedades de Control**

### **Duración (`data-aos-duration`)**
- `300` - 300ms (rápido)
- `600` - 600ms (medio)
- `1000` - 1 segundo (lento)
- `1500` - 1.5 segundos (muy lento)

### **Delay (`data-aos-delay`)**
- `0` - Sin retraso
- `100` - 100ms de retraso
- `200` - 200ms de retraso
- `300` - 300ms de retraso

### **Easing (`data-aos-easing`)**
- `ease` - Suave
- `ease-in` - Lento al inicio
- `ease-out` - Lento al final
- `ease-in-out` - Lento al inicio y final
- `ease-in-back` - Con rebote al inicio
- `ease-out-back` - Con rebote al final
- `ease-in-out-back` - Con rebote en ambos extremos

### **Offset (`data-aos-offset`)**
- `0` - Se activa cuando el elemento toca el borde superior
- `200` - Se activa 200px antes
- `300` - Se activa 300px antes

### **Once (`data-aos-once`)**
- `true` - La animación ocurre solo una vez
- `false` - La animación se repite cada vez que el elemento entra en viewport

### **Anchor Placement (`data-aos-anchor-placement`)**
- `top-bottom` - Se activa cuando la parte superior del elemento toca la parte inferior del viewport
- `center-bottom` - Se activa cuando el centro del elemento toca la parte inferior
- `bottom-bottom` - Se activa cuando la parte inferior del elemento toca la parte inferior del viewport

## **Ejemplos de Uso**

### **Animación Básica**
```jsx
<div data-aos="fade-up">Contenido</div>
```

### **Animación con Duración Personalizada**
```jsx
<div data-aos="zoom-in" data-aos-duration="1000">Contenido</div>
```

### **Animación con Retraso**
```jsx
<div data-aos="slide-left" data-aos-delay="200">Contenido</div>
```

### **Animación con Easing Personalizado**
```jsx
<div data-aos="fade-up" data-aos-easing="ease-in-out">Contenido</div>
```

### **Animación que Ocurre Solo Una Vez**
```jsx
<div data-aos="zoom-in" data-aos-once="true">Contenido</div>
```

### **Control de Cuándo Se Activa**
```jsx
// Se activa cuando está más cerca del viewport
<div data-aos="fade-up" data-aos-offset="100">Contenido</div>

// Se activa cuando está muy cerca del viewport
<div data-aos="fade-up" data-aos-offset="50">Contenido</div>

// Combinación de offset y anchor placement
<div 
  data-aos="fade-up" 
  data-aos-offset="200"
  data-aos-anchor-placement="top-bottom"
>
  Contenido
</div>
```

### **Animación Completa con Múltiples Propiedades**
```jsx
<div 
  data-aos="fade-up"
  data-aos-duration="800"
  data-aos-delay="200"
  data-aos-easing="ease-in-out"
  data-aos-offset="150"
  data-aos-once="true"
>
  Contenido
</div>
```

## **Casos de Uso Comunes**

### **Títulos de Sección**
```jsx
<h2 data-aos="fade-up" data-aos-duration="600">Título de Sección</h2>
```

### **Tarjetas de Producto**
```jsx
<div data-aos="zoom-in" data-aos-delay="100">Tarjeta 1</div>
<div data-aos="zoom-in" data-aos-delay="200">Tarjeta 2</div>
<div data-aos="zoom-in" data-aos-delay="300">Tarjeta 3</div>
```

### **Imágenes**
```jsx
<img data-aos="fade-left" data-aos-duration="1000" src="imagen.jpg" />
```

### **Botones**
```jsx
<button data-aos="fade-up" data-aos-delay="400">Ver Más</button>
```

## **Tips y Mejores Prácticas**

1. **No abuses de las animaciones** - Usa solo cuando mejore la UX
2. **Mantén consistencia** - Usa los mismos efectos en elementos similares
3. **Considera la duración** - Animaciones muy largas pueden ser molestas
4. **Prueba en móviles** - Las animaciones pueden afectar el rendimiento
5. **Usa `once="true"`** para elementos que no necesitan repetirse
6. **Ajusta el offset** para controlar cuándo se activa la animación

## **Solución de Problemas**

### **Animación se activa muy temprano**
```jsx
<div data-aos="fade-up" data-aos-offset="300">Contenido</div>
```

### **Animación no se activa**
- Verifica que AOS esté inicializado
- Asegúrate de que el elemento sea visible
- Prueba con un offset menor

### **Animación es muy lenta**
```jsx
<div data-aos="fade-up" data-aos-duration="300">Contenido</div>
```

### **Animación se repite constantemente**
```jsx
<div data-aos="fade-up" data-aos-once="true">Contenido</div>
``` 