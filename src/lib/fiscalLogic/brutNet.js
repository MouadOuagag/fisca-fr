export const FISCAL_2026 = {
  PASS_MENSUEL: 3925,
  SMIC_MENSUEL: 1801.80,
  SMIC_HORAIRE: 11.88,
  HEURES_MOIS: 151.67,
  BASE_CSG: 0.9825,
  SAL: {
    VIEILLESSE_PLAF:  0.0690,
    VIEILLESSE_DEPLAF: 0.0040,
    AGIRC_T1: 0.0315,
    AGIRC_T2: 0.0864,
    CEG_T1:   0.0086,
    CEG_T2:   0.0108,
    CSG_DED:  0.0680,
    CSG_NDED: 0.0240,
    CRDS:     0.0050,
  },
  PAT: {
    MALADIE:          0.0700,
    VIEILLESSE_PLAF:  0.0855,
    VIEILLESSE_DEPLAF: 0.0190,
    ALLOC_FAM:        0.0345,
    AT_MP:            0.0100,
    CHOMAGE:          0.0405,
    AGS:              0.0015,
    AGIRC_T1:         0.0472,
    AGIRC_T2:         0.1295,
    CEG_T1:           0.0129,
    CEG_T2:           0.0162,
    CET:              0.0035,
    FNAL:             0.0010,
  },
  FP: {
    PENSION:  0.1156,
    RAFP:     0.0500,
    CSG_DED:  0.0680,
    CSG_NDED: 0.0240,
    CRDS:     0.0050,
  },
  LIBERAL_ABATTEMENT: 0.34,
  PAS_GRID: [
    [1592, 0.000], [1699, 0.005], [1816, 0.013],
    [1971, 0.021], [2159, 0.029], [2584, 0.037],
    [2813, 0.053], [3126, 0.075], [3554, 0.099],
    [4143, 0.119], [5036, 0.138], [6796, 0.160],
    [8938, 0.180], [11764, 0.200], [15986, 0.240],
    [24230, 0.280], [46196, 0.330], [77754, 0.380],
    [Infinity, 0.430],
  ],
}

export function getPasTaux(netImposable, tauxPersonnalise = null) {
  if (tauxPersonnalise !== null && !isNaN(tauxPersonnalise)) {
    return Math.min(Math.max(0, tauxPersonnalise / 100), 0.43)
  }
  const entry = FISCAL_2026.PAS_GRID.find(([max]) => netImposable <= max)
  return entry ? entry[1] : 0.430
}

