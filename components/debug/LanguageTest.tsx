'use client';

import { useLanguage } from '@/hooks/useLanguage';
import LanguageSelector from '@/components/elements/LanguageSelector';

export default function LanguageTest() {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="p-4 border rounded">
      <h3>Language Test Component</h3>
      
      <div className="mb-3">
        <strong>Current Language:</strong> {currentLanguage}
      </div>
      
      <div className="mb-3">
        <strong>Language Selector:</strong>
        <div className="d-inline-block ms-2">
          <LanguageSelector />
        </div>
      </div>
      
      <div className="mb-3">
        <strong>Manual Language Change:</strong>
        <div className="btn-group ms-2" role="group">
          <button 
            className={`btn btn-sm ${currentLanguage === 'es' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => changeLanguage('es')}
          >
            Español
          </button>
          <button 
            className={`btn btn-sm ${currentLanguage === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
          <button 
            className={`btn btn-sm ${currentLanguage === 'fr' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => changeLanguage('fr')}
          >
            Français
          </button>
        </div>
      </div>
      
      <div className="alert alert-info">
        <small>
          <strong>Debug Info:</strong><br/>
          - Current Language: {currentLanguage}<br/>
          - Timestamp: {new Date().toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
} 