'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/utils/i18n-simple';
import { useRouter, usePathname } from 'next/navigation';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import Link from 'next/link';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();
  const { hasConsentBeenSet, acceptCookies, rejectCookies } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Solo mostrar el banner si el consentimiento no ha sido dado aún
    if (!hasConsentBeenSet()) {
      // Delay inicial antes de mostrar el banner (2000ms = 2 segundos)
      const renderTimeout = setTimeout(() => {
        setShouldRender(true);
        // Pequeño delay adicional antes de la animación para asegurar render
        setTimeout(() => {
          setIsVisible(true);
        }, 50);
      }, 2000);

      return () => {
        clearTimeout(renderTimeout);
      };
    }
  }, [hasConsentBeenSet]);

  const handleAccept = () => {
    acceptCookies();
    setIsVisible(false);
  };

  const handleReject = () => {
    rejectCookies();
    setIsVisible(false);
  };

  // No mostrar si ya se ha dado consentimiento o rechazo, o si aún no debe renderizarse
  if (hasConsentBeenSet() || !shouldRender) {
    return null;
  }

  // Obtener el idioma actual de la URL o del i18n
  const getCurrentLang = () => {
    const pathLang = pathname?.match(/^\/([a-z]{2})(\/|$)/)?.[1];
    return pathLang || i18n.language || 'en';
  };

  const currentLang = getCurrentLang();
  const privacyPolicyUrl = `/${currentLang}/privacy-policy`;

  return (
    <div className={`${styles.cookieBanner} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.cookieContent}>
        <div className={styles.cookieText}>
          <h4 className={styles.cookieTitle}>{t('cookies.banner-title')}</h4>
          <p className={styles.cookieDescription}>
            {t('cookies.banner-description')}{' '}
            <Link href={privacyPolicyUrl} className={styles.privacyLink}>
              {t('cookies.privacy-policy-link')}
            </Link>
          </p>
        </div>
        <div className={styles.cookieActions}>
          <button
            onClick={handleReject}
            className={styles.rejectButton}
            aria-label={t('cookies.reject')}
          >
            {t('cookies.reject')}
          </button>
          <button 
            onClick={handleAccept}
            className={styles.acceptButton}
            aria-label={t('cookies.accept')}
          >
            {t('cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}

