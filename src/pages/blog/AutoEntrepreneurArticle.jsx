import BlogLayout from '../../components/blog/BlogLayout'
import AutoEntrepreneurPage from '../AutoEntrepreneurPage'
import ArticleContent from '../../content/articles/auto-entrepreneur-2026.mdx'

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Simulateur auto-entrepreneur 2026 — cotisations, IR et TVA",
  "description": "Guide complet sur les cotisations URSSAF, seuils TVA et IR pour les micro-entrepreneurs en France 2026.",
  "dateModified": "2026-01-01",
  "publisher": { "@type": "Organization", "name": "MonBilanFacile.fr", "url": "https://monbilanfacile.fr" }
}

export default function AutoEntrepreneurArticle() {
  return (
    <BlogLayout
      title="Simulateur Auto-Entrepreneur 2026 — Cotisations, IR & TVA"
      description="Calculez vos cotisations URSSAF, vérifiez vos seuils TVA et estimez votre revenu net en tant que micro-entrepreneur en France 2026. Calcul instantané."
      canonical="/auto-entrepreneur"
      date="Janvier 2026"
      readTime="6 min"
      tag="Freelance & Micro-entreprise"
      tagColor="#7C3AED"
      tagBg="#EEF2FF"
      schema={schema}
      editorialIntro={{
        summary: "Le régime micro-entrepreneur est l'un des plus simples pour démarrer une activité indépendante en France. Mais comprendre vos charges réelles est indispensable pour fixer vos tarifs et gérer votre trésorerie. Les nouveaux seuils TVA 2026 issus de la loi de finances 2025 ont changé la donne pour de nombreux freelances.",
        points: [
          "Les cotisations URSSAF varient de 12,3% (vente) à 23,2% (libéral CIPAV) selon votre activité",
          "Les seuils TVA ont été abaissés en 2026 : 37 500 € pour les services, 85 000 € pour la vente",
          "Le versement libératoire IR est avantageux si votre TMI dépasse 12,8%",
          "L'ACRE réduit vos cotisations de 50% la première année — à demander à la création"
        ],
        source: "URSSAF, DGFiP, Loi de finances 2025 — applicable au 01/01/2026"
      }}
      ToolComponent={AutoEntrepreneurPage}
    >
      <ArticleContent />
    </BlogLayout>
  )
}
