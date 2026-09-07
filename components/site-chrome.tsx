'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-react'
import { useState, createContext, useContext, useCallback } from 'react'

/* ── Constants ── */
const logo = '/logo.png'

/* ── Works data (Spring 2026 catalogue) ── */
export type WorkData = {
  src: string
  title: string
  detail: string
  category: string
  size: string
  medium: string
  price: number
  framedPrice?: number
  available: boolean
  donation?: boolean
}

export const works: WorkData[] = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arte1-xJIZdCPClUJgazcWHQp1iVzsEwfSVD.avif',
    title: 'Always Guided',
    detail: '60×80 cm · Mixed media on raw canvas · 2026',
    category: 'Paintings',
    size: '60×80 cm',
    medium: 'Mixed media on raw canvas',
    price: 980,
    framedPrice: 1200,
    available: true,
    donation: true,
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arte2-eE4D4WP1mQkge6l5E6iyH9GIGygMV4.avif',
    title: 'In Grace',
    detail: '70×50 cm · Mixed media on raw canvas · 2026',
    category: 'Paintings',
    size: '70×50 cm',
    medium: 'Mixed media on raw canvas',
    price: 850,
    framedPrice: 1020,
    available: true,
    donation: true,
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arte3-EMEskmNVzkVqXiQaoXKTwXQ6Zn51mc.avif',
    title: 'Inner Wisdom',
    detail: '90×90 cm · Mixed media on raw canvas · 2026',
    category: 'Paintings',
    size: '90×90 cm',
    medium: 'Mixed media on raw canvas',
    price: 1400,
    framedPrice: 1650,
    available: true,
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fotoform-LYPAsLMfHFc3TXxw78iBOesyz0YcCd.avif',
    title: 'Pause',
    detail: '60×90 cm · Mixed media on raw canvas · 2026',
    category: 'Paintings',
    size: '60×90 cm',
    medium: 'Mixed media on raw canvas',
    price: 1100,
    framedPrice: 1320,
    available: true,
  },
]

/* ── Cart context ── */
type CartItem = { title: string; price: number; size: string; qty: number; src: string }
type CartCtx  = {
  items: CartItem[]
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
  add: (w: WorkData) => void
  remove: (title: string) => void
  change: (title: string, delta: number) => void
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
        <div className="cart-items">
          {items.map(item => (
            <div key={item.title} className="cart-item">
              <div className="cart-item-img">
                <Image src={item.src} alt={item.title} fill sizes="80px" style={{ objectFit: 'cover' }}/>
              </div>
              <div className="cart-item-info">
                <p className="cart-item-title">{item.title}</p>
                <p className="cart-item-size">{item.size}</p>
                <div className="cart-item-controls">
                  <button onClick={() => change(item.title, -1)}><Minus size={11}/></button>
                  <span>{item.qty}</span>
                  <button onClick={() => change(item.title, 1)}><Plus size={11}/></button>
                  <button className="cart-item-trash" onClick={() => remove(item.title)}><Trash2 size={12}/></button>
                </div>
              </div>
              <p className="cart-item-price">€{(item.price * item.qty).toLocaleString()}</p>
            </div>
          ))}
          <div className="cart-total">
            <span>Subtotal</span>
            <span>€{total.toLocaleString()}</span>
          </div>
          <p className="cart-note">Shipping & framing calculated on enquiry. All prices in EUR.</p>
          <Link href="/contact" onClick={closeCart} className="cart-checkout">Send enquiry ↗</Link>
          <p className="cart-note cart-note-small">20% of selected works donated to Sun.Risas · Venezuela</p>
        </div>
      )}
    </aside>
  )
}

/* ─── Header ─── */
export function Header() {
  const { items, openCart } = useContext(CartContext)
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Isabella Hidalgo home">
        <Image src={logo} alt="Isabella Hidalgo Fine Art" width={140} height={160} priority />
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <button className="bag-button" onClick={openCart} aria-label="Open collection bag">
        <ShoppingBag size={18}/>
        <span className="bag-label">Bag</span>
        {items.length > 0 && <span className="bag-count">{items.length}</span>}
      </button>
    </header>
  )
}

/* ─── WorkCard: gallery card (ecommerce style) ─── */
export function WorkCard({ work, featured = false }: { work: WorkData; featured?: boolean }) {
  const { add, items, openCart } = useContext(CartContext)
  if (!work) return null
  const inCart = items.some(i => i.title === work.title)

  const handleAdd = () => {
    if (!inCart) add(work)
    openCart()
  }

  return (
    <article className={`new-work-card ${featured ? 'featured' : ''}`}>
      <div className="new-work-image">
        <Image src={work.src} alt={work.title} fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 33vw"/>
        {work.donation && <span className="work-badge">20% to Sun.Risas</span>}
        {!work.available && <span className="work-sold">Sold Out</span>}
      </div>
      <div className="new-work-meta">
        <div className="meta-row">
          <h3 className="new-work-title">{work.title}</h3>
          <span className="new-work-price">€{work.price.toLocaleString()}</span>
        </div>
        <div className="meta-row">
          <span className="new-work-artist">Isabella Hidalgo</span>
          <button
            className={`new-work-buy ${inCart ? 'in-cart' : ''}`}
            onClick={handleAdd}
            aria-label="Add to cart"
          >
            {inCart ? '✓' : <ShoppingBag size={17} />}
          </button>
        </div>
      </div>
    </article>
  )
}

/* ─── Other components ─── */
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
      <Image src={logo} alt="Isabella Hidalgo Fine Art" width={80} height={80} style={{ objectFit: 'contain' }}/>
      <div>
        <p>Isabella Hidalgo Fine Art</p>
        <p>To Grow Studio · Spain</p>
      </div>
      <div className="footer-social">
        <a href="https://www.instagram.com/isabellahidalgo" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="mailto:hola@isabellahidalgo.com">Email</a>
      </div>
      <p>© 2026</p>
    </footer>
  )
}

/* ─── Shell (owns cart state so entire page has context) ─── */
export function Shell({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const add = useCallback((w: WorkData) => {
    setCartItems(prev => prev.some(i => i.title === w.title)
      ? prev
      : [...prev, { title: w.title, price: w.price, size: w.size, qty: 1, src: w.src }])
  }, [])

  const remove = useCallback((title: string) =>
    setCartItems(prev => prev.filter(i => i.title !== title)), [])

  const change = useCallback((title: string, delta: number) =>
    setCartItems(prev => prev.map(i =>
      i.title === title ? { ...i, qty: Math.max(1, i.qty + delta) } : i)), [])

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

/* ─── Photo constants ─── */
export const aboutPhoto = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fotoabout-IWirac6HqnoPvKil47mJuajikWtBmv.avif'
export const heroPhoto  = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fotohero-YvF7D1oadNJt5tfJCWOnE5n0CyBe0M.avif'
export const formPhoto  = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fotoform-LYPAsLMfHFc3TXxw78iBOesyz0YcCd.avif'
export const wordmark   = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logonombre-wTrUqm0Qb1KHRzdDTZYTakx96YFCQk.png'
