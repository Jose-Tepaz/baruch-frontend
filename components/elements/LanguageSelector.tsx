'use client';
import { useTranslation } from "@/utils/i18n-simple";
import { useState, useEffect } from 'react';

const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

export default function LanguageSelector() {
    const { i18n, t } = useTranslation('common');
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode as any);
        setIsOpen(false);
    };

    // No renderizar hasta que esté montado para evitar hidratación
    if (!mounted) {
        return (
            <div className="language-selector">
                <button className="language-toggle">
                    <span className="flag">🇪🇸</span>
                    <span className="lang-name">Español</span>
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
                >
                    <span className="flag">{currentLanguage.flag}</span>
                    <span className="lang-name">{currentLanguage.name}</span>
                    <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} />
                </button>
                
                {isOpen && (
                    <div className="language-dropdown">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                className={`language-option ${lang.code === i18n.language ? 'active' : ''}`}
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                <span className="flag">{lang.flag}</span>
                                <span className="lang-name">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .language-selector {
                    position: relative;
                    display: inline-block;
                }

                .language-toggle {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    background: rgba(255, 255, 255, 0.9);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    color: #333;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                    font-weight: 500;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .language-toggle:hover {
                    background: rgba(255, 255, 255, 1);
                    border-color: #007bff;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .language-toggle:active {
                    transform: translateY(0);
                }

                .flag {
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                }

                .lang-name {
                    font-weight: 600;
                    letter-spacing: 0.3px;
                }

                .fa-chevron-up,
                .fa-chevron-down {
                    font-size: 12px;
                    transition: transform 0.3s ease;
                    color: #666;
                }

                .language-dropdown {
                    position: absolute;
                    top: calc(100% + 8px);
                    right: 0;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    z-index: 1000;
                    min-width: 180px;
                    overflow: hidden;
                    animation: dropdownSlide 0.3s ease;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }

                @keyframes dropdownSlide {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .language-option {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                    padding: 12px 16px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: left;
                    color: #333;
                    font-size: 14px;
                }

                .language-option:hover {
                    background: #f8f9fa;
                }

                .language-option.active {
                    background: #e3f2fd;
                    color: #1976d2;
                    font-weight: 600;
                }

                .language-option .flag {
                    font-size: 18px;
                    width: 20px;
                    display: flex;
                    justify-content: center;
                }

                .language-option .lang-name {
                    flex: 1;
                    font-weight: 500;
                }

                .language-option.active .lang-name {
                    font-weight: 600;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .language-dropdown {
                        right: auto;
                        left: 0;
                        min-width: 160px;
                    }

                    .language-toggle {
                        padding: 6px 10px;
                        font-size: 13px;
                    }

                    .flag {
                        font-size: 14px;
                    }

                    .language-option {
                        padding: 10px 12px;
                        font-size: 13px;
                    }
                }

                /* Tema oscuro */
                @media (prefers-color-scheme: dark) {
                    .language-toggle {
                        background: rgba(45, 55, 72, 0.9);
                        border-color: rgba(255, 255, 255, 0.2);
                        color: white;
                    }

                    .language-toggle:hover {
                        background: rgba(45, 55, 72, 1);
                        border-color: #90cdf4;
                    }

                    .language-dropdown {
                        background: #2d3748;
                        border-color: rgba(255, 255, 255, 0.1);
                    }

                    .language-option {
                        color: white;
                    }

                    .language-option:hover {
                        background: #4a5568;
                    }

                    .language-option.active {
                        background: #3182ce;
                        color: white;
                    }
                }
            `}</style>
        </>
    );
} 