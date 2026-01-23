import { useParams } from 'next/navigation';

/**
 * Hook personalizado para obtener rutas localizadas
 * 
 * Retorna una función que convierte una ruta a su versión localizada:
 * - En inglés (default): sin prefijo → /about-us
 * - Otros idiomas: con prefijo → /es/about-us, /fr/about-us, etc.
 * 
 * @example
 * const getLocalizedPath = useLocalizedPath();
 * <Link href={getLocalizedPath('/properties')}>Properties</Link>
 */
export function useLocalizedPath() {
  const params = useParams();
  
  // Detectar el idioma actual - si no hay params.lang, estamos en la raíz (inglés)
  const lang = (params.lang as string) || 'en';
  
  /**
   * Convierte una ruta a su versión localizada
   * @param path - Ruta base sin prefijo de idioma (ej: '/properties', '/about-us')
   * @returns Ruta localizada según el idioma actual
   */
  const getLocalizedPath = (path: string): string => {
    // Asegurar que el path empiece con /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    
    // Inglés sin prefijo, otros idiomas con prefijo
    return lang === 'en' ? normalizedPath : `/${lang}${normalizedPath}`;
  };
  
  return getLocalizedPath;
}

/**
 * Hook para obtener el idioma actual
 * 
 * @returns El código de idioma actual ('en', 'es', 'fr', etc.)
 */
export function useCurrentLanguage(): string {
  const params = useParams();
  return (params.lang as string) || 'en';
}
