import Image from 'next/image'
import Link from 'next/link'
import { Shell, PageIntro, aboutPhoto } from '@/components/site-chrome'

const reels = [
  {
    cover: '/art/rhythm-of-intuition.webp',
    label: 'Studio process — oil on canvas',
    tag: 'PROCESS',
    duration: '0:38',
  },
  {
    cover: '/art/painted-hand.webp',
    label: 'Colour mixing — quiet palette',
    tag: 'COLOUR',
    duration: '0:52',
  },
  {
    cover: '/art/canvas-stack.webp',
    label: 'Light study — linen texture',
    tag: 'LIGHT',
    duration: '1:04',
  },
  {
    cover: '/art/studio-frames.webp',
    label: 'A morning in the studio',
    tag: 'STUDIO',
    duration: '0:44',
  },
]
export default function About() {
  return (
    <Shell>
      {/* ── PAGE INTRO ── */}
      <PageIntro eyebrow="About Isabella" title="A practice rooted in presence.">
      </PageIntro>

      {/* ── PORTRAIT + BIO ── */}
      <section className="about-layout section-shell">
        <div className="portrait">
          <Image src={aboutPhoto} alt="Isabella Hidalgo portrait" fill sizes="(max-width: 768px) 100vw, 45vw"/>
        </div>
        <div className="about-copy">
          <p className="intro-lede" style={{ marginBottom: '36px', color: 'var(--ink)' }}>Isabella Hidalgo is a contemporary fine artist based in Spain, working from her studio To Grow.</p>
          <p>My work begins as an inner exploration, where painting becomes a practice of presence. Working with diluted acrylics on cotton canvas, I allow color, water, and movement to unfold freely, creating layered atmospheres inspired by meditative states and the shifting skies that have accompanied my life. Each piece holds an unseen foundation of written mantra or blessing, guiding the process from within.</p>
          <p>Handwritten text, influenced by motherhood and observing my daughter learn to write, appears as instinctive, imperfect marks that carry both intimacy and play. Through abstraction, I seek to move beyond control toward trust and flow, creating quiet spaces for pause and reflection. My paintings become subtle portals into stillness, offering a return to presence in a world that moves too fast.</p>
          <p>For me, creating is an act of surrender and service. It is a way of allowing something to move through me rather than something I control. Each piece is a reminder, first for myself and then for others.</p>
          <Link href="/contact" className="button-link">Start a conversation ↗</Link>
        </div>
      </section>

      {/* ── MANIFESTO PULL-QUOTE ── */}
      <section className="about-manifesto section-shell">
        <span className="about-manifesto-line"/>
        <blockquote className="about-manifesto-quote">
          "I paint what I almost missed —"<br/>
          <em>the light that stayed a second longer than expected.</em>"
        </blockquote>
        <span className="about-manifesto-line"/>
      </section>

      {/* ── INSTAGRAM / REELS SECTION ── */}
      <section className="reels-section">
        <div className="reels-header section-shell">
          <div>
            <p className="eyebrow">From the studio — @isabellahidalgo</p>
            <h2 className="reels-title">
              Seen in<br/><em>real time.</em>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/isabellahidalgo"
            target="_blank"
            rel="noopener noreferrer"
            className="button-link reels-ig-link"
          >
            Follow on Instagram ↗
          </a>
        </div>

        <div className="reels-grid section-shell">
          {reels.map((reel, i) => (
            <a
              key={reel.label}
              href="https://www.instagram.com/isabellahidalgo"
              target="_blank"
              rel="noopener noreferrer"
              className="reel-card"
              style={{ '--delay': `${i * 0.12}s` } as React.CSSProperties}
            >
              <div className="reel-img">
                <div className="reel-img-inner">
                  <Image src={reel.cover} alt={reel.label} fill sizes="(max-width:768px) 45vw, 22vw"/>
                </div>
                <div className="reel-play">
                  <span className="reel-play-ring">▶</span>
                </div>
                <span className="reel-tag">{reel.tag}</span>
                <span className="reel-dur">{reel.duration}</span>
              </div>
              <p className="reel-label">{reel.label}</p>
            </a>
          ))}
        </div>

        {/* decorative side note */}
        <p className="reels-note section-shell">
          Short films from the studio — process, colour, light, and the slow work of making.
        </p>
      </section>

      {/* ── STUDIO VALUES ── */}
      <section className="values section-shell">
        <p className="eyebrow">The studio principles</p>
        <div className="value-grid">
          <div>
            <h3>Attention</h3>
            <p>Looking long enough for the ordinary to become luminous.</p>
          </div>
          <div>
            <h3>Memory</h3>
            <p>Letting colour carry what words cannot quite hold.</p>
          </div>
          <div>
            <h3>Wonder</h3>
            <p>Making spaces for curiosity, warmth, and connection.</p>
          </div>
        </div>
      </section>
    </Shell>
  )
}

