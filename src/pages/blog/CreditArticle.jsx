import BlogLayout from '../../components/blog/BlogLayout'
import CreditPage from '../CreditPage'
import ArticleContent from '../../content/articles/credit-immobilier-2026.mdx'

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Simulateur crédit immobilier 2026 — mensualités et coût total",
  "description": "Calculez vos mensualités, le coût total de votre crédit immobilier et votre taux d'endettement HCSF selon les taux du marché français 2026.",
  "dateModified": "2026-01-01",
  "publisher": { "@type": "Organization", "name": "Fisca.fr", "url": "https://fisca.fr" }
}

export default function CreditArticle() {
  return (
    <BlogLayout
      title="Simulateur Crédit Immobilier 2026 — Mensualités & Coût Total"
      description="Calculez vos mensualités, coût total et taux d'endettement HCSF. Taux immobiliers marché français 2026 intégrés."
      canonical="/credit"
      date="Janvier 2026"
      readTime="6 min"
      tag="Immobilier & Crédit"
      schema={schema}
      ToolComponent={CreditPage}
    >
      <ArticleContent />
    </BlogLayout>
  )
}
