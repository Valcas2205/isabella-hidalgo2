import { NextResponse, type NextRequest } from 'next/server'

/* Redirige las rutas sin idioma: "/gallery" -> "/es/gallery".
   Si el navegador prefiere inglés, manda a /en.

   Los idiomas van escritos aquí a propósito y no se importan de
   lib/i18n: el proxy puede desplegarse en el CDN y no debe depender
   de módulos compartidos — importar el diccionario entero sólo para
   leer dos códigos de idioma engordaría el bundle sin motivo. */
const LOCALES = ['es', 'en'] as const
const DEFAULT_LOCALE = 'es'

/* Cualquier cosa con extensión es un archivo de /public (logo.png,
   art/*.webp, favicon.ico…). La exclusión se hace AQUÍ y no sólo en
   el matcher: el patrón de extensión del matcher no llegaba a aplicarse
   y acabábamos redirigiendo /logo.png a /es/logo.png, con lo que el
   optimizador de imágenes recibía un 307 en vez de un PNG y devolvía
   400. Resultado: el logo desaparecía del header y del footer. */
const HAS_EXTENSION = /\.[a-z0-9]+$/i

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    HAS_EXTENSION.test(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  ) return

  const hasLocale = LOCALES.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return

  const preferred = (request.headers.get('accept-language') ?? '')
    .split(',')
    .map(part => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.split('-')[0].toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
    .find(({ tag }) => (LOCALES as readonly string[]).includes(tag))

  const locale = preferred?.tag ?? DEFAULT_LOCALE

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
