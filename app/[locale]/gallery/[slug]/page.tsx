import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { works, getWork } from '@/lib/works'
import { locales, getDict, isLocale, defaultLocale } from '@/lib/i18n'
import ProductView from '@/components/product-view'

/* Una página por obra y por idioma, prerenderizadas en el build. */
export function generateStaticParams() {
  return locales.flatMap(locale => works.map(w => ({ locale, slug: w.slug })))
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; slug: string }> },
): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const work = getWork(slug)
  if (!work) return { title: getDict(locale).product.notFound }

  const description = work.story[locale]

  return {
    title: `${work.title} — Isabella Hidalgo`,
    description,
    alternates: {
      canonical: `/${locale}/gallery/${slug}`,
      languages: Object.fromEntries(locales.map(l => [l, `/${l}/gallery/${slug}`])),
    },
    openGraph: {
      title: `${work.title} — Isabella Hidalgo`,
      description,
      images: [{ url: work.images[0] }],
    },
  }
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const work = getWork(slug)
  if (!work) notFound()

  const related = works.filter(w => w.slug !== work.slug).slice(0, 3)

  return <ProductView work={work} related={related} locale={locale} />
}