export function calculateBrutNet(brutMensuel, options = {}) {
  const {
    statut = 'non-cadre',
    tempsTravail = 100,
    moisPrime = 12,
    tauxPASPersonnalise = null,
  } = options

  const brut = parseFloat(brutMensuel) || 0
  if (brut <= 0) return null

  const { PASS_MENSUEL, BASE_CSG, SAL, PAT, FP, LIBERAL_ABATTEMENT } = FISCAL_2026

  const heuresMois    = FISCAL_2026.HEURES_MOIS * (tempsTravail / 100)
  const salaireHoraire = heuresMois > 0 ? brut / heuresMois : 0

  const basePLAF  = Math.min(brut, PASS_MENSUEL)
  const baseDEPLAF = brut
  const tranche2  = Math.max(0, Math.min(brut, PASS_MENSUEL * 8) - PASS_MENSUEL)
  const baseCSG   = brut * BASE_CSG

  let sal = {}
  let pat = {}

  if (statut === 'fp') {
    sal = {
      pension:   baseDEPLAF * FP.PENSION,
      rafp:      baseDEPLAF * FP.RAFP,
      csg_ded:   baseCSG    * FP.CSG_DED,
      csg_nded:  baseCSG    * FP.CSG_NDED,
      crds:      baseCSG    * FP.CRDS,
    }
    sal.total = Object.values(sal).reduce((a, b) => a + b, 0)
    pat = {
      pension_pat: baseDEPLAF * 0.3076,
      rafp_pat:    baseDEPLAF * 0.0500,
      maladie:     baseDEPLAF * 0.0700,
      alloc_fam:   baseDEPLAF * 0.0345,
      at_mp:       baseDEPLAF * 0.0089,
      fnal:        baseDEPLAF * 0.0010,
    }
    pat.total = Object.values(pat).reduce((a, b) => a + b, 0)

  } else if (statut === 'liberal') {
    const baseCotis = brut * (1 - LIBERAL_ABATTEMENT)
    sal = {
      maladie_ind:       baseCotis               * 0.0035,
      maladie_base:      baseCotis               * 0.0650,
      vieillesse_base:   Math.min(baseCotis, PASS_MENSUEL) * 0.1775,
      vieillesse_compl:  baseCotis               * 0.0700,
      invalidite_deces:  baseCotis               * 0.0140,
      csg_ded:           baseCSG                 * SAL.CSG_DED,
      csg_nded:          baseCSG                 * SAL.CSG_NDED,
      crds:              baseCSG                 * SAL.CRDS,
    }
    sal.total = Object.values(sal).reduce((a, b) => a + b, 0)
    pat = { total: 0 }

  } else {
    // non-cadre & cadre — même taux depuis la fusion AGIRC-ARRCO 2019
    sal = {
      vieillesse_plaf:   basePLAF  * SAL.VIEILLESSE_PLAF,
      vieillesse_deplaf: baseDEPLAF * SAL.VIEILLESSE_DEPLAF,
      agirc_t1:          basePLAF  * SAL.AGIRC_T1,
      agirc_t2:          tranche2  * SAL.AGIRC_T2,
      ceg_t1:            basePLAF  * SAL.CEG_T1,
      ceg_t2:            tranche2  * SAL.CEG_T2,
      csg_ded:           baseCSG   * SAL.CSG_DED,
      csg_nded:          baseCSG   * SAL.CSG_NDED,
      crds:              baseCSG   * SAL.CRDS,
    }
    sal.total = Object.values(sal).reduce((a, b) => a + b, 0)
    pat = {
      maladie:           baseDEPLAF * PAT.MALADIE,
      vieillesse_plaf:   basePLAF   * PAT.VIEILLESSE_PLAF,
      vieillesse_deplaf: baseDEPLAF * PAT.VIEILLESSE_DEPLAF,
      alloc_fam:         baseDEPLAF * PAT.ALLOC_FAM,
      at_mp:             baseDEPLAF * PAT.AT_MP,
      chomage:           baseDEPLAF * PAT.CHOMAGE,
      ags:               baseDEPLAF * PAT.AGS,
      agirc_t1:          basePLAF   * PAT.AGIRC_T1,
      agirc_t2:          tranche2   * PAT.AGIRC_T2,
      ceg_t1:            basePLAF   * PAT.CEG_T1,
      ceg_t2:            tranche2   * PAT.CEG_T2,
      cet:               Math.min(brut, PASS_MENSUEL * 8) * PAT.CET,
      fnal:              baseDEPLAF * PAT.FNAL,
    }
    pat.total = Object.values(pat).reduce((a, b) => a + b, 0)
  }

  const netAvantImpot      = brut - sal.total
  const netImposable       = (netAvantImpot - (sal.csg_ded || 0)) * 0.90
  const tauxPAS            = getPasTaux(netImposable, tauxPASPersonnalise)
  const montantPAS         = netImposable * tauxPAS
  const netApresImpot      = netAvantImpot - montantPAS
  const coutTotal          = brut + pat.total

  const brutAnnuel          = brut * moisPrime
  const netAnnuel           = netAvantImpot * moisPrime
  const netApresImpotAnnuel = netApresImpot * moisPrime
  const coutAnnuel          = coutTotal * 12

  return {
    brut,
    salaireHoraire,
    heuresMois,
    sal,
    pat,
    netAvantImpot,
    netImposable,
    tauxPAS,
    montantPAS,
    netApresImpot,
    coutTotal,
    brutAnnuel,
    netAnnuel,
    netApresImpotAnnuel,
    coutAnnuel,
  }
}
