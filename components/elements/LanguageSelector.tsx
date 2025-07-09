'use client';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
];

export default function LanguageSelector() {
  const { i18n, t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Encontrar el idioma actual
    const current = languages.find(lang => lang.code === i18n.language) || languages[0];
    setCurrentLanguage(current);
  }, [i18n.language]);

  useEffect(() => {
    // Cerrar dropdown cuando se hace clic fuera
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (language: Language) => {
    i18n.changeLanguage(language.code);
    setCurrentLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        
        <span className="language-code">{currentLanguage.code.toUpperCase()}</span>
        <span className="dropdown-arrow">
          <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} />
        </span>
      </button>

      {isOpen && (
                 <div className="language-dropdown">
           <div className="dropdown-header">
             <h6>{t('language.selectLanguage') || 'Select Language'}</h6>
           </div>
          <div className="language-list">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`language-option ${currentLanguage.code === language.code ? 'active' : ''}`}
                onClick={() => handleLanguageChange(language)}
              >
                <span style={{color: '#fff'}}>{language.flag}</span>
                <div className="language-info">
                  <span className="native-name">{language.nativeName}</span>
                  <span className="english-name">{language.name}</span>
                </div>
                {currentLanguage.code === language.code && (
                  <span className="check-icon">
                    <i className="fa-solid fa-check" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .language-selector {
          position: relative;
          display: inline-block;
        }

        .language-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .language-button:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .language-button:active {
          transform: translateY(0);
        }

        .flag {
        color: #000;
          font-size: 16px;
          display: flex;
          align-items: center;
        }

        .language-code {
        color: #000;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .dropdown-arrow {
        color: #000;
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .language-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          min-width: 200px;
          overflow: hidden;
          animation: dropdownSlide 0.3s ease;
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

        .dropdown-header {
          padding: 12px 16px;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }

        .dropdown-header h6 {
          margin: 0;
          font-size: 12px;
          font-weight: 600;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .language-list {
          max-height: 300px;
          overflow-y: auto;
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
        }

        .language-option:hover {
          background: #f8f9fa;
        }

        .language-option.active {
          background: #e3f2fd;
          color: #1976d2;
        }

        .language-option .flag {
          font-size: 18px;
          width: 24px;
          display: flex;
          justify-content: center;
        }

        .language-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .native-name {
          font-weight: 500;
          font-size: 14px;
          line-height: 1.2;
        }

        .english-name {
          font-size: 12px;
          color: #6c757d;
          line-height: 1.2;
        }

        .check-icon {
          color: #1976d2;
          font-size: 12px;
        }

        /* Estilos para tema oscuro */
        @media (prefers-color-scheme: dark) {
          .language-dropdown {
            background: #2d3748;
            color: white;
          }

          .dropdown-header {
            background: #4a5568;
            border-bottom-color: #718096;
          }

          .dropdown-header h6 {
            color: #a0aec0;
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

          .english-name {
            color: #a0aec0;
          }

          .check-icon {
            color: #90cdf4;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .language-dropdown {
            right: auto;
            left: 0;
            min-width: 180px;
          }

          .language-button {
            padding: 6px 10px;
            font-size: 13px;
          }

          .flag {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
} 