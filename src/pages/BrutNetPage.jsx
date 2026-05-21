import { useState } from 'react'
import { Download, ChevronDown, ChevronUp, TrendingUp, Users, Euro, Building } from 'lucide-react'
import { AreaChart, Area, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { calculateBrutNet } from '../lib/fiscalLogic/brutNet'
import { fmt, pct } from '../lib/utils'
import { AdZoneInContent, AdZoneSquare } from '../components/ui/AdZone'

const COLORS = ['#1E5FCC', '#E2E8F0', '#94A3B8']
const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

const MetricCard = ({ label, value, sub, icon: Icon, color = '#1E5FCC', highlight = false }) => (
  <div className="rounded-2xl p-5 flex flex-col gap-2"
    style={{ background: highlight ? '#0B1F3A' : 'white', boxShadow: CARD_SHADOW }}>
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: highlight ? 'rgba(255,255,255,0.45)' : '#94A3B8' }}>
        {label}
      </span>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: highlight ? 'rgba(255,255,255,0.1)' : color + '15' }}>
        <Icon size={15} color={highlight ? 'white' : color} />
      </div>
    </div>
    <p className="text-2xl font-bold tracking-tight" style={{ color: highlight ? 'white' : '#0F172A' }}>{value}</p>
    <p className="text-xs" style={{ color: highlight ? 'rgba(255,255,255,0.45)' : '#94A3B8' }}>{sub}</p>
  </div>
)

