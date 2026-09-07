'use client'

import Image from 'next/image'
import { ShoppingBag, X, Minus, Plus, Trash2, ArrowUpRight } from 'lucide-react'
import { useState, createContext, useContext, useCallback, useEffect } from 'react'
import { works, type Work } from '@/lib/works'
import { useI18n, LocaleLink, LocaleSwitcher } from '@/components/i18n-provider'

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
  const { t } = useI18n()
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <>
      <div className="cart-backdrop" onClick={closeCart} aria-hidden="true" />
      <aside className="cart-panel" aria-label={t.cart.title}>
        <div className="cart-head">
          <p className="eyebrow">{t.cart.title}</p>
          <button onClick={closeCart} aria-label={t.cart.close}><X size={20}/></button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-mark">◯</span>
            <h2>{t.cart.emptyTitle}</h2>
            <p>{t.cart.emptyBody}</p>
            <LocaleLink href="/gallery" onClick={closeCart} className="button-link">{t.cart.exploreGallery}</LocaleLink>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.slug} className="cart-item">
                  <LocaleLink href={`/gallery/${item.slug}`} onClick={closeCart} className="cart-item-img">
                    <Image src={item.image} alt={item.title} fill sizes="90px" style={{ objectFit: 'cover' }}/>
                  </LocaleLink>
                  <div className="cart-item-info">
                    <LocaleLink href={`/gallery/${item.slug}`} onClick={closeCart}>
                      <p className="cart-item-title">{item.title}</p>
                    </LocaleLink>
                    <p className="cart-item-size">{item.size}</p>
                    <div className="cart-item-controls">
                      <button onClick={() => change(item.slug, -1)} aria-label={t.cart.less}><Minus size={11}/></button>
                      <span>{item.qty}</span>
                      <button onClick={() => change(item.slug, 1)} aria-label={t.cart.more}><Plus size={11}/></button>
                      <button className="cart-item-trash" onClick={() => remove(item.slug)} aria-label={t.cart.remove}><Trash2 size={12}/></button>
                    </div>
                  </div>
                  <p className="cart-item-price">€{(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="cart-foot">
              <div className="cart-total">
                <span>{t.cart.subtotal}</span>
                <span>€{total.toLocaleString()}</span>
              </div>
              <p className="cart-note">{t.cart.shippingNote}</p>
              <LocaleLink href="/contact" onClick={closeCart} className="cart-checkout">{t.cart.checkout}</LocaleLink>
              <p className="cart-note cart-note-small">{t.cart.donationNote}</p>
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
  const { t } = useI18n()
  const [navOpen, setNavOpen] = useState(false)
  const count = items.reduce((n, i) => n + i.qty, 0)
  const close = () => setNavOpen(false)

  /* Con el menú a pantalla completa abierto, bloqueamos el scroll del
     fondo y dejamos que Escape lo cierre. */
  useEffect(() => {
    if (!navOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setNavOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [navOpen])

  const links: [string, string][] = [
    ['/', t.nav.home],
    ['/about', t.nav.about],
    ['/gallery', t.nav.gallery],
    ['/contact', t.nav.contact],
  ]

  return (
    <header className={`site-header${navOpen ? ' nav-open' : ''}`}>
      <Container>
        <LocaleLink href="/" className="brand" aria-label="Isabella Hidalgo" onClick={close}>
          <Image src={logo} alt="Isabella Hidalgo Fine Art" width={140} height={160} priority />
        </LocaleLink>

        <nav aria-label="Main navigation" id="main-nav">
          <div className="nav-links">
            {links.map(([href, label]) => (
              <LocaleLink key={href} href={href} onClick={close}>{label}</LocaleLink>
            ))}
          </div>
          {/* En móvil el selector de idioma vive dentro del menú, para
              no apretar la cabecera. */}
          <div className="nav-drawer-foot">
            <LocaleSwitcher />
          </div>
        </nav>

        <div className="header-actions">
          <div className="locale-desktop"><LocaleSwitcher /></div>

          <button className="bag-button" onClick={openCart} aria-label={t.nav.openBag}>
            <ShoppingBag size={18}/>
            <span className="bag-label">{t.nav.bag}</span>
            {count > 0 && <span className="bag-count">{count}</span>}
          </button>

          {/* Sólo visible en móvil */}
          <button
            className="nav-toggle"
            onClick={() => setNavOpen(o => !o)}
            aria-expanded={navOpen}
            aria-controls="main-nav"
            aria-label={navOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            <span/><span/><span/>
          </button>
        </div>
      </Container>
    </header>
  )
}

/* ─── WorkCard: tarjeta de galería ─── */
export function WorkCard({ work, priority = false }: { work: Work; priority?: boolean }) {
  const { add, items, openCart } = useContext(CartContext)
  const { t } = useI18n()
  if (!work) return null
  const inCart = items.some(i => i.slug === work.slug)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!inCart) add(work)
    openCart()
  }

  return (
    <article className="new-work-card">
      <LocaleLink href={`/gallery/${work.slug}`} className="new-work-image">
        <Image
          src={work.images[0]}
          alt={work.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width:500px) 100vw, (max-width:900px) 50vw, 33vw"
          priority={priority}
        />
        {work.donation && <span className="work-badge">{t.gallery.donation}</span>}
        {!work.available && <span className="work-sold">{t.gallery.sold}</span>}
      </LocaleLink>

      <div className="new-work-meta">
        <div className="meta-row">
          <h3 className="new-work-title">
            <LocaleLink href={`/gallery/${work.slug}`}>{work.title}</LocaleLink>
          </h3>
          <span className="new-work-price">€{work.price.toLocaleString()}</span>
        </div>
        <div className="meta-row">
          <span className="new-work-artist">{work.size}</span>
          {work.available ? (
            <button
              className={`new-work-buy ${inCart ? 'in-cart' : ''}`}
              onClick={handleAdd}
              aria-label={t.gallery.addTo(work.title)}
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
export function Faq() {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="faq">
      {t.contact.faqs.map(([q, a], i) => (
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
  const { t } = useI18n()
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-brand">
          <Image src={logo} alt="Isabella Hidalgo Fine Art" width={80} height={80} style={{ objectFit: 'contain' }}/>
          <div>
            <p>Isabella Hidalgo Fine Art</p>
            <p>{t.footer.studio}</p>
          </div>
        </div>
        <div className="footer-social">
          <a href="https://www.instagram.com/isabellahidalgo" target="_blank" rel="noopener noreferrer">
            {t.footer.instagram} <ArrowUpRight size={11}/>
          </a>
          <a href="mailto:hola@isabellahidalgo.com">{t.footer.email} <ArrowUpRight size={11}/></a>
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
