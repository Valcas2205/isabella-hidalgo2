import Image from 'next/image'
import Link from 'next/link'
import { Shell, PageIntro, Container, aboutPhoto } from '@/components/site-chrome'
import Reveal from '@/components/reveal'
import ReelVideo from '@/components/reel-video'
import { photos } from '@/lib/works'
import { getDict, isLocale, defaultLocale } from '@/lib/i18n'

/* ── Reels ──
   `cover` es la imagen fija; `video` es opcional. En cuanto una entrada
   tenga un .mp4 propio (por ejemplo '/reels/proceso.mp4'), esa tarjeta
   pasa sola a reproducirse muda y en bucle mientras esté en pantalla.
   Mientras no lo tenga, se muestra la foto con el botón de play, que
   lleva a Instagram.

   No se puede autoreproducir un vídeo alojado en Instagram: su embed
   oficial no lo permite y enlazar a los archivos de su CDN no está
   permitido, además de que esas URLs caducan. Hay que exportar el reel
   y servir el .mp4 desde aquí. */
const media: { cover: string; video?: string }[] = [
  { cover: photos.paintedHand },
  { cover: photos.canvasStack },
  { cover: photos.studioFrames },
  { cover: photos.prismHand },
]

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const t = getDict(locale)

  return (
    <Shell>
      <PageIntro eyebrow={t.about.eyebrow} title={t.about.title} />

      {/* ── RETRATO + BIO ── */}
      <Container as="section" className="about-layout">
        <Reveal className="portrait" variant="left">
          <Image src={aboutPhoto} alt="Isabella Hidalgo" fill sizes="(max-width: 768px) 100vw, 45vw" style={{ objectFit: 'cover' }}/>
        </Reveal>
        <Reveal className="about-copy" variant="right" delay={100}>
          <p className="intro-lede" style={{ marginBottom: '36px', color: 'var(--ink)' }}>{t.about.lede}</p>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
          <Link href={`/${locale}/contact`} className="button-link">{t.about.cta}</Link>
        </Reveal>
      </Container>

      {/* ── CITA ── */}
      <Container as="section" className="about-manifesto">
        <span className="about-manifesto-line"/>
        <blockquote className="about-manifesto-quote">
          {t.about.quote1}<br/><em>{t.about.quote2}</em>
        </blockquote>
        <span className="about-manifesto-line"/>
      </Container>

      {/* ── REELS ── */}
      <section className="reels-section">
        <Container className="reels-header">
          <div>
            <p className="eyebrow">{t.about.reelsEyebrow}</p>
            <h2 className="reels-title">{t.about.reelsTitle}<br/><em>{t.about.reelsTitleEm}</em></h2>
          </div>
          <a
            href="https://www.instagram.com/isabellahidalgo"
            target="_blank" rel="noopener noreferrer"
            className="button-link reels-ig-link"
          >
            {t.about.follow}
          </a>
        </Container>

        <Container className="reels-grid">
          {t.about.reels.map((reel, i) => (
            <a
              key={reel.label}
              href="https://www.instagram.com/isabellahidalgo"
              target="_blank" rel="noopener noreferrer"
              className="reel-card"
            >
              <div className="reel-img">
                {media[i].video ? (
                  <ReelVideo src={media[i].video!} poster={media[i].cover} label={reel.label} />
                ) : (
                  <div className="reel-img-inner">
                    <Image src={media[i].cover} alt={reel.label} fill sizes="(max-width:768px) 45vw, 22vw" style={{ objectFit: 'cover' }}/>
                  </div>
                )}
                {/* El overlay se mantiene en ambos casos: toda la tarjeta
                    es un enlace a Instagram. */}
                <div className="reel-play"><span className="reel-play-ring">▶</span></div>
                <span className="reel-tag">{reel.tag}</span>
                {/* La duración sólo tiene sentido si hay vídeo detrás. */}
                {media[i].video && <span className="reel-dur">{reel.duration}</span>}
              </div>
              <p className="reel-label">{reel.label}</p>
            </a>
          ))}
        </Container>

        <Container as="p" className="reels-note">{t.about.reelsNote}</Container>
      </section>

      {/* ── PRINCIPIOS ── */}
      <Container as="section" className="values">
        <p className="eyebrow">{t.about.valuesEyebrow}</p>
        <div className="value-grid">
          {t.about.values.map((v, i) => (
            <Reveal key={v.h} variant="up" delay={i * 90}>
              <h3>{v.h}</h3>
              <p>{v.p}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Shell>
  )
}
