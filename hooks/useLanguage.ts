import { useTranslation } from "@/utils/i18n-simple";
import { getCurrentLocale, updateCurrentLocale, refreshLocaleFromURL } from "@/utils/get-current-locale";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useLanguage = () => {
    const { i18n } = useTranslation('common');
    const pathname = usePathname();
    
    useEffect(() => {
        // Solo detectar idioma desde URL cuando cambie la ruta
        const detectLanguageFromURL = () => {
            if (typeof window === 'undefined') return 'en';
            
            const currentPath = pathname;
            
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
        
        // Solo actualizar si es diferente y no es la primera carga
        if (urlLanguage !== i18n.language) {
            i18n.changeLanguage(urlLanguage as any);
            updateCurrentLocale(urlLanguage);
        }
    }, [pathname]); // Remover i18n de las dependencias para evitar bucles
    
    return {
        currentLanguage: i18n.language,
        changeLanguage: (lang: string) => {
            i18n.changeLanguage(lang as any);
            updateCurrentLocale(lang);
        },
        availableLanguages: ['es', 'en', 'fr', 'de', 'pl', 'sv', 'nl'],
        getCurrentLocale: () => getCurrentLocale()
    };
}; 