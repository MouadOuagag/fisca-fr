import { useState, useMemo } from 'react'
import { Download, Wifi, Euro, Zap, TrendingUp, Home } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { calculerTeletravail, TELETRAVAIL_CONSTANTS } from '../lib/fiscalLogic/teletravail'
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

export default function TeletravailPage() {
  const [joursSemaine, setJours]         = useState(2)
  const [salaireNet, setSalaire]         = useState(3000)
  const [methode, setMethode]            = useState('forfait')
  const [typePoste, setPoste]            = useState('laptop')
  const [surfaceBureau, setSurface]      = useState(10)
  const [surfaceTotale, setSurfaceTotale] = useState(60)
  const [avecInternet, setInternet]      = useState(true)
  const [avecTelephone, setTel]          = useState(false)
  const [avecMobilier, setMobilier]      = useState(false)

  const res = useMemo(() => calculerTeletravail({
    joursSemaine, salaireNet, surfaceBureau, surfaceTotale,
    typePoste, methode, avecInternet, avecTelephone, avecMobilier,
  }), [joursSemaine, salaireNet, surfaceBureau, surfaceTotale,
       typePoste, methode, avecInternet, avecTelephone, avecMobilier])

  const compareData = [1,2,3,4,5].map(j => {
    const f = calculerTeletravail({ joursSemaine: j, methode: 'forfait', avecInternet, avecTelephone, avecMobilier, surfaceBureau, surfaceTotale, typePoste })
    const r = calculerTeletravail({ joursSemaine: j, methode: 'reel',    avecInternet, avecTelephone, avecMobilier, surfaceBureau, surfaceTotale, typePoste })
    return { jours: `${j}j/sem`, forfait: Math.round(f.indemniteAnnForfait), reel: Math.round(r.totalReelAnnuel) }
  })

  function handleExport() {
    if (!res) return
    const d = new Date().toLocaleDateString('fr-FR')
    const txt = [
      'FISCA.FR — Calculateur Indemnités Télétravail 2026',
      `Généré le ${d}`,
      '─'.repeat(44),
      '',
      'PARAMÈTRES',
      `Jours télétravail/semaine  : ${res.joursSemaine}`,
      `Jours télétravaillés/an    : ${res.joursParAn}`,
      `Méthode de calcul          : ${methode === 'forfait' ? 'Forfait URSSAF' : 'Frais réels'}`,
      '',
      'INDEMNITÉS EXONÉRÉES',
      `Indemnité mensuelle        : ${fmt(res.indemnitesMensuelles)}`,
      `Indemnité annuelle         : ${fmt(res.indemniteAnnuelle)}`,
      '',
      'ÉCONOMIES RÉALISÉES',
      `Économies transport/an     : ${fmt(res.economiesTransport)}`,
      `Économies repas/an         : ${fmt(res.economiesRepas)}`,
      `Total économies/an         : ${fmt(res.economiesTotal)}`,
      '',
      `GAIN NET TOTAL ANNUEL      : ${fmt(res.gainNetAnnuel)}`,
      `GAIN NET TOTAL MENSUEL     : ${fmt(res.gainNetMensuel)}`,
      '',
      '─'.repeat(44),
      '⚠ Document indicatif — non contractuel',
      'Sources : URSSAF, ANI 13/11/2020, DGFiP — 2026',
    ].join('\n')
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `teletravail-${joursSemaine}j-2026.txt`
    a.click()
  }

  return (
    <div>
      {/* SEO H1 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full" style={{ background: '#0891B2' }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0891B2' }}>
            Calculateur gratuit
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#0F172A' }}>
          Calculateur Indemnités Télétravail 2026 — Forfait & Frais Réels
        </h1>
        <p className="text-sm mt-1.5 max-w-2xl" style={{ color: '#64748B' }}>
          Calculez vos indemnités télétravail exonérées de charges sociales et d'impôt
          selon le forfait URSSAF 2026 ou la méthode des frais réels (internet, électricité, mobilier).
        </p>
      </div>

      {/* METRIC CARDS */}
      {res && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <MetricCard label="Indemnité mensuelle" icon={Euro} highlight
            value={fmt(res.indemnitesMensuelles)}
            sub={`Annuel : ${fmt(res.indemniteAnnuelle)}`} />
          <MetricCard label="Jours télétravaillés" icon={Home} color="#0891B2"
            value={`${res.joursParAn} jours`}
            sub={`${res.joursParMois} jours/mois en moyenne`} />
          <MetricCard label="Économies estimées" icon={TrendingUp} color="#059669"
            value={fmt(res.economiesTotal / 12)}
            sub="Transport + repas — /mois" />
          <MetricCard label="Gain net total" icon={Zap} color="#F59E0B"
            value={fmt(res.gainNetMensuel)}
            sub="Indemnités + économies / mois" />
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

              {/* Jours/semaine */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
                    Jours de télétravail / semaine
                  </label>
                  <span className="text-sm font-bold" style={{ color: '#0891B2' }}>{joursSemaine}j</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1,2,3,4,5].map(j => (
                    <button key={j} onClick={() => setJours(j)}
                      className="py-2.5 rounded-xl text-sm font-bold transition-all"
                      style={joursSemaine === j
                        ? { background: '#0B1F3A', color: 'white' }
                        : { background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}>
                      {j}
                    </button>
                  ))}
                </div>
                <p className="text-xs mt-2 text-center" style={{ color: '#94A3B8' }}>
                  → {res.joursParAn} jours/an · {res.joursParMois} jours/mois
                </p>
              </div>

              {/* Méthode */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>
                  Méthode de calcul
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'forfait', label: '📋 Forfait',     sub: `${TELETRAVAIL_CONSTANTS.FORFAIT_JOURNALIER}€/jour` },
                    { id: 'reel',   label: '🧾 Frais réels', sub: 'Basé sur vos charges' },
                  ].map(({ id, label, sub }) => (
                    <button key={id} onClick={() => setMethode(id)}
                      className="py-3 px-3 rounded-xl text-sm transition-all text-center"
                      style={methode === id
                        ? { background: '#0B1F3A', color: 'white' }
                        : { background: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0' }}>
                      <p className="font-bold">{label}</p>
                      <p className="text-xs mt-0.5 opacity-60">{sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Salaire */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
                    Salaire net mensuel
                  </label>
                  <span className="text-sm font-bold" style={{ color: '#0891B2' }}>
                    {salaireNet.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <input type="range" min={1400} max={15000} step={100} value={salaireNet}
                  onChange={e => setSalaire(parseFloat(e.target.value))}
                  className="w-full accent-cyan-600" />
              </div>

              {/* Frais réels — options */}
              {methode === 'reel' && (
                <div className="space-y-3 pt-2 border-t" style={{ borderColor: '#F1F5F9' }}>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
                    Charges à inclure
                  </p>

                  {/* Type de poste */}
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: '#94A3B8' }}>Type de poste</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'laptop', label: '💻 Laptop', sub: '45W' },
                        { id: 'fixe',   label: '🖥 PC fixe', sub: '150W' },
                      ].map(({ id, label, sub }) => (
                        <button key={id} onClick={() => setPoste(id)}
                          className="py-2 rounded-xl text-xs font-semibold transition-all"
                          style={typePoste === id
                            ? { background: '#0891B2', color: 'white' }
                            : { background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}>
                          {label} <span className="opacity-60">{sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Surfaces */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs" style={{ color: '#94A3B8' }}>Surface bureau</label>
                      <span className="text-xs font-bold" style={{ color: '#0891B2' }}>{surfaceBureau} m²</span>
                    </div>
                    <input type="range" min={4} max={30} step={1} value={surfaceBureau}
                      onChange={e => setSurface(parseFloat(e.target.value))}
                      className="w-full accent-cyan-600" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs" style={{ color: '#94A3B8' }}>Surface logement totale</label>
                      <span className="text-xs font-bold" style={{ color: '#0891B2' }}>{surfaceTotale} m²</span>
                    </div>
                    <input type="range" min={20} max={200} step={5} value={surfaceTotale}
                      onChange={e => setSurfaceTotale(parseFloat(e.target.value))}
                      className="w-full accent-cyan-600" />
                  </div>

                  {/* Checkboxes */}
                  {[
                    { state: avecInternet,  set: setInternet,  label: 'Abonnement internet', sub: `50% de ${fmt(TELETRAVAIL_CONSTANTS.REEL.internet_mois)}/mois`,          icon: '📶' },
                    { state: avecTelephone, set: setTel,       label: 'Forfait téléphone',   sub: `40% de ${fmt(TELETRAVAIL_CONSTANTS.REEL.telephone_mois)}/mois`,          icon: '📱' },
                    { state: avecMobilier,  set: setMobilier,  label: 'Mobilier de bureau',  sub: `${fmt(TELETRAVAIL_CONSTANTS.REEL.mobilier_annuel)}/an amortissement`,     icon: '🪑' },
                  ].map(({ state, set, label, sub, icon }) => (
                    <button key={label} onClick={() => set(!state)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                      style={state
                        ? { background: '#ECFEFF', border: '1px solid #A5F3FC' }
                        : { background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ background: state ? '#0891B2' : '#E2E8F0' }}>
                        {state && <span className="text-white text-xs">✓</span>}
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: state ? '#0E7490' : '#475569' }}>
                          {icon} {label}
                        </p>
                        <p className="text-xs" style={{ color: '#94A3B8' }}>{sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <AdZoneSquare />
        </div>

        {/* RIGHT — Results */}
        {res && (
          <div className="lg:col-span-2 space-y-4">

            {/* Comparaison forfait vs réel */}
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                  Indemnité annuelle — forfait vs frais réels
                </p>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: '#ECFEFF', color: '#0E7490' }}>
                  Par nb de jours
                </span>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={compareData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="jours" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} tickFormatter={v => v + '€'} />
                  <Tooltip formatter={(v, n) => [fmt(v), n === 'forfait' ? 'Forfait URSSAF' : 'Frais réels']} />
                  <Bar dataKey="forfait" fill="#0891B2" radius={[4,4,0,0]} />
                  <Bar dataKey="reel"    fill="#0B1F3A" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                {[['#0891B2','Forfait URSSAF'], ['#0B1F3A','Frais réels']].map(([c, l]) => (
                  <div key={l} className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B' }}>
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />{l}
                  </div>
                ))}
              </div>
            </div>

            {/* Récapitulatif détaillé */}
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
                Récapitulatif — {methode === 'forfait' ? 'Méthode forfait URSSAF' : 'Méthode frais réels'}
              </p>

              {methode === 'forfait' ? (
                <div>
                  {[
                    { label: `${res.joursParMois} jours × ${TELETRAVAIL_CONSTANTS.FORFAIT_JOURNALIER} €`, value: res.indemnitesMensForfait, sub: '/mois',  bold: false },
                    { label: `${res.joursParAn}  jours × ${TELETRAVAIL_CONSTANTS.FORFAIT_JOURNALIER} €`, value: res.indemniteAnnForfait,   sub: '/an',    bold: true  },
                  ].map(({ label, value, sub, bold }) => (
                    <div key={label} className="flex justify-between items-center px-4 py-2.5 rounded-xl mb-1"
                      style={bold ? { background: '#ECFEFF' } : {}}>
                      <span className="text-sm" style={{ color: '#64748B' }}>{label}</span>
                      <span className={`text-sm ${bold ? 'font-bold' : 'font-semibold'}`}
                        style={{ color: bold ? '#0891B2' : '#0F172A' }}>
                        {fmt(value)} <span style={{ color: '#94A3B8', fontSize: '11px' }}>{sub}</span>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {[
                    { label: '📶 Abonnement internet', value: res.internetAnnuel,      show: avecInternet },
                    { label: '⚡ Électricité',         value: res.electriciteAnnuelle, show: true },
                    { label: '📱 Forfait téléphone',   value: res.telephoneAnnuel,     show: avecTelephone },
                    { label: '🪑 Mobilier de bureau',  value: res.mobilierAnnuel,      show: avecMobilier },
                  ].filter(d => d.show && d.value > 0).map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center px-4 py-2.5 rounded-xl mb-1">
                      <span className="text-sm" style={{ color: '#64748B' }}>{label}</span>
                      <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>
                        {fmt(value)}<span style={{ color: '#94A3B8', fontSize: '11px' }}> /an</span>
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center px-4 py-3 rounded-xl mt-1"
                    style={{ background: '#ECFEFF' }}>
                    <span className="text-sm font-bold" style={{ color: '#0E7490' }}>Total frais réels</span>
                    <span className="text-sm font-bold" style={{ color: '#0891B2' }}>
                      {fmt(res.totalReelAnnuel)}<span style={{ color: '#94A3B8', fontSize: '11px' }}> /an</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Économies */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#F1F5F9' }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#94A3B8' }}>
                  Économies supplémentaires estimées
                </p>
                {[
                  { label: '🚇 Transports économisés', value: res.economiesTransport },
                  { label: '🥗 Repas midi économisés',  value: res.economiesRepas },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center px-4 py-2 rounded-xl mb-1">
                    <span className="text-sm" style={{ color: '#64748B' }}>{label}</span>
                    <span className="text-sm font-semibold" style={{ color: '#059669' }}>
                      +{fmt(value)}<span style={{ color: '#94A3B8', fontSize: '11px' }}> /an</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Gain total */}
              <div className="mt-3 px-4 py-4 rounded-2xl" style={{ background: '#0B1F3A' }}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      Gain net total estimé
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Indemnités exonérées + économies
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{fmt(res.gainNetMensuel)}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      /mois · {fmt(res.gainNetAnnuel)}/an
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Export */}
            <button onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #0E7490, #0891B2)' }}>
              <Download size={15} />
              Télécharger le récapitulatif télétravail 2026
            </button>

            <p className="text-xs text-center leading-relaxed" style={{ color: '#94A3B8' }}>
              Simulation indicative — non contractuelle · Forfait URSSAF 2026 · ANI 13/11/2020
            </p>
          </div>
        )}
      </div>

      <AdZoneInContent />

      {/* SEO CONTENT */}
      <section className="mt-4 rounded-2xl p-6 lg:p-8" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>
          Indemnités télétravail 2026 : forfait URSSAF, frais réels et exonérations
        </h2>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569' }}>
          Depuis l'Accord National Interprofessionnel (ANI) du 13 novembre 2020 et les précisions
          de l'URSSAF, les employeurs peuvent verser des indemnités télétravail exonérées de
          cotisations sociales et d'impôt sur le revenu. Notre calculateur applique le
          <strong> forfait journalier URSSAF 2026 de 2,70 €/jour</strong> ainsi que la méthode
          des frais réels pour une estimation personnalisée.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Le forfait URSSAF 2026 : 2,70 €/jour
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              L'URSSAF admet un <strong>forfait de 2,70 €/jour télétravaillé</strong> (révisé 2026),
              exonéré de cotisations sociales sans justificatif. Le plafond mensuel est de
              <strong> 59,40 €</strong> (22 jours × 2,70 €) et annuel de 654,60 €.
              L'employeur peut verser plus avec justificatifs dans la limite des frais réels.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Méthode des frais réels : quels frais inclure ?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              La méthode des frais réels couvre : <strong>internet</strong> (50% de l'abonnement),
              <strong> électricité</strong> (calculée au prorata de la surface du bureau et du temps
              de travail), <strong>téléphone</strong> (40% du forfait), et le <strong>mobilier de
              bureau</strong> (amortissement annuel de 550 €). Chaque poste doit être justifié
              par des factures conservées 3 ans.
            </p>
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: '#F8FAFC' }}>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: '#64748B' }}>
            FAQ — Télétravail et indemnités France 2026
          </h3>
          {[
            {
              q: "L'indemnité télétravail est-elle obligatoire ?",
              a: "Non, l'employeur n'est pas légalement obligé de verser une indemnité télétravail, sauf si votre convention collective ou votre accord d'entreprise le prévoit. Cependant, l'ANI de 2020 recommande fortement la prise en charge des frais supplémentaires liés au télétravail. Vérifiez votre accord de télétravail ou votre convention collective."
            },
            {
              q: "L'indemnité télétravail est-elle imposable ?",
              a: "Non, dans les limites fixées par l'URSSAF et la DGFiP. Le forfait de 2,70 €/jour est exonéré de cotisations sociales et d'impôt sur le revenu. Au-delà, le remboursement de frais réels est également exonéré si les montants sont justifiés et correspondent à des dépenses professionnelles réelles."
            },
            {
              q: "Peut-on cumuler l'indemnité télétravail et la déduction des frais réels à l'IR ?",
              a: "Non. Si votre employeur vous verse une indemnité télétravail exonérée, vous ne pouvez pas déduire ces mêmes frais dans votre déclaration de revenus (que vous optiez pour l'abattement forfaitaire de 10% ou les frais réels). Il faut choisir la méthode la plus avantageuse selon votre situation."
            },
          ].map((item, i) => (
            <div key={i} className="py-3 border-t" style={{ borderColor: '#E2E8F0' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#0F172A' }}>{item.q}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{item.a}</p>
            </div>
          ))}
        </div>
        <p className="text-xs mt-5 p-3 rounded-lg" style={{ color: '#94A3B8', background: '#F1F5F9' }}>
          <strong>Sources :</strong> URSSAF (urssaf.fr) · ANI du 13/11/2020 · DGFiP ·
          BOFiP BOI-RSA-CHAMP-20-50-10. Mis à jour : janvier 2026. Résultats indicatifs.
        </p>
      </section>
    </div>
  )
}
