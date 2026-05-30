import BlogLayout from '../../components/blog/BlogLayout'
import BrutNetPage from '../BrutNetPage'
import ArticleContent from '../../content/articles/calculateur-brut-net-2026.mdx'

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Calculateur salaire brut net 2026 — France",
  "description": "Guide complet pour calculer votre salaire net en France en 2026.",
  "dateModified": "2026-01-01",
  "publisher": { "@type": "Organization", "name": "MonBilanFacile.fr", "url": "https://monbilanfacile.fr" }
}

export default function BrutNetArticle() {
  return (
    <BlogLayout
      title="Calculateur Salaire Brut Net 2026 — France"
      description="Convertissez votre salaire brut en net instantanément. Cotisations URSSAF & AGIRC-ARRCO 2026, prélèvement à la source, coût employeur. Résultat en temps réel."
      canonical="/brut-net"
      date="Janvier 2026"
      readTime="5 min"
      tag="Salaire & Fiscalité"
      tagColor="#1E5FCC"
      tagBg="#EFF6FF"
      schema={schema}
      editorialIntro={{
        summary: "En France, le salaire brut et le salaire net sont deux notions fondamentalement différentes. Comprendre cette distinction est essentiel pour négocier sa rémunération, établir son budget ou comparer des offres d'emploi. Notre calculateur applique les taux officiels URSSAF et AGIRC-ARRCO 2026 pour vous donner une estimation précise en temps réel.",
        points: [
          "Le salaire net représente environ 77 à 79% du salaire brut pour un salarié du secteur privé",
          "Le prélèvement à la source (PAS) est prélevé directement sur votre salaire depuis janvier 2019",
          "Le Plafond Annuel de la Sécurité Sociale (PASS) 2026 est fixé à 47 100 € — seuil clé pour les cotisations",
          "Le coût total employeur représente environ 142 à 147% du salaire brut"
        ],
        source: "URSSAF, AGIRC-ARRCO, DGFiP — Taux en vigueur au 01/01/2026"
      }}
      ToolComponent={BrutNetPage}
    >
      <ArticleContent />
    </BlogLayout>
  )
}
