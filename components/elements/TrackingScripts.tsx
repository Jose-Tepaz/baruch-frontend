"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function TrackingScripts() {
  const { hasConsent } = useCookieConsent();

  useEffect(() => {
    // Verificar si los scripts ya fueron cargados
    if (typeof window === "undefined") return;

    // Cargar Google Tag Manager
    const loadGoogleTagManager = () => {
      // Verificar si ya existe
      if ((window as any).google_tag_manager) {
        return;
      }

      // Verificar si el script ya está en el head
      const existingScript = document.querySelector(
        'script[src*="googletagmanager.com/gtm.js"]',
      );
      if (existingScript) {
        return;
      }

      // Inicializar dataLayer para GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });

      // Cargar el script de Google Tag Manager
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-KDZZH4B2";

      const firstScript = document.getElementsByTagName("script")[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }

      // Agregar noscript para GTM solo si no existe
      const existingNoscript = document.querySelector(
        'noscript iframe[src*="googletagmanager.com/ns.html"]',
      );
      if (!existingNoscript) {
        const noscript = document.createElement("noscript");
        const iframe = document.createElement("iframe");
        iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-KDZZH4B2";
        iframe.height = "0";
        iframe.width = "0";
        iframe.style.display = "none";
        iframe.style.visibility = "hidden";
        noscript.appendChild(iframe);
        document.body.insertBefore(noscript, document.body.firstChild);
      }
    };

    // Cargar Meta Pixel
    const loadMetaPixel = () => {
      // Verificar si ya existe
      if ((window as any).fbq) {
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

    // Solo cargar scripts si hay consentimiento
    if (hasConsent) {
      loadGoogleTagManager();

      loadMetaPixel();
    }

    // También escuchar el evento personalizado por si se acepta después
    const handleConsentAccepted = () => {
      loadGoogleTagManager();

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

  // Este componente no renderiza nada
  return null;
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
