import SEOHead from '../components/seo/SEOHead'
import { NavLink } from 'react-router-dom'
import { Shield, Zap, BookOpen, Mail, MapPin, ExternalLink } from 'lucide-react'

const CARD = { background: 'white', border: '1.5px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem' }

export default function AProposPage() {
  return (
    <>
      <SEOHead
        title="À propos de MonBilanFacile.fr — Référence Fiscale Française 2026"
        description="Découvrez MonBilanFacile.fr : notre mission, notre équipe et notre engagement pour des simulateurs fiscaux français gratuits, précis et accessibles à tous."
        canonical="/a-propos"
      />

      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '20px', padding: '4px 12px', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E5FCC', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Notre mission</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '0.5rem' }}>
          À propos de MonBilanFacile.fr
        </h1>
        <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.7, maxWidth: '600px' }}>
          La référence fiscale française gratuite pour les salariés, indépendants et futurs propriétaires.
        </p>
      </div>

      <div style={CARD}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>Notre mission</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#475569', marginBottom: '1rem' }}>
          MonBilanFacile.fr est né d'un constat simple : comprendre sa fiscalité en France est complexe,
          et les outils disponibles sont souvent incomplets, payants ou difficiles à utiliser.
          Notre mission est de <strong>démocratiser l'accès à l'information fiscale</strong> en proposant
          des simulateurs gratuits, précis et mis à jour selon la législation française en vigueur.
        </p>
        <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#475569', marginBottom: '1rem' }}>
          Que vous soyez salarié souhaitant comprendre votre fiche de paie, auto-entrepreneur cherchant
          à calculer vos cotisations URSSAF, ou futur propriétaire estimant vos frais de notaire,
          MonBilanFacile.fr vous accompagne avec des calculs instantanés et des explications claires.
        </p>
        <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#475569' }}>
          Tous nos outils sont développés en s'appuyant sur des sources officielles françaises :
          URSSAF, Direction Générale des Finances Publiques (DGFiP), Légifrance, AGIRC-ARRCO
          et le Haut Conseil de Stabilité Financière (HCSF). Chaque taux et barème est vérifié
          et mis à jour à chaque changement de législation.
        </p>
      </div>

      <div style={CARD}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>L'éditeur</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { icon: Mail,   label: 'Email',        value: 'contact@monbilanfacile.fr' },
            { icon: MapPin, label: 'Localisation', value: 'Paris, France' },
            { icon: Shield, label: 'Statut',       value: 'Personne physique — Éditeur indépendant' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#F8FAFC', borderRadius: '10px' }}>
              <div style={{ width: '36px', height: '36px', background: '#EFF6FF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color="#1E5FCC" aria-hidden="true" />
              </div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={CARD}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>Nos 5 simulateurs fiscaux 2026</h2>
        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
          MonBilanFacile.fr propose 5 simulateurs fiscaux entièrement gratuits, sans inscription
          et sans publicité intrusive :
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { to: '/brut-net',          label: 'Calculateur Brut → Net',       desc: 'Convertissez votre salaire brut en net avec les taux URSSAF et AGIRC-ARRCO 2026. 4 statuts : salarié non-cadre, cadre, fonction publique, libéral.' },
            { to: '/auto-entrepreneur', label: 'Simulateur Auto-Entrepreneur', desc: 'Calculez vos cotisations sociales URSSAF (12,3% à 23,2%), vérifiez vos seuils TVA 2026 et estimez votre revenu net.' },
            { to: '/frais-notaire',     label: 'Simulateur Frais de Notaire',  desc: 'Estimez vos frais d\'acquisition immobilière selon le barème officiel 2026 — 7 à 8% dans l\'ancien, 2 à 3% dans le neuf.' },
            { to: '/teletravail',       label: 'Calculateur Télétravail',       desc: 'Calculez vos indemnités télétravail exonérées selon le forfait URSSAF 2026 (2,70€/jour) ou la méthode des frais réels.' },
            { to: '/credit',            label: 'Simulateur Crédit Immobilier', desc: 'Calculez vos mensualités, coût total et taux d\'endettement HCSF. Tableau d\'amortissement inclus.' },
          ].map(({ to, label, desc }) => (
            <div key={to} style={{ display: 'flex', gap: '12px', padding: '12px', background: '#F8FAFC', borderRadius: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '3px', borderRadius: '2px', background: '#1E5FCC', alignSelf: 'stretch', flexShrink: 0 }} />
              <div>
                <NavLink to={to} style={{ fontSize: '14px', fontWeight: 700, color: '#1E5FCC', textDecoration: 'none' }}>
                  {label}
                </NavLink>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.6, marginTop: '3px' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={CARD}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>Nos sources officielles</h2>
        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
          Tous nos calculs sont basés exclusivement sur des sources officielles françaises :
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {[
            { name: 'URSSAF',                 desc: 'Cotisations sociales et taux micro-entrepreneur', url: 'https://www.urssaf.fr' },
            { name: 'DGFiP — impots.gouv.fr', desc: 'Barème IR, grille PAS, décote 2026',             url: 'https://www.impots.gouv.fr' },
            { name: 'Légifrance',             desc: 'Textes de loi, décrets, CGI',                    url: 'https://www.legifrance.gouv.fr' },
            { name: 'AGIRC-ARRCO',            desc: 'Taux retraite complémentaire 2026',              url: 'https://www.agirc-arrco.fr' },
            { name: 'Banque de France',       desc: 'Taux immobiliers et règle HCSF 35%',             url: 'https://www.banque-france.fr' },
            { name: 'Service-public.fr',      desc: 'Droits et démarches officielles',                url: 'https://www.service-public.fr' },
          ].map(({ name, desc, url }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px', background: '#F8FAFC', borderRadius: '10px', textDecoration: 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#EFF6FF'}
              onMouseLeave={e => e.currentTarget.style.background = '#F8FAFC'}>
              <ExternalLink size={14} color="#1E5FCC" style={{ marginTop: '2px', flexShrink: 0 }} aria-hidden="true" />
              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{name}</p>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div style={{ ...CARD, background: '#FFF7ED', border: '1.5px solid #FED7AA' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#9A3412', marginBottom: '0.75rem' }}>
          ⚠ Avertissement légal important
        </h2>
        <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#C2410C', marginBottom: '0.75rem' }}>
          Les simulateurs proposés sur MonBilanFacile.fr sont fournis à titre purement indicatif et
          pédagogique. Ils ne constituent en aucun cas un conseil fiscal, juridique, comptable ou
          financier personnalisé.
        </p>
        <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#C2410C' }}>
          Pour toute décision fiscale ou financière importante, nous vous recommandons de consulter
          un professionnel qualifié : expert-comptable, notaire, conseiller financier ou avocat fiscaliste.
        </p>
      </div>

      <div style={{ ...CARD, textAlign: 'center' }}>
        <BookOpen size={24} color="#1E5FCC" style={{ marginBottom: '0.75rem' }} aria-hidden="true" />
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
          Découvrez nos guides fiscaux
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '1rem' }}>
          Des explications claires sur la fiscalité française 2026, rédigées par nos experts.
        </p>
        <NavLink to="/blog"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '11px 22px', background: '#0B1F3A', color: 'white', borderRadius: '12px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>
          Voir tous les articles →
        </NavLink>
      </div>
    </>
  )
}