export default function BrutNetPage() {
  const [brut, setBrut]         = useState(3500)
  const [statut, setStatut]     = useState('non-cadre')
  const [showDetail, setDetail] = useState(false)
  const res = calculateBrutNet(brut)

  const pieData = res ? [
    { name: 'Net après impôt',        value: Math.round(res.netApresImpot) },
    { name: 'Cotisations salariales', value: Math.round(res.sal.total) },
    { name: 'Prélèvement source',     value: Math.round(res.montantPAS) },
  ] : []

  const areaData = res ? [1000,1500,2000,2500,3000,3500,4000,4500,5000].map(b => {
    const r = calculateBrutNet(b)
    return { brut: b, net: Math.round(r?.netApresImpot || 0) }
  }) : []

  function handleExport() {
    if (!res) return
    const d = new Date().toLocaleDateString('fr-FR')
    const txt = [
      'FISCA.FR — Simulateur Brut → Net 2026',
      `Généré le ${d}`,
      '─'.repeat(44),
      `Brut mensuel     : ${fmt(res.brut)}`,
      `Net avant impôt  : ${fmt(res.netAvantImpot)}`,
      `PAS (${pct(res.tauxPAS)})      : -${fmt(res.montantPAS)}`,
      `Net après impôt  : ${fmt(res.netApresImpot)}`,
      `Coût employeur   : ${fmt(res.coutTotal)}`,
      '',
      `Net annuel       : ${fmt(res.netApresImpot * 12)}`,
      `Coût annuel empl.: ${fmt(res.coutTotal * 12)}`,
      '',
      '─'.repeat(44),
      '⚠ Document indicatif — non contractuel',
      'Sources : URSSAF, AGIRC-ARRCO, DGFiP — 01/01/2026',
    ].join('\n')
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `brut-net-${Math.round(res.brut)}eur-2026.txt`
    a.click()
  }

  return (
    <div>

      {/* ── PAGE TITLE (SEO H1) ── */}
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
          Convertissez votre salaire brut en net instantanément. Calcul basé sur les taux
          URSSAF, AGIRC-ARRCO et le barème PAS 2026 officiels. Résultat immédiat, sans inscription.
        </p>
      </div>

      {/* ── TOP METRIC CARDS ── */}
      {res && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <MetricCard label="Net après impôt"    value={fmt(res.netApresImpot)} sub={`Annuel : ${fmt(res.netApresImpot*12)}`} icon={Euro}      color="#1E5FCC" highlight />
          <MetricCard label="Net avant impôt"    value={fmt(res.netAvantImpot)} sub={pct(res.sal.total/res.brut)+' de charges'}  icon={TrendingUp} color="#059669" />
          <MetricCard label="Coût employeur"     value={fmt(res.coutTotal)}     sub={'+'+pct(res.pat.total/res.brut)+' patronales'} icon={Building}  color="#7C3AED" />
          <MetricCard label="Charges salariales" value={fmt(res.sal.total)}     sub={pct(res.sal.total/res.brut)+' du brut'}    icon={Users}     color="#DC2626" />
        </div>
      )}

      {/* ── MAIN CALCULATOR GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* LEFT — Inputs (1 col) */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
              Paramètres du calcul
            </p>
            <div className="space-y-5">
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
                  onChange={e => setBrut(Math.max(0, parseFloat(e.target.value)||0))}
                  className="mt-3 w-full border rounded-xl px-4 py-2.5 text-center text-base font-bold outline-none transition-all"
                  style={{ borderColor: '#E2E8F0', color: '#0F172A', background: '#F8FAFC' }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>
                  Statut professionnel
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['non-cadre','cadre'].map(s => (
                    <button key={s} onClick={() => setStatut(s)}
                      className="py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={statut === s
                        ? { background: '#0B1F3A', color: 'white' }
                        : { background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}>
                      {s === 'cadre' ? '👔 Cadre' : '👷 Non-cadre'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pie chart card */}
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

          {/* Ad zone sidebar */}
          <AdZoneSquare />
        </div>

        {/* RIGHT — Results (2 cols) */}
        {res && (
          <div className="lg:col-span-2 space-y-4">

            {/* Area chart — courbe net vs brut */}
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                  Courbe salaire net selon le brut
                </p>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: '#EFF6FF', color: '#1D4ED8' }}>
                  1 000 € → 5 000 €
                </span>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={areaData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradNet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#1E5FCC" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#1E5FCC" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="brut" tick={{ fontSize: 10, fill: '#94A3B8' }}
                    tickFormatter={v => (v/1000)+'k'} />
                  <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }}
                    tickFormatter={v => (v/1000).toFixed(1)+'k'} />
                  <Tooltip
                    formatter={v => [fmt(v), 'Net après impôt']}
                    labelFormatter={v => `Brut : ${fmt(v)}`}
                  />
                  <Area type="monotone" dataKey="net" stroke="#1E5FCC" strokeWidth={2}
                    fill="url(#gradNet)" dot={false}
                    activeDot={{ r: 4, fill: '#1E5FCC', stroke: 'white', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Annual summary table */}
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
                Récapitulatif mensuel & annuel
              </p>
              <div className="space-y-0">
                {[
                  { label: 'Salaire brut',              monthly: res.brut,           highlight: false },
                  { label: 'Cotisations salariales',    monthly: -res.sal.total,      highlight: false, negative: true },
                  { label: 'Net avant impôt',           monthly: res.netAvantImpot,   highlight: false, bold: true },
                  { label: `PAS estimé (${pct(res.tauxPAS)})`, monthly: -res.montantPAS,  highlight: false, negative: true },
                  { label: 'Net après impôt',           monthly: res.netApresImpot,   highlight: true,  bold: true },
                  { label: 'Cotisations patronales',    monthly: res.pat.total,       highlight: false },
                  { label: 'Coût total employeur',      monthly: res.coutTotal,       highlight: false, bold: true },
                ].map(({ label, monthly, highlight, negative, bold }) => (
                  <div key={label}
                    className="flex items-center justify-between px-4 py-3 rounded-xl mb-1"
                    style={highlight
                      ? { background: '#0B1F3A', borderRadius: '12px' }
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
                        {negative ? '-' : ''}{fmt(Math.abs(monthly * 12))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-6 px-4 mt-2">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94A3B8', width: '112px', textAlign:'right' }}>/ mois</span>
                <span className="text-xs font-bold uppercase tracking-wider hidden sm:block" style={{ color: '#94A3B8', width: '128px', textAlign:'right' }}>/ an</span>
              </div>
            </div>

            {/* Detail toggle */}
            <button onClick={() => setDetail(!showDetail)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'white', border: '1px solid #E2E8F0', color: '#64748B', boxShadow: CARD_SHADOW }}>
              {showDetail ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showDetail ? 'Masquer' : 'Voir'} le détail des 9 cotisations salariales
            </button>

            {showDetail && (
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: CARD_SHADOW }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>
                      {['Cotisation salariale', 'Montant', 'Taux base'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#94A3B8' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody style={{ background: 'white' }}>
                    {[
                      ['Vieillesse plafonnée',   res.sal.vieillesse_plaf,  '6,90%'],
                      ['Vieillesse déplafonnée', res.sal.vieillesse_deplaf,'0,40%'],
                      ['AGIRC-ARRCO T1',         res.sal.agirc_t1,         '3,15%'],
                      ['AGIRC-ARRCO T2',         res.sal.agirc_t2,         '8,64%'],
                      ['CEG T1',                 res.sal.ceg_t1,           '0,86%'],
                      ['CEG T2',                 res.sal.ceg_t2,           '1,08%'],
                      ['CSG déductible',         res.sal.csg_ded,          '6,80%'],
                      ['CSG non déductible',     res.sal.csg_nded,         '2,40%'],
                      ['CRDS',                   res.sal.crds,             '0,50%'],
                    ].map(([name, amount, rate]) => (
                      <tr key={name} style={{ borderBottom: '1px solid #F8FAFC' }}>
                        <td className="px-4 py-2.5" style={{ color: '#475569' }}>{name}</td>
                        <td className="px-4 py-2.5 font-semibold" style={{ color: '#0F172A' }}>{fmt(amount)}</td>
                        <td className="px-4 py-2.5 text-xs" style={{ color: '#94A3B8' }}>{rate}</td>
                      </tr>
                    ))}
                    <tr style={{ background: '#0B1F3A' }}>
                      <td className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-white">Total salariales</td>
                      <td className="px-4 py-3 font-bold" style={{ color: '#60A5FA' }}>{fmt(res.sal.total)}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#475569' }}>{pct(res.sal.total/res.brut)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Export button */}
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

      {/* ── AD ZONE — In Content ── */}
      <AdZoneInContent />

      {/* ── SEO CONTENT SECTION ── */}
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
              (après abattement de 10% pour frais professionnels). Le Plafond Annuel de la Sécurité Sociale
              (PASS) est fixé à 47 100 € en 2026.
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
              neutre de la DGFiP. Le coût employeur pour un salarié au SMIC est d'environ 2 580 €/mois.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Différence cadre et non-cadre en 2026
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Depuis la fusion AGIRC-ARRCO en 2019, les <strong>taux de cotisations retraite complémentaire</strong>
              sont identiques pour les cadres et non-cadres. La principale différence réside dans l'obligation
              pour les employeurs de financer une <strong>prévoyance minimale cadre</strong> à hauteur de 1,50%
              du PASS. En pratique, la différence sur le net est marginale.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Comprendre le prélèvement à la source 2026
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Le <strong>PAS (Prélèvement à la Source)</strong> est prélevé directement sur votre salaire depuis
              janvier 2019. Notre simulateur utilise la <strong>grille neutre 2026</strong> applicable aux
              contribuables célibataires sans enfants. Votre taux personnalisé, communiqué par la DGFiP via
              votre espace impots.gouv.fr, peut être différent selon votre situation familiale (quotient familial,
              nombre de parts fiscales).
            </p>
          </div>
        </div>

        {/* FAQ Schema-ready */}
        <div className="rounded-xl p-5" style={{ background: '#F8FAFC' }}>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: '#64748B' }}>
            Questions fréquentes — Salaire brut net France 2026
          </h3>
          {[
            {
              q: 'Quelle est la différence entre salaire net et salaire net imposable ?',
              a: "Le salaire net imposable = salaire net avant impôt − CSG déductible (6,80%) − abattement forfaitaire 10% frais professionnels (min 495 €, max 14 171 € annuels). C'est cette base qui détermine votre taux de prélèvement à la source."
            },
            {
              q: 'Comment calculer le coût employeur total ?',
              a: "Coût employeur = salaire brut + cotisations patronales. Les cotisations patronales incluent : maladie (7%), vieillesse plafonnée (8,55%), allocations familiales (3,45%), chômage (4,05%), AGIRC-ARRCO patronal (4,72% T1 + 12,95% T2), AT/MP (~1%). Total : environ 42 à 47% du brut selon l'entreprise."
            },
            {
              q: 'Le simulateur est-il valable pour les fonctionnaires ?',
              a: 'Non. Ce simulateur est conçu pour les salariés du secteur privé soumis au régime général de la Sécurité Sociale. Les fonctionnaires cotisent à des régimes spéciaux (CNRACL, RAFP) avec des taux différents.'
            },
            {
              q: 'Peut-on utiliser ce simulateur pour une fiche de paie officielle ?',
              a: "Non. Ce calculateur brut net est un outil indicatif et pédagogique. Une fiche de paie officielle doit être établie par un logiciel de paie agréé ou un expert-comptable, tenant compte de votre convention collective, de vos avantages en nature et de votre taux PAS personnalisé."
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
