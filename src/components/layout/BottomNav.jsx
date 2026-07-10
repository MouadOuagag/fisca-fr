import { NavLink, useLocation } from 'react-router-dom'
import { Calculator, Briefcase, Home, BookOpen, LayoutGrid } from 'lucide-react'

const navItems = [
  { to: '/',                  icon: Home,        label: 'Accueil' },
  { to: '/brut-net',          icon: Calculator,  label: 'Brut→Net' },
  { to: '/auto-entrepreneur', icon: Briefcase,   label: 'Auto-E' },
  { to: '/blog',              icon: BookOpen,    label: 'Blog' },
  { to: '/commencer',         icon: LayoutGrid,  label: 'Tous' },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav
      aria-label="Navigation principale mobile"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid #E2E8F0',
        display: 'flex',
        padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
      }}
      className="lg:hidden">
      {navItems.map(({ to, icon: Icon, label }) => {
        const isActive = to === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(to)
        return (
          <NavLink key={to} to={to}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              padding: '6px 4px',
              textDecoration: 'none',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isActive ? '#EFF6FF' : 'transparent',
              transition: 'background 0.15s ease',
            }}>
              <Icon
                size={20}
                color={isActive ? '#1E5FCC' : '#94A3B8'}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
            </div>
            <span style={{
              fontSize: '10px',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#1E5FCC' : '#94A3B8',
              letterSpacing: '0.2px',
            }}>
              {label}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}
