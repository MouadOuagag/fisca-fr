export function AdZoneBanner() {
  return (
    <div className="w-full flex items-center justify-center my-4"
      style={{ minHeight: '90px', background: '#F8FAFC', border: '1.5px dashed #CBD5E1', borderRadius: '12px' }}>
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>Publicité</p>
        <p className="text-xs mt-1" style={{ color: '#CBD5E1' }}>728 × 90 — Google AdSense</p>
        {/* Remplacer par : <ins className="adsbygoogle" data-ad-slot="XXXXXXXX" data-ad-format="banner" /> */}
      </div>
    </div>
  )
}

export function AdZoneSquare() {
  return (
    <div className="flex items-center justify-center"
      style={{ width: '100%', minHeight: '250px', background: '#F8FAFC', border: '1.5px dashed #CBD5E1', borderRadius: '12px' }}>
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>Publicité</p>
        <p className="text-xs mt-1" style={{ color: '#CBD5E1' }}>300 × 250</p>
        {/* Remplacer par : <ins className="adsbygoogle" data-ad-slot="XXXXXXXX" data-ad-format="rectangle" /> */}
      </div>
    </div>
  )
}

export function AdZoneInContent() {
  return (
    <div className="w-full flex items-center justify-center my-6"
      style={{ minHeight: '100px', background: '#F8FAFC', border: '1.5px dashed #CBD5E1', borderRadius: '12px' }}>
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>Publicité</p>
        <p className="text-xs mt-1" style={{ color: '#CBD5E1' }}>Responsive In-Content</p>
        {/* Remplacer par : <ins className="adsbygoogle" data-ad-slot="XXXXXXXX" data-ad-format="auto" /> */}
      </div>
    </div>
  )
}
