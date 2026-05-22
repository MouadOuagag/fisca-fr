import BlogLayout from '../../components/blog/BlogLayout'
import TeletravailPage from '../TeletravailPage'
import ArticleContent from '../../content/articles/teletravail-2026.mdx'

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Indemnités télétravail 2026 — forfait URSSAF et frais réels",
  "description": "Calculez vos indemnités télétravail exonérées selon le forfait URSSAF 2026 ou la méthode des frais réels. Guide complet pour salariés français.",
  "dateModified": "2026-01-01",
  "publisher": { "@type": "Organization", "name": "MonBilanFacile.fr", "url": "https://monbilanfacile.fr" }
}

export default function TeletravailArticle() {
  return (
    <BlogLayout
      title="Calculateur Indemnités Télétravail 2026 — Forfait & Frais Réels"
      description="Calculez vos indemnités télétravail exonérées de charges. Forfait URSSAF 2,70€/jour ou frais réels (internet, électricité, mobilier)."
      canonical="/teletravail"
      date="Janvier 2026"
      readTime="5 min"
      tag="Salarié & Télétravail"
      schema={schema}
      ToolComponent={TeletravailPage}
    >
      <ArticleContent />
    </BlogLayout>
  )
}
