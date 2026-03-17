'use client';

import { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_ANALYTICS_KEY = 'cookie-analytics-enabled';
const COOKIE_MARKETING_KEY = 'cookie-marketing-enabled';

type ConsentStatus = 'accepted' | 'rejected' | null;

export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return;

    // Verificar si hay consentimiento guardado
    const consent = sessionStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
    
    if (consent === 'accepted') {
      setHasConsent(true);
    } else {
      setHasConsent(false);
    }
    
    setIsLoading(false);
  }, []);

  const acceptCookies = () => {
    if (typeof window === 'undefined') return;
    
    sessionStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    sessionStorage.setItem(COOKIE_ANALYTICS_KEY, 'true');
    sessionStorage.setItem(COOKIE_MARKETING_KEY, 'true');
    setHasConsent(true);
    
    // Disparar evento personalizado para que los scripts se carguen
    window.dispatchEvent(
      new CustomEvent('cookie-consent-updated', {
        detail: { analytics: true, marketing: true },
      }),
    );
    window.dispatchEvent(new CustomEvent('cookie-consent-accepted'));
  };

  const rejectCookies = () => {
    if (typeof window === 'undefined') return;
    
    sessionStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    sessionStorage.setItem(COOKIE_ANALYTICS_KEY, 'false');
    sessionStorage.setItem(COOKIE_MARKETING_KEY, 'false');
    setHasConsent(false);
    window.dispatchEvent(
      new CustomEvent('cookie-consent-updated', {
        detail: { analytics: false, marketing: false },
      }),
    );
    window.dispatchEvent(new CustomEvent('cookie-consent-rejected'));
  };

  const savePreferences = (analyticsEnabled: boolean, marketingEnabled: boolean) => {
    if (typeof window === 'undefined') return;

    sessionStorage.setItem(COOKIE_ANALYTICS_KEY, analyticsEnabled ? 'true' : 'false');
    sessionStorage.setItem(COOKIE_MARKETING_KEY, marketingEnabled ? 'true' : 'false');

    const hasAnyOptionalConsent = analyticsEnabled || marketingEnabled;

    sessionStorage.setItem(COOKIE_CONSENT_KEY, hasAnyOptionalConsent ? 'accepted' : 'rejected');
    setHasConsent(hasAnyOptionalConsent);
    window.dispatchEvent(
      new CustomEvent('cookie-consent-updated', {
        detail: { analytics: analyticsEnabled, marketing: marketingEnabled },
      }),
    );

    if (hasAnyOptionalConsent) {
      window.dispatchEvent(new CustomEvent('cookie-consent-accepted'));
      return;
    }

    window.dispatchEvent(new CustomEvent('cookie-consent-rejected'));
  };

  const getAnalyticsConsent = (): boolean => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(COOKIE_ANALYTICS_KEY) === 'true';
  };

  const getMarketingConsent = (): boolean => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(COOKIE_MARKETING_KEY) === 'true';
  };

  const hasConsentBeenGiven = (): boolean => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
  };

  const hasConsentBeenSet = (): boolean => {
    if (typeof window === 'undefined') return false;
    const consent = sessionStorage.getItem(COOKIE_CONSENT_KEY);
    return consent === 'accepted' || consent === 'rejected';
  };

  return {
    hasConsent,
    isLoading,
    acceptCookies,
    rejectCookies,
    savePreferences,
    getAnalyticsConsent,
    getMarketingConsent,
    hasConsentBeenGiven,
    hasConsentBeenSet,
  };
}

