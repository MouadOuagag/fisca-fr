import { TrendingUp, Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const tools = [
  { to: '/brut-net',          label: 'Brut → Net' },
  { to: '/auto-entrepreneur', label: 'Auto-Entrepreneur' },
  { to: '/frais-notaire',     label: 'Frais de Notaire' },
  { to: '/teletravail',       label: 'Télétravail' },
  { to: '/credit',            label: 'Crédit Immo' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <>
      <header style={{ background: '#0B1F3A', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="max-w-6xl mx-auto px-4 lg:px-6 flex items-center justify-between" style={{ height: '60px' }}>
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#1E5FCC' }}>
              <TrendingUp size={14} color="white" />
            </div>
            <span className="font-bold text-base text-white tracking-tight">
              Fisca<span style={{ color: '#60A5FA' }}>.fr</span>
            </span>
            <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full ml-1"
              style={{ background: 'rgba(96,165,250,0.15)', color: '#93C5FD', border: '1px solid rgba(96,165,250,0.25)' }}>
              2026
            </span>
          </NavLink>
          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {tools.map(({ to, label }) => (
              <NavLink key={to} to={to} end
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                style={({ isActive }) => isActive ? { background: 'rgba(255,255,255,0.12)' } : {}}>
                {label}
              </NavLink>
            ))}
          </nav>
          {/* Mobile menu */}
          <button className="lg:hidden text-white p-1.5" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {/* Mobile dropdown */}
        {mobileOpen && (
          <div style={{ background: '#0F2847', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {tools.map(({ to, label }) => (
                <NavLink key={to} to={to} end
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-xl text-sm font-medium ${isActive ? 'text-white' : 'text-slate-300'}`}
                  style={({ isActive }) => isActive ? { background: 'rgba(30,95,204,0.4)' } : {}}>
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
