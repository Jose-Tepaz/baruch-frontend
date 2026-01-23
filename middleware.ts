import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es', 'fr', 'de', 'pl', 'sv', 'nl'];

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

  // Permitir la ruta raíz sin redirección (servirá contenido en inglés)
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Obtener el primer segmento de la ruta
  const firstSegment = pathname.split('/')[1];

  // Si el primer segmento es 'en', redirigir a la versión sin prefijo (excepto si es solo '/en')
  if (firstSegment === 'en') {
    const restOfPath = pathname.substring(3); // Remover '/en'
    if (restOfPath === '') {
      // Si es solo '/en', redirigir a '/'
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Redirigir a la ruta sin el prefijo '/en'
    return NextResponse.redirect(new URL(restOfPath, request.url));
  }

  // Si el primer segmento parece ser un código de idioma pero no es válido, redirigir a raíz
  if (firstSegment && firstSegment.length === 2 && !locales.includes(firstSegment)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Permitir todas las demás rutas (con o sin prefijo de idioma)
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Aplicar middleware a todas las rutas excepto las excluidas
    '/((?!api|_next/static|_next/image|favicon.ico|assets|locales).*)',
  ],
}; 