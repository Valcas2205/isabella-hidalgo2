import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { works, getWork } from '@/lib/works'
import ProductView from '@/components/product-view'

/* Prerenderiza una página por obra en el build. */
export function generateStaticParams() {
  return works.map(w => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const work = getWork(slug)
  if (!work) return { title: 'Obra no encontrada — Isabella Hidalgo' }

  return {
    title: `${work.title} — Isabella Hidalgo`,
    description: work.story,
    openGraph: {
      title: `${work.title} — Isabella Hidalgo`,
      description: work.story,
      images: [{ url: work.images[0] }],
    },
  }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const work = getWork(slug)
  if (!work) notFound()

  const related = works.filter(w => w.slug !== work.slug).slice(0, 3)

  return <ProductView work={work} related={related} />
}
