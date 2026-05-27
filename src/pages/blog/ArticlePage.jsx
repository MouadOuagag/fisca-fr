import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import SEOHead from '../../components/seo/SEOHead'
import { AdUnitBanner, AdUnitInContent } from '../../components/ui/AdUnit'

import ImpotRevenu from '../../content/articles/impot-revenu-2026.mdx'
import Dividendes from '../../content/articles/dividendes-flat-tax-2026.mdx'
import PlusValues from '../../content/articles/plus-values-immobilieres-2026.mdx'
import CotisationsTNS from '../../content/articles/cotisations-tns-2026.mdx'
import PPV from '../../content/articles/prime-partage-valeur-2026.mdx'
import Licenciement from '../../content/articles/indemnites-licenciement-2026.mdx'

const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

const ARTICLES = {
  'impot-revenu-2026': {
    component: ImpotRevenu,
    title: 'Impôt sur le revenu 2026 — Barème, tranches et calcul',
    description: "Guide complet sur le calcul de l'impôt sur le revenu 2026 : barème progressif, tranches, quotient familial, décote et réductions d'impôt.",
    tag: 'Fiscalité & IR',
    color: '#1E5FCC',
    bg: '#EFF6FF',
    date: 'Janvier 2026',
    readTime: '7 min',
  },
  'dividendes-flat-tax-2026': {
    component: Dividendes,
    title: 'Dividendes & Flat Tax 2026 — PFU 30% et optimisation',
    description: 'Tout comprendre sur la Flat Tax (PFU 30%) appliquée aux dividendes en France 2026 : calcul, option barème progressif, abattement 40%.',
    tag: 'Dividendes & Capital',
    color: '#059669',
    bg: '#ECFDF5',
    date: 'Janvier 2026',
    readTime: '6 min',
  },
  'plus-values-immobilieres-2026': {
    component: PlusValues,
    title: 'Plus-values immobilières 2026 — Calcul et exonérations',
    description: "Guide complet sur les plus-values immobilières en France 2026 : taux d'imposition, abattements pour durée de détention, exonérations.",
    tag: 'Immobilier & Fiscalité',
    color: '#7C3AED',
    bg: '#EEF2FF',
    date: 'Janvier 2026',
    readTime: '6 min',
  },
  'cotisations-tns-2026': {
    component: CotisationsTNS,
    title: 'Cotisations TNS 2026 — Artisans, commerçants et libéraux',
    description: "Taux de cotisations sociales des travailleurs non-salariés (TNS) en 2026 : artisans, commerçants, gérants SARL, professions libérales.",
    tag: 'TNS & Indépendants',
    color: '#DC2626',
    bg: '#FFF1F2',
    date: 'Janvier 2026',
    readTime: '6 min',
  },
  'prime-partage-valeur-2026': {
    component: PPV,
    title: 'Prime de Partage de la Valeur (PPV) 2026 — Guide complet',
    description: 'Tout savoir sur la Prime de Partage de la Valeur 2026 : plafonds d\'exonération, conditions, fiscalité et mise en place.',
    tag: 'Primes & Avantages',
    color: '#0891B2',
    bg: '#ECFEFF',
    date: 'Janvier 2026',
    readTime: '5 min',
  },
  'indemnites-licenciement-2026': {
    component: Licenciement,
    title: 'Indemnités de licenciement 2026 — Calcul et droits',
    description: 'Calcul des indemnités légales de licenciement 2026, fiscalité, différences avec la rupture conventionnelle et droits du salarié.',
    tag: 'Emploi & Droits',
    color: '#F59E0B',
    bg: '#FFFBEB',
    date: 'Janvier 2026',
    readTime: '7 min',
  },
}

export default function ArticlePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const article = ARTICLES[slug]

  if (!article) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-bold" style={{ color: '#0F172A' }}>Article introuvable</p>
        <button onClick={() => navigate('/blog')} className="mt-4 text-sm"
          style={{ color: '#1E5FCC' }}>← Retour au blog</button>
      </div>
    )
  }

  const { component: Content, title, description, tag, color, bg, date, readTime } = article

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "dateModified": "2026-01-01",
    "publisher": {
      "@type": "Organization",
      "name": "MonBilanFacile.fr",
      "url": "https://monbilanfacile.fr"
    }
  }

  return (
    <div>
      <SEOHead
        title={title}
        description={description}
        canonical={`/articles/${slug}`}
        type="article"
        schema={schema}
      />

      <AdUnitBanner />

      <button onClick={() => navigate('/blog')}
        className="flex items-center gap-2 text-sm font-medium mb-5 transition-colors"
        style={{ color: '#64748B' }}
        onMouseEnter={e => e.currentTarget.style.color = '#0F172A'}
        onMouseLeave={e => e.currentTarget.style.color = '#64748B'}>
        <ArrowLeft size={14} /> Retour au blog
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-3 flex-wrap mb-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: bg, color }}>
            <Tag size={10} className="inline mr-1" />{tag}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: '#94A3B8' }}>
            <Calendar size={11} /> {date}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: '#94A3B8' }}>
            <Clock size={11} /> {readTime} de lecture
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight mb-3"
          style={{ color: '#0F172A' }}>{title}</h1>
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: '#64748B' }}>
          {description}
        </p>
      </div>

      <AdUnitInContent />

      <article className="rounded-2xl p-6 lg:p-8"
        style={{ background: 'white', boxShadow: CARD_SHADOW }}>
        <Content />
      </article>

      <AdUnitInContent />

      <div className="mt-6 rounded-2xl p-5"
        style={{ background: 'white', boxShadow: CARD_SHADOW }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: '#94A3B8' }}>Outils associés</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { to: '/brut-net',          label: 'Calculateur Brut → Net',     color: '#1E5FCC', bg: '#EFF6FF' },
            { to: '/auto-entrepreneur', label: 'Auto-Entrepreneur',           color: '#7C3AED', bg: '#EEF2FF' },
            { to: '/credit',            label: 'Crédit Immobilier',           color: '#DC2626', bg: '#FFF1F2' },
          ].map(({ to, label, color: c, bg: b }) => (
            <button key={to} onClick={() => navigate(to)}
              className="py-3 px-4 rounded-xl text-sm font-semibold text-left transition-all hover:opacity-80"
              style={{ background: b, color: c }}>
              {label} →
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
