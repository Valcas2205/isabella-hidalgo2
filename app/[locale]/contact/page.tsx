'use client'
import Image from 'next/image'
import { Shell, PageIntro, Faq, Container, formPhoto } from '@/components/site-chrome'
import { useI18n } from '@/components/i18n-provider'

export default function Contact() {
  const { t } = useI18n()

  return (
    <Shell>
      <PageIntro eyebrow={t.contact.eyebrow} title={t.contact.title}>
        <p className="intro-lede">{t.contact.lede}</p>
      </PageIntro>

      <Container as="section" className="contact-layout">
        <div className="form-image">
          <Image src={formPhoto} alt="" fill sizes="(max-width: 768px) 100vw, 42vw" style={{ objectFit: 'cover' }}/>
        </div>

        <form className="inquiry-form" onSubmit={e => e.preventDefault()}>
          <p className="eyebrow">{t.contact.formEyebrow}</p>
          <label>{t.contact.name}
            <input required name="name" placeholder={t.contact.namePh}/>
          </label>
          <label>{t.contact.email}
            <input required type="email" name="email" placeholder={t.contact.emailPh}/>
          </label>
          <label>{t.contact.subject}
            <select name="subject">
              {t.contact.subjects.map(s => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label>{t.contact.message}
            <textarea required name="message" rows={5} placeholder={t.contact.messagePh}/>
          </label>
          <button className="button-link button-plain" type="submit">{t.contact.send}</button>
        </form>
      </Container>

      <Container as="section" className="faq-section">
        <div>
          <p className="eyebrow">{t.contact.faqEyebrow}</p>
          <h2>{t.contact.faqTitle}</h2>
        </div>
        <Faq/>
      </Container>
    </Shell>
  )
}
