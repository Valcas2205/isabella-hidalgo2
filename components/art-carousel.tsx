'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { AddToBag } from '@/components/site-chrome'

type Work = { src: string; title: string; detail: string; category: string }

export default function ArtCarousel({ works }: { works: Work[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const scrollTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[index] as HTMLElement
    track.scrollTo({ left: card.offsetLeft - 40, behavior: 'smooth' })
    setActive(index)
  }

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0)
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - (trackRef.current.offsetLeft ?? 0)
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current)
  }
  const onMouseUp = () => setDragging(false)

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const center = track.scrollLeft + track.clientWidth / 2
    let closest = 0
    let closestDist = Infinity
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center)
      if (dist < closestDist) { closestDist = dist; closest = i }
    })
    setActive(closest)
  }

  return (
    <div className="carousel-root">
      <div
        className={`carousel-track${dragging ? ' is-dragging' : ''}`}
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onScroll={onScroll}
      >
        {works.map((work, i) => (
          <article className="carousel-card" key={work.title}>
            <div className="carousel-img">
              <Image src={work.src} alt={work.title} fill sizes="(max-width:768px) 85vw, 400px" draggable={false}/>
              <span className="carousel-index">0{i + 1}</span>
              <span className="carousel-category">{work.category}</span>
            </div>
            <div className="carousel-meta">
              <div>
                <h3>{work.title}</h3>
                <p>{work.detail}</p>
              </div>
              <AddToBag label="Inquire"/>
            </div>
          </article>
        ))}
        <div className="carousel-card carousel-cta-card">
          <Link href="/gallery" className="carousel-cta-inner">
            <span className="carousel-cta-ring">?</span>
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
