import { useState, useMemo, useCallback } from 'react'
import { Download, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { calculateBrutNet } from '../lib/fiscalLogic/brutNet'
import { fmt, pct } from '../lib/utils'
import { AdUnitInContent } from '../components/ui/AdUnit'
import SEOHead from '../components/seo/SEOHead'

const FISCAL = { HEURES_MOIS: 151.67 }

const STATUTS = [
  { id: 'non-cadre', label: 'Salarié non-cadre',  sub: '-22% env.' },
  { id: 'cadre',     label: 'Salarié cadre',       sub: '-22% env.' },
  { id: 'fp',        label: 'Fonction publique',   sub: '-17% env.' },
  { id: 'liberal',   label: 'Profession libérale', sub: '-15% env.' },
]

const CARD        = { background: 'white', border: '1.5px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem' }
const LABEL       = { fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#94A3B8', marginBottom: '0.5rem', display: 'block' }
const INPUT_STYLE = { width: '100%', border: '1.5px solid #E2E8F0', borderRadius: '10px', padding: '10px 14px', fontSize: '15px', fontWeight: 700, color: '#0F172A', background: 'white', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.15s, box-shadow 0.15s' }
const RESULT_INPUT = { ...INPUT_STYLE, background: '#F8FAFC', color: '#1E5FCC', cursor: 'default' }

export default function BrutNetPage() {
  const [mensuel, setMensuel]    = useState(3500)
  const [statut, setStatut]      = useState('non-cadre')
  const [tempsTravail, setTemps] = useState(100)
  const [moisPrime, setMois]     = useState(12)
  const [tauxPAS, setTauxPAS]    = useState(0)
  const [showDetail, setDetail]  = useState(false)

  const heuresMois = FISCAL.HEURES_MOIS * (tempsTravail / 100)
  const horaire    = heuresMois > 0 ? mensuel / heuresMois : 0
  const annuel     = mensuel * moisPrime

  const res = useMemo(() => calculateBrutNet(mensuel, {
    statut,
    tempsTravail,
    moisPrime,
    tauxPASPersonnalise: tauxPAS > 0 ? tauxPAS : null,
  }), [mensuel, statut, tempsTravail, moisPrime, tauxPAS])

  const handleMensuel = useCallback(v => {
    setMensuel(parseFloat(v) || 0)
  }, [])

  const handleHoraire = useCallback(v => {
    const h = parseFloat(v) || 0
    setMensuel(Math.round(h * heuresMois))
  }, [heuresMois])

  const handleAnnuel = useCallback(v => {
    const a = parseFloat(v) || 0
    setMensuel(Math.round(a / moisPrime))
  }, [moisPrime])

  const reset = () => {
    setMensuel(3500)
    setStatut('non-cadre')
    setTemps(100)
    setMois(12)
    setTauxPAS(0)
  }

  const exportTxt = () => {
    if (!res) return
    const txt = [
      'MONBILANFACILE.FR — Calculateur Brut → Net 2026',
      `Généré le ${new Date().toLocaleDateString('fr-FR')}`,
      '─'.repeat(44),
      `Brut mensuel     : ${fmt(mensuel)}`,
      `Brut horaire     : ${fmt(horaire)}/h`,
      `Brut annuel      : ${fmt(annuel)}`,
      `Statut           : ${STATUTS.find(s => s.id === statut)?.label}`,
      `Temps travail    : ${tempsTravail}%`,
      `Mois de prime    : ${moisPrime}`,
      '',
      `Net mensuel      : ${fmt(res.netAvantImpot)}`,
      `PAS (${pct(res.tauxPAS)})      : -${fmt(res.montantPAS)}`,
      `Net après impôt  : ${fmt(res.netApresImpot)}`,
      `Net horaire      : ${fmt(res.netApresImpot / heuresMois)}/h`,
      `Net annuel       : ${fmt(res.netApresImpotAnnuel)}`,
      `Coût employeur   : ${fmt(res.coutTotal)}`,
      '',
      '─'.repeat(44),
      '⚠ Document indicatif — non contractuel',
      'Sources : URSSAF, AGIRC-ARRCO, DGFiP — 01/01/2026',
    ].join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain;charset=utf-8' }))
    a.download = `brut-net-${Math.round(mensuel)}eur-2026.txt`
    a.click()
  }

  return (
    <>
      <SEOHead
        title="Calculateur Salaire Brut Net 2026 — France"
        description="Convertissez votre salaire brut en net instantanément. Horaire, mensuel et annuel synchronisés. Cotisations URSSAF & AGIRC-ARRCO 2026."
        canonical="/brut-net"
      />

      {/* ── PAGE TITLE ── */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '20px', padding: '4px 12px', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E5FCC', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Simulateur fiscal 2026
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '0.5rem' }}>
          Calcul du Salaire Brut en Net
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6, maxWidth: '600px' }}>
          Saisissez votre salaire en horaire, mensuel ou annuel — les 3 champs se synchronisent automatiquement. Cotisations URSSAF &amp; AGIRC-ARRCO 2026.
        </p>
      </div>

      {/* ── MAIN CALCULATOR ── */}
      <div className="calc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>

        {/* ── COLONNE GAUCHE : INPUTS ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Salaire brut */}
          <div style={CARD}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '1rem' }}>
              Indiquez votre salaire brut
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

              {/* Horaire */}
              <div>
                <label htmlFor="input-horaire" style={LABEL}>Horaire brut</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="input-horaire"
                    type="number"
                    min="0"
                    step="0.5"
                    value={horaire > 0 ? Math.round(horaire * 100) / 100 : ''}
                    onChange={e => handleHoraire(e.target.value)}
                    placeholder="0"
                    aria-label="Salaire horaire brut en euros"
                    style={INPUT_STYLE}
                    onFocus={e => { e.target.style.borderColor = '#1E5FCC'; e.target.style.boxShadow = '0 0 0 3px rgba(30,95,204,0.1)' }}
                    onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#94A3B8', fontWeight: 600, pointerEvents: 'none' }}>€/h</span>
                </div>
              </div>

              {/* Mensuel */}
              <div>
                <label htmlFor="input-mensuel" style={LABEL}>
                  Mensuel brut
                  <span style={{ marginLeft: '8px', padding: '2px 7px', borderRadius: '6px', background: '#EFF6FF', color: '#1E5FCC', fontSize: '10px', fontWeight: 700 }}>
                    {STATUTS.find(s => s.id === statut)?.sub}
                  </span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="input-mensuel"
                    type="number"
                    min="0"
                    step="50"
                    value={mensuel || ''}
                    onChange={e => handleMensuel(e.target.value)}
                    placeholder="0"
                    aria-label="Salaire mensuel brut en euros"
                    style={INPUT_STYLE}
                    onFocus={e => { e.target.style.borderColor = '#1E5FCC'; e.target.style.boxShadow = '0 0 0 3px rgba(30,95,204,0.1)' }}
                    onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#94A3B8', fontWeight: 600, pointerEvents: 'none' }}>€</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="50"
                  value={mensuel}
                  onChange={e => setMensuel(parseFloat(e.target.value))}
                  aria-label="Glissière salaire mensuel brut"
                  style={{ width: '100%', marginTop: '8px', accentColor: '#1E5FCC' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#CBD5E1', marginTop: '2px' }}>
                  <span>1 000 €</span><span>20 000 €</span>
                </div>
              </div>

              {/* Annuel */}
              <div>
                <label htmlFor="input-annuel" style={LABEL}>Annuel brut ({moisPrime} mois)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="input-annuel"
                    type="number"
                    min="0"
                    step="100"
                    value={annuel || ''}
                    onChange={e => handleAnnuel(e.target.value)}
                    placeholder="0"
                    aria-label="Salaire annuel brut en euros"
                    style={INPUT_STYLE}
                    onFocus={e => { e.target.style.borderColor = '#1E5FCC'; e.target.style.boxShadow = '0 0 0 3px rgba(30,95,204,0.1)' }}
                    onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#94A3B8', fontWeight: 600, pointerEvents: 'none' }}>€/an</span>
                </div>
              </div>

            </div>
          </div>

          {/* Sélection statut */}
          <div style={CARD}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '0.75rem' }}>
              Sélectionnez votre statut
            </p>
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend className="sr-only">Statut professionnel</legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {STATUTS.map(s => (
                  <label key={s.id}
                    htmlFor={`statut-${s.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: `1.5px solid ${statut === s.id ? '#1E5FCC' : '#E2E8F0'}`,
                      background: statut === s.id ? '#EFF6FF' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}>
                    <input
                      type="radio"
                      id={`statut-${s.id}`}
                      name="statut"
                      value={s.id}
                      checked={statut === s.id}
                      onChange={() => setStatut(s.id)}
                      style={{ accentColor: '#1E5FCC', width: '16px', height: '16px', flexShrink: 0 }}
                      aria-label={s.label}
                    />
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: statut === s.id ? '#1E5FCC' : '#0F172A', lineHeight: 1.2 }}>{s.label}</p>
                      <p style={{ fontSize: '10px', color: '#94A3B8' }}>{s.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        {/* ── COLONNE DROITE : RÉSULTATS ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Paramètres */}
          <div style={CARD}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '1rem' }}>
              Paramètres de calcul
            </p>

            {/* Temps de travail */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label htmlFor="slider-temps" style={{ ...LABEL, marginBottom: 0 }}>Temps de travail</label>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#1E5FCC' }}>{tempsTravail} %</span>
              </div>
              <input
                id="slider-temps"
                type="range"
                min="10"
                max="100"
                step="10"
                value={tempsTravail}
                onChange={e => setTemps(parseFloat(e.target.value))}
                aria-label={`Temps de travail : ${tempsTravail}%`}
                aria-valuemin={10}
                aria-valuemax={100}
                aria-valuenow={tempsTravail}
                style={{ width: '100%', accentColor: '#1E5FCC' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#CBD5E1', marginTop: '2px' }}>
                <span>10%</span><span>50%</span><span>80%</span><span>100%</span>
              </div>
            </div>

            {/* Mois de prime */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ ...LABEL, marginBottom: 0 }}>Nombre de mois de prime conventionnelle</label>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#1E5FCC' }}>{moisPrime}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }} role="group" aria-label="Nombre de mois de prime">
                {[12, 13, 14, 15, 16].map(m => (
                  <button key={m}
                    onClick={() => setMois(m)}
                    aria-pressed={moisPrime === m}
                    aria-label={`${m} mois`}
                    style={{
                      flex: 1,
                      padding: '8px 4px',
                      borderRadius: '8px',
                      border: `1.5px solid ${moisPrime === m ? '#1E5FCC' : '#E2E8F0'}`,
                      background: moisPrime === m ? '#1E5FCC' : 'white',
                      color: moisPrime === m ? 'white' : '#64748B',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.15s',
                      minHeight: '36px',
                    }}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Taux PAS */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label htmlFor="slider-pas" style={{ ...LABEL, marginBottom: 0 }}>Taux prélèvement à la source</label>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#1E5FCC' }}>{tauxPAS.toFixed(1)} %</span>
              </div>
              <input
                id="slider-pas"
                type="range"
                min="0"
                max="43"
                step="0.5"
                value={tauxPAS}
                onChange={e => setTauxPAS(parseFloat(e.target.value))}
                aria-label={`Taux de prélèvement à la source : ${tauxPAS}%`}
                aria-valuemin={0}
                aria-valuemax={43}
                aria-valuenow={tauxPAS}
                style={{ width: '100%', accentColor: '#1E5FCC' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#CBD5E1', marginTop: '2px' }}>
                <span>0 % (neutre)</span><span>43 % (max)</span>
              </div>
            </div>
          </div>

          {/* Résultats net */}
          {res && (
            <div style={CARD}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '1rem' }}>
                Résultat de votre salaire net
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

                {/* Horaire net */}
                <div>
                  <label style={LABEL}>Horaire net</label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" readOnly
                      value={heuresMois > 0 ? (res.netApresImpot / heuresMois).toFixed(2) : '0'}
                      aria-label="Salaire horaire net"
                      style={RESULT_INPUT} />
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>€/h</span>
                  </div>
                </div>

                {/* Mensuel net avant impôt */}
                <div>
                  <label style={LABEL}>Mensuel net avant impôt</label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" readOnly
                      value={res.netAvantImpot.toFixed(2)}
                      aria-label="Salaire mensuel net avant impôt"
                      style={RESULT_INPUT} />
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>€</span>
                  </div>
                </div>

                {/* Mensuel net après impôt — HERO */}
                <div style={{ background: '#0B1F3A', borderRadius: '12px', padding: '1rem' }}>
                  <label style={{ ...LABEL, color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>
                    Mensuel net après impôt
                    <span style={{ marginLeft: '6px', fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>
                      PAS : {pct(res.tauxPAS)}
                    </span>
                  </label>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {fmt(res.netApresImpot)}
                  </p>
                </div>

                {/* Annuel net */}
                <div>
                  <label style={LABEL}>Annuel net après impôt ({moisPrime} mois)</label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" readOnly
                      value={res.netApresImpotAnnuel.toFixed(2)}
                      aria-label="Salaire annuel net après impôt"
                      style={RESULT_INPUT} />
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>€/an</span>
                  </div>
                </div>

                {/* Coût employeur */}
                <div>
                  <label style={LABEL}>Coût total employeur / mois</label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" readOnly
                      value={res.coutTotal.toFixed(2)}
                      aria-label="Coût total employeur mensuel"
                      style={{ ...RESULT_INPUT, color: '#DC2626' }} />
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>€</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Boutons action */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={reset}
              aria-label="Effacer les champs et recommencer"
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                padding: '12px',
                borderRadius: '12px',
                border: '1.5px solid #E2E8F0',
                background: 'white',
                color: '#64748B',
                fontSize: '13px', fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.15s',
                minHeight: '44px',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#94A3B8'; e.currentTarget.style.color = '#0F172A' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#64748B' }}>
              <RotateCcw size={14} aria-hidden="true" />
              Effacer les champs
            </button>
            <button
              onClick={exportTxt}
              aria-label="Télécharger les résultats en fichier texte"
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                background: '#0B1F3A',
                color: 'white',
                fontSize: '13px', fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.15s',
                minHeight: '44px',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none' }}>
              <Download size={14} aria-hidden="true" />
              Télécharger
            </button>
          </div>

        </div>
      </div>

      {/* ── DÉTAIL COTISATIONS ── */}
      {res && (
        <div style={{ ...CARD, marginBottom: '1rem' }}>
          <button
            onClick={() => setDetail(!showDetail)}
            aria-expanded={showDetail}
            aria-controls="cotisations-detail"
            style={{
              width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', padding: 0,
              minHeight: '44px',
            }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Estimation du salaire net après prélèvement à la source
            </span>
            {showDetail
              ? <ChevronUp size={16} color="#64748B" aria-hidden="true" />
              : <ChevronDown size={16} color="#64748B" aria-hidden="true" />}
          </button>

          {showDetail && (
            <div id="cotisations-detail" style={{ marginTop: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '0.5rem' }}>
                    Mensuel net après impôts
                  </p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E5FCC' }}>{fmt(res.netApresImpot)}</p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '0.5rem' }}>
                    Annuel net après impôts
                  </p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E5FCC' }}>{fmt(res.netApresImpotAnnuel)}</p>
                </div>
              </div>

              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table
                  style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }}
                  role="table"
                  aria-label="Détail des cotisations salariales">
                  <thead>
                    <tr>
                      {['Cotisation', 'Taux', 'Montant mensuel'].map(h => (
                        <th key={h} scope="col" style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#94A3B8', borderBottom: '1px solid #E2E8F0' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Vieillesse plafonnée',   '6,90%', res.sal.vieillesse_plaf   || 0],
                      ['Vieillesse déplafonnée', '0,40%', res.sal.vieillesse_deplaf || 0],
                      ['AGIRC-ARRCO T1',         '3,15%', res.sal.agirc_t1          || 0],
                      ['AGIRC-ARRCO T2',         '8,64%', res.sal.agirc_t2          || 0],
                      ['CSG déductible',         '6,80%', res.sal.csg_ded           || 0],
                      ['CSG non déductible',     '2,40%', res.sal.csg_nded          || 0],
                      ['CRDS',                   '0,50%', res.sal.crds              || 0],
                    ].map(([name, taux, montant]) => (
                      <tr key={name} style={{ borderBottom: '1px solid #F8FAFC' }}>
                        <td style={{ padding: '8px 12px', fontSize: '13px', color: '#475569' }}>{name}</td>
                        <td style={{ padding: '8px 12px', fontSize: '13px', color: '#94A3B8' }}>{taux}</td>
                        <td style={{ padding: '8px 12px', fontSize: '13px', fontWeight: 700, color: '#DC2626' }}>-{fmt(montant)}</td>
                      </tr>
                    ))}
                    <tr style={{ background: '#0B1F3A' }}>
                      <td style={{ padding: '10px 12px', fontSize: '12px', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Total cotisations</td>
                      <td style={{ padding: '10px 12px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{pct(res.sal.total / res.brut)}</td>
                      <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 700, color: '#60A5FA' }}>-{fmt(res.sal.total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── NOTE LÉGALE ── */}
      <p style={{ fontSize: '11px', color: '#94A3B8', lineHeight: 1.6, textAlign: 'center', marginBottom: '1.5rem' }}
        role="note">
        Simulation indicative — non contractuelle · Taux URSSAF &amp; AGIRC-ARRCO au 01/01/2026 ·
        PAS affiché = taux neutre si 0%, sinon votre taux personnalisé
      </p>

      <AdUnitInContent />

      <style>{`
        @media (max-width: 640px) {
          .calc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
