import { useNavigate } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import { Calculator, Briefcase, Building2, Wifi, Home, ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react'

const tools = [
  {
    to: '/brut-net',
    icon: Calculator,
    color: '#1E5FCC',
    bg: '#EFF6FF',
    label: 'Calculateur Brut → Net',
    desc: 'Cotisations URSSAF, AGIRC-ARRCO et prélèvement à la source 2026. 4 statuts disponibles.',
    tag: 'Populaire',
    tagColor: '#1E5FCC',
    tagBg: '#DBEAFE',
  },
  {
    to: '/auto-entrepreneur',
    icon: Briefcase,
    color: '#7C3AED',
    bg: '#EEF2FF',
    label: 'Auto-Entrepreneur',
    desc: 'Cotisations sociales de 12,3% à 23,2%, nouveaux seuils TVA 2026 et versement libératoire.',
    tag: 'Freelance',
    tagColor: '#7C3AED',
    tagBg: '#EDE9FE',
  },
  {
    to: '/frais-notaire',
    icon: Building2,
    color: '#059669',
    bg: '#ECFDF5',
    label: 'Frais de Notaire',
    desc: "Estimation des frais d'acquisition immobilière selon le barème officiel 2026.",
    tag: 'Immobilier',
    tagColor: '#059669',
    tagBg: '#D1FAE5',
  },
  {
    to: '/teletravail',
    icon: Wifi,
    color: '#0891B2',
    bg: '#ECFEFF',
    label: 'Indemnités Télétravail',
    desc: 'Forfait URSSAF 2,70€/jour ou frais réels (internet, électricité, mobilier).',
    tag: 'Salarié',
    tagColor: '#0891B2',
    tagBg: '#CFFAFE',
  },
  {
    to: '/credit',
    icon: Home,
    color: '#DC2626',
    bg: '#FFF1F2',
    label: 'Crédit Immobilier',
    desc: "Mensualités, coût total, taux d'endettement HCSF et tableau d'amortissement 2026.",
    tag: 'Immobilier',
    tagColor: '#DC2626',
    tagBg: '#FEE2E2',
  },
]

const features = [
  { icon: Zap, title: 'Calcul en temps réel', desc: 'Les résultats s\'affichent instantanément pendant que vous saisissez. Pas de bouton "Calculer".' },
  { icon: Shield, title: 'Sources officielles', desc: 'Tous nos taux proviennent de l\'URSSAF, DGFiP, AGIRC-ARRCO et Légifrance — mis à jour 2026.' },
  { icon: TrendingUp, title: '100% gratuit & privé', desc: 'Aucune inscription. Aucune donnée transmise. Les calculs s\'effectuent dans votre navigateur.' },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <SEOHead
        title="Simulateurs Fiscaux Gratuits 2026"
        description="5 simulateurs fiscaux gratuits pour la France : calculateur brut net, auto-entrepreneur, frais de notaire, télétravail et crédit immobilier. Taux 2026 officiels."
        canonical="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MonBilanFacile.fr",
          "url": "https://monbilanfacile.fr",
          "description": "Référence fiscale française 2026 — 5 simulateurs gratuits"
        }}
      />

      {/* ── HERO ── */}
      <section style={{ textAlign: 'center', padding: '4rem 1rem 3rem', maxWidth: '700px', margin: '0 auto' }}>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '20px', padding: '5px 14px', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E5FCC', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            ✦ Référence fiscale 2026 — France
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
          Votre bilan fiscal<br />
          <span style={{ color: '#1E5FCC' }}>simplifié en 2026</span>
        </h1>

        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#475569', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '520px', margin: '0 auto 2rem' }}>
          5 simulateurs fiscaux gratuits basés sur les taux officiels français.
          Calculs instantanés, sans inscription, entièrement gratuits.
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <button onClick={() => navigate('/commencer')}
            style={{ padding: '13px 24px', background: '#0B1F3A', color: 'white', border: 'none', borderRadius: '13px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Trouver mon simulateur →
          </button>
          <button onClick={() => navigate('/brut-net')}
            style={{ padding: '13px 24px', background: 'white', color: '#0F172A', border: '1.5px solid #E2E8F0', borderRadius: '13px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Calculateur Brut → Net
          </button>
        </div>

        {/* Trust bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { value: '5', label: 'Simulateurs' },
            { value: '100%', label: 'Gratuit' },
            { value: '2026', label: 'Mis à jour' },
            { value: 'URSSAF', label: 'Source officielle' },
          ].map(({ value, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{value}</span>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUTILS GRID (Bento) ── */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
            Tous nos simulateurs fiscaux
          </h2>
          <p style={{ color: '#475569', fontSize: '15px' }}>
            Sélectionnez l'outil qui correspond à votre situation
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {tools.map(({ to, icon: Icon, color, bg, label, desc, tag, tagColor, tagBg }) => (
            <button key={to} onClick={() => navigate(to)}
              style={{ textAlign: 'left', background: 'white', border: '1.5px solid #E2E8F0', borderRadius: '20px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ width: '44px', height: '44px', background: bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={color} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', background: tagBg, color: tagColor }}>
                  {tag}
                </span>
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>{label}</h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.6, marginBottom: '1rem' }}>{desc}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color }}>
                Accéder <ArrowRight size={13} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background: '#F8FAFC', borderRadius: '24px', padding: '3rem 2rem', marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
            Pourquoi MonBilanFacile.fr ?
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '40px', height: '40px', background: '#EFF6FF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Icon size={18} color="#1E5FCC" />
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>{title}</h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEO CONTENT ── */}
      <section style={{ maxWidth: '800px' }}>
        <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          MonBilanFacile.fr — Votre référence fiscale française gratuite en 2026
        </h2>
        <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#475569', marginBottom: '1rem' }}>
          MonBilanFacile.fr met à votre disposition 5 simulateurs fiscaux gratuits, basés sur
          les textes officiels URSSAF, DGFiP et Légifrance pour l'année 2026. Que vous soyez
          salarié, auto-entrepreneur, ou futur propriétaire immobilier, nos outils vous donnent
          une estimation fiable en temps réel.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {[
            { t: 'Calcul brut net 2026', d: 'Notre calculateur salaire brut net applique les taux URSSAF, AGIRC-ARRCO et la grille PAS DGFiP pour une conversion précise de votre rémunération. 4 statuts : non-cadre, cadre, fonction publique, libéral.' },
            { t: 'Simulateur micro-entrepreneur', d: 'Calculez vos cotisations URSSAF (12,3% à 23,2%), vérifiez vos nouveaux seuils TVA 2026 (37 500€ services / 85 000€ vente) et estimez votre revenu net.' },
            { t: 'Frais de notaire en ligne', d: "Estimez vos frais d'acquisition immobilière selon le barème officiel 2026 — 7 à 8% dans l'ancien, 2 à 3% dans le neuf. Avec ou sans crédit immobilier." },
            { t: 'Crédit immobilier 2026', d: "Calculez vos mensualités et votre taux d'endettement HCSF (35% max) selon les taux du marché immobilier français 2026. Tableau d'amortissement inclus." },
          ].map(({ t, d }) => (
            <div key={t} style={{ padding: '1rem', borderLeft: '3px solid #EFF6FF' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>{t}</h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.7 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
