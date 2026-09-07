'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useContext } from 'react'
import { Minus, Plus, ArrowLeft } from 'lucide-react'
import { Shell, CartContext, WorkCard, Container } from '@/components/site-chrome'
import type { Work } from '@/lib/works'

export default function ProductView({ work, related }: { work: Work; related: Work[] }) {
  const { add, openCart } = useContext(CartContext)
  const [shot, setShot] = useState(0)
  const [qty, setQty] = useState(1)
  const [framed, setFramed] = useState(false)
  const [openPanel, setOpenPanel] = useState<string | null>('detalles')

  const unit = framed && work.framedPrice ? work.framedPrice : work.price

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(work)
    openCart()
  }

  const panels: [string, string][] = [
    ['detalles', `${work.size} · ${work.medium}. Firmada por Isabella en el reverso, con certificado de autenticidad. Cada obra es única: los tonos pueden variar ligeramente respecto a la fotografía según la luz de tu pantalla.`],
    ['envío', 'Preparada y asegurada en el estudio, se envía desde España en 5–7 días laborables. Envío internacional disponible. Los lienzos sin bastidor viajan enrollados en tubo rígido; los enmarcados, en caja de madera a medida.'],
    ['cuidado', 'Evita la luz solar directa y la humedad alta. Limpia sólo con un paño seco y suave. Si recibes la obra enrollada, déjala extendida 24 h antes de montarla.'],
  ]

  return (
    <Shell>
      <Container as="section" className="product">
        <Link href="/gallery" className="product-back"><ArrowLeft size={13}/> Volver a la galería</Link>

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
                    aria-label={`Ver imagen ${i + 1} de ${work.images.length}`}
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
            <p className="eyebrow">Isabella Hidalgo · Obra original</p>
            <h1 className="product-title">{work.title}</h1>
            <p className="product-quote">“{work.quote}”</p>

            <div className="product-price-row">
              <span className="product-price">€{unit.toLocaleString()}</span>
              {!work.available && <span className="product-tag-sold">Vendida</span>}
              {work.donation && <span className="product-tag-donation">20% a Sun.Risas</span>}
            </div>

            <dl className="product-specs">
              <div><dt>Medidas</dt><dd>{work.size}</dd></div>
              <div><dt>Técnica</dt><dd>{work.medium}</dd></div>
              <div><dt>Año</dt><dd>{work.year}</dd></div>
            </dl>

            {work.available ? (
              <>
                {work.framedPrice && (
                  <div className="product-option">
                    <p className="product-option-label">Acabado</p>
                    <div className="product-choices">
                      <button className={!framed ? 'is-active' : ''} onClick={() => setFramed(false)}>
                        Sin enmarcar · €{work.price.toLocaleString()}
                      </button>
                      <button className={framed ? 'is-active' : ''} onClick={() => setFramed(true)}>
                        Enmarcada · €{work.framedPrice.toLocaleString()}
                      </button>
                    </div>
                  </div>
                )}

                <div className="product-buy">
                  <div className="product-qty">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Menos"><Minus size={13}/></button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} aria-label="Más"><Plus size={13}/></button>
                  </div>
                  <button className="product-add" onClick={handleAdd}>
                    Añadir a la bolsa — €{(unit * qty).toLocaleString()}
                  </button>
                </div>
              </>
            ) : (
              <div className="product-buy">
                <Link href="/contact" className="product-add product-add-muted">
                  Encargar una pieza similar ↗
                </Link>
              </div>
            )}

            <p className="product-story">{work.story}</p>

            <div className="product-panels">
              {panels.map(([key, body]) => (
                <div key={key} className={`product-panel${openPanel === key ? ' is-open' : ''}`}>
                  <button onClick={() => setOpenPanel(openPanel === key ? null : key)} aria-expanded={openPanel === key}>
                    <span>{key[0].toUpperCase() + key.slice(1)}</span>
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
            <p className="eyebrow">Sigue mirando</p>
            <h2>Otras obras de la serie</h2>
          </div>
          <div className="gallery-grid-new">
            {related.map(w => <WorkCard key={w.slug} work={w} />)}
          </div>
        </Container>
      )}
    </Shell>
  )
}
