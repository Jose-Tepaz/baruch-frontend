'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/utils/i18n-simple';
import { usePathname } from 'next/navigation';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import Link from 'next/link';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
  const { t, i18n } = useTranslation('common');
  const pathname = usePathname();
  const {
    hasConsentBeenSet,
    acceptCookies,
    rejectCookies,
    savePreferences,
    getAnalyticsConsent,
  } = useCookieConsent();
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [shouldRenderBanner, setShouldRenderBanner] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  // Obtener el idioma actual de la URL o del i18n
  const getCurrentLang = () => {
    const pathLang = pathname?.match(/^\/([a-z]{2})(\/|$)/)?.[1];
    return pathLang || i18n.language || 'en';
  };

  const currentLang = getCurrentLang();
  const privacyPolicyUrl = `/${currentLang}/privacy-policy`;
  const isSpanish = currentLang === 'es';

  const getText = (key: string, fallbackEs: string, fallbackEn: string) => {
    const translated = t(key);
    if (translated && translated !== key) {
      return translated;
    }
    return isSpanish ? fallbackEs : fallbackEn;
  };

  useEffect(() => {
    const consentSet = hasConsentBeenSet();
    if (consentSet) {
      setShowFloatingButton(true);
      setAnalyticsEnabled(getAnalyticsConsent());
      return;
    }

    // Delay inicial antes de mostrar el banner (2000ms = 2 segundos)
    const renderTimeout = setTimeout(() => {
      setShouldRenderBanner(true);
      // Pequeño delay adicional antes de la animación para asegurar render
      setTimeout(() => {
        setIsBannerVisible(true);
      }, 50);
    }, 2000);

    return () => {
      clearTimeout(renderTimeout);
    };
  }, []);

  const handleAcceptAll = () => {
    acceptCookies();
    setIsBannerVisible(false);
    setIsPreferencesOpen(false);
    setShowFloatingButton(true);
    setAnalyticsEnabled(true);
  };

  const handleRejectAll = () => {
    rejectCookies();
    setIsBannerVisible(false);
    setIsPreferencesOpen(false);
    setShowFloatingButton(true);
    setAnalyticsEnabled(false);
  };

  const handleOpenPreferences = () => {
    setAnalyticsEnabled(getAnalyticsConsent() || !hasConsentBeenSet());
    setIsBannerVisible(false);
    setShouldRenderBanner(false);
    setIsPreferencesOpen(true);
  };

  const handleClosePreferences = () => {
    setIsPreferencesOpen(false);
    if (!hasConsentBeenSet()) {
      setShouldRenderBanner(true);
      setIsBannerVisible(true);
    }
  };

  const handleSavePreferences = () => {
    savePreferences(analyticsEnabled);
    setIsPreferencesOpen(false);
    setIsBannerVisible(false);
    setShowFloatingButton(true);
  };

  return (
    <>
      {!hasConsentBeenSet() && shouldRenderBanner && (
        <div className={`${styles.cookieBanner} ${isBannerVisible ? styles.visible : ''}`}>
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
                onClick={handleAcceptAll}
                className={styles.acceptButton}
                aria-label={getText('cookies.accept-all', 'Aceptar todo', 'Accept all')}
              >
                {getText('cookies.accept-all', 'Aceptar todo', 'Accept all')}
              </button>
              <button
                onClick={handleOpenPreferences}
                className={styles.preferencesButton}
                aria-label={getText('cookies.preferences', 'Preferencias', 'Preferences')}
              >
                {getText('cookies.preferences', 'Preferencias', 'Preferences')}
              </button>
              <button
                onClick={handleRejectAll}
                className={styles.rejectButton}
                aria-label={getText('cookies.reject-all', 'Rechazar todo', 'Reject all')}
              >
                {getText('cookies.reject-all', 'Rechazar todo', 'Reject all')}
              </button>
            </div>
          </div>
        </div>
      )}

      {isPreferencesOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.preferencesModal}>
            <div className={styles.modalHeader}>
              <h4 className={styles.modalTitle}>
                {getText('cookies.settings-title', 'Configuracion de cookies', 'Cookie settings')}
              </h4>
              <button
                onClick={handleClosePreferences}
                className={styles.closeButton}
                aria-label={getText('cookies.close', 'Cerrar', 'Close')}
              >
                x
              </button>
            </div>

            <div className={styles.modalContent}>
              <p className={styles.modalDescription}>
                {getText(
                  'cookies.settings-description',
                  'Utilizamos cookies para mejorar su experiencia de navegacion. Puede elegir que categorias desea permitir.',
                  'We use cookies to improve your browsing experience. You can choose which categories to allow.',
                )}
              </p>

              <div className={styles.cookieCategory}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryTitle}>
                    {getText('cookies.necessary', 'Cookies necesarias', 'Necessary cookies')}
                  </span>
                  <span className={styles.alwaysOn}>
                    {getText('cookies.always-active', 'Siempre activas', 'Always active')}
                  </span>
                </div>
                <p className={styles.categoryDescription}>
                  {getText(
                    'cookies.necessary-description',
                    'Estas cookies son esenciales para el funcionamiento del sitio y no pueden desactivarse.',
                    'These cookies are essential for the website to work and cannot be disabled.',
                  )}
                </p>
              </div>

              <div className={styles.cookieCategory}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryTitle}>
                    {getText('cookies.analytics', 'Cookies de analitica', 'Analytics cookies')}
                  </span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
                <p className={styles.categoryDescription}>
                  {getText(
                    'cookies.analytics-description',
                    'Nos ayudan a entender el uso de la web para mejorar contenido y rendimiento.',
                    'They help us understand site usage to improve content and performance.',
                  )}
                </p>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                onClick={handleSavePreferences}
                className={styles.acceptButton}
                aria-label={getText('cookies.save-preferences', 'Guardar preferencias', 'Save preferences')}
              >
                {getText('cookies.save-preferences', 'Guardar preferencias', 'Save preferences')}
              </button>
              <button
                onClick={handleAcceptAll}
                className={styles.preferencesButton}
                aria-label={getText('cookies.accept-all', 'Aceptar todo', 'Accept all')}
              >
                {getText('cookies.accept-all', 'Aceptar todo', 'Accept all')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showFloatingButton && (
        <button
          className={styles.floatingButton}
          onClick={handleOpenPreferences}
          aria-label={getText('cookies.manage', 'Gestionar cookies', 'Manage cookies')}
          title={getText('cookies.manage', 'Gestionar cookies', 'Manage cookies')}
        >
          {getText('cookies.manage-short', 'Cookies', 'Cookies')}
        </button>
      )}
    </>
  );
}

