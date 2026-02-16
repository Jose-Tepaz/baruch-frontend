"use client";
import { useTranslation } from "@/utils/i18n-simple";
import {
  updateCurrentLocale,
  getCurrentLocale,
} from "@/utils/get-current-locale";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import type { Language } from "@/utils/i18n-simple";

const languages: Array<{ code: Language; name: string; flag: string }> = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
 
];

export default function LanguageSelector() {
  const { i18n, t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = async (langCode: Language) => {
    if (langCode === i18n.language) {
      setIsOpen(false);
      return;
    }

    // Actualizar cookie
    setCookie("NEXT_LOCALE", langCode, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 año
    });

    // Actualizar i18n y estado global
    i18n.changeLanguage(langCode);
    updateCurrentLocale(langCode);
    setIsOpen(false);

    // Construir nueva URL
    let newPath = pathname;
    const currentLocalePattern = /^\/[a-z]{2}(?:\/|$)/;

    if (langCode === "en") {
      // Si es inglés, ir a raíz sin prefijo
      if (currentLocalePattern.test(pathname)) {
        // Remover el prefijo de idioma existente
        newPath = pathname.replace(/^\/[a-z]{2}/, "") || "/";
      }
      // Si ya está sin prefijo, mantener la ruta
    } else {
      // Para otros idiomas, agregar/reemplazar prefijo
      if (currentLocalePattern.test(pathname)) {
        // Reemplazar locale existente
        newPath = pathname.replace(/^\/[a-z]{2}/, `/${langCode}`);
      } else {
        // Agregar nuevo locale (la ruta actual no tiene prefijo)
        newPath = `/${langCode}${pathname === "/" ? "" : pathname}`;
      }
    }

    // Asegurar que siempre haya al menos una barra
    if (!newPath.startsWith("/")) {
      newPath = "/" + newPath;
    }

    // Eliminar doble slash si existe
    newPath = newPath.replace(/\/\/$/, "/");

    // Mostrar feedback visual
    const message = document.createElement("div");
    message.innerHTML = `
            <div class="alert alert-info position-fixed" style="top: 20px; right: 20px; z-index: 9999;">
                <i class="fa fa-globe"></i> ${t("language.changing")} ${languages.find((l) => l.code === langCode)?.name}...
            </div>
        `;
    document.body.appendChild(message);

    // Navegar a la nueva URL
    router.push(newPath);

    // Limpiar mensaje después de 2 segundos
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 2000);
  };

  // No renderizar hasta que esté montado para evitar hidratación
  if (!mounted) {
    return (
      <div className="language-selector">
        <button className="language-toggle">
          <i className="fa-solid fa-globe" />
          <i className="fa-solid fa-chevron-down" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="language-selector">
        <button
          className="language-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t("language.selectLanguage")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 432 432"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M216 8C101.13 8 8 101.13 8 216C8 330.87 101.13 424 216 424C330.87 424 424 330.87 424 216C424 101.13 330.87 8 216 8Z"
              stroke="#203644"
              strokeWidth="16"
              strokeMiterlimit="10"
            />
            <path
              d="M216 8C157.93 8 103.33 101.13 103.33 216C103.33 330.87 157.93 424 216 424C274.07 424 328.67 330.87 328.67 216C328.67 101.13 274.07 8 216 8Z"
              stroke="#203644"
              strokeWidth="16"
              strokeMiterlimit="10"
            />
            <path
              d="M77.33 77.33C115.57 104.48 163.71 120.67 216 120.67C268.29 120.67 316.43 104.48 354.67 77.33M354.67 354.67C316.43 327.52 268.29 311.33 216 311.33C163.71 311.33 115.57 327.52 77.33 354.67"
              stroke="#203644"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M216 8V424M424 216H8"
              stroke="#203644"
              strokeWidth="16"
              strokeMiterlimit="10"
            />
          </svg>

          <i className={`fa-solid fa-chevron-${isOpen ? "up" : "down"}`} />
        </button>

        {isOpen && (
          <div className="language-dropdown" role="menu">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`language-option ${lang.code === i18n.language ? "active" : ""}`}
                onClick={() => handleLanguageChange(lang.code)}
                role="menuitem"
                aria-current={lang.code === i18n.language}
              >
                <span className="flag">{lang.flag}</span>
                <span className="lang-name">{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
