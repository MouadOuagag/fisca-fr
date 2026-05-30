import BlogLayout from '../../components/blog/BlogLayout'
import TeletravailPage from '../TeletravailPage'
import ArticleContent from '../../content/articles/teletravail-2026.mdx'

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Indemnités télétravail 2026 — forfait URSSAF et frais réels",
  "description": "Calcul des indemnités télétravail exonérées 2026 : forfait 2,70€/jour, frais réels internet, électricité et mobilier.",
  "dateModified": "2026-01-01",
  "publisher": { "@type": "Organization", "name": "MonBilanFacile.fr", "url": "https://monbilanfacile.fr" }
}

export default function TeletravailArticle() {
  return (
    <BlogLayout
      title="Calculateur Indemnités Télétravail 2026 — Forfait & Frais Réels"
      description="Calculez vos indemnités télétravail exonérées de charges. Forfait URSSAF 2,70€/jour ou frais réels justifiés. Guide complet ANI 2020 mis à jour 2026."
      canonical="/teletravail"
      date="Janvier 2026"
      readTime="5 min"
      tag="Salarié & Télétravail"
      tagColor="#0891B2"
      tagBg="#ECFEFF"
      schema={schema}
      editorialIntro={{
        summary: "Depuis l'Accord National Interprofessionnel de novembre 2020, le cadre légal du télétravail en France est clairement défini. Les indemnités versées par l'employeur pour couvrir les frais du salarié à domicile sont exonérées de cotisations sociales ET d'impôt sur le revenu — à condition de respecter les plafonds URSSAF 2026.",
        points: [
          "Le forfait URSSAF 2026 est de 2,70€ par jour télétravaillé — sans justificatif requis",
          "Plafond mensuel : 59,40 € (22 jours × 2,70 €) — plafond annuel : 654,60 €",
          "La méthode des frais réels couvre : internet (50%), électricité, téléphone (40%), mobilier",
          "L'indemnité télétravail exonérée ne peut pas être cumulée avec la déduction IR pour frais réels"
        ],
        source: "URSSAF, ANI du 13/11/2020, BOFiP BOI-RSA-CHAMP-20-50-10 — 2026"
      }}
      ToolComponent={TeletravailPage}
    >
      <ArticleContent />
    </BlogLayout>
  )
}
