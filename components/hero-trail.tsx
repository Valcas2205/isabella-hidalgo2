'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/* ── HeroTrail ──
   Hero con la foto pequeña al centro y el logo grande. Al hacer scroll las
   imágenes aparecen una a una, en orden (sentido horario desde arriba a la
   izquierda). Al volver arriba salen en orden inverso y queda el estado
   inicial limpio.

   El scroll sólo alterna una clase desde un rAF, sin re-render; la entrada
   es una transición CSS lenta.

   La aparición depende siempre del scroll (lo controla la persona), también
   con prefers-reduced-motion: en ese caso sólo se acorta la transición. */

/* Las obras se colocan sueltas, a distinta altura y con tamaños distintos, para
   que la composición respire y no parezca una cuadrícula. Dos tandas de ocho:
   la segunda sustituye a la primera.
   `x` / `y` = centro de la imagen en % de la pantalla; `w` = ancho en vw.
   `mx` / `my` = lo mismo en pantallas estrechas (móvil). */
const SCATTER = [
  // ── Tanda 1 ──
  { wave: 0, x: 10, y: 28, w: 14, mx: 20, my: 13 },
  { wave: 0, x: 31, y: 16, w: 9.5, mx: 66, my: 10 },
  { wave: 0, x: 55, y: 19, w: 11.5, mx: 82, my: 27 },
  { wave: 0, x: 89, y: 30, w: 15, mx: 38, my: 31 },
  { wave: 0, x: 18, y: 72, w: 12, mx: 16, my: 70 },
  { wave: 0, x: 33, y: 80, w: 10.5, mx: 60, my: 84 },
  { wave: 0, x: 70, y: 76, w: 14, mx: 78, my: 68 },
  { wave: 0, x: 93, y: 74, w: 9.5, mx: 88, my: 88 },
  // La foto principal ya no está fija: es una más de la animación (tanda 1)
  { wave: 0, x: 50, y: 86, w: 15, mx: 28, my: 90, photo: true },
  // ── Tanda 2 ──
  { wave: 1, x: 8, y: 24, w: 9.5, mx: 80, my: 12 },
  { wave: 1, x: 14, y: 64, w: 15, mx: 24, my: 20 },
  { wave: 1, x: 36, y: 24, w: 11.5, mx: 58, my: 24 },
  { wave: 1, x: 62, y: 14, w: 9.5, mx: 86, my: 34 },
  { wave: 1, x: 84, y: 22, w: 12.5, mx: 22, my: 72 },
  { wave: 1, x: 91, y: 68, w: 14, mx: 60, my: 66 },
  { wave: 1, x: 60, y: 80, w: 10.5, mx: 75, my: 82 },
  { wave: 1, x: 30, y: 82, w: 9.5, mx: 40, my: 88 },
]

let nextImg = 0
const IMG_OF = SCATTER.map(s => (s.photo ? -1 : nextImg++))

/* Progreso del scroll (0–1) en que empieza cada tanda */
const WAVE_AT = [0.12, 0.55]

export default function HeroTrail({
  photo, wordmark, note, images,
}: {
  photo: string
  wordmark: string
  note: string
  /** Una por posición de SCATTER: 8 + 8, en el orden de las tandas. */
  images: string[]
}) {
  const stageRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const items = itemRefs.current
    let raf = 0
    /* Si la persona sale del hero por abajo, al volver encuentra el estado
       inicial limpio: las obras no reaparecen hasta que llegue arriba y
       vuelva a bajar. */
    let locked = false

    const paint = () => {
      raf = 0
      const rect = stage.getBoundingClientRect()
      const run = rect.height - window.innerHeight
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(run, 1)))
      if (rect.bottom <= 0) locked = true
      else if (p < 0.02) locked = false
      const wave = locked ? -1 : WAVE_AT.filter(at => p >= at).length - 1
      /* En cuanto empiezan a entrar las obras, la foto central se desvanece y
         la cuadrícula se reparte a partes iguales para que las obras crezcan. */
      stage.classList.toggle('is-open', wave >= 0)
      items.forEach((el, i) => {
        if (el) el.classList.toggle('is-in', SCATTER[i].wave === wave)
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint) }

    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="hero-stage" ref={stageRef}>
      <div className="hero-sticky">

        {SCATTER.map((s, i) => (
          <div
            key={i}
            className="hero-spot"
            style={{ '--x': `${s.x}%`, '--y': `${s.y}%`, '--w': s.w, '--mx': `${s.mx}%`, '--my': s.my / 100 } as React.CSSProperties}
          >
            <div
              className={`hero-scatter${s.photo ? ' hero-scatter-wide' : ''}`}
              ref={el => { itemRefs.current[i] = el }}
              style={{ '--d': `${(i % 8) * 0.12}s` } as React.CSSProperties}
            >
              <Image
                src={s.photo ? photo : images[IMG_OF[i] % images.length]}
                alt={s.photo ? 'Isabella Hidalgo' : ''}
                fill
                sizes="(max-width:768px) 40vw, 30vw"
              />
            </div>
          </div>
        ))}

        <div
          className="hero-logo"
          role="img"
          aria-label="Isabella Hidalgo"
          style={{ maskImage: `url(${wordmark})`, WebkitMaskImage: `url(${wordmark})` }}
        />
      </div>
    </section>
  )
}
