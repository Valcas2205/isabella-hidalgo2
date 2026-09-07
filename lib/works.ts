/* ── Catálogo de obra ──
   Módulo sin 'use client' a propósito: lo consumen tanto los Server
   Components (páginas de producto, generateStaticParams) como los
   Client Components (carrito, carrusel). */

export type Work = {
  slug: string
  title: string
  /** El texto que Isabella pintó sobre el lienzo. */
  quote: string
  /** Primera imagen = la principal. El resto alimentan la galería del producto. */
  images: string[]
  size: string
  medium: string
  year: number
  price: number
  framedPrice?: number
  available: boolean
  /** 20% del precio va a Sun.Risas · Venezuela */
  donation?: boolean
  story: string
}

export const works: Work[] = [
  {
    slug: 'always-guided-by-the-universe',
    title: 'Always Guided by the Universe',
    quote: 'Always guided by the universe',
    images: ['/art/always-guided-wide.webp', '/art/always-guided-motion.webp', '/art/isabella-always-guided.webp'],
    size: '80 × 60 cm',
    medium: 'Acrílico diluido sobre lienzo de algodón sin bastidor',
    year: 2026,
    price: 980,
    framedPrice: 1200,
    available: true,
    donation: true,
    story:
      'Pintada en una mañana de luz baja, cuando el naranja entraba por la ventana del estudio y no había nada que decidir. El lienzo cuelga suelto, con los hilos sin rematar: la obra sigue siendo tela, no pretende ser otra cosa.',
  },
  {
    slug: 'all-things-pass',
    title: 'All Things Pass',
    quote: 'All things pass',
    images: ['/art/all-things-pass.webp', '/art/isabella-always-guided.webp'],
    size: '70 × 70 cm',
    medium: 'Acrílico diluido sobre lienzo de algodón',
    year: 2026,
    price: 850,
    framedPrice: 1020,
    available: true,
    donation: true,
    story:
      'Un recordatorio escrito en voz baja, casi al borde del cuadro. Las capas se aplicaron mojado sobre mojado durante varios días, dejando que cada una se llevara parte de la anterior.',
  },
  {
    slug: 'here-in-this-instant',
    title: 'Here in This Instant',
    quote: 'Here in this instant there is nothing to force',
    images: ['/art/nothing-to-force.webp', '/art/canvas-stack.webp'],
    size: '90 × 65 cm',
    medium: 'Acrílico diluido sobre lienzo, marco flotante de roble',
    year: 2026,
    price: 1400,
    framedPrice: 1650,
    available: true,
    story:
      'La pieza más quieta de la serie. Azules y rosas que no llegan a encontrarse del todo, y una frase que apareció al final, cuando ya no quedaba nada por añadir.',
  },
  {
    slug: 'grace-and-purpose',
    title: 'Grace and Purpose',
    quote: 'May every day be manifested in grace and purpose',
    images: ['/art/grace-and-purpose.webp', '/art/prism-hand.webp'],
    size: '100 × 70 cm',
    medium: 'Acrílico diluido sobre lienzo, marco flotante de roble',
    year: 2026,
    price: 1500,
    framedPrice: 1780,
    available: true,
    story:
      'Coral y azul en tensión, sostenidos por una luz que viene de fuera del cuadro. Es la obra que más tiempo estuvo apoyada en la pared antes de darse por terminada.',
  },
  {
    slug: 'rhythm-of-intuition',
    title: 'The Rhythm of My Intuition',
    quote: 'I choose to walk to the rhythm of my intuition',
    images: ['/art/rhythm-of-intuition.webp', '/art/painted-hand.webp'],
    size: '85 × 85 cm',
    medium: 'Acrílico diluido sobre lienzo de algodón sin bastidor',
    year: 2026,
    price: 1100,
    framedPrice: 1320,
    available: true,
    donation: true,
    story:
      'Pintada en el suelo del estudio, caminando alrededor del lienzo. Los pasteles se mezclaron solos por gravedad; la frase se escribió en diagonal, siguiendo el gesto del cuerpo.',
  },
  {
    slug: 'trust-your-inner-wisdom',
    title: 'Trust in Your Inner Wisdom',
    quote: 'Trust in your inner wisdom',
    images: ['/art/isabella-inner-wisdom.webp', '/art/studio-frames.webp'],
    size: '95 × 75 cm',
    medium: 'Acrílico diluido sobre lienzo de algodón sin bastidor',
    year: 2026,
    price: 1250,
    available: false,
    story:
      'Rojos y azules que se empujan en el centro. Se vendió en el estudio antes de llegar a la web; queda aquí como parte de la serie.',
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
