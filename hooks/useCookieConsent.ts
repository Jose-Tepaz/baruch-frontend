'use client';

import { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'cookie-consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return;

    // Verificar si hay consentimiento guardado
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
    
    if (consent === 'accepted') {
      setHasConsent(true);
    } else {
      setHasConsent(false);
    }
    
    setIsLoading(false);
  }, []);

  const acceptCookies = () => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setHasConsent(true);
    
    // Disparar evento personalizado para que los scripts se carguen
    window.dispatchEvent(new CustomEvent('cookie-consent-accepted'));
  };

  const rejectCookies = () => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setHasConsent(false);
  };

  const hasConsentBeenGiven = (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
  };

  const hasConsentBeenSet = (): boolean => {
    if (typeof window === 'undefined') return false;
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    return consent === 'accepted' || consent === 'rejected';
  };

  return {
    hasConsent,
    isLoading,
    acceptCookies,
    rejectCookies,
    hasConsentBeenGiven,
    hasConsentBeenSet,
  };
}

