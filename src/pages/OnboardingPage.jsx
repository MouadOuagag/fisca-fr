import { useNavigate } from 'react-router-dom'

const PROFILS = [
  {
    id: 'salarie',
    to: '/brut-net',
    emoji: '👔',
    label: 'Salarié',
    desc: 'Calculez votre salaire net, cotisations URSSAF et coût employeur',
    color: '#1E5FCC',
    bg: '#EFF6FF',
  },
  {
    id: 'independant',
    to: '/auto-entrepreneur',
    emoji: '💼',
    label: 'Indépendant',
    desc: 'Cotisations URSSAF, seuils TVA et revenu net micro-entrepreneur',
    color: '#7C3AED',
    bg: '#EEF2FF',
  },
  {
    id: 'proprietaire',
    to: '/frais-notaire',
    emoji: '🏠',
    label: 'Propriétaire',
    desc: "Frais d'acquisition immobilière et crédit immobilier 2026",
    color: '#059669',
    bg: '#ECFDF5',
  },
  {
    id: 'teletravail',
    to: '/teletravail',
    emoji: '🏡',
    label: 'Télétravailleur',
    desc: 'Indemnités télétravail exonérées selon le forfait URSSAF 2026',
    color: '#0891B2',
    bg: '#ECFEFF',
  },
]

export default function OnboardingPage() {
  const navigate = useNavigate()

  function handleSelect(to) {
    localStorage.setItem('mbf-profil', to)
    navigate(to)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0B1F3A 0%, #1E3A5F 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
    }}>
      <div style={{ maxWidth: '640px', width: '100%' }}>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(255,255,255,0.08)' }}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#93C5FD' }}>
              MonBilanFacile.fr
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Quel est votre profil ?
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Sélectionnez votre situation pour accéder à l'outil qui vous correspond
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROFILS.map(({ id, to, emoji, label, desc, color, bg }) => (
            <button key={id} onClick={() => handleSelect(to)}
              className="text-left rounded-2xl p-6 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
              }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-2xl"
                style={{ background: bg }}>
                {emoji}
              </div>
              <h2 className="text-base font-bold text-white mb-1">{label}</h2>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
              <div className="text-xs font-bold" style={{ color }}>
                Accéder →
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Tous nos simulateurs sont gratuits — sans inscription, sans publicité intrusive
        </p>
      </div>
    </div>
  )
}
