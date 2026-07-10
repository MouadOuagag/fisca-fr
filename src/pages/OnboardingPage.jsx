import { useNavigate } from 'react-router-dom'
import { ArrowRight, TrendingUp } from 'lucide-react'

const profils = [
  {
    id: 'salarie',
    emoji: '👔',
    title: 'Je suis salarié',
    desc: 'Employé en CDI, CDD, temps plein ou partiel — secteur privé ou public',
    tools: ['Brut → Net', 'Télétravail'],
    color: '#1E5FCC',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    to: '/brut-net',
  },
  {
    id: 'independant',
    emoji: '💼',
    title: 'Je suis indépendant',
    desc: 'Auto-entrepreneur, freelance, micro-entrepreneur, profession libérale',
    tools: ['Auto-Entrepreneur', 'Brut → Net'],
    color: '#7C3AED',
    bg: '#EEF2FF',
    border: '#C4B5FD',
    to: '/auto-entrepreneur',
  },
  {
    id: 'proprietaire',
    emoji: '🏠',
    title: 'Je veux acheter un bien',
    desc: 'Achat immobilier, crédit, frais de notaire — neuf ou ancien',
    tools: ['Frais de Notaire', 'Crédit Immobilier'],
    color: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    to: '/frais-notaire',
  },
  {
    id: 'teletravail',
    emoji: '🏡',
    title: 'Je travaille en remote',
    desc: 'Télétravail partiel ou full remote — calcul des indemnités exonérées',
    tools: ['Télétravail', 'Brut → Net'],
    color: '#0891B2',
    bg: '#ECFEFF',
    border: '#A5F3FC',
    to: '/teletravail',
  },
]

export default function OnboardingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2.5rem' }}>
        <div style={{ width: '36px', height: '36px', background: '#0B1F3A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TrendingUp size={16} color="white" />
        </div>
        <span style={{ fontWeight: 800, fontSize: '18px', color: '#0B1F3A' }}>
          MonBilan<span style={{ color: '#1E5FCC' }}>.fr</span>
        </span>
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '480px' }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', marginBottom: '0.75rem', lineHeight: 1.2 }}>
          Quelle est votre situation ?
        </h1>
        <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6 }}>
          Choisissez votre profil pour accéder directement aux outils qui vous correspondent.
        </p>
      </div>

      {/* Profil cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', width: '100%', maxWidth: '900px', marginBottom: '1.5rem' }}>
        {profils.map(({ id, emoji, title, desc, tools, color, bg, border, to }) => (
          <button key={id} onClick={() => navigate(to)}
            style={{ textAlign: 'left', background: 'white', border: `1.5px solid ${border}`, borderRadius: '20px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2rem' }}>{emoji}</span>
              <ArrowRight size={16} color={color} />
            </div>

            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>{title}</h2>
            <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, marginBottom: '1rem' }}>{desc}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {tools.map(t => (
                <span key={t} style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: bg, color }}>
                  {t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <button onClick={() => navigate('/')}
        style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
        Voir tous les outils →
      </button>
    </div>
  )
}
