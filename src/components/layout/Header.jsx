import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { TrendingUp, Menu, X, ChevronDown } from 'lucide-react'

const tools = [
  { to: '/brut-net',          label: 'Brut → Net',        desc: 'Salaire net instantané' },
  { to: '/auto-entrepreneur', label: 'Auto-Entrepreneur',  desc: 'Cotisations & TVA 2026' },
  { to: '/frais-notaire',     label: 'Frais de Notaire',  desc: 'Neuf & Ancien' },
  { to: '/teletravail',       label: 'Télétravail',        desc: 'Indemnités exonérées' },
  { to: '/credit',            label: 'Crédit Immobilier', desc: 'Mensualités & HCSF' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header style={{
        background: 'white',
        borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Brand */}
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', transition: 'opacity 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <div style={{ width: '34px', height: '34px', background: '#0B1F3A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={16} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '17px', color: '#0B1F3A', letterSpacing: '-0.3px' }}>
              MonBilan<span style={{ color: '#1E5FCC' }}>.fr</span>
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden lg:flex">

            {/* Outils dropdown */}
            <div style={{ position: 'relative' }}
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', borderRadius: '10px', border: 'none', background: 'none', fontSize: '14px', fontWeight: 600, color: '#475569', cursor: 'pointer', fontFamily: 'inherit' }}>
                Nos outils <ChevronDown size={14} />
              </button>
              {toolsOpen && (
                <div className="dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '8px', width: '260px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', marginTop: '4px' }}>
                  {tools.map(({ to, label, desc }) => (
                    <NavLink key={to} to={to}
                      style={{ display: 'flex', flexDirection: 'column', padding: '10px 12px', borderRadius: '10px', textDecoration: 'none', transition: 'background 0.1s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{label}</span>
                      <span style={{ fontSize: '12px', color: '#94A3B8', marginTop: '1px' }}>{desc}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/blog" className="nav-link"
              style={{ padding: '8px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: '#475569', textDecoration: 'none' }}>
              Blog
            </NavLink>

            <NavLink to="/a-propos" className="nav-link"
              style={{ padding: '8px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: '#475569', textDecoration: 'none' }}>
              À propos
            </NavLink>

            <NavLink to="/commencer"
              style={{ marginLeft: '8px', padding: '9px 18px', borderRadius: '12px', background: '#0B1F3A', color: 'white', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
              Commencer →
            </NavLink>
          </nav>

          {/* Mobile menu button */}
          <button
            aria-label="Ouvrir le menu de navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ padding: '8px', border: 'none', background: 'none', cursor: 'pointer', color: '#0F172A' }}
            className="lg:hidden">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: 'white', borderTop: '1px solid #E2E8F0', padding: '1rem 1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {tools.map(({ to, label }) => (
                <NavLink key={to} to={to}
                  onClick={() => setMobileOpen(false)}
                  style={{ padding: '10px 12px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: '#0F172A', textDecoration: 'none', background: '#F8FAFC' }}>
                  {label}
                </NavLink>
              ))}
              <NavLink to="/blog" onClick={() => setMobileOpen(false)}
                style={{ padding: '10px 12px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: '#0F172A', textDecoration: 'none' }}>
                Blog
              </NavLink>
              <NavLink to="/a-propos" onClick={() => setMobileOpen(false)}
                style={{ padding: '10px 12px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: '#0F172A', textDecoration: 'none' }}>
                À propos
              </NavLink>
              <NavLink to="/commencer" onClick={() => setMobileOpen(false)}
                style={{ marginTop: '8px', padding: '12px', borderRadius: '12px', background: '#0B1F3A', color: 'white', fontSize: '14px', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
                Commencer →
              </NavLink>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
