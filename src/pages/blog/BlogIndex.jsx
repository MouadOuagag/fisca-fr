import { useNavigate } from 'react-router-dom'
import SEOHead from '../../components/seo/SEOHead'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

const articles = [
  {
    to: '/brut-net',
    title: 'Calculateur Salaire Brut Net 2026 — France',
    description: 'Comprendre le passage du brut au net : cotisations URSSAF, AGIRC-ARRCO, prélèvement à la source et coût employeur. Guide complet 2026.',
    date: 'Janvier 2026',
    readTime: '5 min',
    tag: 'Salaire & Fiscalité',
    color: '#1E5FCC',
    bg: '#EFF6FF',
  },
  {
    to: '/auto-entrepreneur',
    title: 'Simulateur Auto-Entrepreneur 2026 — Cotisations, IR & TVA',
    description: "Tout comprendre sur les cotisations URSSAF (12,3% à 23,2%), les nouveaux seuils TVA 2026 et le versement libératoire pour micro-entrepreneurs.",
    date: 'Janvier 2026',
    readTime: '6 min',
    tag: 'Freelance & Micro-entreprise',
    color: '#7C3AED',
    bg: '#EEF2FF',
  },
  {
    to: '/frais-notaire',
    title: 'Frais de Notaire 2026 — Neuf & Ancien, Barème Complet',
    description: "Comprendre la composition des frais d'acquisition immobilière : droits de mutation (5,80% ancien), émoluments notaire, débours et garanties.",
    date: 'Janvier 2026',
    readTime: '5 min',
    tag: 'Immobilier & Notaire',
    color: '#059669',
    bg: '#ECFDF5',
  },
  {
    to: '/teletravail',
    title: 'Indemnités Télétravail 2026 — Forfait URSSAF & Frais Réels',
    description: 'Forfait journalier URSSAF à 2,70 €/jour, remboursement internet, électricité et mobilier. Tout sur les indemnités exonérées de charges.',
    date: 'Janvier 2026',
    readTime: '5 min',
    tag: 'Salarié & Télétravail',
    color: '#0891B2',
    bg: '#ECFEFF',
  },
  {
    to: '/credit',
    title: 'Simulateur Crédit Immobilier 2026 — Mensualités & Coût Total',
    description: "Taux immobiliers 2026, règle HCSF des 35%, tableau d'amortissement et stratégies pour réduire le coût total de votre emprunt.",
    date: 'Janvier 2026',
    readTime: '6 min',
    tag: 'Immobilier & Crédit',
    color: '#DC2626',
    bg: '#FFF1F2',
  },
  {
    to: '/articles/impot-revenu-2026',
    title: 'Impôt sur le revenu 2026 — Barème, tranches et calcul complet',
    description: "Barème progressif IR 2026, quotient familial, décote et réductions d'impôt. Guide complet avec exemples chiffrés.",
    date: 'Janvier 2026',
    readTime: '7 min',
    tag: 'Fiscalité & IR',
    color: '#1E5FCC',
    bg: '#EFF6FF',
  },
  {
    to: '/articles/dividendes-flat-tax-2026',
    title: 'Dividendes & Flat Tax 2026 — PFU 30% et optimisation fiscale',
    description: 'Tout comprendre sur la Flat Tax (PFU 30%) : calcul, option barème progressif, abattement 40% et optimisation pour gérants de société.',
    date: 'Janvier 2026',
    readTime: '6 min',
    tag: 'Dividendes & Capital',
    color: '#059669',
    bg: '#ECFDF5',
  },
  {
    to: '/articles/plus-values-immobilieres-2026',
    title: 'Plus-values immobilières 2026 — Calcul, abattements et exonérations',
    description: "Taux d'imposition 36,2%, abattements pour durée de détention, exonération résidence principale. Guide complet 2026.",
    date: 'Janvier 2026',
    readTime: '6 min',
    tag: 'Immobilier & Fiscalité',
    color: '#7C3AED',
    bg: '#EEF2FF',
  },
  {
    to: '/articles/cotisations-tns-2026',
    title: 'Cotisations TNS 2026 — Artisans, commerçants et professions libérales',
    description: 'Taux de cotisations sociales des travailleurs non-salariés 2026 : SSI, CIPAV, calcul sur revenu N-2 et optimisation.',
    date: 'Janvier 2026',
    readTime: '6 min',
    tag: 'TNS & Indépendants',
    color: '#DC2626',
    bg: '#FFF1F2',
  },
  {
    to: '/articles/prime-partage-valeur-2026',
    title: 'Prime de Partage de la Valeur (PPV) 2026 — Montant et fiscalité',
    description: "Plafonds d'exonération 3 000 € ou 6 000 €, conditions de versement, fiscalité et mise en place de la PPV 2026.",
    date: 'Janvier 2026',
    readTime: '5 min',
    tag: 'Primes & Avantages',
    color: '#0891B2',
    bg: '#ECFEFF',
  },
  {
    to: '/articles/indemnites-licenciement-2026',
    title: 'Indemnités de licenciement 2026 — Calcul et droits du salarié',
    description: "Calcul des indemnités légales (1/4 par année jusqu'à 10 ans), fiscalité, rupture conventionnelle et délais de contestation.",
    date: 'Janvier 2026',
    readTime: '7 min',
    tag: 'Emploi & Droits',
    color: '#F59E0B',
    bg: '#FFFBEB',
  },
]

