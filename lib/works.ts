/* ── Catálogo de obra ──
   Módulo sin 'use client' a propósito: lo consumen tanto los Server
   Components (páginas de producto, generateStaticParams) como los
   Client Components (carrito, carrusel).

   `title` y `quote` NO se traducen: son el texto que Isabella pintó
   sobre el lienzo. Lo que cambia por idioma es la ficha y el relato. */

import type { Locale } from './i18n'

type Localized = Record<Locale, string>

export type Work = {
  slug: string
  title: string
  /** El texto que Isabella pintó sobre el lienzo. */
  quote: string
  /** Primera imagen = la principal. El resto alimentan la galería del producto. */
  images: string[]
  size: string
  medium: Localized
  year: number
  price: number
  framedPrice?: number
  available: boolean
  /** 20% del precio va a Sun.Risas · Venezuela */
  donation?: boolean
  story: Localized
}

export const works: Work[] = [
  {
    slug: 'always-guided-by-the-universe',
    title: 'Always Guided by the Universe',
    quote: 'Always guided by the universe',
    images: ['/art/always-guided-wide.webp', '/art/always-guided-motion.webp', '/art/isabella-always-guided.webp'],
    size: '80 × 60 cm',
    medium: {
      es: 'Acrílico diluido sobre lienzo de algodón sin bastidor',
      en: 'Diluted acrylic on unstretched cotton canvas',
    },
    year: 2026,
    price: 980,
    framedPrice: 1200,
    available: true,
    donation: true,
    story: {
      es: 'Pintada en una mañana de luz baja, cuando el naranja entraba por la ventana del estudio y no había nada que decidir. El lienzo cuelga suelto, con los hilos sin rematar: la obra sigue siendo tela, no pretende ser otra cosa.',
      en: 'Painted on a morning of low light, when the orange came through the studio window and there was nothing to decide. The canvas hangs loose, threads left unfinished: the work is still cloth, and does not pretend otherwise.',
    },
  },
  {
    slug: 'all-things-pass',
    title: 'All Things Pass',
    quote: 'All things pass',
    images: ['/art/all-things-pass.webp', '/art/isabella-always-guided.webp'],
    size: '70 × 70 cm',
    medium: {
      es: 'Acrílico diluido sobre lienzo de algodón',
      en: 'Diluted acrylic on cotton canvas',
    },
    year: 2026,
    price: 850,
    framedPrice: 1020,
    available: true,
    donation: true,
    story: {
      es: 'Un recordatorio escrito en voz baja, casi al borde del cuadro. Las capas se aplicaron mojado sobre mojado durante varios días, dejando que cada una se llevara parte de la anterior.',
      en: 'A reminder written under its breath, almost at the edge of the painting. The layers went on wet into wet across several days, each one carrying away part of the last.',
    },
  },
  {
    slug: 'here-in-this-instant',
    title: 'Here in This Instant',
    quote: 'Here in this instant there is nothing to force',
    images: ['/art/nothing-to-force.webp', '/art/canvas-stack.webp'],
    size: '90 × 65 cm',
    medium: {
      es: 'Acrílico diluido sobre lienzo, marco flotante de roble',
      en: 'Diluted acrylic on canvas, floating oak frame',
    },
    year: 2026,
    price: 1400,
    framedPrice: 1650,
    available: true,
    story: {
      es: 'La pieza más quieta de la serie. Azules y rosas que no llegan a encontrarse del todo, y una frase que apareció al final, cuando ya no quedaba nada por añadir.',
      en: 'The stillest piece in the series. Blues and pinks that never quite meet, and a phrase that arrived last, once there was nothing left to add.',
    },
  },
  {
    slug: 'grace-and-purpose',
    title: 'Grace and Purpose',
    quote: 'May every day be manifested in grace and purpose',
    images: ['/art/grace-and-purpose.webp', '/art/prism-hand.webp'],
    size: '100 × 70 cm',
    medium: {
      es: 'Acrílico diluido sobre lienzo, marco flotante de roble',
      en: 'Diluted acrylic on canvas, floating oak frame',
    },
    year: 2026,
    price: 1500,
    framedPrice: 1780,
    available: true,
    story: {
      es: 'Coral y azul en tensión, sostenidos por una luz que viene de fuera del cuadro. Es la obra que más tiempo estuvo apoyada en la pared antes de darse por terminada.',
      en: 'Coral and blue held in tension by a light that comes from outside the frame. This is the work that leaned against the wall longest before it was called finished.',
    },
  },
  {
    slug: 'rhythm-of-intuition',
    title: 'The Rhythm of My Intuition',
    quote: 'I choose to walk to the rhythm of my intuition',
    images: ['/art/rhythm-of-intuition.webp', '/art/painted-hand.webp'],
    size: '85 × 85 cm',
    medium: {
      es: 'Acrílico diluido sobre lienzo de algodón sin bastidor',
      en: 'Diluted acrylic on unstretched cotton canvas',
    },
    year: 2026,
    price: 1100,
    framedPrice: 1320,
    available: true,
    donation: true,
    story: {
      es: 'Pintada en el suelo del estudio, caminando alrededor del lienzo. Los pasteles se mezclaron solos por gravedad; la frase se escribió en diagonal, siguiendo el gesto del cuerpo.',
      en: 'Painted on the studio floor, walking around the canvas. The pastels mixed on their own by gravity; the phrase was written on the diagonal, following the movement of the body.',
    },
  },
  {
    slug: 'trust-your-inner-wisdom',
    title: 'Trust in Your Inner Wisdom',
    quote: 'Trust in your inner wisdom',
    images: ['/art/isabella-inner-wisdom.webp', '/art/studio-frames.webp'],
    size: '95 × 75 cm',
    medium: {
      es: 'Acrílico diluido sobre lienzo de algodón sin bastidor',
      en: 'Diluted acrylic on unstretched cotton canvas',
    },
    year: 2026,
    price: 1250,
    available: false,
    story: {
      es: 'Rojos y azules que se empujan en el centro. Se vendió en el estudio antes de llegar a la web; queda aquí como parte de la serie.',
      en: 'Reds and blues pushing against each other in the centre. It sold at the studio before reaching the site; it stays here as part of the series.',
    },
  },
]

export const getWork = (slug: string) => works.find(w => w.slug === slug)

/** Fotografías de contexto — no son obra en venta. */
export const photos = {
  studioFrames: '/art/studio-frames.webp',
  canvasStack: '/art/canvas-stack.webp',
  prismHand: '/art/prism-hand.webp',
  paintedHand: '/art/painted-hand.webp',
  guidedWide: '/art/always-guided-wide.webp',
  isabellaGuided: '/art/isabella-always-guided.webp',
  isabellaWisdom: '/art/isabella-inner-wisdom.webp',
}
