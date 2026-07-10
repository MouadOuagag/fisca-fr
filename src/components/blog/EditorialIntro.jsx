const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

export default function EditorialIntro({
  tag,
  tagColor = '#1E5FCC',
  tagBg = '#EFF6FF',
  title,
  intro,
  points = [],
  sourceNote,
}) {
  return (
    <div className="rounded-2xl p-6 mb-6"
      style={{ background: 'white', boxShadow: CARD_SHADOW }}>

      {/* Tag */}
      <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
        style={{ background: tagBg, color: tagColor }}>
        {tag}
      </span>

      {/* Titre éditorial */}
      <h2 className="text-lg font-bold mb-3 leading-snug"
        style={{ color: '#0F172A' }}>
        {title}
      </h2>

      {/* Intro */}
      <p className="text-sm leading-relaxed mb-4"
        style={{ color: '#475569' }}>
        {intro}
      </p>

      {/* Points clés */}
      {points.length > 0 && (
        <div className="space-y-2 mb-4">
          {points.map((point, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: tagBg }}>
                <span style={{ color: tagColor, fontSize: '10px', fontWeight: 700 }}>✓</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                {point}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Source note */}
      {sourceNote && (
        <p className="text-xs leading-relaxed pt-3 border-t"
          style={{ color: '#64748B', borderColor: '#F1F5F9' }}>
          📋 {sourceNote}
        </p>
      )}
    </div>
  )
}
