import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      padding: '1rem',
      background: 'rgba(11, 31, 58, 0.97)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: '260px' }}>
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: '1.6',
            margin: 0,
          }}>
            🍪 MonBilanFacile.fr utilise des cookies analytiques (Google Analytics)
            et publicitaires (Google AdSense) pour améliorer votre expérience et
            financer le service gratuit. Conformément au RGPD, votre consentement
            est requis.{' '}
            <a href="/politique-confidentialite"
              style={{ color: '#60A5FA', textDecoration: 'underline' }}>
              En savoir plus
            </a>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button onClick={decline}
            style={{
              padding: '9px 18px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}>
            Refuser
          </button>
          <button onClick={accept}
            style={{
              padding: '9px 20px',
              borderRadius: '10px',
              border: 'none',
              background: '#1E5FCC',
              color: 'white',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
