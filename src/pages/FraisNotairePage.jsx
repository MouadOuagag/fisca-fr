import { useState, useMemo } from 'react'
import { Download, Building2, Euro, Home, FileText, Info } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { calculerFraisNotaire, NOTAIRE_CONSTANTS } from '../lib/fiscalLogic/fraisNotaire'
import { fmt, pct } from '../lib/utils'
import { AdZoneInContent, AdZoneSquare } from '../components/ui/AdZone'

const CARD_SHADOW = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'

const MetricCard = ({ label, value, sub, icon: Icon, color = '#1E5FCC', highlight = false }) => (
  <div className="rounded-2xl p-5 flex flex-col gap-2"
    style={{ background: highlight ? '#0B1F3A' : 'white', boxShadow: CARD_SHADOW }}>
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold uppercase tracking-widest"
        style={{ color: highlight ? 'rgba(255,255,255,0.45)' : '#94A3B8' }}>{label}</span>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: highlight ? 'rgba(255,255,255,0.1)' : color + '15' }}>
        <Icon size={15} color={highlight ? 'white' : color} />
      </div>
    </div>
    <p className="text-2xl font-bold tracking-tight"
      style={{ color: highlight ? 'white' : '#0F172A' }}>{value}</p>
    <p className="text-xs" style={{ color: highlight ? 'rgba(255,255,255,0.45)' : '#94A3B8' }}>{sub}</p>
  </div>
)