export default function BlogIndex() {
  const navigate = useNavigate()

  return (
    <div>
      <SEOHead
        title="Blog Fiscal — Guides & Explications 2026"
        description="Guides fiscaux gratuits pour la France : salaire brut net, auto-entrepreneur, frais de notaire, télétravail et crédit immobilier. Explications claires et à jour."
        canonical="/blog"
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog MonBilanFacile.fr",
          "description": "Guides fiscaux français 2026",
          "url": "https://monbilanfacile.fr/blog",
          "publisher": {
            "@type": "Organization",
            "name": "MonBilanFacile.fr",
            "url": "https://monbilanfacile.fr"
          }
        }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-6 rounded-full" style={{ background: '#1E5FCC' }} />
          <span className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#1E5FCC' }}>Guides & Explications</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ color: '#0F172A' }}>
          Blog Fiscal 2026
        </h1>
        <p className="text-sm mt-2 max-w-2xl leading-relaxed"
          style={{ color: '#64748B' }}>
          Guides complets pour comprendre la fiscalité française en 2026.
          Chaque article est associé à un simulateur interactif pour calculer
          votre situation en temps réel.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-6 mb-8 px-5 py-3 rounded-2xl"
        style={{ background: 'white', boxShadow: CARD_SHADOW }}>
        {[
          { value: '11', label: 'Articles' },
          { value: '5', label: 'Simulateurs' },
          { value: '2026', label: 'Mis à jour' },
          { value: '100%', label: 'Gratuit' },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-lg font-bold" style={{ color: '#0F172A' }}>{value}</p>
            <p className="text-xs" style={{ color: '#94A3B8' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Articles list */}
      <div className="space-y-4">
        {articles.map(({ to, title, description, date, readTime, tag, color, bg }) => (
          <article key={to}
            onClick={() => navigate(to)}
            className="rounded-2xl p-5 sm:p-6 cursor-pointer transition-all hover:scale-[1.005]"
            style={{ background: 'white', boxShadow: CARD_SHADOW }}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">

              {/* Tag color bar */}
              <div className="hidden sm:block w-1 self-stretch rounded-full flex-shrink-0"
                style={{ background: color }} />

              <div className="flex-1">
                {/* Meta */}
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: bg, color }}>
                    {tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs"
                    style={{ color: '#94A3B8' }}>
                    <Calendar size={11} /> {date}
                  </span>
                  <span className="flex items-center gap-1 text-xs"
                    style={{ color: '#94A3B8' }}>
                    <Clock size={11} /> {readTime} de lecture
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-bold mb-2 leading-snug"
                  style={{ color: '#0F172A' }}>
                  {title}
                </h2>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-4"
                  style={{ color: '#64748B' }}>
                  {description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color }}>
                  Lire l'article + accéder au simulateur
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-8 rounded-2xl p-5 text-center"
        style={{ background: 'white', boxShadow: CARD_SHADOW }}>
        <p className="text-sm font-semibold mb-1" style={{ color: '#0F172A' }}>
          Nouveaux guides en préparation
        </p>
        <p className="text-xs" style={{ color: '#94A3B8' }}>
          Intéressement & participation · ISF/IFI · Assurance-vie ·
          Épargne salariale · Fiscalité des expatriés
        </p>
      </div>
    </div>
  )
}
