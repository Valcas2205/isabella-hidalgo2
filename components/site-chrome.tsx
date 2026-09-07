'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, X, Minus, Plus, Trash2, ArrowUpRight } from 'lucide-react'
import { useState, createContext, useContext, useCallback } from 'react'
import { works, type Work } from '@/lib/works'

/* ── Constants ── */
const logo = '/logo.png'

/* El catálogo vive en lib/works.ts. Se re-exporta para que las páginas
   sigan importando desde un único sitio. */
export { works }
export type { Work }

/* ── Container ──
   El único primitivo de layout de la página. Header, footer y cada
   sección lo usan como div padre, así todo comparte el mismo borde
   izquierdo y derecho. El ancho y el gutter viven en globals.css
   (--page-max / --gutter), no aquí. */
export function Container({ as: Tag = 'div', className = '', children, ...rest }: {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>) {
  return <Tag className={`section-shell ${className}`.trim()} {...rest}>{children}</Tag>
}

/* ── Cart context ── */
type CartItem = { slug: string; title: string; price: number; size: string; qty: number; image: string }
type CartCtx  = {
  items: CartItem[]
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
  add: (w: Work) => void
  remove: (slug: string) => void
  change: (slug: string, delta: number) => void
}
export const CartContext = createContext<CartCtx>({
  items: [], cartOpen: false,
  openCart: () => {}, closeCart: () => {},
  add: () => {}, remove: () => {}, change: () => {},
})

/* ── Cart panel ── */
function CartPanel() {
  const { items, closeCart, remove, change } = useContext(CartContext)
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <>
      <div className="cart-backdrop" onClick={closeCart} aria-hidden="true" />
      <aside className="cart-panel" aria-label="Collection bag">
        <div className="cart-head">
          <p className="eyebrow">Your collection</p>
          <button onClick={closeCart} aria-label="Close bag"><X size={20}/></button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-mark">◯</span>
            <h2>Nothing held yet.</h2>
            <p>Works you are considering will appear here. Add a piece from the gallery to begin.</p>
            <Link href="/gallery" onClick={closeCart} className="button-link">Explore the gallery ↗</Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.slug} className="cart-item">
                  <Link href={`/gallery/${item.slug}`} onClick={closeCart} className="cart-item-img">
                    <Image src={item.image} alt={item.title} fill sizes="90px" style={{ objectFit: 'cover' }}/>
                  </Link>
                  <div className="cart-item-info">
                    <Link href={`/gallery/${item.slug}`} onClick={closeCart}>
                      <p className="cart-item-title">{item.title}</p>
                    </Link>
                    <p className="cart-item-size">{item.size}</p>
                    <div className="cart-item-controls">
                      <button onClick={() => change(item.slug, -1)} aria-label="Quitar uno"><Minus size={11}/></button>
                      <span>{item.qty}</span>
                      <button onClick={() => change(item.slug, 1)} aria-label="Añadir uno"><Plus size={11}/></button>
                      <button className="cart-item-trash" onClick={() => remove(item.slug)} aria-label="Eliminar"><Trash2 size={12}/></button>
                    </div>
                  </div>
                  <p className="cart-item-price">€{(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="cart-foot">
              <div className="cart-total">
                <span>Subtotal</span>
                <span>€{total.toLocaleString()}</span>
              </div>
              <p className="cart-note">Shipping &amp; framing calculated on enquiry. All prices in EUR.</p>
              <Link href="/contact" onClick={closeCart} className="cart-checkout">Send enquiry ↗</Link>
              <p className="cart-note cart-note-small">20% of selected works donated to Sun.Risas · Venezuela</p>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

/* ─── Header ─── */
export function Header() {
  const { items, openCart } = useContext(CartContext)
  const [navOpen, setNavOpen] = useState(false)
  const count = items.reduce((n, i) => n + i.qty, 0)

  return (
    <header className={`site-header${navOpen ? ' nav-open' : ''}`}>
      <Container>
        <Link href="/" className="brand" aria-label="Isabella Hidalgo home" onClick={() => setNavOpen(false)}>
          <Image src={logo} alt="Isabella Hidalgo Fine Art" width={140} height={160} priority />
        </Link>

        <nav aria-label="Main navigation" id="main-nav">
          <Link href="/" onClick={() => setNavOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setNavOpen(false)}>About</Link>
          <Link href="/gallery" onClick={() => setNavOpen(false)}>Gallery</Link>
          <Link href="/contact" onClick={() => setNavOpen(false)}>Contact</Link>
        </nav>

        <div className="header-actions">
          <button className="bag-button" onClick={openCart} aria-label="Open collection bag">
            <ShoppingBag size={18}/>
            <span className="bag-label">Bag</span>
            {count > 0 && <span className="bag-count">{count}</span>}
          </button>

          {/* Sólo visible en móvil */}
          <button
            className="nav-toggle"
            onClick={() => setNavOpen(o => !o)}
            aria-expanded={navOpen}
            aria-controls="main-nav"
            aria-label={navOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span/><span/>
          </button>
        </div>
      </Container>
    </header>
  )
}

/* ─── WorkCard: tarjeta de galería ─── */
export function WorkCard({ work, priority = false }: { work: Work; priority?: boolean }) {
  const { add, items, openCart } = useContext(CartContext)
  if (!work) return null
  const inCart = items.some(i => i.slug === work.slug)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!inCart) add(work)
    openCart()
  }

  return (
    <article className="new-work-card">
      <Link href={`/gallery/${work.slug}`} className="new-work-image">
        <Image
          src={work.images[0]}
          alt={work.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width:500px) 100vw, (max-width:900px) 50vw, 33vw"
          priority={priority}
        />
        {work.donation && <span className="work-badge">20% a Sun.Risas</span>}
        {!work.available && <span className="work-sold">Vendida</span>}
      </Link>

      <div className="new-work-meta">
        <div className="meta-row">
          <h3 className="new-work-title">
            <Link href={`/gallery/${work.slug}`}>{work.title}</Link>
          </h3>
          <span className="new-work-price">€{work.price.toLocaleString()}</span>
        </div>
        <div className="meta-row">
          <span className="new-work-artist">{work.size}</span>
          {work.available ? (
            <button
              className={`new-work-buy ${inCart ? 'in-cart' : ''}`}
              onClick={handleAdd}
              aria-label={`Añadir ${work.title} a la bolsa`}
            >
              {inCart ? '✓' : <ShoppingBag size={17} />}
            </button>
          ) : (
            <span className="new-work-artist">—</span>
          )}
        </div>
      </div>
    </article>
  )
}

/* ─── Otros componentes ─── */
export const faqs = [
  ['Are the paintings available to collect?', 'Yes. Original paintings are available through the studio. Write to Isabella with the work you are drawn to and she will share availability, dimensions and shipping details.'],
  ['Do you ship internationally?', 'Works and fine art prints can be shipped internationally from Spain. Each piece is carefully prepared and insured for its journey.'],
  ['Are prints signed?', 'Limited fine art prints are signed and numbered by Isabella, and produced in small editions on archival paper.'],
  ['Can I visit the studio?', 'Studio visits are possible by appointment at To Grow Studio.'],
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="faq">
      {faqs.map(([q, a], i) => (
        <div className="faq-item" key={q}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{q}</span>
            <span className="faq-plus">{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p>{a}</p>}
        </div>
      ))}
    </div>
  )
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="page-intro section-shell">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-brand">
          <Image src={logo} alt="Isabella Hidalgo Fine Art" width={80} height={80} style={{ objectFit: 'contain' }}/>
          <div>
            <p>Isabella Hidalgo Fine Art</p>
            <p>To Grow Studio · Spain</p>
          </div>
        </div>
        <div className="footer-social">
          <a href="https://www.instagram.com/isabellahidalgo" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={11}/></a>
          <a href="mailto:hola@isabellahidalgo.com">Email <ArrowUpRight size={11}/></a>
        </div>
        <p>© 2026</p>
      </Container>
    </footer>
  )
}

