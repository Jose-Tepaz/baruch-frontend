"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function TrackingScripts() {
  const { hasConsent } = useCookieConsent();

  useEffect(() => {
    // Si la página se hidrata y detectamos el consentimiento, disparamos el update de nuevo
    if (hasConsent && typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }

    // Cargar Meta Pixel
    const loadMetaPixel = () => {
      // Verificar si ya existe
      if (typeof window === "undefined" || (window as any).fbq) {
        return;
      }

      // Verificar si el script ya está en el head
      const existingScript = document.querySelector(
        'script[src*="connect.facebook.net"]',
      );
      if (existingScript) {
        return;
      }

      const script2 = document.createElement("script");
      script2.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '2279246495831999');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script2);

      // Agregar noscript para Meta Pixel solo si no existe
      const existingNoscript = document.querySelector(
        'noscript img[src*="facebook.com/tr"]',
      );
      if (!existingNoscript) {
        const noscript = document.createElement("noscript");
        const img = document.createElement("img");
        img.height = 1;
        img.width = 1;
        img.style.display = "none";
        img.src =
          "https://www.facebook.com/tr?id=2279246495831999&ev=PageView&noscript=1";
        img.alt = "";
        noscript.appendChild(img);
        document.body.appendChild(noscript);
      }
    };

    // Solo cargar Meta Pixel si hay consentimiento
    if (hasConsent) {
      loadMetaPixel();
    }

    // También escuchar el evento personalizado por si se acepta después
    const handleConsentAccepted = () => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          ad_storage: "granted",
          analytics_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        });
      }
      loadMetaPixel();
    };

    window.addEventListener("cookie-consent-accepted", handleConsentAccepted);

    return () => {
      window.removeEventListener(
        "cookie-consent-accepted",
        handleConsentAccepted,
      );
    };
  }, [hasConsent]);

  return (
    <>
      {/* Google Tag Manager - Consent Mode Default */}
      <Script id="google-consent-mode" strategy="afterInteractive">
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

          if (typeof localStorage !== 'undefined' && localStorage.getItem('cookie-consent') === 'accepted') {
            gtag('consent', 'update', {
              'ad_storage': 'granted',
              'analytics_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted'
            });
          }
        `}
      </Script>

      {/* Google Tag Manager - Base Script */}
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

// Extender Window interface para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    _fbq: any;
    google_tag_manager: any;
  }
}
