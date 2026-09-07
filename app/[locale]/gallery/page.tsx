'use client'
import { useState, useMemo } from 'react'
import { Shell, WorkCard, works, Container } from '@/components/site-chrome'
import { useI18n } from '@/components/i18n-provider'

type Filter = 'all' | 'available' | 'sold'
type Sort = 'series' | 'asc' | 'desc'

export default function Gallery() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const [sort, setSort] = useState<Sort>('series')

  const shown = useMemo(() => {
    const list = works.filter(w =>
      filter === 'all' ? true : filter === 'available' ? w.available : !w.available)
    if (sort === 'asc') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'desc') return [...list].sort((a, b) => b.price - a.price)
    return list
  }, [filter, sort])

  const available = works.filter(w => w.available).length

  const filters: [Filter, string][] = [
    ['all', t.gallery.all],
    ['available', t.gallery.availableFilter],
    ['sold', t.gallery.soldFilter],
  ]

  return (
    <Shell>
      <Container as="section" className="gallery-page">
        <header className="gallery-hero">
          <p className="eyebrow">{t.gallery.eyebrow}</p>
          <h1>{t.gallery.title}<br/><em>{t.gallery.titleEm}</em></h1>
          <p className="gallery-hero-lede">{t.gallery.lede(available, works.length)}</p>
        </header>

        <div className="gallery-bar">
          <div className="gallery-filters">
            {filters.map(([key, label]) => (
              <button key={key} className={filter === key ? 'is-active' : ''} onClick={() => setFilter(key)}>
                {label}
              </button>
            ))}
          </div>
          <label className="gallery-sortwrap">
            <span>{t.gallery.sort}</span>
            <select value={sort} onChange={e => setSort(e.target.value as Sort)} className="gallery-sort">
              <option value="series">{t.gallery.sortSeries}</option>
              <option value="asc">{t.gallery.sortPriceAsc}</option>
              <option value="desc">{t.gallery.sortPriceDesc}</option>
            </select>
          </label>
        </div>

        {shown.length === 0 ? (
          <p className="gallery-empty">{t.gallery.empty}</p>
        ) : (
          <div className="gallery-grid-new">
            {shown.map((work, i) => <WorkCard key={work.slug} work={work} priority={i < 3} />)}
          </div>
        )}
      </Container>
    </Shell>
  )
}
