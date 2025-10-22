// Variable global para almacenar el idioma actual
let currentLocale: string = 'en';

// Auto-inicializar el idioma desde localStorage al cargar (solo en cliente)
if (typeof window !== 'undefined') {
  try {
    // Primero intentar detectar desde la URL
    const urlLocale = detectLocaleFromURL();
    if (urlLocale) {
      currentLocale = urlLocale;
      // Guardar en localStorage
      localStorage.setItem('language', urlLocale);
    } else {
      // Si no hay en URL, usar localStorage
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        currentLocale = savedLanguage;
      }
    }
  } catch (error) {
    console.warn('Error accessing localStorage:', error);
  }
}

/**
 * Detecta el idioma desde la URL actual
 */
function detectLocaleFromURL(): string | null {
  if (typeof window === 'undefined') return null;
  
  const pathname = window.location.pathname;
  
  // Si la URL es solo "/" o no tiene código de idioma, es inglés (por defecto)
  if (pathname === '/' || !pathname.match(/^\/[a-z]{2}(\/|$)/)) {
    return 'en';
  }
  
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  
  if (localeMatch) {
    const locale = localeMatch[1];
    const supportedLocales = ['en', 'es', 'fr', 'de', 'pl', 'sv', 'nl'];
    
    if (supportedLocales.includes(locale)) {
      return locale;
    }
  }
  
  return 'en'; // Fallback a inglés
}

/**
 * Actualiza el idioma actual desde el LanguageSelector
 * Esta función debe ser llamada desde el LanguageSelector cuando cambie el idioma
 */
export function updateCurrentLocale(newLocale: string): void {
  currentLocale = newLocale;
  
  // Guardar en localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('language', newLocale);
    } catch (error) {
      console.warn('Error saving language to localStorage:', error);
    }
  }
}

/**
 * Obtiene el idioma actual seleccionado en el LanguageSelector
 * Para usar en servicios que necesitan el locale actual
 */
export function getCurrentLocale(): string {
  return currentLocale;
}

/**
 * Obtiene el locale con fallback a inglés
 * Para usar en servicios que necesitan garantizar un locale válido
 */
export function getLocaleWithFallback(locale?: string): string {
  if (locale && locale.trim() !== '') {
    return locale;
  }
  
  return getCurrentLocale();
}

/**
 * Fuerza una actualización del idioma desde la URL
 * Útil para sincronizar después de cambios de navegación
 */
export function refreshLocaleFromURL(): void {
  if (typeof window !== 'undefined') {
    const urlLocale = detectLocaleFromURL();
    
    if (urlLocale && urlLocale !== currentLocale) {
      currentLocale = urlLocale;
      
      // Guardar en localStorage
      try {
        localStorage.setItem('language', urlLocale);
      } catch (error) {
        console.warn('Error saving language to localStorage:', error);
      }
    }
  }
} 