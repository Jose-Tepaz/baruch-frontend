/**
 * Componente HreflangLinks
 *
 * Genera tags hreflang para SEO multiidioma.
 * Nota: Next.js 13+ maneja esto automáticamente a través de metadata.alternates.languages,
 * pero este componente puede ser útil para casos especiales o páginas dinámicas.
 */

interface HreflangLinksProps {
  currentPath: string;
  currentLang?: string;
  baseUrl?: string;
}

const SUPPORTED_LOCALES = ["en", "es", "fr", "de", "pl", "sv", "nl"];

export default function HreflangLinks({
  currentPath,
  currentLang = "en",
  baseUrl = "https://www.baruchrealestate.com",
}: HreflangLinksProps) {
  // Limpiar la ruta de cualquier prefijo de idioma existente
  const cleanPath = currentPath.replace(/^\/[a-z]{2}(\/|$)/, "/");

  // Generar los links hreflang
  const hreflangLinks = SUPPORTED_LOCALES.map((locale) => {
    let href: string;

    if (locale === "en") {
      // Inglés va en la raíz sin prefijo
      href = `${baseUrl}${cleanPath === "/" ? "" : cleanPath}`;
    } else {
      // Otros idiomas tienen prefijo
      // Aseguramos que no haya doble slash si cleanPath empieza con /
      const pathSuffix = cleanPath === "/" ? "" : cleanPath;
      href = `${baseUrl}/${locale}${pathSuffix}`;
    }

    // Asegurar que la URL termine correctamente con slash
    if (!href.endsWith("/")) {
      href = `${href}/`;
    }

    return { locale, href };
  });

  // Agregar x-default (siempre apunta al inglés/raíz)
  let xDefaultHref = `${baseUrl}${cleanPath === "/" ? "" : cleanPath}`;
  if (!xDefaultHref.endsWith("/")) {
    xDefaultHref = `${xDefaultHref}/`;
  }

  return (
    <>
      {hreflangLinks.map(({ locale, href }) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={xDefaultHref} />
    </>
  );
}

/**
 * Hook helper para obtener la ruta actual limpia
 */
export function useCleanPath(pathname: string): string {
  return pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");
}

/**
 * Función helper para generar el objeto de alternates para metadata
 */
export function generateAlternates(path: string) {
  const cleanPath = path.replace(/^\/[a-z]{2}(\/|$)/, "/");

  const languages: Record<string, string> = {};

  SUPPORTED_LOCALES.forEach((locale) => {
    if (locale === "en") {
      languages[locale] = cleanPath === "/" ? "/" : `${cleanPath}/`;
    } else {
      const suffix = cleanPath === "/" ? "" : cleanPath;
      languages[locale] = `/${locale}${suffix}/`;
    }
  });

  // x-default siempre apunta al inglés
  languages["x-default"] = cleanPath === "/" ? "/" : `${cleanPath}/`;

  return {
    canonical: cleanPath === "/" ? "/" : `${cleanPath}/`,
    languages,
  };
}
