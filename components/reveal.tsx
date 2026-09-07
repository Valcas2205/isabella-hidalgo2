'use client'

import { useEffect, useRef, useState } from 'react'

/* ── Reveal ──
   Aparición al entrar en viewport. Se apoya en IntersectionObserver y
   se desconecta tras dispararse, así no queda un observer por elemento
   vivo durante toda la sesión.

   Respeta prefers-reduced-motion: si el usuario lo tiene activado el
   contenido se muestra directamente, sin transición. */
export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  variant = 'up',
}: {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
  /** ms */
  delay?: number
  variant?: 'up' | 'fade' | 'left' | 'right' | 'scale'
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        }
      },
      /* threshold 0 y un margen inferior pequeño: se dispara en cuanto
         el borde superior asoma. Con 0.12 una imagen alta tenía que
         entrar mucho para aparecer, y mientras tanto se veía un hueco
         en blanco debajo del texto. */
      { threshold: 0, rootMargin: '0px 0px -40px 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant}${shown ? ' is-in' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
