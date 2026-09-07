'use client'

import { useEffect, useRef } from 'react'

/* ── ReelVideo ──
   Vídeo mudo en bucle que sólo se reproduce mientras está en pantalla.

   Reproducir cuatro vídeos a la vez en un móvil gasta batería y datos
   sin que nadie los esté mirando, así que se arrancan y se pausan con
   un IntersectionObserver. Con prefers-reduced-motion se queda en el
   póster, quieto.

   El autoplay sólo lo permiten los navegadores si el vídeo va mudo:
   `muted` va tanto en el atributo como asignado por JS, porque algunos
   navegadores ignoran el atributo cuando React hidrata. */
export default function ReelVideo({
  src, poster, label,
}: { src: string; poster?: string; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.muted = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            /* Si el navegador lo bloquea, la tarjeta sigue siendo un
               enlace a Instagram: no hacemos nada más. */
            el.play().catch(() => {})
          } else if (!el.paused) {
            el.pause()
          }
        }
      },
      { threshold: 0.25 },
    )

    io.observe(el)
    return () => { io.disconnect(); el.pause() }
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  )
}
