'use client'

import Image from 'next/image'
import { useState, useContext } from 'react'
import { Minus, Plus, ArrowLeft } from 'lucide-react'
import { Shell, CartContext, WorkCard, Container } from '@/components/site-chrome'
import { useI18n, LocaleLink } from '@/components/i18n-provider'
import type { Work } from '@/lib/works'
import type { Locale } from '@/lib/i18n'

export default function ProductView({
  work, related, locale,
}: { work: Work; related: Work[]; locale: Locale }) {
  const { add, openCart } = useContext(CartContext)
  const { t } = useI18n()
  const [shot, setShot] = useState(0)
  const [qty, setQty] = useState(1)
  const [framed, setFramed] = useState(false)
  const [openPanel, setOpenPanel] = useState<string | null>('details')

  const unit = framed && work.framedPrice ? work.framedPrice : work.price
  const medium = work.medium[locale]

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(work)
    openCart()
  }

  const panels: [string, string, string][] = [
    ['details', t.product.panelDetails, t.product.detailsBody(work.size, medium)],
    ['shipping', t.product.panelShipping, t.product.shippingBody],
    ['care', t.product.panelCare, t.product.careBody],
  ]

  return (
    <Shell>
      <Container as="section" className="product">
        <LocaleLink href="/gallery" className="product-back"><ArrowLeft size={13}/> {t.product.back}</LocaleLink>

        <div className="product-layout">
          {/* ── Imágenes ── */}
          <div className="product-media">
            <div className="product-shot">
              <Image
                key={shot}
                src={work.images[shot]}
                alt={work.title}
                fill
                priority
                sizes="(max-width:900px) 100vw, 55vw"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {work.images.length > 1 && (
              <div className="product-thumbs">
                {work.images.map((src, i) => (
                  <button
                    key={src}
                    className={`product-thumb${i === shot ? ' is-active' : ''}`}
                    onClick={() => setShot(i)}
                    aria-label={`${work.title} — ${i + 1}/${work.images.length}`}
                    aria-current={i === shot}
                  >
                    <Image src={src} alt="" fill sizes="90px" style={{ objectFit: 'cover' }}/>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Ficha ── */}
          <div className="product-info">
            <p className="eyebrow">{t.product.eyebrow}</p>
            <h1 className="product-title">{work.title}</h1>
            <p className="product-quote">“{work.quote}”</p>

            <div className="product-price-row">
              <span className="product-price">€{unit.toLocaleString()}</span>
              {!work.available && <span className="product-tag-sold">{t.product.sold}</span>}
              {work.donation && <span className="product-tag-donation">{t.product.donation}</span>}
            </div>

            <dl className="product-specs">
              <div><dt>{t.product.size}</dt><dd>{work.size}</dd></div>
              <div><dt>{t.product.technique}</dt><dd>{medium}</dd></div>
              <div><dt>{t.product.year}</dt><dd>{work.year}</dd></div>
            </dl>

            {work.available ? (
              <>
                {work.framedPrice && (
                  <div className="product-option">
                    <p className="product-option-label">{t.product.finish}</p>
                    <div className="product-choices">
                      <button className={!framed ? 'is-active' : ''} onClick={() => setFramed(false)}>
                        {t.product.unframed} · €{work.price.toLocaleString()}
                      </button>
                      <button className={framed ? 'is-active' : ''} onClick={() => setFramed(true)}>
                        {t.product.framed} · €{work.framedPrice.toLocaleString()}
                      </button>
                    </div>
                  </div>
                )}

                <div className="product-buy">
                  <div className="product-qty">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label={t.product.less}><Minus size={13}/></button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} aria-label={t.product.more}><Plus size={13}/></button>
                  </div>
                  <button className="product-add" onClick={handleAdd}>
                    {t.product.addToBag} — €{(unit * qty).toLocaleString()}
                  </button>
                </div>
              </>
            ) : (
              <div className="product-buy">
                <LocaleLink href="/contact" className="product-add product-add-muted">
                  {t.product.orderSimilar}
                </LocaleLink>
              </div>
            )}

            <p className="product-story">{work.story[locale]}</p>

            <div className="product-panels">
              {panels.map(([key, label, body]) => (
                <div key={key} className={`product-panel${openPanel === key ? ' is-open' : ''}`}>
                  <button onClick={() => setOpenPanel(openPanel === key ? null : key)} aria-expanded={openPanel === key}>
                    <span>{label}</span>
                    <span className="product-panel-sign">{openPanel === key ? '−' : '+'}</span>
                  </button>
                  {openPanel === key && <p>{body}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* ── Otras obras ── */}
      {related.length > 0 && (
        <Container as="section" className="product-related">
          <div className="product-related-head">
            <p className="eyebrow">{t.product.relatedEyebrow}</p>
            <h2>{t.product.relatedTitle}</h2>
          </div>
          <div className="gallery-grid-new">
            {related.map(w => <WorkCard key={w.slug} work={w} />)}
          </div>
        </Container>
      )}
    </Shell>
  )
}
