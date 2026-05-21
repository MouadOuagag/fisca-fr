import SEOHead from '../seo/SEOHead'
import { AdUnitBanner, AdUnitInContent } from '../ui/AdUnit'
import { Calendar, Clock } from 'lucide-react'

const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

export default function BlogLayout({
  title,
  description,
  canonical,
  date,
  readTime,
  tag,
  schema,
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

      {/* Article header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          {tag && (
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: '#EFF6FF', color: '#1D4ED8' }}>
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
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
          style={{ color: '#0F172A' }}>
          {title}
        </h1>
        {description && (
          <p className="text-sm mt-2 leading-relaxed max-w-2xl"
            style={{ color: '#64748B' }}>
            {description}
          </p>
        )}
      </div>

      {/* AdSense — top */}
      <AdUnitBanner />

      {/* Outil interactif — toujours en premier */}
      {ToolComponent && (
        <div className="mb-8">
          <ToolComponent />
        </div>
      )}

      {/* AdSense — entre outil et article */}
      <AdUnitInContent />

      {/* Contenu MDX de l'article */}
      <article
        className="rounded-2xl p-6 lg:p-8 prose-custom"
        style={{ background: 'white', boxShadow: CARD_SHADOW }}
      >
        <div style={{
          fontSize: '14px',
          lineHeight: '1.8',
          color: '#475569',
        }}>
          {children}
        </div>
      </article>
    </>
  )
}
