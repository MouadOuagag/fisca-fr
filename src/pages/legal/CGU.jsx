const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

export default function CGU() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full" style={{ background: '#7C3AED' }} />
          <span className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#7C3AED' }}>Conditions d'utilisation</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#0F172A' }}>
          Conditions Générales d'Utilisation (CGU)
        </h1>
        <p className="text-sm mt-1" style={{ color: '#64748B' }}>
          En utilisant Fisca.fr, vous acceptez les présentes conditions.
        </p>
      </div>

      <div className="rounded-2xl p-6 lg:p-8 space-y-8"
        style={{ background: 'white', boxShadow: CARD_SHADOW }}>

        {[
          {
            title: '1. Objet',
            content: [
              "Les présentes CGU régissent l'utilisation du site fisca.fr et de ses outils de simulation fiscale.",
              "Fisca.fr est un service d'information fiscale gratuit destiné aux résidents français.",
            ]
          },
          {
            title: '2. Accès au service',
            content: [
              "L'accès à Fisca.fr est gratuit et ne nécessite aucune inscription.",
              "L'éditeur se réserve le droit de modifier, suspendre ou interrompre le service à tout moment.",
              "Une connexion internet est requise. L'éditeur n'est pas responsable des problèmes de connectivité.",
            ]
          },
          {
            title: '3. Nature du service — Avertissement important',
            content: [
              "⚠ Les simulateurs de Fisca.fr sont des outils pédagogiques et indicatifs uniquement.",
              "Ils ne constituent pas un conseil fiscal, juridique, comptable ou financier.",
              "Les résultats sont des estimations basées sur des paramètres généraux et peuvent différer de votre situation réelle.",
              "Pour toute décision fiscale, immobilière ou financière importante, consultez un professionnel qualifié (expert-comptable, notaire, conseiller financier).",
            ]
          },
          {
            title: '4. Exactitude des données',
            content: [
              "L'éditeur s'efforce de maintenir les taux et barèmes à jour selon la législation française en vigueur.",
              "Cependant, les lois fiscales évoluent fréquemment. L'éditeur ne garantit pas l'exactitude absolue et permanente des données.",
              "Les taux affichés correspondent à la législation connue au 01/01/2026.",
            ]
          },
          {
            title: '5. Publicité',
            content: [
              "Fisca.fr affiche des publicités via Google AdSense pour financer le service gratuit.",
              "L'éditeur n'est pas responsable du contenu des publicités affichées.",
              "Les publicités sont clairement identifiées comme telles.",
            ]
          },
          {
            title: '6. Liens hypertextes',
            content: [
              "Fisca.fr peut contenir des liens vers des sites tiers (URSSAF, impots.gouv.fr, legifrance.gouv.fr).",
              "L'éditeur n'est pas responsable du contenu de ces sites externes.",
            ]
          },
          {
            title: '7. Modification des CGU',
            content: [
              "L'éditeur peut modifier les présentes CGU à tout moment.",
              "Les modifications prennent effet dès leur publication sur le site.",
              "L'utilisation continue du site après modification vaut acceptation des nouvelles CGU.",
            ]
          },
          {
            title: '8. Droit applicable & juridiction',
            content: [
              "Les présentes CGU sont soumises au droit français.",
              "Tout litige sera soumis aux tribunaux compétents de Paris.",
            ]
          },
        ].map(({ title, content }) => (
          <div key={title}>
            <h2 className="text-base font-bold mb-3" style={{ color: '#0F172A' }}>{title}</h2>
            <div className="space-y-2">
              {content.map((line, i) => (
                <p key={i} className="text-sm leading-relaxed"
                  style={{ color: line.startsWith('⚠') ? '#DC2626' : '#475569' }}>{line}</p>
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
