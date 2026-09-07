import Image from 'next/image'
import Link from 'next/link'
import { Shell, Container, heroPhoto, wordmark } from '@/components/site-chrome'
import ArtCarousel from '@/components/art-carousel'
import Reveal from '@/components/reveal'
import { works, photos } from '@/lib/works'

export default function Home() {
  return <Shell>

    {/* ── HERO (sin cambios) ── */}
    <section className="hero-full">
      <Image src={heroPhoto} alt="Isabella Hidalgo en su estudio" fill priority sizes="100vw"/>
      <div className="hero-wordmark"><Image src={wordmark} alt="Isabella Hidalgo" width={355} height={148}/></div>
      <span className="hero-note">A practice in attention · Spain</span>
    </section>

    <div className="home-ticker">
      {Array.from({ length: 3 }, (_, i) => (
        <span className="ticker-run" key={i} aria-hidden={i > 0}>
          <span>PINTURA ORIGINAL</span><i>✦</i>
          <span>EDICIONES LIMITADAS</span><i>✦</i>
          <span>HECHO DESPACIO EN ESPAÑA</span><i>✦</i>
          <span>TO GROW STUDIO</span><i>✦</i>
        </span>
      ))}
    </div>

    {/* ── DECLARACIÓN + RETRATO ── */}
    <Container as="section" className="statement-block">
      <div className="statement-left">
        <div className="statement-label"><span className="blue-dot"/> Isabella Hidalgo<br/>Fine Art / 2026</div>
        <Reveal className="statement-copy" variant="up">
          <p>Vivimos rodeados de cosas que piden nuestra atención.</p>
          <p>Y sin embargo, lo que más nos marca suele pasar en los momentos que casi no vemos.</p>
          <p>Mi trabajo es una exploración continua de la atención, la percepción y las formas silenciosas en que damos sentido a estar vivos.</p>
          <span className="signature">_isa</span>
        </Reveal>
      </div>
      <Reveal className="statement-portrait" variant="scale" delay={120}>
        <div className="statement-portrait-frame">
          <Image src={photos.isabellaGuided} alt="Isabella Hidalgo en el estudio" fill sizes="(max-width:768px) 100vw, 40vw" style={{ objectFit: 'cover' }}/>
          <div className="statement-portrait-tag"><span>To Grow Studio · España</span></div>
        </div>
      </Reveal>
    </Container>

    {/* ── ÍNDICE DE FRASES ──
        Cada cuadro lleva una frase pintada. Aquí funcionan como índice
        tipográfico de la serie, y cada línea entra a su obra. */}
    <section className="phrase-index">
      <Container>
        <Reveal className="phrase-index-head" variant="up">
          <p className="eyebrow">Las frases</p>
          <h2>Cada cuadro<br/><em>dice algo.</em></h2>
        </Reveal>

        <ol className="phrase-list">
          {works.map((w, i) => (
            <Reveal as="li" key={w.slug} variant="up" delay={i * 60}>
              <Link href={`/gallery/${w.slug}`} className="phrase-row">
                <span className="phrase-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="phrase-text">{w.quote}</span>
                <span className="phrase-meta">{w.size}</span>
                <span className="phrase-arrow" aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>

    {/* ── BANDA PANORÁMICA A TODO EL ANCHO ── */}
    <section className="wide-band">
      <Image
        src={photos.guidedWide}
        alt="Isabella pasando frente a «Always guided by the universe»"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
      />
      <div className="wide-band-caption">
        <span>Always guided by the universe</span>
        <span>Acrílico sobre algodón · 2026</span>
      </div>
    </section>

    {/* ── CARRUSEL DE OBRA ── */}
    <section className="art-wall">
      <Container className="art-wall-top">
        <Reveal variant="up">
          <p className="eyebrow">La selección actual</p>
          <h2>Quédate con<br/><em>la sensación.</em></h2>
        </Reveal>
        <Link href="/gallery" className="circle-link">Ver galería ↗</Link>
      </Container>
      <ArtCarousel works={works} />
    </section>

    {/* ── DÍPTICO EDITORIAL ── */}
    <Container as="section" className="diptych">
      <Reveal as="figure" className="diptych-figure diptych-tall" variant="left">
        <Image src={photos.studioFrames} alt="Isabella recogiendo bastidores" fill sizes="(max-width:900px) 100vw, 46vw" style={{ objectFit: 'cover' }}/>
        <figcaption>Recogiendo bastidores · Madrid</figcaption>
      </Reveal>

      <div className="diptych-col">
        <Reveal as="figure" className="diptych-figure" variant="right" delay={100}>
          <Image src={photos.canvasStack} alt="Lienzos pintados apilados" fill sizes="(max-width:900px) 100vw, 46vw" style={{ objectFit: 'cover' }}/>
          <figcaption>La pila del estudio</figcaption>
        </Reveal>
        <Reveal className="diptych-copy" variant="up" delay={180}>
          <p className="eyebrow">El proceso</p>
          <h2>Se pinta<br/><em>en el suelo.</em></h2>
          <p>Acrílico muy diluido sobre algodón crudo. El color se mueve por gravedad y hay que caminar alrededor del lienzo para verlo aparecer. La frase se escribe al final, cuando la pieza ya no pide nada más.</p>
          <Link href="/about" className="button-link button-plain">Conoce a Isabella ↗</Link>
        </Reveal>
      </div>
    </Container>

    {/* ── VÍDEO DE ESTUDIO ── */}
    <section className="studio-film">
      <div className="film-overlay">
        <p className="eyebrow">Una imagen en movimiento de la práctica</p>
        <h2>Haz sitio<br/><em>al asombro.</em></h2>
        <Link href="/about" className="button-link button-film">Entra al estudio ↗</Link>
      </div>
      <video
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file-YwQlDrLYxsD6PxOQHo8EPDP0PWg3Hk.mp4"
        autoPlay muted loop playsInline
        aria-label="Isabella Hidalgo trabajando en su estudio"
      />
      <div className="film-controls"><span>TO GROW STUDIO</span><span>PLAYING · 00:24</span></div>
    </section>

    {/* ── LLEVAR ARTE A CASA ── */}
    <Container as="section" className="shop-callout">
      <Reveal className="portrait-frame shop-portrait" variant="scale">
        <Image src={photos.prismHand} alt="Luz prismática sobre la pared del estudio" fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: 'cover' }}/>
      </Reveal>
      <Reveal variant="right" delay={120}>
        <p className="eyebrow">Llévate una pieza</p>
        <h2>Una pausa pequeña<br/><em>para tu pared.</em></h2>
        <p>Pintura original y ediciones limitadas firmadas, para espacios que valoran una belleza más lenta.</p>
        <Link href="/gallery" className="button-link button-blue">Ver obra disponible ↗</Link>
      </Reveal>
    </Container>

  </Shell>
}
