import { useState, useMemo } from 'react'
import { Download, Home, TrendingDown, Euro, Calendar, AlertTriangle, CheckCircle } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import { calculerCredit, CREDIT_CONSTANTS } from '../lib/fiscalLogic/creditImmo'
import { fmt, pct } from '../lib/utils'
import { AdZoneInContent, AdZoneSquare } from '../components/ui/AdZone'

const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

const MetricCard = ({ label, value, sub, icon: Icon, color = '#1E5FCC', highlight = false, warning = false }) => (
  <div className="rounded-2xl p-5 flex flex-col gap-2"
    style={{
      background: highlight ? '#0B1F3A' : warning ? '#FFF7ED' : 'white',
      boxShadow: CARD_SHADOW,
      border: warning ? '1px solid #FED7AA' : 'none'
    }}>
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold uppercase tracking-widest"
        style={{ color: highlight ? 'rgba(255,255,255,0.45)' : warning ? '#EA580C' : '#94A3B8' }}>
        {label}
      </span>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: highlight ? 'rgba(255,255,255,0.1)' : color + '15' }}>
        <Icon size={15} color={highlight ? 'white' : warning ? '#EA580C' : color} />
      </div>
    </div>
    <p className="text-2xl font-bold tracking-tight"
      style={{ color: highlight ? 'white' : warning ? '#EA580C' : '#0F172A' }}>
      {value}
    </p>
    <p className="text-xs" style={{ color: highlight ? 'rgba(255,255,255,0.45)' : warning ? '#FB923C' : '#94A3B8' }}>
      {sub}
    </p>
  </div>
)

