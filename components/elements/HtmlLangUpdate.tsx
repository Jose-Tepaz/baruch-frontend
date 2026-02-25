"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const locales = ["en", "es", "fr", "de", "pl", "sv", "nl"];

export default function HtmlLangUpdate() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Detect locale from pathname, similar to middleware logic
    const firstSegment = pathname.split("/")[1];
    let locale = "en"; // default

    if (
      firstSegment &&
      locales.includes(firstSegment) &&
      firstSegment !== "en"
    ) {
      locale = firstSegment;
    }

    // Update the HTML element's lang attribute directly
    document.documentElement.lang = locale;
  }, [pathname]);

  return null; // This component doesn't render any visible UI
}
