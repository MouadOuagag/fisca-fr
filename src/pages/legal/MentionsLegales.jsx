const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

export default function MentionsLegales() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full" style={{ background: '#1E5FCC' }} />
          <span className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#1E5FCC' }}>Informations légales</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#0F172A' }}>
          Mentions Légales
        </h1>
        <p className="text-sm mt-1" style={{ color: '#64748B' }}>
          Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance en l'économie numérique.
        </p>
      </div>

      <div className="rounded-2xl p-6 lg:p-8 space-y-8"
        style={{ background: 'white', boxShadow: CARD_SHADOW }}>

        {[
          {
            title: '1. Éditeur du site',
            content: [
              'Site web : monbilanfacile.fr',
              'Statut : Personne physique',
              'Responsable de publication : Mogo',
              'Adresse : Paris, France',
              'Email : contact@monbilanfacile.fr',
            ]
          },
          {
            title: '2. Hébergement',
            content: [
              'Hébergeur : Hostinger International Ltd',
              'Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre',
              'Site web : www.hostinger.fr',
            ]
          },
          {
            title: '3. Propriété intellectuelle',
            content: [
              "L'ensemble du contenu de ce site (textes, calculs, code, design) est protégé par le droit d'auteur.",
              "Toute reproduction, même partielle, est interdite sans autorisation préalable écrite de l'éditeur.",
              "Les algorithmes de calcul fiscal sont basés sur des textes officiels publics (URSSAF, DGFiP, Légifrance).",
            ]
          },
          {
            title: '4. Limitation de responsabilité',
            content: [
              "Les simulateurs proposés sur MonBilanFacile.fr sont fournis à titre purement indicatif et pédagogique.",
              "Les résultats ne constituent en aucun cas un conseil fiscal, juridique ou comptable.",
              "L'éditeur ne saurait être tenu responsable de décisions prises sur la base des calculs fournis.",
              "Pour toute décision fiscale importante, consultez un expert-comptable ou un conseiller fiscal agréé.",
            ]
          },
          {
            title: '5. Données personnelles',
            content: [
              "MonBilanFacile.fr ne collecte aucune donnée personnelle identifiable.",
              "Aucun compte utilisateur n'est requis. Aucune donnée saisie dans les calculateurs n'est transmise à nos serveurs.",
              "Des cookies analytiques anonymes peuvent être utilisés (Google Analytics). Voir notre Politique de Confidentialité.",
            ]
          },
          {
            title: '6. Droit applicable',
            content: [
              "Les présentes mentions légales sont soumises au droit français.",
              "En cas de litige, les tribunaux compétents de Paris seront seuls compétents.",
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
