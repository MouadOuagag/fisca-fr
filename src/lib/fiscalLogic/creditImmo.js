// ── Simulateur Crédit Immobilier 2026 ──
// Sources : Banque de France, HCSF (Haut Conseil de Stabilité Financière)

export const CREDIT_CONSTANTS = {
  TAUX_MARCHE_2026: {
    ans10: 3.20,
    ans15: 3.45,
    ans20: 3.65,
    ans25: 3.80,
  },
  TAUX_ASSURANCE_DEFAUT: 0.0034, // 0.34%/an sur capital initial (moyenne marché)
  TAUX_ENDETTEMENT_MAX: 0.35,    // 35% — règle HCSF 2026
  FRAIS_DOSSIER_DEFAUT: 1000,
  GARANTIE_DEFAUT: 0.008,        // 0.8% du capital (caution bancaire)
}

export function calculerMensualite(capital, tauxAnnuel, dureeAns) {
  if (!capital || !tauxAnnuel || !dureeAns) return 0
  const tauxMensuel = tauxAnnuel / 100 / 12
  const nbMois = dureeAns * 12
  if (tauxMensuel === 0) return capital / nbMois
  return capital * (tauxMensuel * Math.pow(1 + tauxMensuel, nbMois)) /
    (Math.pow(1 + tauxMensuel, nbMois) - 1)
}

export function calculerCredit(capital, tauxAnnuel, dureeAns, revenuMensuel, assuranceTaux = 0.34) {
  if (!capital || !tauxAnnuel || !dureeAns) return null

  const nbMois = dureeAns * 12
  const tauxMensuel = tauxAnnuel / 100 / 12
  const mensualiteHorsAssurance = calculerMensualite(capital, tauxAnnuel, dureeAns)
  const mensualiteAssurance = (capital * assuranceTaux / 100) / 12
  const mensualiteTotale = mensualiteHorsAssurance + mensualiteAssurance

  const coutTotal = mensualiteTotale * nbMois
  const coutInterets = (mensualiteHorsAssurance * nbMois) - capital
  const coutAssurance = mensualiteAssurance * nbMois
  const garantie = capital * CREDIT_CONSTANTS.GARANTIE_DEFAUT
  const coutTotalAcquisition = coutTotal + garantie + CREDIT_CONSTANTS.FRAIS_DOSSIER_DEFAUT

  const tauxEndettement = revenuMensuel > 0 ? mensualiteTotale / revenuMensuel : 0
  const endettementOk = tauxEndettement <= CREDIT_CONSTANTS.TAUX_ENDETTEMENT_MAX

  // Tableau d'amortissement — 12 premières lignes
  const tableau = []
  let capitalRestant = capital
  for (let i = 1; i <= Math.min(12, nbMois); i++) {
    const interets = capitalRestant * tauxMensuel
    const amortissement = mensualiteHorsAssurance - interets
    capitalRestant -= amortissement
    tableau.push({
      mois: i,
      mensualite: mensualiteHorsAssurance,
      interets,
      amortissement,
      capitalRestant: Math.max(0, capitalRestant),
    })
  }

  // Courbe d'évolution capital restant dû (annuelle)
  const courbe = []
  let cap = capital
  for (let annee = 0; annee <= dureeAns; annee++) {
    courbe.push({ annee, capital: Math.round(Math.max(0, cap)) })
    for (let m = 0; m < 12 && cap > 0; m++) {
      const int = cap * tauxMensuel
      const amor = mensualiteHorsAssurance - int
      cap -= amor
    }
  }

  return {
    capital, tauxAnnuel, dureeAns, nbMois,
    mensualiteHorsAssurance,
    mensualiteAssurance,
    mensualiteTotale,
    coutInterets,
    coutAssurance,
    coutTotal,
    garantie,
    coutTotalAcquisition,
    tauxEndettement,
    endettementOk,
    tableau,
    courbe,
  }
}
