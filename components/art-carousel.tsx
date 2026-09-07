'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useContext } from 'react'
import { CartContext } from '@/components/site-chrome'
import type { Work } from '@/lib/works'

export default function ArtCarousel({ works }: { works: Work[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const moved = useRef(0)

  const { add, items, openCart } = useContext(CartContext)

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    moved.current = 0
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0)
    scrollLeft.current = trackRef.current?.scrollLeft || 0
  }
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.6
    moved.current = Math.abs(walk)
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }
  const handlePointerUp = () => setDragging(false)

  /** Mide la tarjeta + el gap real, en vez de asumir un número fijo. */
  const step = () => {
    const track = trackRef.current
    const card = track?.querySelector('.carousel-card') as HTMLElement | null
    if (!track || !card) return 360
    const gap = parseFloat(getComputedStyle(track).columnGap || '24') || 24
    return card.offsetWidth + gap
  }

  const handleScroll = () => {
    if (!trackRef.current) return
    setActive(Math.round(trackRef.current.scrollLeft / step()))
  }

  const scrollTo = (i: number) => {
    trackRef.current?.scrollTo({ left: i * step(), behavior: 'smooth' })
    setActive(i)
  }

  return (
    <div className="carousel-root">
      <div
        ref={trackRef}
        className={`carousel-track${dragging ? ' is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onScroll={handleScroll}
      >
        {works.map((work, i) => {
          const inCart = items.some(item => item.slug === work.slug)
          return (
            <article key={work.slug} className="carousel-card">
              <Link
                href={`/gallery/${work.slug}`}
                className="carousel-img"
                /* Si el usuario venía arrastrando, no navegamos. */
                onClick={e => { if (moved.current > 6) e.preventDefault() }}
              >
                <Image
                  src={work.images[0]}
                  alt={work.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 340px"
                  style={{ objectFit: 'cover' }}
                />
                <span className="carousel-index">{(i + 1).toString().padStart(2, '0')}</span>
                {!work.available && <span className="carousel-sold">Vendida</span>}
              </Link>

              <div className="carousel-meta">
                <div>
                  <h3><Link href={`/gallery/${work.slug}`}>{work.title}</Link></h3>
                  <p>{work.size} · €{work.price.toLocaleString()}</p>
                </div>
                {work.available ? (
                  <button
                    className={`collect-btn ${inCart ? 'collected' : ''}`}
                    onClick={() => { add(work); openCart() }}
                    disabled={inCart}
                  >
                    {inCart ? '✓' : 'Collect'}
                  </button>
                ) : (
                  <Link href={`/gallery/${work.slug}`} className="collect-btn collected">Ver</Link>
                )}
              </div>
            </article>
          )
        })}

        <div className="carousel-card carousel-cta-card">
          <Link href="/gallery" className="carousel-cta-inner">
            <span className="carousel-cta-ring">＋</span>
            <p>Ver la galería completa</p>
          </Link>
        </div>
      </div>

      <div className="carousel-dots">
        {works.map((w, i) => (
          <button
            key={w.slug}
            className={`carousel-dot${active === i ? ' is-active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Ir a ${w.title}`}
          />
        ))}
      </div>
    </div>
  )
}
