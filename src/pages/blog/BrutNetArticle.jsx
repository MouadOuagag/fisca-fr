import BlogLayout from '../../components/blog/BlogLayout'
import BrutNetPage from '../BrutNetPage'
import ArticleContent from '../../content/articles/calculateur-brut-net-2026.mdx'

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Calculateur salaire brut net 2026 — France",
  "description": "Guide complet pour calculer votre salaire net en France en 2026.",
  "dateModified": "2026-01-01",
  "publisher": {
    "@type": "Organization",
    "name": "MonBilanFacile.fr",
    "url": "https://monbilanfacile.fr"
  }
}

export default function BrutNetArticle() {
  return (
    <BlogLayout
      title="Calculateur Salaire Brut Net 2026 — France"
      description="Convertissez votre salaire brut en net instantanément. Cotisations URSSAF & AGIRC-ARRCO 2026, prélèvement à la source, coût employeur."
      canonical="/brut-net"
      date="Janvier 2026"
      readTime="5 min"
      tag="Salaire & Fiscalité"
      schema={schema}
      ToolComponent={BrutNetPage}
    >
      <ArticleContent />
    </BlogLayout>
  )
}
