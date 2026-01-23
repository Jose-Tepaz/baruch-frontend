/**
 * Componente HreflangLinks
 * 
 * Genera tags hreflang para SEO multiidioma.
 * Nota: Next.js 13+ maneja esto automáticamente a través de metadata.alternates.languages,
 * pero este componente puede ser útil para casos especiales o páginas dinámicas.
 */

interface HreflangLinksProps {
  currentPath: string;
  currentLang?: string;
  baseUrl?: string;
}

const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'pl', 'sv', 'nl'];

export default function HreflangLinks({ 
  currentPath, 
  currentLang = 'en',
  baseUrl = 'https://www.baruchrealestate.com'
}: HreflangLinksProps) {
  
  // Limpiar la ruta de cualquier prefijo de idioma existente
  const cleanPath = currentPath.replace(/^\/[a-z]{2}(\/|$)/, '/');
  
  // Generar los links hreflang
  const hreflangLinks = SUPPORTED_LOCALES.map(locale => {
    let href: string;
    
    if (locale === 'en') {
      // Inglés va en la raíz sin prefijo
      href = `${baseUrl}${cleanPath === '/' ? '' : cleanPath}`;
    } else {
      // Otros idiomas tienen prefijo
      href = `${baseUrl}/${locale}${cleanPath === '/' ? '' : cleanPath}`;
    }
    
    // Asegurar que la URL termine correctamente
    if (href.endsWith('/') && href !== baseUrl + '/') {
      href = href.slice(0, -1);
    }
    
    return { locale, href };
  });
  
  // Agregar x-default (siempre apunta al inglés/raíz)
  const xDefaultHref = `${baseUrl}${cleanPath === '/' ? '' : cleanPath}`;
  
  return (
    <>
      {hreflangLinks.map(({ locale, href }) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={href}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={xDefaultHref}
      />
    </>
  );
}

/**
 * Hook helper para obtener la ruta actual limpia
 */
export function useCleanPath(pathname: string): string {
  return pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
}

/**
 * Función helper para generar el objeto de alternates para metadata
 */
export function generateAlternates(path: string) {
  const cleanPath = path.replace(/^\/[a-z]{2}(\/|$)/, '/');
  
  const languages: Record<string, string> = {};
  
  SUPPORTED_LOCALES.forEach(locale => {
    if (locale === 'en') {
      languages[locale] = cleanPath || '/';
    } else {
      languages[locale] = `/${locale}${cleanPath || ''}`;
    }
  });
  
  // x-default siempre apunta al inglés
  languages['x-default'] = cleanPath || '/';
  
  return {
    canonical: cleanPath || '/',
    languages
  };
}
