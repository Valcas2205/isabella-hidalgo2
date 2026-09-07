'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useMemo } from 'react'
import { getDict, locales, localeNames, switchLocalePath, defaultLocale, type Dict, type Locale } from '@/lib/i18n'

type Ctx = { locale: Locale; t: Dict }

const I18nContext = createContext<Ctx>({ locale: defaultLocale, t: getDict(defaultLocale) })

export const useI18n = () => useContext(I18nContext)

/* Sólo cruza el `locale` (un string) desde el servidor. El diccionario
   se resuelve aquí, así no hay que serializar sus funciones. */
export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const value = useMemo(() => ({ locale, t: getDict(locale) }), [locale])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

/** <Link> que antepone el idioma actual: "/gallery" -> "/es/gallery" */
export function LocaleLink({
  href, children, ...rest
}: { href: string } & Omit<React.ComponentProps<typeof Link>, 'href'>) {
  const { locale } = useI18n()
  const to = href.startsWith('/') ? `/${locale}${href === '/' ? '' : href}` : href
  return <Link href={to || `/${locale}`} {...rest}>{children}</Link>
}

/** Botón ES / EN. Conserva la ruta actual al cambiar de idioma. */
export function LocaleSwitcher() {
  const { locale, t } = useI18n()
  const pathname = usePathname() || '/'

  return (
    <div className="locale-switch" role="group" aria-label={t.nav.language}>
      {locales.map(l => (
        <Link
          key={l}
          href={switchLocalePath(pathname, l)}
          className={l === locale ? 'is-active' : ''}
          hrefLang={l}
          aria-current={l === locale ? 'true' : undefined}
        >
          {localeNames[l]}
        </Link>
      ))}
    </div>
  )
}
