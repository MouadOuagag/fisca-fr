import BlogLayout from '../../components/blog/BlogLayout'
import CreditPage from '../CreditPage'
import ArticleContent from '../../content/articles/credit-immobilier-2026.mdx'

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Simulateur crédit immobilier 2026 — mensualités et coût total",
  "description": "Calcul des mensualités, coût total et taux d'endettement HCSF selon les taux du marché français 2026.",
  "dateModified": "2026-01-01",
  "publisher": { "@type": "Organization", "name": "MonBilanFacile.fr", "url": "https://monbilanfacile.fr" }
}

export default function CreditArticle() {
  return (
    <BlogLayout
      title="Simulateur Crédit Immobilier 2026 — Mensualités & Coût Total"
      description="Calculez vos mensualités, coût total et taux d'endettement HCSF. Taux immobiliers marché français 2026 intégrés. Tableau d'amortissement inclus."
      canonical="/credit"
      date="Janvier 2026"
      readTime="6 min"
      tag="Immobilier & Crédit"
      tagColor="#DC2626"
      tagBg="#FFF1F2"
      schema={schema}
      editorialIntro={{
        summary: "Le crédit immobilier reste le principal levier d'accès à la propriété en France. Après deux années de hausse marquée (2022-2024), les taux se stabilisent en 2026 autour de 3,65% sur 20 ans. La règle HCSF des 35% d'endettement maximum est désormais une contrainte réglementaire ferme que tout emprunteur doit anticiper avant de soumettre son dossier.",
        points: [
          "Taux moyen 2026 : 3,20% sur 10 ans, 3,45% sur 15 ans, 3,65% sur 20 ans, 3,80% sur 25 ans",
          "La règle HCSF impose un taux d'endettement maximum de 35% assurance comprise",
          "L'assurance emprunteur représente 25 à 40% du coût total du crédit — renégociable (loi Lemoine)",
          "Pour 200 000 € sur 20 ans à 3,65% : mensualité ~1 174 €, coût intérêts ~82 000 €"
        ],
        source: "Banque de France, Observatoire Crédit Logement/CSA, HCSF — janvier 2026"
      }}
      ToolComponent={CreditPage}
    >
      <ArticleContent />
    </BlogLayout>
  )
}
