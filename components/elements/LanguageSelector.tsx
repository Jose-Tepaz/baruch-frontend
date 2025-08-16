'use client';
import { useTranslation } from "@/utils/i18n-simple";
import { updateCurrentLocale, getCurrentLocale } from "@/utils/get-current-locale";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';
import type { Language } from '@/utils/i18n-simple';

const languages: Array<{code: Language; name: string; flag: string}> = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
];

export default function LanguageSelector() {
    const { i18n, t } = useTranslation('common');
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
        setMounted(true);
        // Sincronizar el idioma con la cookie al montar
        const cookieLocale = getCookie('NEXT_LOCALE');
        if (cookieLocale && typeof cookieLocale === 'string' && languages.some(l => l.code === cookieLocale)) {
            i18n.changeLanguage(cookieLocale as Language);
            updateCurrentLocale(cookieLocale as Language);
        }
    }, []);
    
    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const handleLanguageChange = async (langCode: Language) => {
        if (langCode === i18n.language) {
            setIsOpen(false);
            return;
        }

        // Actualizar cookie
        setCookie('NEXT_LOCALE', langCode, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365, // 1 año
        });

        // Actualizar i18n y estado global
        i18n.changeLanguage(langCode);
        updateCurrentLocale(langCode);
        setIsOpen(false);

        // Construir nueva URL
        let newPath = pathname;
        const currentLocalePattern = /^\/[a-z]{2}(?:\/|$)/;
        
        if (currentLocalePattern.test(pathname)) {
            // Reemplazar locale existente
            newPath = pathname.replace(currentLocalePattern, `/${langCode}/`);
        } else {
            // Agregar nuevo locale
            newPath = `/${langCode}${pathname === '/' ? '' : pathname}`;
        }

        // Eliminar doble slash si existe
        newPath = newPath.replace(/\/\/$/, '/');

        // Mostrar feedback visual
        const message = document.createElement('div');
        message.innerHTML = `
            <div class="alert alert-info position-fixed" style="top: 20px; right: 20px; z-index: 9999;">
                <i class="fa fa-globe"></i> ${t('language.changing')} ${languages.find(l => l.code === langCode)?.name}...
            </div>
        `;
        document.body.appendChild(message);

        // Navegar a la nueva URL
        router.push(newPath);

        // Limpiar mensaje después de 2 segundos
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 2000);
    };

    // No renderizar hasta que esté montado para evitar hidratación
    if (!mounted) {
        return (
            <div className="language-selector">
                <button className="language-toggle">
                    <span className="flag">{currentLanguage.flag}</span>
                    <span className="lang-name">{currentLanguage.name}</span>
                    <i className="fa-solid fa-chevron-down" />
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="language-selector">
                <button 
                    className="language-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={t('language.selectLanguage')}
                >
                    <span className="flag">{currentLanguage.flag}</span>
                    <span className="lang-name">{currentLanguage.name}</span>
                    <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} />
                </button>
                
                {isOpen && (
                    <div className="language-dropdown" role="menu">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                className={`language-option ${lang.code === i18n.language ? 'active' : ''}`}
                                onClick={() => handleLanguageChange(lang.code)}
                                role="menuitem"
                                aria-current={lang.code === i18n.language}
                            >
                                <span className="flag">{lang.flag}</span>
                                <span className="lang-name">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            
        </>
    );
} 