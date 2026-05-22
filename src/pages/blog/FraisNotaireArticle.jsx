import BlogLayout from '../../components/blog/BlogLayout'
import FraisNotairePage from '../FraisNotairePage'
import ArticleContent from '../../content/articles/frais-notaire-2026.mdx'

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Frais de notaire 2026 — Barème complet et calcul",
  "description": "Calculez vos frais de notaire 2026 pour un achat immobilier neuf ou ancien. Droits de mutation, émoluments, débours — barème officiel et simulateur gratuit.",
  "dateModified": "2026-01-01",
  "publisher": {
    "@type": "Organization",
    "name": "MonBilanFacile.fr",
    "url": "https://monbilanfacile.fr"
  },
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Peut-on intégrer les frais de notaire dans le crédit immobilier ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, certaines banques acceptent de financer les frais de notaire dans le prêt immobilier (financement à 110 %), sous réserve de rester sous les 35 % de taux d'endettement fixés par le HCSF."
          }
        },
        {
          "@type": "Question",
          "name": "Les frais de notaire sont-ils déductibles des impôts ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pour une résidence principale, non. Pour un investissement locatif, ils peuvent être déduits des revenus fonciers (régime réel) ou amortis en LMNP."
          }
        },
        {
          "@type": "Question",
          "name": "Combien coûtent les frais de notaire pour un achat à 200 000 € dans l'ancien ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Environ 15 800 € soit ~7,9 % du prix : droits de mutation ~11 600 €, émoluments notaire TTC ~1 900 €, débours et formalités ~2 300 €."
          }
        },
        {
          "@type": "Question",
          "name": "Qui paie les frais de notaire, l'acheteur ou le vendeur ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les frais de notaire sont à la charge de l'acheteur dans la grande majorité des transactions en France."
          }
        }
      ]
    }
  ]
}

export default function FraisNotaireArticle() {
  return (
    <BlogLayout
      title="Frais de Notaire 2026 — Barème Complet et Simulateur"
      description="Calculez vos frais de notaire 2026 pour un achat immobilier neuf ou ancien. Droits de mutation, émoluments, débours — barème officiel et simulateur gratuit."
      canonical="/frais-notaire"
      date="Janvier 2026"
      readTime="6 min"
      tag="Immobilier"
      schema={schema}
      ToolComponent={FraisNotairePage}
    >
      <ArticleContent />
    </BlogLayout>
  )
}
