export const FISCAL_2026 = {
  PASS_MENSUEL: 3925,
  SMIC_MENSUEL: 1801.80,
  BASE_CSG: 0.9825,
  SAL: {
    VIEILLESSE_PLAF: 0.0690,
    VIEILLESSE_DEPLAF: 0.0040,
    AGIRC_T1: 0.0315,
    AGIRC_T2: 0.0864,
    CEG_T1: 0.0086,
    CEG_T2: 0.0108,
    CSG_DED: 0.0680,
    CSG_NDED: 0.0240,
    CRDS: 0.0050,
  },
  PAT: {
    MALADIE: 0.0700,
    VIEILLESSE_PLAF: 0.0855,
    VIEILLESSE_DEPLAF: 0.0190,
    ALLOC_FAM: 0.0345,
    AT_MP: 0.0100,
    CHOMAGE: 0.0405,
    AGS: 0.0015,
    AGIRC_T1: 0.0472,
    AGIRC_T2: 0.1295,
    CEG_T1: 0.0129,
    CEG_T2: 0.0162,
    CET: 0.0035,
    FNAL: 0.0010,
  },
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

export function getPasTaux(netImposable) {
  const entry = FISCAL_2026.PAS_GRID.find(([max]) => netImposable <= max)
  return entry ? entry[1] : 0.430
}

export function calculateBrutNet(brutMensuel) {
  const brut = parseFloat(brutMensuel) || 0
  if (brut <= 0) return null
  const { PASS_MENSUEL, BASE_CSG, SAL, PAT } = FISCAL_2026

  const basePLAF = Math.min(brut, PASS_MENSUEL)
  const baseDEPLAF = brut
  const tranche2 = Math.max(0, Math.min(brut, PASS_MENSUEL * 8) - PASS_MENSUEL)
  const baseCSG = brut * BASE_CSG

  const sal = {
    vieillesse_plaf:  basePLAF  * SAL.VIEILLESSE_PLAF,
    vieillesse_deplaf: baseDEPLAF * SAL.VIEILLESSE_DEPLAF,
    agirc_t1:         basePLAF  * SAL.AGIRC_T1,
    agirc_t2:         tranche2  * SAL.AGIRC_T2,
    ceg_t1:           basePLAF  * SAL.CEG_T1,
    ceg_t2:           tranche2  * SAL.CEG_T2,
    csg_ded:          baseCSG   * SAL.CSG_DED,
    csg_nded:         baseCSG   * SAL.CSG_NDED,
    crds:             baseCSG   * SAL.CRDS,
  }
  sal.total = Object.values(sal).reduce((a, b) => a + b, 0)

  const pat = {
    maladie:          baseDEPLAF * PAT.MALADIE,
    vieillesse_plaf:  basePLAF   * PAT.VIEILLESSE_PLAF,
    vieillesse_deplaf: baseDEPLAF * PAT.VIEILLESSE_DEPLAF,
    alloc_fam:        baseDEPLAF * PAT.ALLOC_FAM,
    at_mp:            baseDEPLAF * PAT.AT_MP,
    chomage:          baseDEPLAF * PAT.CHOMAGE,
    ags:              baseDEPLAF * PAT.AGS,
    agirc_t1:         basePLAF   * PAT.AGIRC_T1,
    agirc_t2:         tranche2   * PAT.AGIRC_T2,
    ceg_t1:           basePLAF   * PAT.CEG_T1,
    ceg_t2:           tranche2   * PAT.CEG_T2,
    cet:              Math.min(brut, PASS_MENSUEL * 8) * PAT.CET,
    fnal:             baseDEPLAF * PAT.FNAL,
  }
  pat.total = Object.values(pat).reduce((a, b) => a + b, 0)

  const netAvantImpot = brut - sal.total
  const netImposable  = (netAvantImpot - sal.csg_ded) * 0.90
  const tauxPAS       = getPasTaux(netImposable)
  const montantPAS    = netImposable * tauxPAS
  const netApresImpot = netAvantImpot - montantPAS
  const coutTotal     = brut + pat.total

  return {
    brut, sal, pat,
    netAvantImpot, netImposable,
    tauxPAS, montantPAS,
    netApresImpot, coutTotal,
  }
}
