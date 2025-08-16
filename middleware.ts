import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es', 'fr', 'de', 'pl', 'sv', 'nl'];
const defaultLocale = 'en';

// Función para obtener el idioma preferido del usuario
function getPreferredLocale(request: NextRequest): string {
  // Intentar obtener el idioma de la cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE');
  if (localeCookie?.value && locales.includes(localeCookie.value)) {
    return localeCookie.value;
  }

  // Intentar obtener el idioma del navegador
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')[0]
      .split('-')[0]
      .toLowerCase();
    
    if (locales.includes(preferredLocale)) {
      return preferredLocale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Ignorar archivos estáticos y API
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/locales') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Si es la ruta raíz, redirigir al idioma preferido
  if (pathname === '/') {
    const preferredLocale = getPreferredLocale(request);
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }

  // Obtener el primer segmento de la ruta
  const firstSegment = pathname.split('/')[1];

  // Si el primer segmento no es un idioma válido, redirigir
  if (!locales.includes(firstSegment)) {
    const preferredLocale = getPreferredLocale(request);
    return NextResponse.redirect(new URL(`/${preferredLocale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Aplicar middleware a todas las rutas excepto las excluidas
    '/((?!api|_next/static|_next/image|favicon.ico|assets|locales).*)',
  ],
}; 