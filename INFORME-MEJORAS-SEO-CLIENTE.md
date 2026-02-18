# Informe de Mejoras SEO – Baruch Real Estate

**Fecha:** Febrero 2025  
**Proyecto:** baruch-frontend / baruch-backend  
**Objetivo:** Mejorar la indexación en buscadores y la visibilidad de la web en Google y otros motores de búsqueda.

---

## Resumen Ejecutivo

Se han implementado una serie de mejoras técnicas en el sitio web de Baruch Real Estate para que los buscadores (Google, Bing, etc.) puedan encontrar, entender e indexar correctamente el contenido. Estas mejoras repercuten en:

- Mejor posicionamiento en resultados de búsqueda
- Menor riesgo de contenido duplicado
- Mejor experiencia para usuarios que llegan desde distintos países e idiomas

---

## 1. Imagen para redes sociales (Open Graph)

**¿Qué se hizo?**  
Se añadió una imagen principal (1200×630 px) que se muestra cuando se comparte el sitio en redes sociales, WhatsApp o correo.

**Impacto:**  
Al compartir enlaces del sitio, aparece una imagen atractiva en lugar de un enlace básico. Cuando tengas una imagen de marca definitiva (logotipo, inmuebles destacados, etc.), bastará con sustituir el archivo `public/og-image.jpg`.

---

## 2. Datos estructurados de la empresa (Schema.org)

**¿Qué se hizo?**  
Se actualizaron los datos de la empresa que Google y otros buscadores usan para mostrar información fiable (dirección, teléfono, tipo de negocio).

**Datos incorporados:**
- Nombre: Baruch Real Estate
- Dirección: C. Cam. Viejo de Málaga 28, 29700 Vélez-Málaga
- Teléfono: +34 951 651 123
- Tipo de negocio: Agente inmobiliario

**Impacto:**  
Facilita que aparezca información correcta en Google (por ejemplo, en el panel de empresa) y mejora la confianza de usuarios y buscadores.

---

## 3. Configuración de búsquedas (robots.txt)

**¿Qué se hizo?**  
Se ajustó el archivo que indica a los buscadores qué pueden y qué no pueden rastrear.

- Se eliminó la directiva `Crawl-delay`, que no es compatible con Google.
- Se mantiene bloqueado el acceso a páginas privadas (p. ej. propiedades exclusivas, login) para que no se indexen.

**Impacto:**  
Los robots de búsqueda pueden rastrear el sitio sin restricciones innecesarias y evitando indexar contenido confidencial.

---

## 4. Sitemap y páginas privadas

**¿Qué se hizo?**  
- Se excluyó la sección de propiedades privadas del sitemap, ya que no debe indexarse.
- Se configuró el sitemap para que refleje la fecha real de actualización de cada propiedad.

**Impacto:**  
El sitemap solo incluye contenido público y proporciona a Google información más precisa sobre cuándo cambian las páginas.

---

## 5. Datos estructurados en fichas de propiedades

**¿Qué se hizo?**  
En cada ficha de propiedad se añadieron datos técnicos legibles por buscadores: título, descripción, precio, imagen, estado (disponible, vendida), etc.

**Impacto:**  
Google puede entender mejor cada inmueble y mostrarlo en resultados enriquecidos (por ejemplo, con precio y ubicación). Esto puede aumentar el número de clics y la visibilidad.

---

## 6. Etiquetas canónicas y multiidioma (canonical y hreflang)

**¿Qué se hizo?**  
Se corrigió la configuración para que cada página tenga una URL canónica correcta y enlaces a sus versiones en otros idiomas.

**Problema anterior:**  
En páginas como Testimonials, Política de Privacidad o Contacto, al verlas en español o francés, los buscadores interpretaban URLs incorrectas (por ejemplo, pensando que la página era la home en lugar de testimonios).

**Solución:**  
Ahora cada versión de idioma indica claramente su propia URL:
- `/testimonials/` → versión en inglés
- `/es/testimonials/` → versión en español
- `/fr/testimonials/` → versión en francés
- etc.

Se aplicó la misma lógica a: **Testimonials**, **Política de Privacidad** y **Contacto**.

**Impacto:**  
Se evita contenido duplicado, se mejora el rastreo por idioma y se facilita que usuarios y buscadores encuentren la versión correcta de cada página.

---

## 7. Rutas en inglés y consistencia de URLs

**¿Qué se hizo?**  
Se aseguró que la versión en inglés use rutas limpias (por ejemplo, `/about-us/`, `/properties/`) y que los enlaces alternativos (`hreflang`) apunten a las URLs correctas según el idioma.

**Impacto:**  
URLs más claras y coherentes, mejor experiencia para usuarios y mejor comprensión por parte de los buscadores.

---

## Resumen de archivos y rutas modificados

| Área                      | Cambios principales                                  |
|---------------------------|------------------------------------------------------|
| Imagen OG                 | Nuevo archivo `og-image.jpg` en la carpeta pública   |
| Datos de empresa          | Nuevo archivo `config/company-seo.ts`                |
| Configuración buscadores  | `public/robots.txt`                                  |
| Mapa del sitio            | `app/sitemap.ts`                                     |
| Datos de propiedades      | `services/get-properties.ts`                          |
| Página principal          | `app/[lang]/page.tsx` (Schema.org empresa)           |
| Fichas de propiedades     | `app/[lang]/property/[property]/page.tsx` (Schema.org) |
| Testimonials              | `app/[lang]/testimonials/page.tsx`                   |
| Política de Privacidad    | `app/[lang]/privacy-policy/page.tsx`                 |
| Contacto                  | `app/[lang]/contact/page.tsx`                        |
| Rutas base (inglés)       | Páginas wrapper de testimonials, privacy-policy, contact |

---

## Próximos pasos recomendados

1. **Imagen corporativa definitiva:** Sustituir `public/og-image.jpg` por una imagen de marca (logo, inmueble destacado o diseño corporativo) en 1200×630 px.
2. **Redes sociales:** Si tienes perfiles oficiales (Facebook, Instagram, LinkedIn, etc.), se pueden añadir en la configuración para mejorar la presencia en resultados de búsqueda.
3. **Google Search Console:** Comprobar que el sitemap esté enviado y que no haya errores de indexación.
4. **Seguimiento:** En las próximas semanas, revisar en Search Console la evolución del número de páginas indexadas y de impresiones/clics.

---

## Preguntas frecuentes

**¿Cuándo veré resultados?**  
Las mejoras técnicas suelen reflejarse en un plazo de varias semanas. Google puede tardar días o semanas en re-evaluar el sitio.

**¿Puedo cambiar la imagen OG yo mismo?**  
Sí. Basta con reemplazar el archivo `og-image.jpg` en la carpeta `public/` por una imagen nueva (1200×630 px).

**¿Qué pasa con las propiedades vendidas?**  
Las propiedades marcadas como vendidas siguen teniendo una página, pero los datos estructurados indican a Google que no están disponibles, lo que evita confusiones en los resultados.

---

*Documento preparado como resumen de las mejoras SEO implementadas en el sitio de Baruch Real Estate.*
