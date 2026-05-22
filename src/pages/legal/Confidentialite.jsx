const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

export default function Confidentialite() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full" style={{ background: '#059669' }} />
          <span className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#059669' }}>RGPD & Vie privée</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#0F172A' }}>
          Politique de Confidentialité
        </h1>
        <p className="text-sm mt-1" style={{ color: '#64748B' }}>
          Conformément au Règlement Général sur la Protection des Données (RGPD) — UE 2016/679.
        </p>
      </div>

      <div className="rounded-2xl p-6 lg:p-8 space-y-8"
        style={{ background: 'white', boxShadow: CARD_SHADOW }}>

        {[
          {
            title: '1. Responsable du traitement',
            content: [
              'MonBilanFacile.fr — Mogo',
              'Localisation : Paris, France',
              'Contact DPO : contact@monbilanfacile.fr',
            ]
          },
          {
            title: '2. Données collectées',
            content: [
              "MonBilanFacile.fr adopte une approche Privacy by Design.",
              "Données saisies dans les calculateurs : traitées uniquement côté client (votre navigateur), jamais transmises à nos serveurs.",
              "Données de navigation anonymes : collectées via Google Analytics 4 (GA4) — adresse IP anonymisée, pages visitées, durée de session.",
              "Cookies publicitaires : Google AdSense peut déposer des cookies pour la personnalisation des annonces.",
            ]
          },
          {
            title: '3. Base légale du traitement',
            content: [
              "Analytics : intérêt légitime (amélioration du service) — Art. 6.1.f RGPD.",
              "Publicité personnalisée AdSense : consentement de l'utilisateur — Art. 6.1.a RGPD.",
            ]
          },
          {
            title: '4. Vos droits RGPD',
            content: [
              "Droit d'accès : vous pouvez demander quelles données nous détenons sur vous.",
              "Droit de rectification : correction de données inexactes.",
              "Droit à l'effacement (droit à l'oubli) : suppression de vos données.",
              "Droit d'opposition : vous pouvez vous opposer au traitement à des fins de marketing.",
              "Pour exercer ces droits : contact@monbilanfacile.fr — Réponse sous 30 jours.",
            ]
          },
          {
            title: '5. Cookies',
            content: [
              "Cookies strictement nécessaires : fonctionnement du site — pas de consentement requis.",
              "Cookies analytiques (GA4) : mesure d'audience anonymisée.",
              "Cookies publicitaires (AdSense) : personnalisation des annonces Google.",
              "Vous pouvez gérer vos préférences cookies via les paramètres de votre navigateur ou notre bannière de consentement.",
            ]
          },
          {
            title: '6. Transferts hors UE',
            content: [
              "Google Analytics et Google AdSense impliquent des transferts de données vers les États-Unis.",
              "Ces transferts sont encadrés par les Clauses Contractuelles Types (CCT) approuvées par la Commission européenne.",
            ]
          },
          {
            title: '7. Durée de conservation',
            content: [
              "Données Analytics : 14 mois (paramètre GA4 par défaut).",
              "Cookies AdSense : jusqu'à 13 mois.",
            ]
          },
          {
            title: '8. Contact & réclamation',
            content: [
              "Email : contact@monbilanfacile.fr",
              "Autorité de contrôle française : CNIL — www.cnil.fr — 3 Place de Fontenoy, 75007 Paris.",
            ]
          },
        ].map(({ title, content }) => (
          <div key={title}>
            <h2 className="text-base font-bold mb-3" style={{ color: '#0F172A' }}>{title}</h2>
            <div className="space-y-2">
              {content.map((line, i) => (
                <p key={i} className="text-sm leading-relaxed"
                  style={{ color: '#475569' }}>{line}</p>
              ))}
            </div>
          </div>
        ))}

        <p className="text-xs pt-4 border-t" style={{ color: '#94A3B8', borderColor: '#F1F5F9' }}>
          Dernière mise à jour : janvier 2026
        </p>
      </div>
    </div>
  )
}
