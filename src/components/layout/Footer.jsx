import { NavLink } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'

const sections = [
  {
    title: 'Simulateurs',
    links: [
      { to: '/brut-net',          label: 'Calculateur Brut → Net' },
      { to: '/auto-entrepreneur', label: 'Auto-Entrepreneur' },
      { to: '/frais-notaire',     label: 'Frais de Notaire' },
      { to: '/teletravail',       label: 'Télétravail' },
      { to: '/credit',            label: 'Crédit Immobilier' },
    ]
  },
  {
    title: 'Guides',
    links: [
      { to: '/blog',                                  label: 'Tous les articles' },
      { to: '/articles/impot-revenu-2026',            label: 'Impôt sur le revenu' },
      { to: '/articles/dividendes-flat-tax-2026',     label: 'Flat Tax & Dividendes' },
      { to: '/articles/cotisations-tns-2026',         label: 'Cotisations TNS' },
      { to: '/articles/indemnites-licenciement-2026', label: 'Indemnités licenciement' },
    ]
  },
  {
    title: 'Informations',
    links: [
      { to: '/a-propos',                  label: 'À propos' },
      { to: '/mentions-legales',          label: 'Mentions légales' },
      { to: '/politique-confidentialite', label: 'Confidentialité' },
      { to: '/cgu',                       label: 'CGU' },
    ]
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0B1F3A', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Top section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '2.5rem' }} className="footer-grid">

          {/* Brand */}
          <div>
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', background: '#1E5FCC', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={15} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '16px', color: 'white' }}>
                MonBilan<span style={{ color: '#60A5FA' }}>.fr</span>
              </span>
            </NavLink>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7', maxWidth: '220px' }}>
              Référence fiscale française 2026. Simulateurs gratuits, précis et mis à jour selon les lois en vigueur.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['URSSAF', 'DGFiP', 'Légifrance'].map(s => (
                <span key={s} style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3px' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Nav sections */}
          {sections.map(({ title, links }) => (
            <div key={title}>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>
                {title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {links.map(({ to, label }) => (
                  <NavLink key={to} to={to}
                    style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.target.style.color = 'white'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            © 2026 MonBilanFacile.fr — Tous droits réservés · Paris, France
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            Outil indicatif · Non contractuel · Régime général français
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
