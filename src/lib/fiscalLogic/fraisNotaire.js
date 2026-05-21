// ── Simulateur Frais de Notaire 2026 ──
// Sources : Décret du 26/02/2016, Légifrance, Ministère de la Justice

export const NOTAIRE_CONSTANTS = {

  // Émoluments proportionnels du notaire (barème 2026)
  // Décret n°2016-230 du 26 février 2016 — révisé 2026
  EMOLUMENTS: [
    { max: 6500,     taux: 0.03945 }, // 3,945%
    { max: 17000,    taux: 0.01627 }, // 1,627%
    { max: 60000,    taux: 0.01085 }, // 1,085%
    { max: Infinity, taux: 0.00814 }, // 0,814%
  ],

  // Droits de mutation (droits d'enregistrement) 2026
  DROITS_MUTATION: {
    ancien:   0.0580, // 5,80% (dont 4,50% dépt + 1,20% commune + 0,10% frais assiette)
    neuf:     0.0,    // Exonéré de droits de mutation (TVA 20% sur le prix)
    neuf_tva: 0.20,   // TVA 20% incluse dans le prix neuf (déjà payée)
  },

  // Taxe de publicité foncière (neuf)
  TPF_NEUF: 0.00715, // 0,715%

  // Contribution de sécurité immobilière
  CSI: 0.001, // 0,10% du prix

  // Émoluments de formalités (forfait approximatif)
  FORMALITES: {
    neuf:   1200,
    ancien: 1500,
  },

  // Débours (frais divers avancés par le notaire)
  DEBOURS: {
    neuf:   600,
    ancien: 800,
  },

  // TVA sur émoluments du notaire
  TVA_EMOLUMENTS: 0.20,

  // Frais de garantie (hypothèque conventionnelle)
  HYPOTHEQUE: 0.01435, // ~1,435% du montant financé (si crédit)

  // Caution bancaire alternative (si pas hypothèque)
  CAUTION: 0.008, // ~0,8%
}

function calculerEmoluments(prix) {
  const { EMOLUMENTS } = NOTAIRE_CONSTANTS
  let emoluments = 0
  let precedent = 0
  for (const tranche of EMOLUMENTS) {
    const base = Math.min(prix, tranche.max) - precedent
    if (base <= 0) break
    emoluments += base * tranche.taux
    precedent = tranche.max
  }
  return emoluments
}

export function calculerFraisNotaire(prix, typeBien, avecCredit = false, montantCredit = 0) {
  if (!prix || prix <= 0) return null

  const isNeuf = typeBien === 'neuf'
  const { TPF_NEUF, CSI, FORMALITES, DEBOURS, TVA_EMOLUMENTS, DROITS_MUTATION } = NOTAIRE_CONSTANTS

  // 1. Émoluments du notaire (identiques neuf/ancien)
  const emolumentsHT  = calculerEmoluments(prix)
  const emolumentsTVA = emolumentsHT * TVA_EMOLUMENTS
  const emolumentsTTC = emolumentsHT + emolumentsTVA

  // 2. Droits de mutation / taxe de publicité foncière
  const droitsMutation = isNeuf
    ? prix * TPF_NEUF
    : prix * DROITS_MUTATION.ancien

  // 3. Contribution de sécurité immobilière
  const csi = prix * CSI

  // 4. Formalités + débours
  const formalites = FORMALITES[typeBien]
  const debours    = DEBOURS[typeBien]

  // 5. Frais de garantie si crédit
  const fraisGarantie = avecCredit && montantCredit > 0
    ? montantCredit * NOTAIRE_CONSTANTS.HYPOTHEQUE
    : 0

  // Total
  const totalFrais  = emolumentsTTC + droitsMutation + csi + formalites + debours + fraisGarantie
  const tauxFrais   = totalFrais / prix
  const budgetTotal = prix + totalFrais

  // Décomposition pour graphique
  const decomposition = [
    { label: isNeuf ? 'Taxe publicité foncière' : 'Droits de mutation', value: Math.round(droitsMutation), color: '#DC2626' },
    { label: 'Émoluments notaire TTC',  value: Math.round(emolumentsTTC),        color: '#1E5FCC' },
    { label: 'Formalités & débours',    value: Math.round(formalites + debours),  color: '#F59E0B' },
    { label: 'Contribution sécurité',   value: Math.round(csi),                   color: '#7C3AED' },
    ...(fraisGarantie > 0
      ? [{ label: 'Frais de garantie', value: Math.round(fraisGarantie), color: '#059669' }]
      : []),
  ]

  return {
    prix, typeBien, isNeuf,
    emolumentsHT, emolumentsTVA, emolumentsTTC,
    droitsMutation, csi, formalites, debours, fraisGarantie,
    totalFrais, tauxFrais, budgetTotal,
    decomposition,
    avecCredit, montantCredit,
  }
}
