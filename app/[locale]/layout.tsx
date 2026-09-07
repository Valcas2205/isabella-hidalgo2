import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { I18nProvider } from '@/components/i18n-provider'
import { locales, isLocale, getDict } from '@/lib/i18n'
import '../globals.css'

/* `[locale]` va antes del layout raíz, así que este ES el layout raíz
   y es quien pinta <html>. Prerenderiza un árbol por idioma. */
export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f4f2ed' }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDict(isLocale(locale) ? locale : 'es')

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://isabellahidalgo.com'),
    title: { default: 'Isabella Hidalgo — Fine Artist', template: '%s' },
    description: t.about.lede,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map(l => [l, `/${l}`])),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale} className="bg-background">
      <body className="antialiased">
        <I18nProvider locale={locale}>{children}</I18nProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
