"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function TrackingScripts() {
  useEffect(() => {
    const applyConsent = (analytics: boolean, marketing: boolean) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          ad_storage: marketing ? "granted" : "denied",
          analytics_storage: analytics ? "granted" : "denied",
          ad_user_data: marketing ? "granted" : "denied",
          ad_personalization: marketing ? "granted" : "denied",
        });
      }
    };

    const syncConsentFromStorage = () => {
      if (typeof window === "undefined") return;
      const analytics =
        sessionStorage.getItem("cookie-analytics-enabled") === "true";
      const marketing =
        sessionStorage.getItem("cookie-marketing-enabled") === "true";
      applyConsent(analytics, marketing);
    };

    syncConsentFromStorage();

    const handleConsentUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<{
        analytics: boolean;
        marketing: boolean;
      }>;
      if (customEvent.detail) {
        applyConsent(customEvent.detail.analytics, customEvent.detail.marketing);
      } else {
        syncConsentFromStorage();
      }
    };

    window.addEventListener("cookie-consent-updated", handleConsentUpdated);

    return () => {
      window.removeEventListener(
        "cookie-consent-updated",
        handleConsentUpdated,
      );
    };
  }, []);

  return (
    <>
      {/* Google Consent Mode v2 — Default (must run before GTM) */}
      <Script id="google-consent-mode" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          if (!window.gtag) {
            window.gtag = gtag;
          }

          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
          });

          if (typeof sessionStorage !== 'undefined') {
            var analytics = sessionStorage.getItem('cookie-analytics-enabled') === 'true';
            var marketing = sessionStorage.getItem('cookie-marketing-enabled') === 'true';
            gtag('consent', 'update', {
              'ad_storage': marketing ? 'granted' : 'denied',
              'analytics_storage': analytics ? 'granted' : 'denied',
              'ad_user_data': marketing ? 'granted' : 'denied',
              'ad_personalization': marketing ? 'granted' : 'denied'
            });
          }
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KDZZH4B2');
        `}
      </Script>

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KDZZH4B2"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    google_tag_manager: any;
  }
}
