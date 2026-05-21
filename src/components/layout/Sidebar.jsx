import { NavLink } from 'react-router-dom'
import { Calculator, Briefcase, Building2, Wifi, Home } from 'lucide-react'

const tools = [
  { to: '/',           icon: Calculator, label: 'Brut → Net' },
  { to: '/auto-entrepreneur', icon: Briefcase,  label: 'Auto-Entrepreneur', soon: true },
  { to: '/frais-notaire',     icon: Building2,  label: 'Frais de Notaire',  soon: true },
  { to: '/teletravail',       icon: Wifi,       label: 'Télétravail',       soon: true },
  { to: '/credit',            icon: Home,       label: 'Crédit Immo',       soon: true },
]

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <nav className="sticky top-8 space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest px-3 mb-3" style={{ color: '#94A3B8' }}>
          Outils fiscaux
        </p>
        {tools.map(({ to, icon: Icon, label, soon }) => (
          <NavLink key={to} to={to} end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'text-white'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`
            }
            style={({ isActive }) => isActive ? { background: '#1E5FCC' } : {}}
          >
            <Icon size={16} />
            <span className="flex-1">{label}</span>
            {soon && (
              <span className="text-xs px-1.5 py-0.5 rounded-full font-medium bg-slate-100 text-slate-400">
                Bientôt
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
