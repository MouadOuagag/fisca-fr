// ── Calculateur Indemnités Télétravail 2026 ──
// Sources : URSSAF, DGFiP, Accord National Interprofessionnel (ANI) 13/11/2020
// BOFiP — BOI-RSA-CHAMP-20-50-10 — Mise à jour 2026

export const TELETRAVAIL_CONSTANTS = {

  // Forfait journalier exonéré URSSAF 2026
  FORFAIT_JOURNALIER:  2.70,  // €/jour télétravaillé (révisé 2026)
  FORFAIT_MENSUEL_MAX: 59.40, // 22 jours × 2,70 €

  // Remboursement réel — plafonds exonérés
  REEL: {
    internet_mois:   50.00,  // abonnement internet mensuel (prorata usage pro)
    electricite_kwh: 0.2516, // tarif EDF réglementé 2026 (€/kWh)
    telephone_mois:  20.00,  // forfait mobile (prorata usage pro)
    mobilier_annuel: 550.00, // mobilier de bureau (amortissement annuel)
    materiel_annuel: 500.00, // matériel informatique (amortissement annuel)
  },

  // Surface bureau / consommation type
  ELECTRICITE: {
    puissance_pc_w:    150, // PC fixe — 150W
    puissance_laptop_w: 45, // Laptop — 45W
    heures_jour:         8, // heures de travail/jour
    eclairage_w:        30, // éclairage bureau
    chauffage_m2_kwh:   80, // kWh/m²/an pour chauffage
  },

  // Jours travaillables 2026
  JOURS_TRAVAILLABLES: 228, // jours ouvrés hors congés (base 25 jours CP)
  JOURS_MOIS_MOYEN:     19, // jours ouvrés/mois

  // Taux usage professionnel par défaut
  TAUX_USAGE_PRO: {
    internet:    0.50, // 50% usage pro (partagé perso/pro)
    telephone:   0.40, // 40%
    electricite: 0.30, // 30% de la conso totale du logement
  },
}

export function calculerTeletravail({
  joursSemaine  = 2,
  salaireNet    = 3000,
  surfaceBureau = 10,
  surfaceTotale = 60,
  typePoste     = 'laptop',
  methode       = 'forfait',
  avecInternet  = true,
  avecTelephone = false,
  avecMobilier  = false,
}) {
  const { FORFAIT_JOURNALIER, REEL, ELECTRICITE, JOURS_TRAVAILLABLES, JOURS_MOIS_MOYEN } = TELETRAVAIL_CONSTANTS

  // Jours télétravaillés
  const joursParAn   = Math.round(joursSemaine / 5 * JOURS_TRAVAILLABLES)
  const joursParMois = Math.round(joursSemaine / 5 * JOURS_MOIS_MOYEN)

  // ── MÉTHODE FORFAIT ──
  const forfaitJournalier     = FORFAIT_JOURNALIER
  const indemniteAnnForfait   = joursParAn   * forfaitJournalier
  const indemnitesMensForfait = joursParMois * forfaitJournalier

  // ── MÉTHODE RÉELLE ──
  // 1. Internet
  const internetAnnuel = avecInternet
    ? REEL.internet_mois * 12 * TELETRAVAIL_CONSTANTS.TAUX_USAGE_PRO.internet
    : 0

  // 2. Électricité
  const puissanceW  = typePoste === 'laptop'
    ? ELECTRICITE.puissance_laptop_w
    : ELECTRICITE.puissance_pc_w
  const consoPC_kWh = (puissanceW + ELECTRICITE.eclairage_w) / 1000
    * ELECTRICITE.heures_jour * joursParAn
  const consoChauf  = ELECTRICITE.chauffage_m2_kwh * surfaceBureau
  const consoTotal  = consoPC_kWh + (consoChauf * TELETRAVAIL_CONSTANTS.TAUX_USAGE_PRO.electricite)
  const electriciteAnnuelle = consoTotal * REEL.electricite_kwh

  // 3. Téléphone
  const telephoneAnnuel = avecTelephone
    ? REEL.telephone_mois * 12 * TELETRAVAIL_CONSTANTS.TAUX_USAGE_PRO.telephone
    : 0

  // 4. Mobilier
  const mobilierAnnuel = avecMobilier ? REEL.mobilier_annuel : 0

  const totalReelAnnuel  = internetAnnuel + electriciteAnnuelle + telephoneAnnuel + mobilierAnnuel
  const totalReelMensuel = totalReelAnnuel / 12

  // Sélection méthode
  const indemniteAnnuelle    = methode === 'forfait' ? indemniteAnnForfait   : totalReelAnnuel
  const indemnitesMensuelles = methode === 'forfait' ? indemnitesMensForfait : totalReelMensuel

  // Économies annuelles (transport, repas)
  const economiesTransport = joursParAn * 4.20 // ticket moyen RATP/TCL
  const economiesRepas     = joursParAn * 3.50 // économie repas midi
  const economiesTotal     = economiesTransport + economiesRepas

  // Gain net total
  const gainNetAnnuel  = indemniteAnnuelle + economiesTotal
  const gainNetMensuel = gainNetAnnuel / 12

  // Décomposition pour graphique
  const decompositionReelle = [
    { label: 'Internet',    value: Math.round(internetAnnuel),      color: '#1E5FCC' },
    { label: 'Électricité', value: Math.round(electriciteAnnuelle), color: '#F59E0B' },
    { label: 'Téléphone',   value: Math.round(telephoneAnnuel),     color: '#7C3AED' },
    { label: 'Mobilier',    value: Math.round(mobilierAnnuel),      color: '#059669' },
  ].filter(d => d.value > 0)

  return {
    joursSemaine, joursParAn, joursParMois,
    forfaitJournalier,
    indemniteAnnForfait,
    indemnitesMensForfait,
    internetAnnuel, electriciteAnnuelle, telephoneAnnuel,
    mobilierAnnuel, totalReelAnnuel, totalReelMensuel,
    methode, indemniteAnnuelle, indemnitesMensuelles,
    economiesTransport, economiesRepas, economiesTotal,
    gainNetAnnuel, gainNetMensuel,
    decompositionReelle,
    salaireNet,
    pctSalaire: indemnitesMensuelles / salaireNet,
  }
}
