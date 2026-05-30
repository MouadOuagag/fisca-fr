// AdUnit.jsx — MODE DÉSACTIVÉ (en attente approbation AdSense)
// Pour activer : changer ADSENSE_ACTIVE à true + décommenter les <ins>

const ADSENSE_ACTIVE = false
const AD_CLIENT = 'ca-pub-4481691092962906'
const AD_SLOT = {
  banner:    'XXXXXXXX',
  square:    'YYYYYYYY',
  incontent: 'ZZZZZZZZ',
}

// Aucune zone vide visible — retourne null si désactivé
export function AdUnitBanner() {
  if (!ADSENSE_ACTIVE) return null
  return (
    <div style={{ margin: '1rem 0' }}>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT.banner}
        data-ad-format="horizontal"
        data-full-width-responsive="true" />
    </div>
  )
}

export function AdUnitSquare() {
  if (!ADSENSE_ACTIVE) return null
  return (
    <div>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT.square}
        data-ad-format="rectangle"
        data-full-width-responsive="false" />
    </div>
  )
}

export function AdUnitInContent() {
  if (!ADSENSE_ACTIVE) return null
  return (
    <div style={{ margin: '1.5rem 0' }}>
      <ins className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT.incontent}
        data-ad-format="fluid"
        data-ad-layout="in-article"
        data-full-width-responsive="true" />
    </div>
  )
}

export function AdZoneBanner() { return null }
export function AdZoneSquare() { return null }
export function AdZoneInContent() { return null }
