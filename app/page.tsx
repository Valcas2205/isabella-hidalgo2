import Image from 'next/image'
import Link from 'next/link'
import { Shell, WorkCard, works, heroPhoto, wordmark, aboutPhoto } from '@/components/site-chrome'
import ArtCarousel from '@/components/art-carousel'

export default function Home() { return <Shell>
  <section className="hero-full"><Image src={heroPhoto} alt="Isabella Hidalgo in her studio" fill priority sizes="100vw"/><div className="hero-wordmark"><Image src={wordmark} alt="Isabella Hidalgo" width={355} height={148}/></div><span className="hero-note">A practice in attention · Spain</span></section>
  <div className="home-ticker"><span>ORIGINAL PAINTINGS</span><i>✳</i><span>LIMITED EDITIONS</span><i>✳</i><span>MADE SLOWLY IN SPAIN</span><i>✳</i><span>ORIGINAL PAINTINGS</span><i>✳</i><span>LIMITED EDITIONS</span></div>

  {/* ── STATEMENT SECTION ── */}
  <section className="statement-block section-shell">
    <div className="statement-left">
      <div className="statement-label"><span className="blue-dot"/> Isabella Hidalgo<br/>Fine Art / 2026</div>
      <div className="statement-copy">
        <p>We live surrounded by things asking for our attention.</p>
        <p>Yet some of the most meaningful experiences happen in the moments we almost miss.</p>
        <p>My work is an ongoing exploration of attention, perception, and the quiet ways we make sense of being alive.</p>
        <span className="signature">_isa</span>
      </div>
    </div>
    <div className="statement-portrait">
      <div className="statement-portrait-frame">
        <Image src={aboutPhoto} alt="Isabella Hidalgo" fill sizes="(max-width:768px) 100vw, 40vw"/>
        <div className="statement-portrait-tag"><span>To Grow Studio · Spain</span></div>
      </div>
    </div>
  </section>

  {/* ── ART WALL WITH CAROUSEL ── */}
  <section className="art-wall">
    <div className="art-wall-top section-shell">
      <p className="eyebrow">The current edit</p>
      <h2>Stay with<br/><em>the feeling.</em></h2>
      <Link href="/gallery" className="circle-link">View gallery ↗</Link>
    </div>
    <ArtCarousel works={works} />
  </section>

  <section className="studio-film"><div className="film-overlay"><p className="eyebrow">A moving image of the practice</p><h2>Make room<br/><em>for wonder.</em></h2><Link href="/about" className="button-link button-film">Enter the studio ↗</Link></div><video src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file-YwQlDrLYxsD6PxOQHo8EPDP0PWg3Hk.mp4" autoPlay muted loop playsInline aria-label="Isabella Hidalgo working in her studio"/><div className="film-controls"><span>TO GROW STUDIO</span><span>PLAYING · 00:24</span></div></section>
  <section className="shop-callout section-shell"><div className="shop-stamp">AVAILABLE<br/>TO<br/>COLLECT</div><div><p className="eyebrow">Bring art home</p><h2>A small pause<br/><em>for your wall.</em></h2><p>Original paintings and signed, limited fine art prints for spaces that value a slower kind of beauty.</p><Link href="/gallery" className="button-link button-blue">Shop available works ↗</Link></div></section>
</Shell> }
