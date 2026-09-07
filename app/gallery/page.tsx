'use client'
import { useState, useMemo } from 'react'
import { Shell, WorkCard, works, Container } from '@/components/site-chrome'

type Filter = 'Todas' | 'Disponibles' | 'Vendidas'
type Sort = 'Serie' | 'Precio ↑' | 'Precio ↓'

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('Todas')
  const [sort, setSort] = useState<Sort>('Serie')

  const shown = useMemo(() => {
    const list = works.filter(w =>
      filter === 'Todas' ? true : filter === 'Disponibles' ? w.available : !w.available)
    if (sort === 'Precio ↑') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'Precio ↓') return [...list].sort((a, b) => b.price - a.price)
    return list
  }, [filter, sort])

  const available = works.filter(w => w.available).length

  return (
    <Shell>
      <Container as="section" className="gallery-page">
        <header className="gallery-hero">
          <p className="eyebrow">Obra disponible · 2026</p>
          <h1>Cada cuadro<br/><em>lleva una frase.</em></h1>
          <p className="gallery-hero-lede">
            Acrílico diluido sobre algodón, pintado despacio en To Grow Studio.
            {' '}{available} de {works.length} piezas siguen disponibles.
          </p>
        </header>

        <div className="gallery-bar">
          <div className="gallery-filters">
            {(['Todas', 'Disponibles', 'Vendidas'] as Filter[]).map(f => (
              <button key={f} className={filter === f ? 'is-active' : ''} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
          <label className="gallery-sortwrap">
            <span>Ordenar</span>
            <select value={sort} onChange={e => setSort(e.target.value as Sort)} className="gallery-sort">
              <option>Serie</option>
              <option>Precio ↑</option>
              <option>Precio ↓</option>
            </select>
          </label>
        </div>

        {shown.length === 0 ? (
          <p className="gallery-empty">No hay obras en esta selección.</p>
        ) : (
          <div className="gallery-grid-new">
            {shown.map((work, i) => <WorkCard key={work.slug} work={work} priority={i < 3} />)}
          </div>
        )}
      </Container>
    </Shell>
  )
}