/* ─── Shell (guarda el estado del carrito para toda la página) ─── */
export function Shell({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const add = useCallback((w: Work) => {
    setCartItems(prev => prev.some(i => i.slug === w.slug)
      ? prev.map(i => i.slug === w.slug ? { ...i, qty: i.qty + 1 } : i)
      : [...prev, { slug: w.slug, title: w.title, price: w.price, size: w.size, qty: 1, image: w.images[0] }])
  }, [])

  const remove = useCallback((slug: string) =>
    setCartItems(prev => prev.filter(i => i.slug !== slug)), [])

  const change = useCallback((slug: string, delta: number) =>
    setCartItems(prev => prev.map(i =>
      i.slug === slug ? { ...i, qty: Math.max(1, i.qty + delta) } : i)), [])

  const ctx: CartCtx = {
    items: cartItems,
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    add, remove, change,
  }

  return (
    <CartContext.Provider value={ctx}>
      <main>
        <Header/>
        {children}
        <Footer/>
      </main>
      {cartOpen && <CartPanel/>}
    </CartContext.Provider>
  )
}

/* ─── Fotos de contexto ─── */
export const aboutPhoto = '/art/isabella-inner-wisdom.webp'
export const formPhoto  = '/art/prism-hand.webp'
export const heroPhoto  = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fotohero-YvF7D1oadNJt5tfJCWOnE5n0CyBe0M.avif'
export const wordmark   = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logonombre-wTrUqm0Qb1KHRzdDTZYTakx96YFCQk.png'
