import Image from 'next/image'
import Link from 'next/link'
import { Shell, Container, heroPhoto, wordmark } from '@/components/site-chrome'
import ArtCarousel from '@/components/art-carousel'
import Reveal from '@/components/reveal'
import { works, photos } from '@/lib/works'
import { getDict, isLocale, defaultLocale } from '@/lib/i18n'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const t = getDict(locale)
  const at = (p: string) => `/${locale}${p}`

  return <Shell>

    {/* ── HERO (sin cambios) ── */}
    <section className="hero-full">
      <Image src={heroPhoto} alt="Isabella Hidalgo" fill priority sizes="100vw"/>
      <div className="hero-wordmark"><Image src={wordmark} alt="Isabella Hidalgo" width={355} height={148}/></div>
      <span className="hero-note">{t.home.heroNote}</span>
    </section>

    <div className="home-ticker">
      {Array.from({ length: 3 }, (_, i) => (
        <span className="ticker-run" key={i} aria-hidden={i > 0}>
          {t.home.ticker.map(word => (
            <span key={word}>{word}<i>✦</i></span>
          ))}
        </span>
      ))}
    </div>

    {/* ── DECLARACIÓN + RETRATO ── */}
    <Container as="section" className="statement-block">
      <div className="statement-left">
        <div className="statement-label">
          <span className="blue-dot"/>
          {t.home.statementLabel.split('\n').map((line, i) => (
            <span key={line}>{i > 0 && <br/>}{line}</span>
          ))}
        </div>
        <Reveal className="statement-copy" variant="up">
          <p>{t.home.statement1}</p>
          <p>{t.home.statement2}</p>
          <p>{t.home.statement3}</p>
          <span className="signature">_isa</span>
        </Reveal>
      </div>
      <Reveal className="statement-portrait" variant="scale" delay={120}>
        <div className="statement-portrait-frame">
          <Image src={photos.isabellaGuided} alt="Isabella Hidalgo" fill sizes="(max-width:768px) 100vw, 40vw" style={{ objectFit: 'cover' }}/>
          <div className="statement-portrait-tag"><span>{t.home.portraitTag}</span></div>
        </div>
      </Reveal>
    </Container>

    {/* ── ÍNDICE DE FRASES ──
        Cada cuadro lleva una frase pintada. Aquí funcionan como índice
        tipográfico de la serie, y cada línea entra a su obra. */}
    <section className="phrase-index">
      <Container>
        <Reveal className="phrase-index-head" variant="up">
          <p className="eyebrow">{t.home.phrasesEyebrow}</p>
          <h2>{t.home.phrasesTitle}<br/><em>{t.home.phrasesTitleEm}</em></h2>
        </Reveal>

        <ol className="phrase-list">
          {works.map((w, i) => (
            <Reveal as="li" key={w.slug} variant="up" delay={i * 60}>
              <Link href={at(`/gallery/${w.slug}`)} className="phrase-row">
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
      <Image src={photos.guidedWide} alt="Always guided by the universe" fill sizes="100vw" style={{ objectFit: 'cover' }}/>
      <div className="wide-band-caption">
        <span>Always guided by the universe</span>
        <span>{t.home.bandCaption}</span>
      </div>
    </section>

    {/* ── CARRUSEL DE OBRA ── */}
    <section className="art-wall">
      <Container className="art-wall-top">
        <Reveal variant="up">
          <p className="eyebrow">{t.home.selectionEyebrow}</p>
          <h2>{t.home.selectionTitle}<br/><em>{t.home.selectionTitleEm}</em></h2>
        </Reveal>
        <Link href={at('/gallery')} className="circle-link">{t.home.viewGallery}</Link>
      </Container>
      <ArtCarousel works={works} />
    </section>

    {/* ── DÍPTICO EDITORIAL ── */}
    <Container as="section" className="diptych">
      <Reveal as="figure" className="diptych-figure diptych-tall" variant="left">
        <Image src={photos.studioFrames} alt={t.home.captionFrames} fill sizes="(max-width:900px) 100vw, 46vw" style={{ objectFit: 'cover' }}/>
        <figcaption>{t.home.captionFrames}</figcaption>
      </Reveal>

      <div className="diptych-col">
        <Reveal as="figure" className="diptych-figure" variant="right" delay={100}>
          <Image src={photos.canvasStack} alt={t.home.captionStack} fill sizes="(max-width:900px) 100vw, 46vw" style={{ objectFit: 'cover' }}/>
          <figcaption>{t.home.captionStack}</figcaption>
        </Reveal>
        <Reveal className="diptych-copy" variant="up" delay={180}>
          <p className="eyebrow">{t.home.processEyebrow}</p>
          <h2>{t.home.processTitle}<br/><em>{t.home.processTitleEm}</em></h2>
          <p>{t.home.processBody}</p>
          <Link href={at('/about')} className="button-link button-plain">{t.home.meetIsabella}</Link>
        </Reveal>
      </div>
    </Container>

    {/* ── VÍDEO DE ESTUDIO ── */}
    <section className="studio-film">
      <div className="film-overlay">
        <p className="eyebrow">{t.home.filmEyebrow}</p>
        <h2>{t.home.filmTitle}<br/><em>{t.home.filmTitleEm}</em></h2>
        <Link href={at('/about')} className="button-link button-film">{t.home.enterStudio}</Link>
      </div>
      <video
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file-YwQlDrLYxsD6PxOQHo8EPDP0PWg3Hk.mp4"
        autoPlay muted loop playsInline
        aria-label="Isabella Hidalgo"
      />
      <div className="film-controls"><span>TO GROW STUDIO</span><span>PLAYING · 00:24</span></div>
    </section>

    {/* ── LLEVAR ARTE A CASA ── */}
    <Container as="section" className="shop-callout">
      <Reveal className="portrait-frame shop-portrait" variant="scale">
        <Image src={photos.prismHand} alt={t.home.prismAlt} fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: 'cover' }}/>
      </Reveal>
      <Reveal variant="right" delay={120}>
        <p className="eyebrow">{t.home.shopEyebrow}</p>
        <h2>{t.home.shopTitle}<br/><em>{t.home.shopTitleEm}</em></h2>
        <p>{t.home.shopBody}</p>
        <Link href={at('/gallery')} className="button-link button-blue">{t.home.shopCta}</Link>
      </Reveal>
    </Container>

  </Shell>
}
