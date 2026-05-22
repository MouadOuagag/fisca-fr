import { useNavigate } from 'react-router-dom'
import { Calculator, Briefcase, Building2, Wifi, Home, ArrowRight, TrendingUp, Users, Star } from 'lucide-react'
import SEOHead from '../components/seo/SEOHead'

const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

const tools = [
  {
    to: '/brut-net',
    icon: Calculator,
    color: '#1E5FCC',
    bg: '#EFF6FF',
    label: 'Calculateur Brut → Net',
    desc: 'Convertissez votre salaire brut en net avec cotisations URSSAF & AGIRC-ARRCO 2026.',
    tag: 'Populaire',
  },
  {
    to: '/auto-entrepreneur',
    icon: Briefcase,
    color: '#7C3AED',
    bg: '#EEF2FF',
    label: 'Simulateur Auto-Entrepreneur',
    desc: 'Cotisations sociales, IR et seuils TVA pour micro-entrepreneurs 2026.',
    tag: 'Freelance',
  },
  {
    to: '/frais-notaire',
    icon: Building2,
    color: '#059669',
    bg: '#ECFDF5',
    label: 'Frais de Notaire',
    desc: "Estimez vos frais d'acquisition immobilière — neuf ou ancien — en 2026.",
    tag: 'Immobilier',
  },
  {
    to: '/teletravail',
    icon: Wifi,
    color: '#0891B2',
    bg: '#ECFEFF',
    label: 'Indemnités Télétravail',
    desc: 'Calculez vos indemnités télétravail exonérées selon le forfait URSSAF 2026.',
    tag: 'Salarié',
  },
  {
    to: '/credit',
    icon: Home,
    color: '#DC2626',
    bg: '#FFF1F2',
    label: 'Simulateur Crédit Immobilier',
    desc: "Mensualités, coût total et taux d'endettement selon les taux 2026.",
    tag: 'Immobilier',
  },
]

const stats = [
  { icon: Calculator, value: '5',     label: 'Outils fiscaux' },
  { icon: TrendingUp, value: '100%',  label: 'Gratuit' },
  { icon: Star,       value: '2026',  label: 'Mis à jour' },
  { icon: Users,      value: 'FR',    label: 'Droit français' },
]

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div>
      <SEOHead
        title="Simulateurs Fiscaux Gratuits 2026"
        description="5 simulateurs fiscaux gratuits pour la France : calculateur brut net, auto-entrepreneur, frais de notaire, télétravail et crédit immobilier. Taux 2026 officiels."
        canonical="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MonBilanFacile.fr",
          "url": "https://monbilanfacile.fr",
          "description": "Référence fiscale française 2026 — 5 simulateurs gratuits",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://monbilanfacile.fr/brut-net",
            "query-input": "required name=search_term_string"
          }
        }}
      />

      {/* Hero */}
      <div className="rounded-2xl p-6 sm:p-8 mb-6"
        style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1E3A5F 100%)', boxShadow: CARD_SHADOW }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: '#1E5FCC' }}>
            <TrendingUp size={13} color="white" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#93C5FD' }}>MonBilanFacile.fr — Référence Fiscale 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
          Vos simulateurs fiscaux<br />
          <span style={{ color: '#60A5FA' }}>gratuits pour 2026</span>
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-6"
          style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '520px' }}>
          5 outils de référence basés sur les lois fiscales françaises en vigueur.
          Calculs instantanés, sans inscription, sans publicité intrusive.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-xl px-3 py-2.5 text-center"
              style={{ background: 'rgba(255,255,255,0.07)' }}>
              <p className="text-lg font-bold text-white">{value}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-3 flex-wrap">
          <button onClick={() => navigate('/commencer')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#1E5FCC' }}>
            Trouver mon outil →
          </button>
          <button onClick={() => navigate('/brut-net')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
            Calculateur Brut → Net
          </button>
        </div>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {tools.map(({ to, icon: Icon, color, bg, label, desc, tag }) => (
          <button key={to} onClick={() => navigate(to)}
            className="text-left rounded-2xl p-5 transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: 'white', boxShadow: CARD_SHADOW, cursor: 'pointer' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: bg }}>
                <Icon size={18} color={color} />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: bg, color }}>
                {tag}
              </span>
            </div>
            <h2 className="font-bold mb-1.5 text-sm sm:text-base"
              style={{ color: '#0F172A' }}>{label}</h2>
            <p className="text-xs leading-relaxed mb-4" style={{ color: '#64748B' }}>{desc}</p>
            <div className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color }}>
              Accéder à l'outil <ArrowRight size={13} />
            </div>
          </button>
        ))}

        {/* AdSense card */}
        <div className="rounded-2xl flex items-center justify-center"
          style={{ background: '#F8FAFC', border: '1.5px dashed #CBD5E1', minHeight: '180px' }}>
          <div className="text-center p-4">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Publicité
            </p>
            <p className="text-xs mt-1" style={{ color: '#CBD5E1' }}>Google AdSense</p>
          </div>
        </div>
      </div>

      {/* SEO content */}
      <section className="rounded-2xl p-6 sm:p-8" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>
          MonBilanFacile.fr — Votre référence fiscale française gratuite en 2026
        </h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569' }}>
          MonBilanFacile.fr met à votre disposition 5 simulateurs fiscaux gratuits, basés sur
          les textes officiels URSSAF, DGFiP et Légifrance pour l'année 2026.
          Que vous soyez salarié, auto-entrepreneur, ou futur propriétaire immobilier,
          nos outils vous donnent une estimation fiable en temps réel.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { t: 'Calcul brut net 2026', d: 'Notre calculateur salaire brut net applique les taux URSSAF, AGIRC-ARRCO et la grille de prélèvement à la source DGFiP pour une conversion précise de votre rémunération.' },
            { t: 'Simulateur micro-entrepreneur', d: 'Calculez vos cotisations URSSAF (12,3% à 23,2%), vérifiez vos seuils TVA 2026 et estimez votre revenu net selon votre activité et votre CA.' },
            { t: 'Frais de notaire en ligne', d: "Estimez vos frais d'acquisition immobilière selon le barème officiel 2026 — 7 à 8% dans l'ancien, 2 à 3% dans le neuf." },
            { t: 'Crédit immobilier 2026', d: "Calculez vos mensualités et votre taux d'endettement HCSF selon les taux du marché immobilier français 2026." },
          ].map(({ t, d }) => (
            <div key={t}>
              <h3 className="font-bold mb-1.5" style={{ color: '#0F172A', fontSize: '14px' }}>{t}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
