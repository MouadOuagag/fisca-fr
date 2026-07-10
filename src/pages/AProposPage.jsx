import SEOHead from '../components/seo/SEOHead'
import { NavLink } from 'react-router-dom'

const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

export default function AProposPage() {
  return (
    <div>
      <SEOHead
        title="À propos de MonBilanFacile.fr"
        description="MonBilanFacile.fr est une plateforme française de simulateurs fiscaux gratuits. Découvrez notre mission, nos sources et notre engagement pour la transparence fiscale."
        canonical="/a-propos"
      />

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full" style={{ background: '#1E5FCC' }} />
          <span className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#1E5FCC' }}>Notre mission</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#0F172A' }}>
          À propos de MonBilanFacile.fr
        </h1>
        <p className="text-sm mt-1.5 max-w-2xl" style={{ color: '#64748B' }}>
          La référence fiscale française gratuite pour les salariés,
          indépendants et futurs propriétaires.
        </p>
      </div>

      <div className="space-y-5">

        <div className="rounded-2xl p-6" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
          <h2 className="text-lg font-bold mb-3" style={{ color: '#0F172A' }}>
            Notre mission
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
            MonBilanFacile.fr est né d'un constat simple : comprendre sa fiscalité en France
            est complexe, et les outils disponibles sont souvent incomplets, payants ou difficiles
            à utiliser. Notre mission est de démocratiser l'accès à l'information fiscale en
            proposant des simulateurs gratuits, précis et mis à jour selon la législation française
            en vigueur.
          </p>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
            Que vous soyez salarié souhaitant comprendre votre fiche de paie, auto-entrepreneur
            cherchant à calculer vos cotisations URSSAF, ou futur propriétaire estimant vos frais
            de notaire, MonBilanFacile.fr vous accompagne avec des calculs instantanés et des
            explications claires.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
            Tous nos outils sont développés en collaboration avec des sources officielles françaises :
            URSSAF, Direction Générale des Finances Publiques (DGFiP), Légifrance, et le
            Haut Conseil de Stabilité Financière (HCSF). Chaque taux et barème est vérifié
            et mis à jour à chaque changement de législation.
          </p>
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
          <h2 className="text-lg font-bold mb-3" style={{ color: '#0F172A' }}>
            Nos outils fiscaux 2026
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569' }}>
            MonBilanFacile.fr propose 5 simulateurs fiscaux entièrement gratuits,
            sans inscription et sans publicité intrusive :
          </p>
          <div className="space-y-3">
            {[
              { to: '/brut-net', title: 'Calculateur Brut → Net', desc: 'Convertissez votre salaire brut en net avec les taux URSSAF et AGIRC-ARRCO 2026. Inclut le calcul du prélèvement à la source, du coût employeur et du salaire horaire.' },
              { to: '/auto-entrepreneur', title: 'Simulateur Auto-Entrepreneur', desc: 'Calculez vos cotisations sociales URSSAF (12,3% à 23,2%), vérifiez vos seuils TVA 2026 et estimez votre revenu net selon votre activité.' },
              { to: '/frais-notaire', title: 'Simulateur Frais de Notaire', desc: 'Estimez vos frais d\'acquisition immobilière selon le barème officiel 2026 — environ 7 à 8% dans l\'ancien, 2 à 3% dans le neuf.' },
              { to: '/teletravail', title: 'Calculateur Télétravail', desc: 'Calculez vos indemnités télétravail exonérées selon le forfait URSSAF 2026 (2,70€/jour) ou la méthode des frais réels.' },
              { to: '/credit', title: 'Simulateur Crédit Immobilier', desc: 'Calculez vos mensualités, le coût total de votre crédit et vérifiez votre taux d\'endettement selon la règle HCSF des 35%.' },
            ].map(({ to, title, desc }) => (
              <div key={to} className="flex gap-3 p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                <div className="w-1 rounded-full flex-shrink-0" style={{ background: '#1E5FCC' }} />
                <div>
                  <NavLink to={to} className="text-sm font-bold" style={{ color: '#1E5FCC' }}>
                    {title}
                  </NavLink>
                  <p className="text-xs leading-relaxed mt-1" style={{ color: '#64748B' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
          <h2 className="text-lg font-bold mb-3" style={{ color: '#0F172A' }}>
            Nos sources officielles
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569' }}>
            Tous nos calculs sont basés exclusivement sur des sources officielles françaises :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: 'URSSAF', desc: 'Cotisations sociales, taux micro-entrepreneur', url: 'https://www.urssaf.fr' },
              { name: 'DGFiP — impots.gouv.fr', desc: 'Barème IR, grille PAS, décote', url: 'https://www.impots.gouv.fr' },
              { name: 'Légifrance', desc: 'Textes de loi, décrets, CGI', url: 'https://www.legifrance.gouv.fr' },
              { name: 'AGIRC-ARRCO', desc: 'Taux retraite complémentaire 2026', url: 'https://www.agirc-arrco.fr' },
              { name: 'Banque de France', desc: 'Taux immobiliers, règle HCSF', url: 'https://www.banque-france.fr' },
              { name: 'Service-public.fr', desc: 'Droits et démarches officielles', url: 'https://www.service-public.fr' },
            ].map(({ name, desc, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2.5 p-3 rounded-xl transition-all hover:opacity-80"
                style={{ background: '#F8FAFC', textDecoration: 'none' }}>
                <span style={{ color: '#1E5FCC', fontSize: '16px' }}>🔗</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{name}</p>
                  <p className="text-xs" style={{ color: '#64748B' }}>{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
          <h2 className="text-lg font-bold mb-3" style={{ color: '#0F172A' }}>
            Avertissement légal
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
            Les simulateurs proposés sur MonBilanFacile.fr sont fournis à titre purement
            indicatif et pédagogique. Ils ne constituent en aucun cas un conseil fiscal,
            juridique ou comptable personnalisé.
          </p>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
            Les résultats obtenus dépendent des paramètres saisis et peuvent différer de
            votre situation réelle selon votre convention collective, vos avantages en nature,
            votre situation familiale ou d'autres facteurs spécifiques.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
            Pour toute décision fiscale, immobilière ou financière importante, nous vous
            recommandons de consulter un professionnel qualifié : expert-comptable, notaire,
            conseiller financier ou avocat fiscaliste.
          </p>
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
          <h2 className="text-lg font-bold mb-3" style={{ color: '#0F172A' }}>
            Contact
          </h2>
          <p className="text-sm leading-relaxed mb-2" style={{ color: '#475569' }}>
            Pour toute question, suggestion ou signalement d'erreur dans nos calculs :
          </p>
          <p className="text-sm font-semibold" style={{ color: '#1E5FCC' }}>
            📧 contact@monbilanfacile.fr
          </p>
          <p className="text-sm mt-2" style={{ color: '#475569' }}>
            Éditeur : Mogo — Paris, France
          </p>
        </div>

      </div>
    </div>
  )
}
