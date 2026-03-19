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
    getMarketingConsent,
  } = useCookieConsent();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

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
    setShowFloatingButton(consentSet);
    setIsPopupOpen(!consentSet);
    setAnalyticsEnabled(consentSet ? getAnalyticsConsent() : true);
    setMarketingEnabled(consentSet ? getMarketingConsent() : true);
  }, []);

  const handleAcceptAll = () => {
    acceptCookies();
    setIsPopupOpen(false);
    setShowFloatingButton(true);
    setAnalyticsEnabled(true);
    setMarketingEnabled(true);
  };

  const handleRejectAll = () => {
    rejectCookies();
    setIsPopupOpen(false);
    setShowFloatingButton(true);
    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
  };

  const handleOpenPreferences = () => {
    setAnalyticsEnabled(getAnalyticsConsent());
    setMarketingEnabled(getMarketingConsent());
    setIsPopupOpen(true);
  };

  const handleSavePreferences = () => {
    savePreferences(analyticsEnabled, marketingEnabled);
    setIsPopupOpen(false);
    setShowFloatingButton(true);
  };

  return (
    <>
      {isPopupOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div
            className={styles.preferencesModal}
         
          >
            <div className={styles.modalHeader}>
              <h4 className={styles.modalTitle}>
                {getText('cookies.settings-title', 'Valoramos tu privacidad', 'We respect your privacy')}
              </h4>
            </div>

            <div className={styles.modalContent}>
              <p className={styles.modalDescription}>
                {getText(
                  'cookies.settings-description',
                  'Usamos cookies para mejorar tu experiencia, analizar trafico y personalizar contenido. Puedes cambiar tus preferencias en cualquier momento.',
                  'We use cookies to improve your browsing experience, analyse traffic and personalize content. You can change your preferences at any time.',
                )}{' '}
                <Link href={privacyPolicyUrl} className={styles.privacyLink}>
                  {t('cookies.privacy-policy-link')}
                </Link>
                .
              </p>

              <div className={styles.categoriesGrid}>
                <div className={styles.cookieCategory}>
                  <div className={styles.categoryHeader}>
                    <span className={styles.categoryTitle}>
                      {getText('cookies.necessary', 'Cookies necesarias', 'Essential cookies')}
                    </span>
                    <span className={styles.alwaysOn}>
                      {getText('cookies.always-active', 'Siempre activas', 'Always active')}
                    </span>
                  </div>
                  <p className={styles.categoryDescription}>
                    {getText(
                      'cookies.necessary-description',
                      'Requeridas para funciones basicas del sitio. Siempre activas.',
                      'Required for basic website functionality. Always on.',
                    )}
                  </p>
                </div>

                <div className={styles.cookieCategory}>
                  <div className={styles.categoryHeader}>
                    <span className={styles.categoryTitle}>
                      {getText('cookies.analytics', 'Cookies analiticas', 'Analytics cookies')}
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
                      'Nos ayudan a entender como usan el sitio los visitantes.',
                      'Helps us understand how visitors use the site.',
                    )}
                  </p>
                </div>

                <div className={styles.cookieCategory}>
                  <div className={styles.categoryHeader}>
                    <span className={styles.categoryTitle}>
                      {getText('cookies.marketing', 'Cookies marketing', 'Marketing cookies')}
                    </span>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={marketingEnabled}
                        onChange={(event) => setMarketingEnabled(event.target.checked)}
                      />
                      <span className={styles.slider} />
                    </label>
                  </div>
                  <p className={styles.categoryDescription}>
                    {getText(
                      'cookies.marketing-description',
                      'Se usan para mostrar publicidad y contenido relevante.',
                      'Used to show relevant property advertising.',
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                onClick={handleRejectAll}
                className={styles.rejectButton}
                aria-label={getText('cookies.reject-all', 'Rechazar todo', 'Reject all')}
              >
                {getText('cookies.reject-all', 'Rechazar todo', 'Reject all')}
              </button>
              <button
                onClick={handleSavePreferences}
                className={styles.preferencesButton}
                aria-label={getText('cookies.save-preferences', 'Guardar preferencias', 'Save preferences')}
              >
                {getText('cookies.save-preferences', 'Guardar preferencias', 'Save preferences')}
              </button>
              <button
                onClick={handleAcceptAll}
                className={styles.acceptButton}
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

