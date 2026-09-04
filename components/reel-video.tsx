'use client'

import { useEffect, useRef } from 'react'

interface ReelVideoProps {
  src: string
  poster?: string
}

export default function ReelVideo({ src, poster }: ReelVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.muted = true
    el.play().catch(() => {
      // autoplay blocked — keep video paused, user can click
    })
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  )
}
