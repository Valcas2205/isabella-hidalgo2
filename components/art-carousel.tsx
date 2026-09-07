'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useContext } from 'react'
import { CartContext, WorkData } from '@/components/site-chrome'

export default function ArtCarousel({ works }: { works: WorkData[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const { add, items, openCart } = useContext(CartContext)

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0)
    scrollLeft.current = trackRef.current?.scrollLeft || 0
  }
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 2
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }
  const handlePointerUp = () => setDragging(false)

  const handleScroll = () => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.carousel-card') as HTMLElement | null
    const cardWidth = card ? card.offsetWidth + 16 : 364 // 16 = gap
    const index = Math.round(trackRef.current.scrollLeft / cardWidth)
    setActive(index)
  }

  const scrollTo = (i: number) => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.carousel-card') as HTMLElement | null
    const cardWidth = card ? card.offsetWidth + 16 : 364
    trackRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' })
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
          const inCart = items.some(item => item.title === work.title)
          return (
            <article key={work.title} className="carousel-card">
              <div className="carousel-img">
                <Image src={work.src} alt={work.title} fill sizes="(max-width: 768px) 80vw, 340px"/>
                <span className="carousel-index">{(i + 1).toString().padStart(2, '0')}</span>
                <span className="carousel-category">{work.category}</span>
              </div>
              <div className="carousel-meta">
                <div>
                  <h3>{work.title}</h3>
                  <p>{work.size} · {work.medium}</p>
                </div>
                <button
                  className={`collect-btn ${inCart ? 'collected' : ''}`}
                  onClick={() => { add(work); openCart(); }}
                  disabled={inCart}
                >
                  {inCart ? '✓' : 'Collect'}
                </button>
              </div>
            </article>
          )
        })}
        <div className="carousel-card carousel-cta-card">
          <Link href="/gallery" className="carousel-cta-inner">
            <span className="carousel-cta-ring">＋</span>
            <p>View the full gallery</p>
          </Link>
        </div>
      </div>
      <div className="carousel-dots">
        {works.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${active === i ? ' is-active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to work ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
