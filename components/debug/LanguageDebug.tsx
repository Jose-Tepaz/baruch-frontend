'use client'
import { useLanguage } from '@/hooks/useLanguage'
import { useLanguageData } from '@/hooks/useLanguageData'
import { getProperties } from '@/services/get-properties'
import { getCurrentLocale, refreshLocaleFromURL } from '@/utils/get-current-locale'
import { useTranslation } from '@/utils/i18n-simple'
import { useEffect, useState } from 'react'

export default function LanguageDebug() {
    const { currentLanguage } = useLanguage()
    const { t, i18n } = useTranslation()
    const [debugInfo, setDebugInfo] = useState({
        currentLanguage: '',
        i18nLanguage: '',
        currentLocale: '',
        url: '',
        localStorage: '',
        urlDetected: ''
    })

    const { data: properties, loading, error, refetch } = useLanguageData(
        (locale: string) => {
            console.log('=== LanguageDebug: Fetching properties with locale:', locale)
            return getProperties({ locale })
        },
        { properties: [], pagination: {} },
        [currentLanguage]
    )

    const detectLanguageFromURL = () => {
        if (typeof window === 'undefined') return 'en';
        
        const pathname = window.location.pathname;
        
        // Si la URL es solo "/" o no tiene código de idioma, es inglés (por defecto)
        if (pathname === '/' || !pathname.match(/^\/[a-z]{2}(\/|$)/)) {
            return 'en';
        }
        
        const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
        
        if (localeMatch) {
            const locale = localeMatch[1];
            const supportedLocales = ['en', 'es', 'fr', 'de', 'it', 'pt'];
            
            if (supportedLocales.includes(locale)) {
                return locale;
            }
        }
        
        return 'en'; // Fallback a inglés
    };

    useEffect(() => {
        const urlDetected = detectLanguageFromURL();
        
        setDebugInfo({
            currentLanguage,
            i18nLanguage: i18n.language,
            currentLocale: getCurrentLocale(),
            url: window.location.pathname,
            localStorage: localStorage.getItem('language') || 'none',
            urlDetected
        })
    }, [currentLanguage, i18n.language])

    const handleForceRefresh = () => {
        console.log('=== LanguageDebug: Forcing refresh...');
        refreshLocaleFromURL();
        refetch(); // Forzar recarga de datos
        
        // Forzar actualización del estado
        const urlDetected = detectLanguageFromURL();
        setDebugInfo({
            currentLanguage,
            i18nLanguage: i18n.language,
            currentLocale: getCurrentLocale(),
            url: window.location.pathname,
            localStorage: localStorage.getItem('language') || 'none',
            urlDetected
        });
    };

    return (
        <div className="p-4 bg-light border rounded m-3">
            <h3>🐛 Language Debug Info</h3>
            
            <div className="mb-3">
                <button 
                    className="btn btn-warning btn-sm me-2"
                    onClick={handleForceRefresh}
                >
                    🔄 Force Refresh
                </button>
                <small className="text-muted">Click to force language detection refresh</small>
            </div>
            
            <div className="row">
                <div className="col-md-6">
                    <h5>Language States:</h5>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>useLanguage().currentLanguage:</strong> {debugInfo.currentLanguage}
                        </li>
                        <li className="list-group-item">
                            <strong>i18n.language:</strong> {debugInfo.i18nLanguage}
                        </li>
                        <li className="list-group-item">
                            <strong>getCurrentLocale():</strong> {debugInfo.currentLocale}
                        </li>
                        <li className="list-group-item">
                            <strong>URL:</strong> {debugInfo.url}
                        </li>
                        <li className="list-group-item">
                            <strong>localStorage:</strong> {debugInfo.localStorage}
                        </li>
                        <li className="list-group-item">
                            <strong>URL Detected:</strong> {debugInfo.urlDetected}
                        </li>
                    </ul>
                </div>
                
                <div className="col-md-6">
                    <h5>Properties Data:</h5>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
                        </li>
                        <li className="list-group-item">
                            <strong>Error:</strong> {error || 'None'}
                        </li>
                        <li className="list-group-item">
                            <strong>Properties Count:</strong> {properties?.properties?.length || 0}
                        </li>
                        <li className="list-group-item">
                            <strong>First Property Title:</strong> {properties?.properties?.[0]?.title || 'None'}
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="mt-3">
                <h5>Test Translation:</h5>
                <p><strong>Common.loading:</strong> {t('common.loading')}</p>
                <p><strong>Properties.title:</strong> {t('properties.title')}</p>
            </div>
        </div>
    )
} 