export default function FraisNotairePage() {
  const [prix, setPrix]                     = useState(250000)
  const [typeBien, setType]                 = useState('ancien')
  const [avecCredit, setCredit]             = useState(false)
  const [montantCredit, setMontantCredit]   = useState(200000)

  const res = useMemo(() =>
    calculerFraisNotaire(prix, typeBien, avecCredit, montantCredit),
    [prix, typeBien, avecCredit, montantCredit]
  )

  function handleExport() {
    if (!res) return
    const d = new Date().toLocaleDateString('fr-FR')
    const txt = [
      'FISCA.FR — Simulateur Frais de Notaire 2026',
      `Généré le ${d}`,
      '─'.repeat(44),
      '',
      'PARAMÈTRES',
      `Prix du bien              : ${fmt(res.prix)}`,
      `Type de bien              : ${res.isNeuf ? 'Neuf (TVA 20%)' : 'Ancien'}`,
      `Avec crédit               : ${avecCredit ? `Oui — ${fmt(montantCredit)}` : 'Non'}`,
      '',
      'FRAIS DE NOTAIRE DÉTAILLÉS',
      `Émoluments notaire HT     : ${fmt(res.emolumentsHT)}`,
      `TVA émoluments (20%)      : ${fmt(res.emolumentsTVA)}`,
      `Émoluments TTC            : ${fmt(res.emolumentsTTC)}`,
      `${res.isNeuf ? 'Taxe publicité foncière   ' : 'Droits de mutation        '}: ${fmt(res.droitsMutation)}`,
      `Contribution sécurité     : ${fmt(res.csi)}`,
      `Formalités & débours      : ${fmt(res.formalites + res.debours)}`,
      ...(avecCredit ? [`Frais de garantie         : ${fmt(res.fraisGarantie)}`] : []),
      '',
      `TOTAL FRAIS DE NOTAIRE    : ${fmt(res.totalFrais)}`,
      `Taux effectif             : ${pct(res.tauxFrais)}`,
      `BUDGET TOTAL ACQUISITION  : ${fmt(res.budgetTotal)}`,
      '',
      '─'.repeat(44),
      '⚠ Document indicatif — non contractuel',
      'Sources : Décret 2016-230 — Ministère de la Justice 2026',
    ].join('\n')
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `frais-notaire-${Math.round(prix / 1000)}k-${typeBien}-2026.txt`
    a.click()
  }

  return (
    <div>
      {/* SEO H1 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full" style={{ background: '#059669' }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#059669' }}>
            Simulateur gratuit
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#0F172A' }}>
          Calculateur Frais de Notaire 2026 — Neuf & Ancien
        </h1>
        <p className="text-sm mt-1.5 max-w-2xl" style={{ color: '#64748B' }}>
          Estimez précisément vos frais d'acquisition immobilière selon le barème officiel
          des notaires 2026. Calcul instantané pour les biens neufs et anciens, avec ou sans crédit.
        </p>
      </div>

      {/* METRIC CARDS */}
      {res && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <MetricCard label="Total frais notaire" icon={FileText} highlight
            value={fmt(res.totalFrais)}
            sub={`${pct(res.tauxFrais)} du prix du bien`} />
          <MetricCard label="Budget total acquisition" icon={Home} color="#059669"
            value={fmt(res.budgetTotal)}
            sub="Prix + frais" />
          <MetricCard label="Droits de mutation" icon={Building2} color="#DC2626"
            value={fmt(res.droitsMutation)}
            sub={res.isNeuf ? 'TPF 0,715% (neuf)' : 'Droits 5,80% (ancien)'} />
          <MetricCard label="Émoluments notaire" icon={Euro} color="#7C3AED"
            value={fmt(res.emolumentsTTC)}
            sub={`HT : ${fmt(res.emolumentsHT)} + TVA 20%`} />
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* LEFT — Inputs */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#94A3B8' }}>
              Paramètres
            </p>
            <div className="space-y-5">

              {/* Type de bien */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>
                  Type de bien
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'ancien', label: '🏚 Ancien', sub: 'Droits ~5,80%' },
                    { id: 'neuf',   label: '🏗 Neuf',   sub: 'TPF ~0,715%' },
                  ].map(({ id, label, sub }) => (
                    <button key={id} onClick={() => setType(id)}
                      className="py-3 px-3 rounded-xl text-sm transition-all text-center"
                      style={typeBien === id
                        ? { background: '#0B1F3A', color: 'white' }
                        : { background: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0' }}>
                      <p className="font-bold">{label}</p>
                      <p className="text-xs mt-0.5 opacity-60">{sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prix */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
                    Prix du bien
                  </label>
                  <span className="text-sm font-bold" style={{ color: '#059669' }}>
                    {prix.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <input type="range" min={50000} max={2000000} step={5000} value={prix}
                  onChange={e => setPrix(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600" />
                <div className="flex justify-between text-xs mt-1" style={{ color: '#CBD5E1' }}>
                  <span>50 000 €</span><span>2 000 000 €</span>
                </div>
                <input type="number" value={prix} min={0} step={5000}
                  onChange={e => setPrix(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="mt-2 w-full border rounded-xl px-4 py-2 text-center text-sm font-bold outline-none"
                  style={{ borderColor: '#E2E8F0', color: '#0F172A', background: '#F8FAFC' }} />
              </div>

              {/* Crédit toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>
                  Financement
                </label>
                <button onClick={() => setCredit(!avecCredit)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all"
                  style={avecCredit
                    ? { background: '#ECFDF5', border: '1px solid #A7F3D0' }
                    : { background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: avecCredit ? '#059669' : '#E2E8F0' }}>
                    {avecCredit && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: avecCredit ? '#065F46' : '#475569' }}>
                      Inclure frais de garantie crédit
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                      Hypothèque ~1,435% du capital emprunté
                    </p>
                  </div>
                </button>

                {avecCredit && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
                        Montant du crédit
                      </label>
                      <span className="text-sm font-bold" style={{ color: '#059669' }}>
                        {montantCredit.toLocaleString('fr-FR')} €
                      </span>
                    </div>
                    <input type="range" min={10000} max={prix} step={5000}
                      value={Math.min(montantCredit, prix)}
                      onChange={e => setMontantCredit(parseFloat(e.target.value))}
                      className="w-full accent-emerald-600" />
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Info neuf vs ancien */}
          <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
            <div className="flex items-center gap-2 mb-3">
              <Info size={14} color="#059669" />
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                {typeBien === 'neuf' ? 'Bien neuf' : 'Bien ancien'}
              </p>
            </div>
            {typeBien === 'neuf' ? (
              <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>
                Pour un logement neuf (VEFA ou moins de 5 ans), les droits de mutation
                sont remplacés par une <strong>taxe de publicité foncière à 0,715%</strong>.
                La TVA à 20% est déjà incluse dans le prix de vente affiché par le promoteur.
                Les frais de notaire sont donc significativement réduits : environ <strong>2 à 3%</strong> du prix.
              </p>
            ) : (
              <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>
                Pour un logement ancien (plus de 5 ans), les <strong>droits de mutation
                à titre onéreux (DMTO)</strong> s'élèvent à environ <strong>5,80%</strong> du prix
                (4,50% taxe départementale + 1,20% taxe communale + 0,10% frais d'assiette).
                Les frais totaux représentent généralement <strong>7 à 8%</strong> du prix.
              </p>
            )}
          </div>

          <AdZoneSquare />
        </div>

        {/* RIGHT — Results */}
        {res && (
          <div className="lg:col-span-2 space-y-4">

            {/* Pie chart décomposition */}
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
                Décomposition des frais
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={res.decomposition} cx="50%" cy="50%"
                      innerRadius={40} outerRadius={70}
                      dataKey="value" strokeWidth={0}>
                      {res.decomposition.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={v => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2 w-full">
                  {res.decomposition.map(({ label, value, color }) => {
                    const pctVal = (value / res.totalFrais * 100).toFixed(1)
                    return (
                      <div key={label}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                            <span className="text-xs" style={{ color: '#475569' }}>{label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs" style={{ color: '#94A3B8' }}>{pctVal}%</span>
                            <span className="text-sm font-bold w-20 text-right" style={{ color: '#0F172A' }}>
                              {fmt(value)}
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: '#F1F5F9' }}>
                          <div className="h-1.5 rounded-full"
                            style={{ width: `${pctVal}%`, background: color }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Récapitulatif ligne par ligne */}
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
                Détail des frais d'acquisition
              </p>
              {[
                { label: 'Prix du bien',                                                              value: res.prix,                       highlight: false, bold: false },
                { label: 'Émoluments notaire HT',                                                    value: res.emolumentsHT,                highlight: false, bold: false },
                { label: 'TVA sur émoluments (20%)',                                                  value: res.emolumentsTVA,               highlight: false, bold: false },
                { label: res.isNeuf ? 'Taxe de publicité foncière (0,715%)' : 'Droits de mutation (5,80%)', value: res.droitsMutation,        highlight: false, bold: false },
                { label: 'Contribution de sécurité immobilière (0,10%)',                             value: res.csi,                         highlight: false, bold: false },
                { label: 'Formalités administratives',                                               value: res.formalites,                  highlight: false, bold: false },
                { label: 'Débours (documents, extraits...)',                                         value: res.debours,                     highlight: false, bold: false },
                ...(avecCredit ? [{ label: `Frais de garantie crédit (${fmt(montantCredit)})`, value: res.fraisGarantie, highlight: false, bold: false }] : []),
                { label: 'Total frais de notaire',    value: res.totalFrais,  highlight: false, bold: true  },
                { label: 'Budget total acquisition',  value: res.budgetTotal, highlight: true,  bold: true  },
              ].map(({ label, value, highlight, bold }) => (
                <div key={label}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl mb-1"
                  style={highlight
                    ? { background: '#0B1F3A' }
                    : bold ? { background: '#F0FDF4', border: '1px solid #D1FAE5' } : {}}>
                  <span className="text-sm" style={{ color: highlight ? 'rgba(255,255,255,0.6)' : '#64748B' }}>
                    {label}
                  </span>
                  <span className={`text-sm ${bold ? 'font-bold' : 'font-semibold'}`}
                    style={{ color: highlight ? 'white' : bold ? '#059669' : '#0F172A' }}>
                    {fmt(value)}
                  </span>
                </div>
              ))}
            </div>

            {/* Export */}
            <button onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #065F46, #059669)' }}>
              <Download size={15} />
              Télécharger l'estimation frais de notaire 2026
            </button>

            <p className="text-xs text-center leading-relaxed" style={{ color: '#94A3B8' }}>
              Estimation indicative — non contractuelle · Barème notaires 2026 · Décret n°2016-230
            </p>
          </div>
        )}
      </div>

      <AdZoneInContent />

      {/* SEO CONTENT */}
      <section className="mt-4 rounded-2xl p-6 lg:p-8" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>
          Frais de notaire 2026 : barème, calcul et différence neuf / ancien
        </h2>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569' }}>
          Les frais de notaire — aussi appelés frais d'acquisition — représentent un poste de coût
          incontournable dans tout achat immobilier en France. Notre simulateur frais de notaire 2026
          applique le barème officiel issu du Décret n°2016-230 du 26 février 2016, révisé pour 2026,
          pour les biens anciens comme neufs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Frais de notaire dans l'ancien : ~7 à 8% en 2026
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Pour un logement ancien, les frais comprennent principalement les <strong>droits de
              mutation (DMTO) à 5,80%</strong>, qui constituent la majeure partie. S'y ajoutent
              les émoluments du notaire (barème dégressif), la contribution de sécurité immobilière
              (0,10%), les formalités et débours. Au total, comptez <strong>7 à 8% du prix</strong>.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Frais de notaire dans le neuf : ~2 à 3% en 2026
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Pour un logement neuf (VEFA ou construction), les droits de mutation sont remplacés
              par une <strong>taxe de publicité foncière de seulement 0,715%</strong>. La TVA à 20%
              est déjà incluse dans le prix affiché. Les frais totaux se limitent à <strong>2 à 3%</strong>
              du prix — un avantage fiscal significatif pour les primo-accédants.
            </p>
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: '#F8FAFC' }}>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: '#64748B' }}>
            FAQ — Frais de notaire France 2026
          </h3>
          {[
            {
              q: 'Les frais de notaire sont-ils négociables ?',
              a: "Partiellement. Les droits de mutation (taxes fiscales) sont fixes et non négociables. En revanche, depuis le décret de 2016, les notaires peuvent consentir une remise de 20% maximum sur leurs émoluments pour les transactions supérieures à 150 000 €. N'hésitez pas à le demander explicitement."
            },
            {
              q: 'Peut-on inclure les frais de notaire dans le crédit immobilier ?',
              a: "Oui, techniquement. Certaines banques acceptent de financer les frais de notaire dans le crédit (on parle alors de \"financement à 110%\"). Cependant, cela augmente le montant emprunté et le coût total du crédit. La plupart des établissements préfèrent que ces frais soient couverts par l'apport personnel."
            },
            {
              q: 'Quand les frais de notaire sont-ils payés ?',
              a: "Les frais de notaire sont payés le jour de la signature de l'acte authentique de vente (acte définitif), généralement 2 à 3 mois après la signature du compromis de vente. Le notaire demande généralement une provision lors de la signature du compromis pour couvrir les frais de débours anticipés."
            },
          ].map((item, i) => (
            <div key={i} className="py-3 border-t" style={{ borderColor: '#E2E8F0' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#0F172A' }}>{item.q}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{item.a}</p>
            </div>
          ))}
        </div>

        <p className="text-xs mt-5 p-3 rounded-lg" style={{ color: '#94A3B8', background: '#F1F5F9' }}>
          <strong>Sources :</strong> Décret n°2016-230 du 26 février 2016 · Ministère de la Justice ·
          Légifrance · Conseil Supérieur du Notariat (notaires.fr). Mis à jour : janvier 2026.
        </p>
      </section>
    </div>
  )
}
