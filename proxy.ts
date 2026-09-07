import { NextResponse, type NextRequest } from 'next/server'

/* Redirige las rutas sin idioma: "/gallery" -> "/es/gallery".
   Si el navegador prefiere inglés, manda a /en.

   Los idiomas van escritos aquí a propósito y no se importan de
   lib/i18n: el proxy puede desplegarse en el CDN y no debe depender
   de módulos compartidos — importar el diccionario entero sólo para
   leer dos códigos de idioma engordaría el bundle sin motivo. */
const LOCALES = ['es', 'en'] as const
const DEFAULT_LOCALE = 'es'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

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
  /* Deja fuera assets, imágenes e internos de Next. */
  matcher: ['/((?!_next|api|art|favicon|.*\.[\w]+$).*)'],
}
