import { useState, useMemo } from 'react'
import { Download, ChevronDown, ChevronUp } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateBrutNet } from '../lib/fiscalLogic/brutNet'
import { fmt, pct } from '../lib/utils'
import { AdUnitSquare, AdUnitInContent } from '../components/ui/AdUnit'

const COLORS = ['#1E5FCC', '#E2E8F0', '#94A3B8']
const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

const STATUTS = [
  { id: 'non-cadre', label: '👷 Non-cadre',          desc: 'Secteur privé' },
  { id: 'cadre',     label: '👔 Cadre',               desc: 'Convention cadre' },
  { id: 'fp',        label: '🏛️ Fonction publique',   desc: 'CNRACL / RAFP' },
  { id: 'liberal',   label: '💼 Libéral',             desc: 'BNC / CIPAV' },
]

const TEMPS_OPTIONS = [50, 60, 70, 80, 100]
const MOIS_OPTIONS  = [12, 13, 14, 15, 16]

function detailRows(statut, sal) {
  if (statut === 'fp') {
    return [
      ['Pension CNRACL',       sal.pension,          '11,56 %'],
      ['RAFP',                 sal.rafp,             ' 5,00 %'],
      ['CSG déductible',       sal.csg_ded,          ' 6,80 %'],
      ['CSG non déductible',   sal.csg_nded,         ' 2,40 %'],
      ['CRDS',                 sal.crds,             ' 0,50 %'],
    ]
  }
  if (statut === 'liberal') {
    return [
      ['Maladie indemnités',        sal.maladie_ind,      ' 0,35 %'],
      ['Maladie base',              sal.maladie_base,     ' 6,50 %'],
      ['Vieillesse de base',        sal.vieillesse_base,  '17,75 %'],
      ['Retraite complémentaire',   sal.vieillesse_compl, ' 7,00 %'],
      ['Invalidité décès',          sal.invalidite_deces, ' 1,40 %'],
      ['CSG déductible',            sal.csg_ded,          ' 6,80 %'],
      ['CSG non déductible',        sal.csg_nded,         ' 2,40 %'],
      ['CRDS',                      sal.crds,             ' 0,50 %'],
    ]
  }
  return [
    ['Vieillesse plafonnée',    sal.vieillesse_plaf,   ' 6,90 %'],
    ['Vieillesse déplafonnée',  sal.vieillesse_deplaf, ' 0,40 %'],
    ['AGIRC-ARRCO T1',          sal.agirc_t1,          ' 3,15 %'],
    ['AGIRC-ARRCO T2',          sal.agirc_t2,          ' 8,64 %'],
    ['CEG T1',                  sal.ceg_t1,            ' 0,86 %'],
    ['CEG T2',                  sal.ceg_t2,            ' 1,08 %'],
    ['CSG déductible',          sal.csg_ded,           ' 6,80 %'],
    ['CSG non déductible',      sal.csg_nded,          ' 2,40 %'],
    ['CRDS',                    sal.crds,              ' 0,50 %'],
  ]
}

