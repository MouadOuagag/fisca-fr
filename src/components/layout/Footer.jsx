import { TrendingUp } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const tools = [
  { to: '/brut-net',          label: 'Calculateur Brut → Net' },
  { to: '/auto-entrepreneur', label: 'Simulateur Auto-Entrepreneur' },
  { to: '/frais-notaire',     label: 'Frais de Notaire' },
  { to: '/teletravail',       label: 'Indemnités Télétravail' },
  { to: '/credit',            label: 'Crédit Immobilier' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0B1F3A', marginTop: '3rem' }}>
      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: '#1E5FCC' }}>
                <TrendingUp size={14} color="white" />
              </div>
              <span className="font-bold text-white">
                Fisca<span style={{ color: '#60A5FA' }}>.fr</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Référence fiscale française 2026. Simulateurs gratuits, précis et mis à jour
              selon les lois en vigueur.
            </p>
          </div>

          {/* Outils */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'rgba(255,255,255,0.3)' }}>Outils fiscaux</p>
            <div className="space-y-2">
              {tools.map(({ to, label }) => (
                <NavLink key={to} to={to}
                  className="block text-xs transition-colors"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => e.target.style.color = 'white'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Légal info */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'rgba(255,255,255,0.3)' }}>Informations légales</p>
            <div className="space-y-2">
              {[
                'Tous les calculs sont indicatifs',
                'Non contractuels — Consulter un expert',
                'Sources : URSSAF, DGFiP, Légifrance',
                'Mis à jour : Janvier 2026',
              ].map(t => (
                <p key={t} className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{t}</p>
              ))}
            </div>
          </div>

          {/* Contenu / Blog */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'rgba(255,255,255,0.3)' }}>Contenu</p>
            <div className="space-y-2">
              <NavLink to="/blog"
                className="block text-xs transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                Blog & Guides fiscaux
              </NavLink>
              <NavLink to="/blog"
                className="block text-xs transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                Tous les simulateurs
              </NavLink>
            </div>
          </div>

          {/* Légal links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'rgba(255,255,255,0.3)' }}>Légal</p>
            <div className="space-y-2">
              {[
                { to: '/mentions-legales',          label: 'Mentions Légales' },
                { to: '/politique-confidentialite', label: 'Confidentialité' },
                { to: '/cgu',                       label: 'CGU' },
              ].map(({ to, label }) => (
                <NavLink key={to} to={to}
                  className="block text-xs transition-colors"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => e.target.style.color = 'white'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026 Fisca.fr — Tous droits réservés
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Simulateurs fiscaux gratuits · France métropolitaine · Régime général
          </p>
        </div>
      </div>
    </footer>
  )
}
