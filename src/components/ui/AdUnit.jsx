// Composant AdUnit centralisé — Fisca.fr
// Pour activer AdSense : remplace le contenu des divs par ton code <ins> AdSense
// Format : banner (728×90), square (300×250), incontent (responsive)

const AD_SLOT = {
  banner:    'XXXXXXXX', // ← remplacer par ton data-ad-slot AdSense
  square:    'YYYYYYYY',
  incontent: 'ZZZZZZZZ',
}

const AD_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX' // ← remplacer par ton Publisher ID

function AdPlaceholder({ label, size }) {
  return (
    <div style={{
      width: '100%',
      minHeight: size === 'square' ? '250px' : '90px',
      background: '#F8FAFC',
      border: '1.5px dashed #CBD5E1',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '4px',
    }}>
      <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '.8px', color: '#94A3B8' }}>Publicité</p>
      <p style={{ fontSize: '10px', color: '#CBD5E1' }}>{label}</p>
    </div>
  )
}

export function AdUnitBanner() {
  return (
    <div style={{ margin: '1rem 0' }}>
      {/* MODE PRODUCTION — décommenter et remplacer :
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT.banner}
        data-ad-format="horizontal"
        data-full-width-responsive="true" />
      */}
      <AdPlaceholder label="728 × 90 — Bandeau" size="banner" />
    </div>
  )
}

export function AdUnitSquare() {
  return (
    <div>
      {/* MODE PRODUCTION — décommenter :
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT.square}
        data-ad-format="rectangle"
        data-full-width-responsive="false" />
      */}
      <AdPlaceholder label="300 × 250 — Rectangle" size="square" />
    </div>
  )
}

export function AdUnitInContent() {
  return (
    <div style={{ margin: '1.5rem 0' }}>
      {/* MODE PRODUCTION — décommenter :
      <ins className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT.incontent}
        data-ad-format="fluid"
        data-ad-layout="in-article"
        data-full-width-responsive="true" />
      */}
      <AdPlaceholder label="In-Content Responsive" size="banner" />
    </div>
  )
}
