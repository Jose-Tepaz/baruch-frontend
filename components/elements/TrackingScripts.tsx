"use client";

import { useEffect } from "react";

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

  return null;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    google_tag_manager: any;
  }
}
