import BlogLayout from '../../components/blog/BlogLayout'
import FraisNotairePage from '../FraisNotairePage'
import ArticleContent from '../../content/articles/frais-notaire-2026.mdx'

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Frais de notaire 2026 — Neuf & Ancien, barème complet",
  "description": "Guide complet sur les frais d'acquisition immobilière 2026 : droits de mutation, émoluments notaire, garanties.",
  "dateModified": "2026-01-01",
  "publisher": { "@type": "Organization", "name": "MonBilanFacile.fr", "url": "https://monbilanfacile.fr" }
}

export default function FraisNotaireArticle() {
  return (
    <BlogLayout
      title="Calculateur Frais de Notaire 2026 — Neuf & Ancien"
      description="Estimez précisément vos frais d'acquisition immobilière selon le barème officiel 2026. Calcul instantané pour biens neufs (2-3%) et anciens (7-8%)."
      canonical="/frais-notaire"
      date="Janvier 2026"
      readTime="5 min"
      tag="Immobilier & Notaire"
      tagColor="#059669"
      tagBg="#ECFDF5"
      schema={schema}
      editorialIntro={{
        summary: "Les frais de notaire constituent un poste de coût souvent sous-estimé lors d'un achat immobilier. Contrairement aux idées reçues, ces frais sont en grande partie des taxes collectées par le notaire pour le compte de l'État — et non sa rémunération personnelle. La distinction neuf/ancien est fondamentale car elle peut représenter une différence de 5 points de pourcentage sur le prix d'achat.",
        points: [
          "Dans l'ancien : comptez 7 à 8% du prix — dont 5,80% de droits de mutation fiscaux",
          "Dans le neuf : seulement 2 à 3% — la TVA 20% est déjà incluse dans le prix promoteur",
          "Les émoluments du notaire suivent un barème dégressif réglementé — négociables à 20% au-delà de 150 000 €",
          "Les frais de garantie (hypothèque ~1,4% ou caution ~0,8%) s'ajoutent si financement par crédit"
        ],
        source: "Décret n°2016-230 du 26 février 2016 — Ministère de la Justice 2026"
      }}
      ToolComponent={FraisNotairePage}
    >
      <ArticleContent />
    </BlogLayout>
  )
}