export default function BrutNetPage() {
  const [brut, setBrut]               = useState(3500)
  const [statut, setStatut]           = useState('non-cadre')
  const [tempsTravail, setTempsTravail] = useState(100)
  const [moisPrime, setMoisPrime]     = useState(12)
  const [tauxPAS, setTauxPAS]         = useState('')
  const [showDetail, setDetail]       = useState(false)
  const [showAdvanced, setAdvanced]   = useState(false)

  const res = useMemo(() => calculateBrutNet(brut, {
    statut,
    tempsTravail,
    moisPrime,
    tauxPASPersonnalise: tauxPAS !== '' ? parseFloat(tauxPAS) : null,
  }), [brut, statut, tempsTravail, moisPrime, tauxPAS])

  const pieData = res ? [
    { name: 'Net après impôt',        value: Math.round(res.netApresImpot) },
    { name: 'Cotisations salariales', value: Math.round(res.sal.total) },
    { name: 'Prélèvement source',     value: Math.round(res.montantPAS) },
  ] : []

  function handleExport() {
    if (!res) return
    const d = new Date().toLocaleDateString('fr-FR')
    const statutLabel = STATUTS.find(s => s.id === statut)?.label || statut
    const txt = [
      'MonBilanFacile.fr — Simulateur Brut → Net 2026',
      `Généré le ${d}`,
      '─'.repeat(50),
      `Statut             : ${statutLabel}`,
      `Temps de travail   : ${tempsTravail}%`,
      `Mois de salaire/an : ${moisPrime}`,
      '',
      `Brut mensuel       : ${fmt(res.brut)}`,
      `Taux horaire       : ${res.salaireHoraire.toFixed(2)} €/h (${res.heuresMois.toFixed(1)} h/mois)`,
      '',
      `Cotisations sal.   : -${fmt(res.sal.total)}`,
      `Net avant impôt    : ${fmt(res.netAvantImpot)}`,
      `PAS (${pct(res.tauxPAS)})          : -${fmt(res.montantPAS)}`,
      `Net après impôt    : ${fmt(res.netApresImpot)}`,
      `Coût employeur     : ${fmt(res.coutTotal)}`,
      '',
      `Brut annuel (×${moisPrime})     : ${fmt(res.brutAnnuel)}`,
      `Net annuel ap. imp.: ${fmt(res.netApresImpotAnnuel)}`,
      `Coût annuel empl.  : ${fmt(res.coutAnnuel)}`,
      '',
      '─'.repeat(50),
      '⚠ Document indicatif — non contractuel',
      'Sources : URSSAF, AGIRC-ARRCO, DGFiP — 01/01/2026',
    ].join('\n')
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `brut-net-${Math.round(res.brut)}eur-${statut}-2026.txt`
    a.click()
  }

  return (
    <div>

      {/* ── PAGE TITLE ── */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full" style={{ background: '#1E5FCC' }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1E5FCC' }}>
            Simulateur fiscal gratuit
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#0F172A' }}>
          Calculateur Salaire Brut Net 2026 — France
        </h1>
        <p className="text-sm mt-1.5 max-w-2xl" style={{ color: '#64748B' }}>
          4 statuts : salarié non-cadre, cadre, fonction publique, libéral BNC.
          Taux URSSAF, AGIRC-ARRCO et barème PAS 2026 officiels. Calcul immédiat.
        </p>
      </div>

      {/* ── METRIC CARDS ── */}
      {res && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="rounded-2xl p-5" style={{ background: '#0B1F3A', boxShadow: CARD_SHADOW }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Net après impôt</p>
            <p className="text-2xl font-bold text-white">{fmt(res.netApresImpot)}</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Annuel : {fmt(res.netApresImpotAnnuel)}</p>
          </div>
          <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>Net avant impôt</p>
            <p className="text-2xl font-bold" style={{ color: '#0F172A' }}>{fmt(res.netAvantImpot)}</p>
            <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>{pct(res.sal.total / res.brut)} de charges</p>
          </div>
          <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>Coût employeur</p>
            <p className="text-2xl font-bold" style={{ color: '#0F172A' }}>{fmt(res.coutTotal)}</p>
            <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>Annuel : {fmt(res.coutAnnuel)}</p>
          </div>
          <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>Taux horaire</p>
            <p className="text-2xl font-bold" style={{ color: '#0F172A' }}>{res.salaireHoraire.toFixed(2)} €/h</p>
            <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>{res.heuresMois.toFixed(1)} h/mois</p>
          </div>
        </div>
      )}

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* LEFT — Inputs */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
              Paramètres du calcul
            </p>
            <div className="space-y-5">

              {/* Statut */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>
                  Statut professionnel
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STATUTS.map(s => (
                    <button key={s.id} onClick={() => setStatut(s.id)}
                      className="py-2.5 px-2 rounded-xl text-left transition-all"
                      style={statut === s.id
                        ? { background: '#0B1F3A', color: 'white' }
                        : { background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}>
                      <span className="text-xs font-bold block">{s.label}</span>
                      <span className="text-xs block mt-0.5 opacity-60">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brut slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
                    Salaire brut mensuel
                  </label>
                  <span className="text-sm font-bold" style={{ color: '#1E5FCC' }}>
                    {brut.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <input type="range" min={1000} max={20000} step={50} value={brut}
                  onChange={e => setBrut(parseFloat(e.target.value))}
                  className="w-full accent-blue-600" style={{ height: '4px' }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: '#CBD5E1' }}>
                  <span>1 000 €</span><span>20 000 €</span>
                </div>
                <input type="number" value={brut} min={0} max={30000} step={50}
                  onChange={e => setBrut(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="mt-3 w-full border rounded-xl px-4 py-2.5 text-center text-base font-bold outline-none"
                  style={{ borderColor: '#E2E8F0', color: '#0F172A', background: '#F8FAFC' }}
                />
              </div>

              {/* Temps de travail */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>
                  Temps de travail
                </label>
                <div className="flex gap-2">
                  {TEMPS_OPTIONS.map(t => (
                    <button key={t} onClick={() => setTempsTravail(t)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                      style={tempsTravail === t
                        ? { background: '#1E5FCC', color: 'white' }
                        : { background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}>
                      {t}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Mois prime */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>
                  Mois de salaire / an
                </label>
                <div className="flex gap-2">
                  {MOIS_OPTIONS.map(m => (
                    <button key={m} onClick={() => setMoisPrime(m)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                      style={moisPrime === m
                        ? { background: '#059669', color: 'white' }
                        : { background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* PAS personnalisé */}
              <div>
                <button onClick={() => setAdvanced(!showAdvanced)}
                  className="flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: '#1E5FCC' }}>
                  {showAdvanced ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  Taux PAS personnalisé
                </button>
                {showAdvanced && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: '#64748B' }}>
                        {tauxPAS !== '' ? `${tauxPAS} %` : 'Grille neutre (auto)'}
                      </span>
                      {tauxPAS !== '' && (
                        <button onClick={() => setTauxPAS('')}
                          className="text-xs font-semibold" style={{ color: '#DC2626' }}>
                          Réinitialiser
                        </button>
                      )}
                    </div>
                    <input type="range" min={0} max={43} step={0.5}
                      value={tauxPAS !== '' ? parseFloat(tauxPAS) : (res ? res.tauxPAS * 100 : 0)}
                      onChange={e => setTauxPAS(e.target.value)}
                      className="w-full accent-blue-600" style={{ height: '4px' }}
                    />
                    <div className="flex justify-between text-xs" style={{ color: '#CBD5E1' }}>
                      <span>0 %</span><span>43 %</span>
                    </div>
                    <input type="number" placeholder="Ex : 8.5"
                      value={tauxPAS} min={0} max={43} step={0.1}
                      onChange={e => setTauxPAS(e.target.value)}
                      className="w-full border rounded-xl px-3 py-2 text-sm outline-none"
                      style={{ borderColor: '#E2E8F0', background: '#F8FAFC' }}
                    />
                    <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>
                      Trouvez votre taux sur impots.gouv.fr → Gérer mon prélèvement à la source
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pie chart */}
          {res && (
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>
                Répartition du brut
              </p>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={v => fmt(v)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {pieData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
                      <span style={{ color: '#64748B' }}>{d.name}</span>
                    </div>
                    <span className="font-semibold" style={{ color: '#0F172A' }}>{fmt(d.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <AdUnitSquare />
        </div>

        {/* RIGHT — Results */}
        {res && (
          <div className="lg:col-span-2 space-y-4">

            {/* Récapitulatif mensuel & annuel */}
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <div className="flex justify-between items-center mb-3 px-4">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                  Récapitulatif
                </p>
                <div className="flex gap-6">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94A3B8', width: '112px', textAlign: 'right' }}>/ mois</span>
                  <span className="text-xs font-bold uppercase tracking-wider hidden sm:block" style={{ color: '#94A3B8', width: '128px', textAlign: 'right' }}>/ an (×{moisPrime})</span>
                </div>
              </div>
              <div className="space-y-0">
                {[
                  { label: 'Salaire brut',                          monthly: res.brut,             annual: res.brutAnnuel },
                  { label: 'Cotisations salariales',                monthly: -res.sal.total,        annual: -res.sal.total * moisPrime,     negative: true },
                  { label: 'Net avant impôt',                       monthly: res.netAvantImpot,     annual: res.netAnnuel,                  bold: true },
                  { label: `PAS estimé (${pct(res.tauxPAS)})`,      monthly: -res.montantPAS,       annual: -res.montantPAS * moisPrime,    negative: true },
                  { label: 'Net après impôt',                       monthly: res.netApresImpot,     annual: res.netApresImpotAnnuel,        highlight: true, bold: true },
                  { label: 'Cotisations patronales',                monthly: res.pat.total,         annual: res.coutAnnuel - res.brutAnnuel },
                  { label: 'Coût total employeur',                  monthly: res.coutTotal,         annual: res.coutAnnuel,                 bold: true },
                ].map(({ label, monthly, annual, highlight, negative, bold }) => (
                  <div key={label}
                    className="flex items-center justify-between px-4 py-3 rounded-xl mb-1"
                    style={highlight
                      ? { background: '#0B1F3A' }
                      : { background: bold ? '#F8FAFC' : 'transparent' }}>
                    <span className="text-sm" style={{ color: highlight ? 'rgba(255,255,255,0.6)' : '#64748B' }}>
                      {label}
                    </span>
                    <div className="flex gap-6">
                      <span className={`text-sm ${bold ? 'font-bold' : 'font-semibold'} w-28 text-right`}
                        style={{ color: highlight ? 'white' : negative ? '#DC2626' : '#0F172A' }}>
                        {negative ? '-' : ''}{fmt(Math.abs(monthly))}
                      </span>
                      <span className={`text-sm ${bold ? 'font-bold' : 'font-medium'} w-32 text-right hidden sm:block`}
                        style={{ color: highlight ? 'rgba(255,255,255,0.5)' : '#94A3B8' }}>
                        {negative ? '-' : ''}{fmt(Math.abs(annual))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Détail cotisations toggle */}
            <button onClick={() => setDetail(!showDetail)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'white', border: '1px solid #E2E8F0', color: '#64748B', boxShadow: CARD_SHADOW }}>
              {showDetail ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showDetail ? 'Masquer' : 'Voir'} le détail des cotisations salariales
            </button>

            {showDetail && (
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: CARD_SHADOW }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>
                      {['Cotisation salariale', 'Montant', 'Taux'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#94A3B8' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody style={{ background: 'white' }}>
                    {detailRows(statut, res.sal).map(([name, amount, rate]) => (
                      <tr key={name} style={{ borderBottom: '1px solid #F8FAFC' }}>
                        <td className="px-4 py-2.5" style={{ color: '#475569' }}>{name}</td>
                        <td className="px-4 py-2.5 font-semibold" style={{ color: '#0F172A' }}>{fmt(amount || 0)}</td>
                        <td className="px-4 py-2.5 text-xs font-mono" style={{ color: '#94A3B8' }}>{rate}</td>
                      </tr>
                    ))}
                    <tr style={{ background: '#0B1F3A' }}>
                      <td className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-white">Total salariales</td>
                      <td className="px-4 py-3 font-bold" style={{ color: '#60A5FA' }}>{fmt(res.sal.total)}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#475569' }}>{pct(res.sal.total / res.brut)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Export */}
            <button onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #0B1F3A, #1E5FCC)' }}>
              <Download size={15} />
              Télécharger le récapitulatif fiscal 2026
            </button>

            <p className="text-xs text-center leading-relaxed" style={{ color: '#94A3B8' }}>
              Outil indicatif — non contractuel · Taux URSSAF & AGIRC-ARRCO au 01/01/2026 · PAS = taux neutre célibataire
            </p>
          </div>
        )}
      </div>

      {/* ── AD IN-CONTENT ── */}
      <AdUnitInContent />

      {/* ── SEO CONTENT ── */}
      <section className="mt-4 rounded-2xl p-6 lg:p-8" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>
          Calculateur Brut Net 2026 : tout ce qu'il faut savoir sur le salaire net en France
        </h2>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569' }}>
          Notre simulateur salaire brut net 2026 est l'outil de référence pour calculer votre rémunération nette
          en France. Basé sur les données officielles de l'URSSAF, les barèmes AGIRC-ARRCO et la grille de
          prélèvement à la source de la DGFiP, il vous donne une estimation précise de votre salaire net
          mensuel et annuel, ainsi que le coût total employeur — en temps réel, sans inscription.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Comment calculer son salaire net en 2026 ?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Le passage du brut au net s'effectue en deux étapes. D'abord, déduire les <strong>cotisations salariales</strong>
              (environ 22% du brut) : assurance vieillesse, retraite complémentaire AGIRC-ARRCO, CSG/CRDS.
              Ensuite, appliquer le <strong>prélèvement à la source (PAS)</strong> sur le revenu net imposable
              (après abattement de 10% pour frais professionnels). Le PASS 2026 est de 47 100 €/an.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Quel est le SMIC net en 2026 ?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Le <strong>SMIC brut 2026</strong> est de 1 801,80 € par mois (35h/semaine), soit 11,88 €/heure.
              Après déduction des cotisations salariales (~22%), le <strong>SMIC net avant impôt</strong> est
              d'environ 1 426 €. Le prélèvement à la source est nul à ce niveau de revenu selon la grille
              neutre de la DGFiP.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Cadre vs non-cadre : quelle différence en 2026 ?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Depuis la fusion AGIRC-ARRCO en 2019, les <strong>taux de retraite complémentaire</strong>
              sont identiques pour les cadres et non-cadres (3,15% T1 salarié). La principale différence
              réside dans l'obligation pour les employeurs de financer une <strong>prévoyance minimale cadre</strong>
              à hauteur de 1,50% du PASS. Sur le net, l'écart est marginal.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Comprendre le prélèvement à la source 2026
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Le <strong>PAS</strong> est prélevé directement sur votre salaire depuis janvier 2019. Ce simulateur
              utilise la <strong>grille neutre 2026</strong> (célibataire sans enfants). Votre taux personnalisé,
              communiqué par la DGFiP via impots.gouv.fr, peut différer selon votre situation familiale.
              Utilisez le slider "Taux PAS personnalisé" pour affiner le calcul.
            </p>
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: '#F8FAFC' }}>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: '#64748B' }}>
            Questions fréquentes — Salaire brut net France 2026
          </h3>
          {[
            {
              q: 'Quelle est la différence entre salaire net et salaire net imposable ?',
              a: "Le salaire net imposable = salaire net avant impôt − CSG déductible (6,80%) − abattement forfaitaire 10% frais professionnels (min 495 €, max 14 171 € annuels). C'est cette base qui détermine votre taux de prélèvement à la source.",
            },
            {
              q: 'Comment calculer le coût employeur total ?',
              a: "Coût employeur = salaire brut + cotisations patronales. Celles-ci incluent : maladie (7%), vieillesse plafonnée (8,55%), allocations familiales (3,45%), chômage (4,05%), AGIRC-ARRCO patronal (4,72% T1 + 12,95% T2), AT/MP (~1%). Total : environ 42 à 47% du brut.",
            },
            {
              q: 'Comment fonctionne le simulateur pour la fonction publique ?',
              a: "Les fonctionnaires cotisent à la CNRACL (11,56%) et au RAFP (5%) au lieu de l'AGIRC-ARRCO. Il n'y a pas de cotisation chômage. Le régime patronal FP est également différent (CNRACL patronal ~30,76%). Ce simulateur propose un calcul simplifié de référence.",
            },
            {
              q: 'Peut-on utiliser ce simulateur pour une fiche de paie officielle ?',
              a: "Non. Ce calculateur est un outil indicatif et pédagogique. Une fiche de paie officielle doit être établie par un logiciel de paie agréé ou un expert-comptable, tenant compte de votre convention collective, de vos avantages en nature et de votre taux PAS personnalisé.",
            },
          ].map((item, i) => (
            <div key={i} className="py-3 border-t" style={{ borderColor: '#E2E8F0' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#0F172A' }}>{item.q}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{item.a}</p>
            </div>
          ))}
        </div>

        <p className="text-xs mt-5 p-3 rounded-lg" style={{ color: '#94A3B8', background: '#F1F5F9' }}>
          <strong>Sources légales :</strong> URSSAF (urssaf.fr) · AGIRC-ARRCO · DGFiP (impots.gouv.fr) ·
          Légifrance — CSS Art. L.242-1 · Service-public.fr. Mis à jour : janvier 2026.
          Les résultats sont fournis à titre indicatif uniquement et ne constituent pas un conseil fiscal ou juridique.
        </p>
      </section>

    </div>
  )
}
