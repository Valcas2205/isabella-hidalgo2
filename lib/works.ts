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
  /** Texto alternativo de la imagen principal; si falta se usa el título. */
  alt?: Localized
}

export const works: Work[] = [
  {
    /* IH-001 · hoja de especificaciones 11 meters of sky.
       Sólo hay precio con marco (880 €): pendiente de confirmar el precio sin marco. */
    slug: 'this-too',
    title: 'This Too',
    quote: 'All things pass…',
    images: [
      '/art/this-too/01-styled.webp',
      '/art/this-too/02-styled.webp',
      '/art/this-too/03-main.webp',
      '/art/this-too/04-installed.webp',
      '/art/this-too/05-angle.webp',
    ],
    size: '60 × 60 cm',
    medium: {
      es: 'Técnica mixta sobre lienzo',
      en: 'Mixed media on canvas',
    },
    year: 2026,
    price: 880,
    available: true,
    story: {
      es: 'Un fondo azul pálido atravesado por bandas diagonales de luz refractada. La frase es pequeña y está colocada abajo, para encontrarla más que leerla.',
      en: 'A pale blue ground crossed by diagonal bands of refracted light. The phrase is small and set low, so it is found rather than read.',
    },
    alt: {
      es: 'Pintura cuadrada de fondo azul pálido con luz diagonal de arcoíris y las palabras escritas a mano «All things pass».',
      en: 'Square pale blue painting with diagonal rainbow light and the handwritten words “All things pass”.',
    },
  },
  {
    /* IH-003 · hoja de especificaciones 11 meters of sky.
       El catálogo escribe 120 × 70 (ancho × alto); aquí va alto × ancho como en galerías:
       pendiente de confirmar con Isabella. */
    slug: 'mistakes',
    title: 'Mistakes',
    quote: 'Mistakes make life beautiful.',
    images: [
      '/art/mistakes/01-crate.webp',
      '/art/mistakes/02-detail.webp',
      '/art/mistakes/03-angle.webp',
      '/art/mistakes/04-leaf.webp',
    ],
    size: '70 × 120 cm',
    medium: {
      es: 'Técnica mixta sobre lienzo crudo',
      en: 'Mixed media on raw canvas',
    },
    year: 2026,
    price: 1750,
    framedPrice: 1980,
    available: true,
    story: {
      es: 'La obra más grande de la serie: naranja y rosa construidos en capas transparentes a lo largo de 120 cm. Las marcas anteriores siguen visibles bajo la superficie, también las que no estaban previstas.',
      en: 'The largest work in the series: orange and pink built up in transparent layers across 120 cm. Earlier marks stay visible under the surface, including the ones that were not planned.',
    },
    alt: {
      es: 'Pintura horizontal grande en naranja y rosa con las palabras escritas a mano «Mistakes make life beautiful».',
      en: 'Large orange and pink horizontal painting with the handwritten words “Mistakes make life beautiful”.',
    },
  },
  {
    /* IH-002 · hoja de especificaciones 11 meters of sky.
       Tamaño como lo escribe el catálogo (60 × 80): alto × ancho, obra horizontal. */
    slug: 'always-guided',
    title: 'Always Guided',
    quote: 'Always guided by the universe.',
    images: [
      '/art/always-guided/01-leaning.webp',
      '/art/always-guided/02-held.webp',
      '/art/always-guided/03-wall.webp',
      '/art/always-guided/04-installed.webp',
      '/art/always-guided/05-detail.webp',
    ],
    size: '60 × 80 cm',
    medium: {
      es: 'Técnica mixta sobre lienzo crudo',
      en: 'Mixed media on raw canvas',
    },
    year: 2026,
    price: 980,
    framedPrice: 1200,
    available: true,
    donation: true,
    story: {
      es: 'Coral que se va oscureciendo hacia el violeta en los bordes, con un leve pasaje verde cerca de la parte superior. La frase está descentrada, en la zona más cálida del campo de color.',
      en: 'Coral deepening into violet toward the edges, with a faint green passage near the top. The phrase sits off-centre, in the warmest part of the field.',
    },
    alt: {
      es: 'Pintura en coral y violeta sobre lienzo crudo con las palabras escritas a mano «Always guided by the universe».',
      en: 'Coral and violet painting on raw canvas with the handwritten words “Always guided by the universe”.',
    },
  },
  {
    /* IH-004 · hoja de especificaciones 11 meters of sky.
       Medidas como en el catálogo (60 × 90): alto × ancho, obra horizontal. */
    slug: 'pause',
    title: 'Pause',
    quote: 'This is your sign to pause.',
    images: [
      '/art/pause/01-crate.webp',
      '/art/pause/02-close.webp',
      '/art/pause/03-wall.webp',
      '/art/pause/04-detail.webp',
      '/art/pause/05-phrase.webp',
      '/art/pause/06-edge.webp',
      '/art/pause/07-leaf.webp',
    ],
    size: '60 × 90 cm',
    medium: {
      es: 'Técnica mixta sobre lienzo crudo',
      en: 'Mixed media on raw canvas',
    },
    year: 2026,
    price: 1100,
    framedPrice: 1320,
    available: true,
    story: {
      es: 'Un campo amplio de azul pálido y rubor, con el pigmento más oscuro acumulado donde se detuvo el agua. La frase corre a lo largo del borde inferior, cerca de donde estaría un horizonte.',
      en: 'A wide field of pale blue and blush, with darker pigment gathered where the water pooled. The phrase runs along the lower edge, close to where a horizon would be.',
    },
    alt: {
      es: 'Pintura ancha en azul pastel y rubor con las palabras escritas a mano «This is your sign to pause».',
      en: 'Wide pastel blue and blush painting with the handwritten words “This is your sign to pause”.',
    },
  },
  {
    /* IH-008 · hoja de especificaciones 11 meters of sky.
       Obra vertical: 70 × 50 ya está como alto × ancho. 20% a Sun.Risas. */
    slug: 'in-grace',
    title: 'In Grace',
    quote: 'May every day be manifested in grace and purpose.',
    images: [
      '/art/in-grace/01-wall.webp',
      '/art/in-grace/02-detail.webp',
      '/art/in-grace/03-phrase.webp',
      '/art/in-grace/04-leaf.webp',
      '/art/in-grace/05-angle.webp',
    ],
    size: '70 × 50 cm',
    medium: {
      es: 'Técnica mixta sobre lienzo crudo',
      en: 'Mixed media on raw canvas',
    },
    year: 2026,
    price: 850,
    framedPrice: 1050,
    available: true,
    donation: true,
    story: {
      es: 'Rubor que asciende hacia el azul sobre algodón crudo. La frase se apila en cinco líneas, dando espacio a cada palabra. El 20 % de esta obra se destina a Sun.Risas, que apoya a niños en Venezuela.',
      en: 'Blush rising into blue on raw cotton. The phrase is stacked in five lines, each word given room. 20% of this work goes to Sun.Risas, supporting children in Venezuela.',
    },
    alt: {
      es: 'Pintura vertical en rosa y azul con las palabras escritas a mano «May every day be manifested in grace and purpose».',
      en: 'Vertical pink and blue painting with the handwritten words “May every day be manifested in grace and purpose”.',
    },
  },
  {
    /* IH-005 · hoja de especificaciones 11 meters of sky. Cuadrada: 90 × 90. */
    slug: 'inner-wisdom',
    title: 'Inner Wisdom',
    quote: 'Trust in your inner wisdom.',
    images: [
      '/art/inner-wisdom/01-bookshelf.webp',
      '/art/inner-wisdom/02-plants.webp',
      '/art/inner-wisdom/03-crate.webp',
      '/art/inner-wisdom/04-wall.webp',
      '/art/inner-wisdom/05-leaves.webp',
      '/art/inner-wisdom/06-angle.webp',
      '/art/inner-wisdom/07-phrase.webp',
      '/art/inner-wisdom/08-leaf.webp',
    ],
    size: '90 × 90 cm',
    medium: {
      es: 'Técnica mixta sobre lienzo crudo',
      en: 'Mixed media on raw canvas',
    },
    year: 2026,
    price: 1400,
    framedPrice: 1650,
    available: true,
    story: {
      es: 'Azul y rosa con el mismo peso a lo largo de un cuadrado de 90 cm, sin que ninguno de los dos colores se asiente como fondo. Una de las obras más saturadas de la serie.',
      en: 'Blue and rose of equal weight across a 90 cm square, neither colour settling into background. One of the most saturated works in the series.',
    },
    alt: {
      es: 'Pintura cuadrada grande en azul y rosa con las palabras escritas a mano «Trust in your inner wisdom».',
      en: 'Large square blue and rose painting with the handwritten words “Trust in your inner wisdom”.',
    },
  },
  {
    /* IH-009 · hoja de especificaciones 11 meters of sky.
       El PDF da 70 × 60 y sólo el precio con marco (1.320 €): pendientes de confirmar. 20% a Sun.Risas. */
    slug: 'in-this-instant',
    title: 'In This Instant',
    quote: 'Here in this instant there is nothing to force.',
    images: [
      '/art/in-this-instant/01-wall.webp',
      '/art/in-this-instant/02-wall-plant.webp',
      '/art/in-this-instant/03-floor.webp',
      '/art/in-this-instant/04-phrase.webp',
    ],
    size: '70 × 60 cm',
    medium: {
      es: 'Técnica mixta sobre lienzo crudo',
      en: 'Mixed media on raw canvas',
    },
    year: 2026,
    price: 1320,
    available: true,
    donation: true,
    story: {
      es: 'Azul con una banda diagonal de luz de espectro cruzando el centro. La frase está escrita en cinco líneas cortas, para leerla despacio. El 20 % de esta obra se destina a Sun.Risas, que apoya a niños en Venezuela.',
      en: 'Blue with a diagonal band of spectrum light across the centre. The phrase is written in five short lines, to be read slowly. 20% of this work goes to Sun.Risas, supporting children in Venezuela.',
    },
    alt: {
      es: 'Lienzo azul con una franja diagonal de arcoíris y las palabras escritas a mano «Here in this instant there is nothing to force».',
      en: 'Blue canvas with a diagonal rainbow band and the handwritten words “Here in this instant there is nothing to force”.',
    },
  },
  {
    /* IH-006 · hoja de especificaciones 11 meters of sky.
       Sólo hay precio con marco (1.320 €): pendiente de confirmar el precio sin marco. */
    slug: 'here-and-the-now',
    title: 'Here and the Now',
    quote: 'Come back to here and the now.',
    images: [
      '/art/here-and-the-now/01-leaning.webp',
      '/art/here-and-the-now/02-crate.webp',
      '/art/here-and-the-now/03-wall.webp',
      '/art/here-and-the-now/04-plant.webp',
      '/art/here-and-the-now/05-detail.webp',
      '/art/here-and-the-now/06-leaf.webp',
      '/art/here-and-the-now/07-shadow.webp',
      '/art/here-and-the-now/08-angle.webp',
    ],
    size: '60 × 90 cm',
    medium: {
      es: 'Técnica mixta sobre lienzo',
      en: 'Mixed media on canvas',
    },
    year: 2026,
    price: 1320,
    available: true,
    story: {
      es: 'Azul grisáceo con un único pasaje de luz de espectro, como las refracciones que cruzan una pared y siguen su camino. La frase está debajo, donde la mirada aterriza después del color.',
      en: 'Grey-blue with a single passage of spectrum light, like the refractions that cross a wall and move on. The phrase sits below it, where the eye lands after the colour.',
    },
    alt: {
      es: 'Pintura azul grisácea con una suave franja de arcoíris y las palabras escritas a mano «Come back to here and the now».',
      en: 'Grey-blue painting with a soft rainbow streak and the handwritten words “Come back to here and the now”.',
    },
  },
  {
    /* IH-007 · hoja de especificaciones 11 meters of sky.
       El catálogo escribe 60 × 40 (ancho × alto) en una obra horizontal; aquí va alto × ancho:
       pendiente de confirmar con Isabella. */
    slug: 'intuition',
    title: 'Intuition',
    quote: 'I choose to walk to the rhythm of my intuition.',
    images: [
      '/art/intuition/01-wall.webp',
      '/art/intuition/02-plant-wide.webp',
      '/art/intuition/03-plant-left.webp',
      '/art/intuition/04-close.webp',
      '/art/intuition/05-angle.webp',
      '/art/intuition/06-phrase.webp',
    ],
    size: '40 × 60 cm',
    medium: {
      es: 'Técnica mixta sobre lienzo crudo',
      en: 'Mixed media on raw canvas',
    },
    year: 2026,
    price: 820,
    framedPrice: 1200,
    available: true,
    story: {
      es: 'Melocotón, oro y lila sobre algodón sin bastidor, colgado de dos pinzas con los bordes deshilachados a la vista. La frase recorre en una sola línea el tercio inferior.',
      en: 'Peach, gold and lilac on unstretched cotton, hung from two clips with the frayed edges left open. The phrase runs in one long line across the lower third.',
    },
    alt: {
      es: 'Lienzo sin bastidor en melocotón, oro y lila con las palabras escritas a mano «I choose to walk to the rhythm of my intuition».',
      en: 'Unstretched peach, gold and lilac canvas with the handwritten words “I choose to walk to the rhythm of my intuition”.',
    },
  },
  {
    /* IH-010 · todavía sin fotos ni ficha: placeholder hasta que Isabella la envíe. */
    slug: 'trust',
    title: 'Trust',
    quote: '',
    images: ['/placeholder.svg'],
    size: '',
    medium: { es: '', en: '' },
    year: 2026,
    price: 0,
    available: false,
    story: { es: '', en: '' },
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
  guidedMotion: '/art/always-guided-motion.webp',
  isabellaGuided: '/art/isabella-always-guided.webp',
  isabellaWisdom: '/art/isabella-inner-wisdom.webp',
  rhythmDetail: '/art/rhythm-of-intuition.webp',
  allThingsPass: '/art/all-things-pass.webp',
  nothingToForce: '/art/nothing-to-force.webp',
  /** "Grace and Purpose" ya colgada en la pared de quien la coleccionó. */
  graceInHome: '/art/grace-and-purpose-home.webp',
}
