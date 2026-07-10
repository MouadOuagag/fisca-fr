import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { TrendingUp, ChevronDown } from 'lucide-react'

const tools = [
  { to: '/brut-net',          label: 'Brut → Net',        desc: 'Salaire net instantané' },
  { to: '/auto-entrepreneur', label: 'Auto-Entrepreneur',  desc: 'Cotisations & TVA 2026' },
  { to: '/frais-notaire',     label: 'Frais de Notaire',  desc: 'Neuf & Ancien' },
  { to: '/teletravail',       label: 'Télétravail',        desc: 'Indemnités exonérées' },
  { to: '/credit',            label: 'Crédit Immobilier', desc: 'Mensualités & HCSF' },
]

export default function Header() {
  const [toolsOpen, setToolsOpen] = useState(false)
  const [scrolled, setScrolled]   = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      role="banner"
      style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
      }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.25rem',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Brand */}
        <NavLink to="/"
          aria-label="MonBilanFacile.fr — Accueil"
          style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none', transition: 'opacity 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <div style={{
            width: '32px', height: '32px',
            background: '#0B1F3A',
            borderRadius: '9px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <TrendingUp size={15} color="white" aria-hidden="true" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '16px', color: '#0B1F3A', letterSpacing: '-0.3px' }}>
            MonBilan<span style={{ color: '#1E5FCC' }}>.fr</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav aria-label="Navigation principale" className="hidden lg:flex items-center">
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>

            {/* Outils dropdown */}
            <div style={{ position: 'relative' }}
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}>
              <button
                aria-haspopup="true"
                aria-expanded={toolsOpen}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '8px 13px', borderRadius: '10px',
                  border: 'none', background: 'none',
                  fontSize: '14px', fontWeight: 600, color: '#475569',
                  cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0F172A'; e.currentTarget.style.background = '#F8FAFC' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = 'none' }}>
                Nos outils
                <ChevronDown size={14} aria-hidden="true"
                  style={{ transition: 'transform 0.2s', transform: toolsOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              {toolsOpen && (
                <div
                  role="menu"
                  aria-label="Liste des outils fiscaux"
                  style={{
                    position: 'absolute', top: 'calc(100% + 4px)', left: 0,
                    background: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '6px',
                    width: '256px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    animation: 'slideDown 0.2s ease',
                  }}>
                  {tools.map(({ to, label, desc }) => (
                    <NavLink key={to} to={to}
                      role="menuitem"
                      style={{
                        display: 'flex', flexDirection: 'column',
                        padding: '10px 11px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{label}</span>
                      <span style={{ fontSize: '12px', color: '#94A3B8', marginTop: '1px' }}>{desc}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {[
              { to: '/blog',     label: 'Blog' },
              { to: '/a-propos', label: 'À propos' },
            ].map(({ to, label }) => (
              <NavLink key={to} to={to}
                style={({ isActive }) => ({
                  padding: '8px 13px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: isActive ? '#0F172A' : '#475569',
                  textDecoration: 'none',
                  background: isActive ? '#F8FAFC' : 'none',
                  transition: 'color 0.15s, background 0.15s',
                })}
                onMouseEnter={e => { e.currentTarget.style.color = '#0F172A'; e.currentTarget.style.background = '#F8FAFC' }}
                onMouseLeave={e => { e.currentTarget.style.color = ''; e.currentTarget.style.background = '' }}>
                {label}
              </NavLink>
            ))}

            <NavLink to="/commencer"
              style={{
                marginLeft: '8px',
                padding: '9px 18px',
                borderRadius: '12px',
                background: '#0B1F3A',
                color: 'white',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(11,31,58,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
              Commencer →
            </NavLink>
          </div>
        </nav>

        {/* Mobile — badge 2026 */}
        <div className="lg:hidden">
          <span style={{
            fontSize: '11px', fontWeight: 700,
            padding: '4px 10px', borderRadius: '8px',
            background: '#EFF6FF', color: '#1E5FCC',
            letterSpacing: '0.3px',
          }}>
            2026
          </span>
        </div>

      </div>
    </header>
  )
}