export default function CreditPage() {
  const [capital, setCapital]       = useState(200000)
  const [duree, setDuree]           = useState(20)
  const [taux, setTaux]             = useState(3.65)
  const [revenu, setRevenu]         = useState(4000)
  const [assurance, setAssurance]   = useState(0.34)
  const [showTableau, setTableau]   = useState(false)

  const res = useMemo(() =>
    calculerCredit(capital, taux, duree, revenu, assurance),
    [capital, taux, duree, revenu, assurance]
  )

  function handleExport() {
    if (!res) return
    const d = new Date().toLocaleDateString('fr-FR')
    const txt = [
      'FISCA.FR — Simulateur Crédit Immobilier 2026',
      `Généré le ${d}`,
      '─'.repeat(44),
      '',
      'PARAMÈTRES',
      `Capital emprunté       : ${fmt(res.capital)}`,
      `Durée                  : ${res.dureeAns} ans (${res.nbMois} mois)`,
      `Taux nominal annuel    : ${res.tauxAnnuel}%`,
      `Taux assurance         : ${assurance}%/an`,
      `Revenus nets mensuels  : ${fmt(revenu)}`,
      '',
      'RÉSULTATS',
      `Mensualité hors assurance : ${fmt(res.mensualiteHorsAssurance)}`,
      `Dont assurance            : ${fmt(res.mensualiteAssurance)}`,
      `Mensualité totale         : ${fmt(res.mensualiteTotale)}`,
      '',
      `Coût total des intérêts   : ${fmt(res.coutInterets)}`,
      `Coût total assurance      : ${fmt(res.coutAssurance)}`,
      `Garantie bancaire estimée : ${fmt(res.garantie)}`,
      `Coût total acquisition    : ${fmt(res.coutTotalAcquisition)}`,
      '',
      `Taux d'endettement        : ${(res.tauxEndettement * 100).toFixed(1)}% ${res.endettementOk ? '✓ OK' : '⚠ Dépasse 35% HCSF'}`,
      '',
      '─'.repeat(44),
      '⚠ Document indicatif — non contractuel',
      'Sources : Banque de France, HCSF — 2026',
    ].join('\n')
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `credit-immo-${Math.round(capital/1000)}k-${duree}ans-2026.txt`
    a.click()
  }

  return (
    <div>
      {/* PAGE TITLE SEO */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full" style={{ background: '#1E5FCC' }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1E5FCC' }}>
            Simulateur gratuit
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#0F172A' }}>
          Simulateur Crédit Immobilier 2026 — Mensualités & Coût Total
        </h1>
        <p className="text-sm mt-1.5 max-w-2xl" style={{ color: '#64748B' }}>
          Calculez vos mensualités, le coût total de votre crédit immobilier et votre taux
          d'endettement selon les taux du marché français 2026. Résultat instantané, sans inscription.
        </p>
      </div>

      {/* METRIC CARDS */}
      {res && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <MetricCard
            label="Mensualité totale" icon={Euro} highlight
            value={fmt(res.mensualiteTotale)}
            sub={`Dont assurance : ${fmt(res.mensualiteAssurance)}`}
          />
          <MetricCard
            label="Coût total intérêts" icon={TrendingDown} color="#DC2626"
            value={fmt(res.coutInterets)}
            sub={`+ ${fmt(res.coutAssurance)} assurance`}
          />
          <MetricCard
            label="Taux d'endettement" icon={AlertTriangle}
            color={res.endettementOk ? '#059669' : '#DC2626'}
            warning={!res.endettementOk}
            value={(res.tauxEndettement * 100).toFixed(1) + '%'}
            sub={res.endettementOk ? '✓ Sous la limite HCSF (35%)' : '⚠ Dépasse 35% — HCSF 2026'}
          />
          <MetricCard
            label="Coût total acquisition" icon={Home} color="#7C3AED"
            value={fmt(res.coutTotalAcquisition)}
            sub={`Capital : ${fmt(capital)} + ${fmt(res.coutInterets + res.coutAssurance + res.garantie)}`}
          />
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* LEFT — Inputs */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#94A3B8' }}>
              Paramètres du crédit
            </p>
            <div className="space-y-5">

              {/* Capital */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
                    Capital emprunté
                  </label>
                  <span className="text-sm font-bold" style={{ color: '#1E5FCC' }}>
                    {capital.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <input type="range" min={50000} max={1000000} step={5000} value={capital}
                  onChange={e => setCapital(parseFloat(e.target.value))}
                  className="w-full accent-blue-600" />
                <div className="flex justify-between text-xs mt-1" style={{ color: '#CBD5E1' }}>
                  <span>50 000 €</span><span>1 000 000 €</span>
                </div>
                <input type="number" value={capital} min={0} step={5000}
                  onChange={e => setCapital(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="mt-2 w-full border rounded-xl px-4 py-2 text-center text-sm font-bold outline-none"
                  style={{ borderColor: '#E2E8F0', color: '#0F172A', background: '#F8FAFC' }} />
              </div>

              {/* Durée */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
                    Durée
                  </label>
                  <span className="text-sm font-bold" style={{ color: '#1E5FCC' }}>{duree} ans</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[10, 15, 20, 25].map(d => (
                    <button key={d} onClick={() => { setDuree(d); setTaux(CREDIT_CONSTANTS.TAUX_MARCHE_2026[`ans${d}`]) }}
                      className="py-2 rounded-xl text-sm font-bold transition-all"
                      style={duree === d
                        ? { background: '#0B1F3A', color: 'white' }
                        : { background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}>
                      {d}
                    </button>
                  ))}
                </div>
                <p className="text-xs mt-1.5 text-center" style={{ color: '#94A3B8' }}>
                  Taux marché suggéré : {CREDIT_CONSTANTS.TAUX_MARCHE_2026[`ans${duree}`]}%
                </p>
              </div>

              {/* Taux */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
                    Taux nominal annuel
                  </label>
                  <span className="text-sm font-bold" style={{ color: '#1E5FCC' }}>{taux}%</span>
                </div>
                <input type="range" min={0.5} max={7} step={0.05} value={taux}
                  onChange={e => setTaux(parseFloat(e.target.value))}
                  className="w-full accent-blue-600" />
                <div className="flex justify-between text-xs mt-1" style={{ color: '#CBD5E1' }}>
                  <span>0,5%</span><span>7,0%</span>
                </div>
              </div>

              {/* Assurance */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
                    Taux assurance / an
                  </label>
                  <span className="text-sm font-bold" style={{ color: '#1E5FCC' }}>{assurance}%</span>
                </div>
                <input type="range" min={0.10} max={1.0} step={0.01} value={assurance}
                  onChange={e => setAssurance(parseFloat(e.target.value))}
                  className="w-full accent-blue-600" />
                <div className="flex justify-between text-xs mt-1" style={{ color: '#CBD5E1' }}>
                  <span>0,10%</span><span>1,00%</span>
                </div>
              </div>

              {/* Revenu */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
                    Revenus nets mensuels
                  </label>
                  <span className="text-sm font-bold" style={{ color: '#1E5FCC' }}>
                    {revenu.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <input type="range" min={1500} max={20000} step={100} value={revenu}
                  onChange={e => setRevenu(parseFloat(e.target.value))}
                  className="w-full accent-blue-600" />
                <div className="flex justify-between text-xs mt-1" style={{ color: '#CBD5E1' }}>
                  <span>1 500 €</span><span>20 000 €</span>
                </div>
              </div>

            </div>
          </div>

          {/* Taux marché référence */}
          <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>
              Taux marché 2026
            </p>
            {Object.entries(CREDIT_CONSTANTS.TAUX_MARCHE_2026).map(([key, val]) => {
              const ans = key.replace('ans', '')
              return (
                <div key={key} className="flex justify-between items-center py-2 border-b last:border-0"
                  style={{ borderColor: '#F1F5F9' }}>
                  <span className="text-sm" style={{ color: '#64748B' }}>{ans} ans</span>
                  <span className="text-sm font-bold" style={{ color: '#1E5FCC' }}>{val}%</span>
                </div>
              )
            })}
            <p className="text-xs mt-3" style={{ color: '#94A3B8' }}>
              Source : Observatoire Crédit Logement / CSA — Banque de France 2026
            </p>
          </div>

          <AdZoneSquare />
        </div>

        {/* RIGHT — Results */}
        {res && (
          <div className="lg:col-span-2 space-y-4">

            {/* Courbe capital restant dû */}
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                  Évolution du capital restant dû
                </p>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: '#EFF6FF', color: '#1D4ED8' }}>
                  Sur {duree} ans
                </span>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={res.courbe} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradCapital" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E5FCC" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1E5FCC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="annee" tick={{ fontSize: 10, fill: '#94A3B8' }}
                    tickFormatter={v => `${v}a`} />
                  <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }}
                    tickFormatter={v => (v / 1000).toFixed(0) + 'k'} />
                  <Tooltip
                    formatter={v => [fmt(v), 'Capital restant dû']}
                    labelFormatter={v => `Année ${v}`} />
                  <Area type="monotone" dataKey="capital" stroke="#1E5FCC" strokeWidth={2}
                    fill="url(#gradCapital)" dot={false}
                    activeDot={{ r: 4, fill: '#1E5FCC', stroke: 'white', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Récapitulatif des coûts */}
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
                Décomposition du coût total
              </p>
              {[
                { label: 'Capital emprunté',          value: res.capital,                               color: '#1E5FCC' },
                { label: 'Coût des intérêts',         value: res.coutInterets,                          color: '#DC2626' },
                { label: 'Coût assurance emprunteur', value: res.coutAssurance,                         color: '#F59E0B' },
                { label: 'Garantie bancaire (caution)',value: res.garantie,                             color: '#7C3AED' },
                { label: 'Frais de dossier estimés',  value: CREDIT_CONSTANTS.FRAIS_DOSSIER_DEFAUT,    color: '#64748B' },
              ].map(({ label, value, color }) => {
                const pctVal = (value / res.coutTotalAcquisition * 100).toFixed(1)
                return (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm" style={{ color: '#475569' }}>{label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs" style={{ color: '#94A3B8' }}>{pctVal}%</span>
                        <span className="text-sm font-bold w-28 text-right" style={{ color: '#0F172A' }}>
                          {fmt(value)}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: '#F1F5F9' }}>
                      <div className="h-1.5 rounded-full transition-all"
                        style={{ width: `${pctVal}%`, background: color }} />
                    </div>
                  </div>
                )
              })}
              <div className="flex justify-between items-center mt-4 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                <span className="text-sm font-bold" style={{ color: '#0F172A' }}>Coût total acquisition</span>
                <span className="text-lg font-bold" style={{ color: '#0B1F3A' }}>{fmt(res.coutTotalAcquisition)}</span>
              </div>
            </div>

            {/* Taux endettement indicator */}
            <div className="rounded-2xl p-5" style={{
              background: res.endettementOk ? '#F0FDF4' : '#FFF7ED',
              boxShadow: CARD_SHADOW,
              border: `1px solid ${res.endettementOk ? '#BBF7D0' : '#FED7AA'}`
            }}>
              <div className="flex items-start gap-3">
                {res.endettementOk
                  ? <CheckCircle size={20} color="#059669" className="mt-0.5 flex-shrink-0" />
                  : <AlertTriangle size={20} color="#EA580C" className="mt-0.5 flex-shrink-0" />}
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: res.endettementOk ? '#065F46' : '#9A3412' }}>
                    Taux d'endettement : {(res.tauxEndettement * 100).toFixed(1)}%
                    {res.endettementOk ? ' — Conforme HCSF 2026 ✓' : ' — Dépasse la limite HCSF 2026 ⚠'}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: res.endettementOk ? '#047857' : '#C2410C' }}>
                    {res.endettementOk
                      ? `Votre mensualité de ${fmt(res.mensualiteTotale)} représente ${(res.tauxEndettement * 100).toFixed(1)}% de vos revenus. Le HCSF impose un maximum de 35% — vous êtes en dessous.`
                      : `Votre mensualité de ${fmt(res.mensualiteTotale)} dépasse 35% de vos revenus de ${fmt(revenu)}. La banque peut refuser le dossier. Réduisez le capital, augmentez la durée ou l'apport.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Tableau amortissement */}
            <button onClick={() => setTableau(!showTableau)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'white', border: '1px solid #E2E8F0', color: '#64748B', boxShadow: CARD_SHADOW }}>
              <Calendar size={14} />
              {showTableau ? 'Masquer' : 'Afficher'} le tableau d'amortissement (12 premiers mois)
            </button>

            {showTableau && (
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: CARD_SHADOW }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#0B1F3A' }}>
                      {['Mois', 'Mensualité', 'Intérêts', 'Amortissement', 'Capital restant'].map(h => (
                        <th key={h} className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-white opacity-60">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody style={{ background: 'white' }}>
                    {res.tableau.map(row => (
                      <tr key={row.mois} style={{ borderBottom: '1px solid #F8FAFC' }}>
                        <td className="px-3 py-2.5 text-xs font-bold" style={{ color: '#94A3B8' }}>{row.mois}</td>
                        <td className="px-3 py-2.5 font-semibold text-xs" style={{ color: '#0F172A' }}>{fmt(row.mensualite)}</td>
                        <td className="px-3 py-2.5 text-xs" style={{ color: '#DC2626' }}>{fmt(row.interets)}</td>
                        <td className="px-3 py-2.5 text-xs" style={{ color: '#059669' }}>{fmt(row.amortissement)}</td>
                        <td className="px-3 py-2.5 text-xs font-semibold" style={{ color: '#1E5FCC' }}>{fmt(row.capitalRestant)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Export */}
            <button onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #0B1F3A, #1E5FCC)' }}>
              <Download size={15} />
              Télécharger le récapitulatif crédit 2026
            </button>

            <p className="text-xs text-center leading-relaxed" style={{ color: '#94A3B8' }}>
              Simulation indicative — non contractuelle · Taux marché Banque de France 2026 · Assurance selon profil emprunteur
            </p>
          </div>
        )}
      </div>

      <AdZoneInContent />

      {/* SEO CONTENT */}
      <section className="mt-4 rounded-2xl p-6 lg:p-8" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>
          Simulateur crédit immobilier 2026 : mensualités, coût total et taux d'endettement
        </h2>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569' }}>
          Notre calculateur de crédit immobilier 2026 vous permet d'estimer vos mensualités, le coût total
          de votre emprunt et votre capacité d'endettement en quelques secondes. Il intègre les taux du
          marché immobilier français (source : Observatoire Crédit Logement / CSA) et la règle d'endettement
          maximum de 35% imposée par le HCSF (Haut Conseil de Stabilité Financière) depuis janvier 2022.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Quels sont les taux immobiliers en 2026 ?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              En 2026, les taux moyens des crédits immobiliers en France se stabilisent après la période
              de hausse 2022-2024. Sur <strong>20 ans</strong>, le taux moyen tourne autour de <strong>3,65%</strong>.
              Sur 15 ans : ~3,45%. Sur 25 ans : ~3,80%. Ces taux sont hors assurance emprunteur.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Règle des 35% — HCSF 2026
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Depuis 2022, le HCSF impose que le <strong>taux d'endettement</strong> (mensualité crédit /
              revenus nets) ne dépasse pas <strong>35%</strong>, assurance comprise. Une banque peut
              déroger à cette règle pour maximum 20% de sa production de crédit, notamment pour les
              primo-accédants ou résidences principales.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Comment réduire le coût de son crédit ?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Trois leviers principaux : (1) <strong>augmenter l'apport personnel</strong> pour réduire le capital
              emprunté, (2) <strong>négocier le taux d'assurance</strong> (la délégation d'assurance peut
              diviser ce coût par 2 à 3), (3) <strong>rembourser par anticipation</strong> dès que possible
              pour réduire les intérêts restants.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Qu'est-ce que le tableau d'amortissement ?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Le tableau d'amortissement détaille mois par mois la répartition de chaque mensualité entre
              <strong> intérêts</strong> et <strong>remboursement du capital</strong>. En début de crédit,
              la part des intérêts est maximale. Elle diminue progressivement au fil des remboursements —
              c'est la structure d'un crédit amortissable classique à taux fixe.
            </p>
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: '#F8FAFC' }}>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: '#64748B' }}>
            FAQ — Crédit immobilier France 2026
          </h3>
          {[
            {
              q: 'Quelle mensualité pour un emprunt de 200 000 € sur 20 ans en 2026 ?',
              a: "À 3,65% sur 20 ans, la mensualité hors assurance est d'environ 1 175 €. Avec une assurance à 0,34%/an, la mensualité totale est d'environ 1 232 €. Le coût total des intérêts dépasse 82 000 €."
            },
            {
              q: 'Peut-on emprunter sans apport en 2026 ?',
              a: "Techniquement oui, mais c'est très difficile. Les banques exigent généralement un apport couvrant au minimum les frais de notaire (7 à 8% dans l'ancien, 2 à 3% dans le neuf). Un apport de 10% du prix du bien est aujourd'hui le standard pour obtenir un financement."
            },
            {
              q: 'Comment est calculée la mensualité d\'un crédit immobilier ?',
              a: "La formule est : M = C × [i(1+i)^n] / [(1+i)^n - 1], avec C = capital, i = taux mensuel (taux annuel / 12), n = nombre de mensualités. Notre simulateur applique cette formule exacte et y ajoute l'assurance emprunteur calculée sur le capital initial."
            },
          ].map((item, i) => (
            <div key={i} className="py-3 border-t" style={{ borderColor: '#E2E8F0' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#0F172A' }}>{item.q}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{item.a}</p>
            </div>
          ))}
        </div>

        <p className="text-xs mt-5 p-3 rounded-lg" style={{ color: '#94A3B8', background: '#F1F5F9' }}>
          <strong>Sources :</strong> Banque de France · Observatoire Crédit Logement/CSA · HCSF (hcsf.fr) ·
          AMF · Service-public.fr. Mis à jour : janvier 2026. Résultats indicatifs — non contractuels.
        </p>
      </section>
    </div>
  )
}
