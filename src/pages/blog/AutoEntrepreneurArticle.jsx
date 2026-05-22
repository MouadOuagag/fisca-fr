import BlogLayout from '../../components/blog/BlogLayout'
import AutoEntrepreneurPage from '../AutoEntrepreneurPage'
import ArticleContent from '../../content/articles/auto-entrepreneur-2026.mdx'

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Simulateur auto-entrepreneur 2026 — cotisations, IR et TVA",
  "description": "Guide complet sur les cotisations URSSAF, seuils TVA et impôt sur le revenu pour les micro-entrepreneurs en France en 2026.",
  "dateModified": "2026-01-01",
  "publisher": { "@type": "Organization", "name": "MonBilanFacile.fr", "url": "https://monbilanfacile.fr" }
}

export default function AutoEntrepreneurArticle() {
  return (
    <BlogLayout
      title="Simulateur Auto-Entrepreneur 2026 — Cotisations, IR & TVA"
      description="Calculez vos cotisations URSSAF, vérifiez vos seuils TVA et estimez votre revenu net en tant que micro-entrepreneur en France 2026."
      canonical="/auto-entrepreneur"
      date="Janvier 2026"
      readTime="6 min"
      tag="Freelance & Micro-entreprise"
      schema={schema}
      ToolComponent={AutoEntrepreneurPage}
    >
      <ArticleContent />
    </BlogLayout>
  )
}
