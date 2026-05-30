import SEOHead from '../seo/SEOHead'
import { AdUnitInContent } from '../ui/AdUnit'
import { Calendar, Clock } from 'lucide-react'

const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

export default function BlogLayout({
  title,
  description,
  canonical,
  date,
  readTime,
  tag,
  tagColor = '#1E5FCC',
  tagBg = '#EFF6FF',
  schema,
  editorialIntro,
  ToolComponent,
  children,
}) {
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={canonical}
        type="article"
        schema={schema}
      />

      {/* ── SECTION ÉDITORIALE INTRO (avant le calculateur) ── */}
      <div className="mb-6">

        {/* Meta */}
        <div className="flex items-center gap-3 flex-wrap mb-3">
          {tag && (
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: tagBg, color: tagColor }}>
              {tag}
            </span>
          )}
          {date && (
            <span className="flex items-center gap-1 text-xs"
              style={{ color: '#94A3B8' }}>
              <Calendar size={11} /> {date}
            </span>
          )}
          {readTime && (
            <span className="flex items-center gap-1 text-xs"
              style={{ color: '#94A3B8' }}>
              <Clock size={11} /> {readTime} de lecture
            </span>
          )}
        </div>

        {/* H1 */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight mb-3"
          style={{ color: '#0F172A' }}>
          {title}
        </h1>

        {/* Description éditoriale */}
        <p className="text-sm leading-relaxed max-w-2xl mb-5"
          style={{ color: '#64748B' }}>
          {description}
        </p>

        {/* Intro éditoriale enrichie */}
        {editorialIntro && (
          <div className="rounded-2xl p-5 mb-2"
            style={{ background: 'white', boxShadow: CARD_SHADOW,
              borderLeft: `4px solid ${tagColor}` }}>
            <p className="text-sm font-semibold mb-2" style={{ color: tagColor }}>
              📖 Comprendre l'essentiel
            </p>
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
              {editorialIntro.summary}
            </p>
            {editorialIntro.points && (
              <div className="space-y-1.5">
                {editorialIntro.points.map((p, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ color: tagColor, fontWeight: 700, fontSize: '12px' }}>→</span>
                    <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>{p}</p>
                  </div>
                ))}
              </div>
            )}
            {editorialIntro.source && (
              <p className="text-xs mt-3 pt-3 border-t" style={{ color: '#94A3B8', borderColor: '#F1F5F9' }}>
                Source : {editorialIntro.source}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── OUTIL INTERACTIF ── */}
      {ToolComponent && (
        <div className="mb-8">
          <ToolComponent />
        </div>
      )}

      <AdUnitInContent />

      {/* ── ARTICLE MDX COMPLET ── */}
      <article className="rounded-2xl p-6 lg:p-8"
        style={{ background: 'white', boxShadow: CARD_SHADOW }}>
        <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#475569' }}>
          {children}
        </div>
      </article>
    </>
  )
}
