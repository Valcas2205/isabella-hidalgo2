'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { LocaleLink } from '@/components/i18n-provider'
import type { Work } from '@/lib/works'

/* Sólo la imagen y su título. Al pasar el cursor por encima se muestra la
   segunda foto de la obra, con un fundido lento. En táctil no hay hover. */
function CarouselItem({ work, moved }: { work: Work; moved: React.MutableRefObject<number> }) {
  const [shot, setShot] = useState(0)
  const [hover, setHover] = useState(false)

  /* Foto predeterminada; al tocarla con el cursor pasa a la siguiente (una sola vez)
     y al salir vuelve a la primera. */
  useEffect(() => {
    setShot(hover && work.images.length > 1 ? 1 : 0)
  }, [hover, work.images.length])

  return (
    <article className={`carousel-card${hover ? ' is-hover' : ''}`}>
      <LocaleLink
        href={`/gallery/${work.slug}`}
        className="carousel-img"
        onPointerEnter={e => { if (e.pointerType === 'mouse') setHover(true) }}
        onPointerLeave={() => setHover(false)}
        /* Si el usuario venía arrastrando, no navegamos. */
        onClick={e => { if (moved.current > 6) e.preventDefault() }}
      >
        {work.images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? work.title : ''}
            fill
            sizes="(max-width: 768px) 80vw, 400px"
            className={i === shot ? 'is-on' : ''}
          />
        ))}
      </LocaleLink>
      <h3 className="carousel-title">{work.title}</h3>
    </article>
  )
}

export default function ArtCarousel({ works }: { works: Work[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const moved = useRef(0)


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

  const updateEdges = () => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    updateEdges()
    window.addEventListener('resize', updateEdges)
    return () => window.removeEventListener('resize', updateEdges)
  }, [])

  const handleScroll = () => {
    if (!trackRef.current) return
    setActive(Math.round(trackRef.current.scrollLeft / step()))
    updateEdges()
  }

  const nudge = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * step(), behavior: 'smooth' })

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
        {works.map(work => <CarouselItem key={work.slug} work={work} moved={moved} />)}
      </div>

      <button className="carousel-arrow carousel-arrow-prev" onClick={() => nudge(-1)} hidden={!canPrev} aria-label="Anterior"><ChevronLeft size={18} strokeWidth={1.25}/></button>
      <button className="carousel-arrow carousel-arrow-next" onClick={() => nudge(1)} hidden={!canNext} aria-label="Siguiente"><ChevronRight size={18} strokeWidth={1.25}/></button>

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
