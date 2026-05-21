// ── Simulateur Auto-Entrepreneur / Micro-Entrepreneur 2026 ──
// Sources : URSSAF, INSEE, DGFiP, Légifrance

export const AE_CONSTANTS = {
  // Taux de cotisations sociales 2026
  COTISATIONS: {
    vente:          0.123,   // Vente de marchandises, fournitures, denrées
    services_bic:   0.212,   // Prestations de services BIC (artisans, commerçants)
    services_bnc:   0.231,   // Prestations de services BNC (professions libérales URSSAF)
    liberal_cipav:  0.232,   // Professions libérales CIPAV
  },

  // Seuils de chiffre d'affaires 2026
  SEUILS_CA: {
    vente:    188700,   // Seuil micro-BIC vente
    services: 77700,    // Seuil micro-BIC/BNC services
  },

  // Seuils franchise TVA 2026 (loi de finances 2025)
  SEUILS_TVA: {
    vente_seuil:        85000,
    vente_majore:       93500,
    services_seuil:     37500,
    services_majore:    41250,
  },

  // Abattements forfaitaires IR (micro-fiscal)
  ABATTEMENTS: {
    vente:         0.71,   // 71% — achat-revente
    services_bic:  0.50,   // 50% — services BIC
    services_bnc:  0.34,   // 34% — services BNC / libéral
    liberal_cipav: 0.34,
  },

  // Versement libératoire IR 2026 (sur CA brut)
  VERSEMENT_LIBERATOIRE: {
    vente:         0.01,   // 1%
    services_bic:  0.017,  // 1,7%
    services_bnc:  0.022,  // 2,2%
    liberal_cipav: 0.022,
  },

  // Tranches IR 2026
  TRANCHES_IR: [
    { max: 11497,    taux: 0 },
    { max: 29315,    taux: 0.11 },
    { max: 83823,    taux: 0.30 },
    { max: 180294,   taux: 0.41 },
    { max: Infinity, taux: 0.45 },
  ],

  ACCRE_TAUX_REDUIT: 0.5, // 50% de réduction la 1ère année (ACRE)
}

export const ACTIVITES = [
  { id: 'vente',         label: 'Vente de marchandises',         categorie: 'micro-BIC' },
  { id: 'services_bic',  label: 'Prestations de services (BIC)', categorie: 'micro-BIC' },
  { id: 'services_bnc',  label: 'Prestations de services (BNC)', categorie: 'micro-BNC' },
  { id: 'liberal_cipav', label: 'Profession libérale (CIPAV)',   categorie: 'micro-BNC' },
]

function calculerIR(revenuImposable) {
  if (revenuImposable <= 0) return 0
  let impot = 0
  let precedent = 0
  for (const tranche of AE_CONSTANTS.TRANCHES_IR) {
    const base = Math.min(revenuImposable, tranche.max) - precedent
    if (base <= 0) break
    impot += base * tranche.taux
    precedent = tranche.max
  }
  return impot
}

export function calculerAE(caAnnuel, activiteId, optionVL = false, acre = false) {
  if (!caAnnuel || caAnnuel <= 0) return null
  const { COTISATIONS, ABATTEMENTS, VERSEMENT_LIBERATOIRE, SEUILS_CA, SEUILS_TVA } = AE_CONSTANTS

  const tauxCot    = COTISATIONS[activiteId]          || 0
  const abattement = ABATTEMENTS[activiteId]          || 0
  const tauxVL     = VERSEMENT_LIBERATOIRE[activiteId] || 0
  const activite   = ACTIVITES.find(a => a.id === activiteId)
  const isVente    = activiteId === 'vente'

  // Cotisations sociales
  const tauxCotEffectif    = acre ? tauxCot * AE_CONSTANTS.ACCRE_TAUX_REDUIT : tauxCot
  const cotisationsSociales = caAnnuel * tauxCotEffectif

  // Revenu imposable (après abattement forfaitaire)
  const revenuImposable = Math.max(0, caAnnuel * (1 - abattement))

  // Impôt sur le revenu
  const impotVL     = optionVL ? caAnnuel * tauxVL : 0
  const impotRevenu = optionVL ? impotVL : calculerIR(revenuImposable)

  const totalImpotCharges = cotisationsSociales + impotRevenu
  const revenuNet         = caAnnuel - totalImpotCharges

  // TVA
  const seuilTVA    = isVente ? SEUILS_TVA.vente_seuil    : SEUILS_TVA.services_seuil
  const seuilMajore = isVente ? SEUILS_TVA.vente_majore   : SEUILS_TVA.services_majore
  const seuilCA     = isVente ? SEUILS_CA.vente            : SEUILS_CA.services

  const franciseTVA    = caAnnuel <= seuilTVA
  const zoneMajoree    = caAnnuel > seuilTVA && caAnnuel <= seuilMajore
  const depasseSeuilCA = caAnnuel > seuilCA

  // Mensuel
  const caeMensuel       = caAnnuel / 12
  const cotMensuelles    = cotisationsSociales / 12
  const revenuNetMensuel = revenuNet / 12

  // Courbe CA → Net (simulation)
  const courbe = []
  const steps = isVente
    ? [20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 188700]
    : [10000, 20000, 30000, 40000, 50000, 60000, 70000, 77700]
  for (const ca of steps) {
    const cot = ca * tauxCotEffectif
    const imp = optionVL ? ca * tauxVL : calculerIR(Math.max(0, ca * (1 - abattement)))
    courbe.push({ ca, net: Math.round(ca - cot - imp), cotisations: Math.round(cot) })
  }

  return {
    caAnnuel, activiteId, activite,
    tauxCotisations: tauxCotEffectif,
    cotisationsSociales,
    abattement,
    revenuImposable,
    impotRevenu,
    optionVL,
    tauxVL,
    revenuNet,
    revenuNetMensuel,
    caeMensuel,
    cotMensuelles,
    totalImpotCharges,
    tauxEffectifGlobal: totalImpotCharges / caAnnuel,
    franciseTVA, zoneMajoree, depasseSeuilCA,
    seuilTVA, seuilMajore, seuilCA,
    courbe, acre,
  }
}
