'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'

const logo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo1-MbSK6TaCUScoNSCFL65oAlw6QbPhB9.png'

export function Header() {
  const [open, setOpen] = useState(false)
  return <>
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Isabella Hidalgo home"><Image src={logo} alt="Isabella Hidalgo Fine Art" width={126} height={150} priority /></Link>
      <nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/gallery">Gallery</Link><Link href="/contact">Contact</Link></nav>
      <button className="bag-button" onClick={() => setOpen(true)} aria-label="Open collection bag"><ShoppingBag size={17}/><span>Bag</span></button>
    </header>
    {open && <Cart onClose={() => setOpen(false)} />}
  </>
}

export function Footer() { return <footer className="site-footer"><Image src={logo} alt="Isabella Hidalgo Fine Art" width={80} height={96}/><div><p>Isabella Hidalgo Fine Art</p><p>To Grow Studio · Spain</p></div><div className="footer-social"><a href="#instagram">Instagram</a><a href="mailto:hello@isabellahidalgo.com">Email</a><a href="#newsletter">Journal</a></div><p>© 2026</p></footer> }

function Cart({onClose}:{onClose:()=>void}) { return <aside className="cart-panel" aria-label="Collection bag"><div className="cart-head"><p className="eyebrow">Your collection</p><button onClick={onClose} aria-label="Close bag"><X size={20}/></button></div><div className="cart-empty"><span className="cart-mark">∞</span><h2>Nothing held yet.</h2><p>Works you are considering will appear here. Add a piece from the gallery to begin.</p><Link href="/gallery" onClick={onClose} className="button-link">Explore the gallery ↗</Link></div></aside> }

export function AddToBag({label='Inquire about this work'}:{label?:string}) { return <button className="button-link button-plain" onClick={() => alert('Thank you for your interest. Please continue through Contact to inquire about this work.')}>{label} ↗</button> }

export const works = [
 {src:'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arte1-xJIZdCPClUJgazcWHQp1iVzsEwfSVD.avif', title:'A remembered place', detail:'Oil on canvas · 2024', category:'Paintings'},
 {src:'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arte2-eE4D4WP1mQkge6l5E6iyH9GIGygMV4.avif', title:'Quiet forms', detail:'Mixed media · 2023', category:'Paintings'},
 {src:'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arte3-EMEskmNVzkVqXiQaoXKTwXQ6Zn51mc.avif', title:'Between light', detail:'Oil on linen · 2024', category:'Works on paper'},
 {src:'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fotoform-LYPAsLMfHFc3TXxw78iBOesyz0YcCd.avif', title:'The studio, in process', detail:'Limited fine art print · 2025', category:'Prints'},
]

export const faqs = [['Are the paintings available to collect?','Yes. Original paintings are available through the studio. Write to Isabella with the work you are drawn to and she will share availability, dimensions and shipping details.'],['Do you ship internationally?','Works and fine art prints can be shipped internationally from Spain. Each piece is carefully prepared and insured for its journey.'],['Are prints signed?','Limited fine art prints are signed and numbered by Isabella, and produced in small editions on archival paper.'],['Can I visit the studio?','Studio visits are possible by appointment at To Grow Studio.']]

export function Faq() { const [open,setOpen]=useState<number|null>(null); return <div className="faq">{faqs.map(([q,a],i)=><div className="faq-item" key={q}><button onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i}><span>{q}</span><span className="faq-plus">{open===i?'−':'+'}</span></button>{open===i&&<p>{a}</p>}</div>)}</div> }

export function WorkCard({work, featured=false}:{work:typeof works[number] | undefined,featured?:boolean}) { if (!work) return null; return <article className={`work-card ${featured?'featured':''}`}><div className="work-image"><Image src={work.src} alt={work.title} fill sizes="(max-width: 768px) 100vw, 45vw"/></div><div className="work-meta"><div><h3>{work.title}</h3><p>{work.detail}</p></div><AddToBag label="Inquire"/></div></article> }

export function PageIntro({eyebrow,title,children}:{eyebrow:string,title:string,children?:React.ReactNode}) { return <section className="page-intro section-shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children}</section> }

export function Shell({children}:{children:React.ReactNode}) { return <main><Header/>{children}<Footer/></main> }

export const aboutPhoto='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fotoabout-IWirac6HqnoPvKil47mJuajikWtBmv.avif'
export const heroPhoto='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fotohero-YvF7D1oadNJt5tfJCWOnE5n0CyBe0M.avif'
export const formPhoto='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fotoform-LYPAsLMfHFc3TXxw78iBOesyz0YcCd.avif'
export const wordmark='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logonombre-wTrUqm0Qb1KHRzdDTZYTakx96YFCQk.png'
