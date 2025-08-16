import { useTranslation } from "@/utils/i18n-simple";
import { getCurrentLocale, updateCurrentLocale, refreshLocaleFromURL } from "@/utils/get-current-locale";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useLanguage = () => {
    const { i18n } = useTranslation('common');
    const pathname = usePathname();
    
    useEffect(() => {
        // Refrescar el locale desde la URL cuando cambie
        refreshLocaleFromURL();
        
        // Detectar idioma desde la URL cada vez que cambie
        const detectLanguageFromURL = () => {
            if (typeof window === 'undefined') return 'en';
            
            const currentPath = pathname;
            console.log('=== useLanguage: Detecting language from URL:', currentPath);
            
            // Si la URL es solo "/" o no tiene código de idioma, es inglés (por defecto)
            if (currentPath === '/' || !currentPath.match(/^\/[a-z]{2}(\/|$)/)) {
                return 'en';
            }
            
            const localeMatch = currentPath.match(/^\/([a-z]{2})(\/|$)/);
            
            if (localeMatch) {
                const locale = localeMatch[1];
                const supportedLocales = ['en', 'es', 'fr', 'de', 'pl', 'sv', 'nl'];
                
                if (supportedLocales.includes(locale)) {
                    return locale;
                }
            }
            
            return 'en'; // Fallback a inglés
        };
        
        const urlLanguage = detectLanguageFromURL();
        console.log('=== useLanguage: URL language detected:', urlLanguage);
        console.log('=== useLanguage: Current i18n language:', i18n.language);
        
        // Si el idioma de la URL es diferente al actual, actualizar
        if (urlLanguage !== i18n.language) {
            console.log('=== useLanguage: Updating language from', i18n.language, 'to', urlLanguage);
            i18n.changeLanguage(urlLanguage as any);
            updateCurrentLocale(urlLanguage);
        }
    }, [pathname, i18n]);
    
    return {
        currentLanguage: i18n.language,
        changeLanguage: (lang: string) => {
            console.log('=== useLanguage: Manual language change to:', lang);
            i18n.changeLanguage(lang as any);
            updateCurrentLocale(lang); // Actualizar el idioma global para los servicios
        },
        availableLanguages: ['es', 'en', 'fr', 'de', 'pl', 'sv', 'nl'],
        getCurrentLocale: () => getCurrentLocale()
    };
}; 