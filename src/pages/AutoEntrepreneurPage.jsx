import { useState, useMemo } from 'react'
import { Download, Briefcase, Euro, TrendingUp, Receipt, AlertTriangle, CheckCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { calculerAE, ACTIVITES, AE_CONSTANTS } from '../lib/fiscalLogic/autoEntrepreneur'
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

const TVABadge = ({ res }) => {
  if (res.franciseTVA) return (
    <div className="flex items-start gap-3 rounded-2xl p-4"
      style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', boxShadow: CARD_SHADOW }}>
      <CheckCircle size={18} color="#059669" className="mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm font-bold mb-0.5" style={{ color: '#065F46' }}>
          ✓ Franchise en base de TVA — Vous ne facturez PAS la TVA
        </p>
        <p className="text-xs leading-relaxed" style={{ color: '#047857' }}>
          Votre CA ({fmt(res.caAnnuel)}) est en dessous du seuil de {fmt(res.seuilTVA)}.
          Mentionnez sur vos factures : <em>"TVA non applicable — art. 293 B du CGI"</em>
        </p>
      </div>
    </div>
  )
  if (res.zoneMajoree) return (
    <div className="flex items-start gap-3 rounded-2xl p-4"
      style={{ background: '#FFFBEB', border: '1px solid #FDE68A', boxShadow: CARD_SHADOW }}>
      <AlertTriangle size={18} color="#D97706" className="mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm font-bold mb-0.5" style={{ color: '#92400E' }}>
          ⚠ Zone de tolérance TVA — Franchise maintenue cette année
        </p>
        <p className="text-xs leading-relaxed" style={{ color: '#B45309' }}>
          Votre CA dépasse le seuil ({fmt(res.seuilTVA)}) mais reste sous le seuil majoré ({fmt(res.seuilMajore)}).
          La franchise est maintenue pour l'année en cours. Dès l'année suivante, vous serez assujetti à la TVA.
        </p>
      </div>
    </div>
  )
  return (
    <div className="flex items-start gap-3 rounded-2xl p-4"
      style={{ background: '#FFF1F2', border: '1px solid #FECDD3', boxShadow: CARD_SHADOW }}>
      <AlertTriangle size={18} color="#DC2626" className="mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm font-bold mb-0.5" style={{ color: '#9F1239' }}>
          TVA obligatoire — Vous devez facturer et collecter la TVA
        </p>
        <p className="text-xs leading-relaxed" style={{ color: '#BE123C' }}>
          Votre CA dépasse le seuil majoré de {fmt(res.seuilMajore)}.
          Vous devez vous immatriculer à la TVA et déposer des déclarations auprès de l'administration fiscale.
        </p>
      </div>
    </div>
  )
}

export default function AutoEntrepreneurPage() {
  const [caAnnuel, setCA]       = useState(40000)
  const [activite, setActivite] = useState('services_bnc')
  const [optionVL, setVL]       = useState(false)
  const [acre, setAcre]         = useState(false)

  const res = useMemo(() => calculerAE(caAnnuel, activite, optionVL, acre), [caAnnuel, activite, optionVL, acre])
  const activiteObj = ACTIVITES.find(a => a.id === activite)
  const seuilMax    = activite === 'vente' ? AE_CONSTANTS.SEUILS_CA.vente : AE_CONSTANTS.SEUILS_CA.services
  const pctSeuil    = Math.min(100, (caAnnuel / seuilMax) * 100)

  function handleExport() {
    if (!res) return
    const d = new Date().toLocaleDateString('fr-FR')
    const txt = [
      'FISCA.FR — Simulateur Auto-Entrepreneur 2026',
      `Généré le ${d}`,
      '─'.repeat(44),
      '',
      'PARAMÈTRES',
      `Activité             : ${activiteObj?.label}`,
      `CA annuel            : ${fmt(res.caAnnuel)}`,
      `Option VL            : ${optionVL ? 'Oui' : 'Non'}`,
      `ACRE (1ère année)    : ${acre ? 'Oui' : 'Non'}`,
      '',
      'RÉSULTATS',
      `Cotisations sociales : ${fmt(res.cotisationsSociales)} (${pct(res.tauxCotisations)})`,
      `Impôt sur le revenu  : ${fmt(res.impotRevenu)}`,
      `Revenu net annuel    : ${fmt(res.revenuNet)}`,
      `Revenu net mensuel   : ${fmt(res.revenuNetMensuel)}`,
      `Taux effectif global : ${pct(res.tauxEffectifGlobal)}`,
      '',
      'TVA',
      `Statut TVA           : ${res.franciseTVA ? 'Franchise en base' : res.zoneMajoree ? 'Zone de tolérance' : 'TVA obligatoire'}`,
      `Seuil franchise      : ${fmt(res.seuilTVA)}`,
      '',
      '─'.repeat(44),
      '⚠ Document indicatif — non contractuel',
      'Sources : URSSAF, DGFiP — 01/01/2026',
    ].join('\n')
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `auto-entrepreneur-${Math.round(caAnnuel / 1000)}k-2026.txt`
    a.click()
  }

  return (
    <div>
      {/* SEO H1 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 rounded-full" style={{ background: '#7C3AED' }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#7C3AED' }}>
            Simulateur gratuit
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#0F172A' }}>
          Simulateur Auto-Entrepreneur 2026 — Cotisations, IR et TVA
        </h1>
        <p className="text-sm mt-1.5 max-w-2xl" style={{ color: '#64748B' }}>
          Calculez vos cotisations sociales URSSAF, votre impôt sur le revenu et vérifiez
          votre statut TVA en temps réel. Taux officiels micro-entrepreneur 2026.
        </p>
      </div>

      {/* METRIC CARDS */}
      {res && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <MetricCard label="Revenu net annuel" icon={Euro} highlight
            value={fmt(res.revenuNet)}
            sub={`Mensuel : ${fmt(res.revenuNetMensuel)}`} />
          <MetricCard label="Cotisations URSSAF" icon={Receipt} color="#DC2626"
            value={fmt(res.cotisationsSociales)}
            sub={pct(res.tauxCotisations) + ' du CA'} />
          <MetricCard label="Impôt sur le revenu" icon={TrendingUp} color="#F59E0B"
            value={fmt(res.impotRevenu)}
            sub={optionVL ? 'Versement libératoire' : 'Barème progressif'} />
          <MetricCard label="Taux effectif global" icon={Briefcase} color="#7C3AED"
            value={pct(res.tauxEffectifGlobal)}
            sub={`${fmt(res.totalImpotCharges)} de charges totales`} />
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

              {/* Activité */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>
                  Type d'activité
                </label>
                <div className="space-y-2">
                  {ACTIVITES.map(a => (
                    <button key={a.id} onClick={() => setActivite(a.id)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all text-left"
                      style={activite === a.id
                        ? { background: '#0B1F3A', color: 'white' }
                        : { background: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0' }}>
                      <span className="font-medium">{a.label}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full ml-2 flex-shrink-0"
                        style={activite === a.id
                          ? { background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }
                          : { background: '#EEF2FF', color: '#6366F1' }}>
                        {(AE_CONSTANTS.COTISATIONS[a.id] * 100).toFixed(1)}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CA Annuel */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
                    Chiffre d'affaires annuel
                  </label>
                  <span className="text-sm font-bold" style={{ color: '#7C3AED' }}>
                    {caAnnuel.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <input type="range" min={1000} max={seuilMax} step={500}
                  value={Math.min(caAnnuel, seuilMax)}
                  onChange={e => setCA(parseFloat(e.target.value))}
                  className="w-full accent-violet-600" />
                <div className="flex justify-between text-xs mt-1" style={{ color: '#CBD5E1' }}>
                  <span>1 000 €</span>
                  <span>{seuilMax.toLocaleString('fr-FR')} € (seuil max)</span>
                </div>
                <input type="number" value={caAnnuel} min={0} step={500}
                  onChange={e => setCA(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="mt-2 w-full border rounded-xl px-4 py-2 text-center text-sm font-bold outline-none"
                  style={{ borderColor: '#E2E8F0', color: '#0F172A', background: '#F8FAFC' }} />

                {/* Barre seuil CA */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1" style={{ color: '#94A3B8' }}>
                    <span>Progression vers le seuil CA</span>
                    <span>{pctSeuil.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: '#F1F5F9' }}>
                    <div className="h-2 rounded-full transition-all"
                      style={{
                        width: `${pctSeuil}%`,
                        background: pctSeuil > 90 ? '#DC2626' : pctSeuil > 70 ? '#F59E0B' : '#7C3AED'
                      }} />
                  </div>
                </div>
              </div>

              {/* Options fiscales */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>
                  Options fiscales
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: 'vl', state: optionVL, set: setVL,
                      label: 'Versement libératoire IR',
                      sub: `${(AE_CONSTANTS.VERSEMENT_LIBERATOIRE[activite] * 100).toFixed(1)}% du CA — si RFR N-2 ≤ 27 794 €`,
                    },
                    {
                      id: 'acre', state: acre, set: setAcre,
                      label: 'ACRE (1ère année)',
                      sub: '50% de réduction des cotisations sociales',
                    },
                  ].map(({ id, state, set, label, sub }) => (
                    <button key={id} onClick={() => set(!state)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all"
                      style={state
                        ? { background: '#EEF2FF', border: '1px solid #C7D2FE' }
                        : { background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
                        style={{ background: state ? '#7C3AED' : '#E2E8F0' }}>
                        {state && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: state ? '#5B21B6' : '#475569' }}>{label}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Taux par activité */}
          <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>
              Taux cotisations 2026
            </p>
            {ACTIVITES.map(a => (
              <div key={a.id} className="flex justify-between items-center py-2 border-b last:border-0"
                style={{ borderColor: '#F1F5F9' }}>
                <span className="text-xs" style={{ color: '#64748B' }}>{a.label}</span>
                <span className="text-sm font-bold"
                  style={{ color: activite === a.id ? '#7C3AED' : '#0F172A' }}>
                  {(AE_CONSTANTS.COTISATIONS[a.id] * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>

          <AdZoneSquare />
        </div>

        {/* RIGHT — Results */}
        {res && (
          <div className="lg:col-span-2 space-y-4">

            {/* TVA Status */}
            <TVABadge res={res} />

            {/* Courbe CA → Net */}
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                  Évolution revenu net selon le CA
                </p>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: '#EEF2FF', color: '#7C3AED' }}>
                  {activiteObj?.label}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={res.courbe} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="ca" tick={{ fontSize: 10, fill: '#94A3B8' }}
                    tickFormatter={v => (v / 1000) + 'k'} />
                  <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }}
                    tickFormatter={v => (v / 1000).toFixed(0) + 'k'} />
                  <Tooltip
                    formatter={(v, n) => [fmt(v), n === 'net' ? 'Revenu net' : 'Cotisations']}
                    labelFormatter={v => `CA : ${fmt(v)}`} />
                  <Bar dataKey="cotisations" stackId="a" fill="#E2E8F0" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="net" stackId="a" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                {[['#7C3AED', 'Revenu net'], ['#E2E8F0', 'Cotisations sociales']].map(([color, label]) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B' }}>
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />{label}
                  </div>
                ))}
              </div>
            </div>

            {/* Récapitulatif fiscal */}
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
                Récapitulatif fiscal annuel
              </p>
              {[
                { label: "Chiffre d'affaires brut",                                    value: res.caAnnuel,             negative: false, highlight: false, bold: false },
                { label: `Cotisations sociales URSSAF (${pct(res.tauxCotisations)})`,  value: res.cotisationsSociales,  negative: true,  highlight: false, bold: false },
                { label: optionVL ? `Versement libératoire IR (${pct(res.tauxVL)})` : 'Impôt sur le revenu (barème)', value: res.impotRevenu, negative: true, highlight: false, bold: false },
                { label: 'Revenu net après charges & impôt',                           value: res.revenuNet,            negative: false, highlight: true,  bold: true  },
              ].map(({ label, value, negative, highlight, bold }) => (
                <div key={label} className="flex items-center justify-between px-4 py-3 rounded-xl mb-1"
                  style={highlight ? { background: '#0B1F3A' } : bold ? { background: '#F8FAFC' } : {}}>
                  <span className="text-sm" style={{ color: highlight ? 'rgba(255,255,255,0.6)' : '#64748B' }}>
                    {label}
                  </span>
                  <span className={`text-sm ${bold ? 'font-bold' : 'font-semibold'}`}
                    style={{ color: highlight ? 'white' : negative ? '#DC2626' : '#0F172A' }}>
                    {negative ? '-' : ''}{fmt(Math.abs(value))}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center mt-3 pt-3 border-t px-4" style={{ borderColor: '#E2E8F0' }}>
                <span className="text-xs" style={{ color: '#94A3B8' }}>Base imposable après abattement {pct(res.abattement)}</span>
                <span className="text-sm font-bold" style={{ color: '#475569' }}>{fmt(res.revenuImposable)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 px-4">
                <span className="text-xs" style={{ color: '#94A3B8' }}>Revenu net mensuel estimé</span>
                <span className="text-lg font-bold" style={{ color: '#7C3AED' }}>{fmt(res.revenuNetMensuel)}</span>
              </div>
            </div>

            {/* Seuils TVA référence */}
            <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>
                Seuils de franchise TVA 2026
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Vente — Seuil',           value: AE_CONSTANTS.SEUILS_TVA.vente_seuil },
                  { label: 'Vente — Seuil majoré',    value: AE_CONSTANTS.SEUILS_TVA.vente_majore },
                  { label: 'Services — Seuil',         value: AE_CONSTANTS.SEUILS_TVA.services_seuil },
                  { label: 'Services — Seuil majoré',  value: AE_CONSTANTS.SEUILS_TVA.services_majore },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs mb-1" style={{ color: '#94A3B8' }}>{label}</p>
                    <p className="text-sm font-bold" style={{ color: '#0F172A' }}>{fmt(value)}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: '#94A3B8' }}>
                Source : Loi de finances 2025 — applicables au 01/01/2026
              </p>
            </div>

            {/* Export */}
            <button onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #4C1D95, #7C3AED)' }}>
              <Download size={15} />
              Télécharger le récapitulatif auto-entrepreneur 2026
            </button>

            <p className="text-xs text-center leading-relaxed" style={{ color: '#94A3B8' }}>
              Simulation indicative — non contractuelle · Taux URSSAF 2026 · IR = barème progressif ou versement libératoire
            </p>
          </div>
        )}
      </div>

      <AdZoneInContent />

      {/* SEO CONTENT */}
      <section className="mt-4 rounded-2xl p-6 lg:p-8" style={{ background: 'white', boxShadow: CARD_SHADOW }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>
          Simulateur auto-entrepreneur 2026 : cotisations URSSAF, IR et seuils TVA
        </h2>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569' }}>
          Notre simulateur micro-entrepreneur 2026 calcule instantanément vos cotisations sociales URSSAF,
          votre impôt sur le revenu (barème progressif ou versement libératoire) et vérifie votre statut
          TVA selon les nouveaux seuils issus de la loi de finances 2025, applicables au 1er janvier 2026.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Quels sont les taux de cotisations auto-entrepreneur en 2026 ?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Les taux URSSAF 2026 varient selon l'activité : <strong>12,3%</strong> pour la vente de
              marchandises, <strong>21,2%</strong> pour les prestations de services BIC, <strong>23,1%</strong>
              pour les services BNC et <strong>23,2%</strong> pour les professions libérales CIPAV.
              Ces cotisations couvrent maladie-maternité, retraite de base et complémentaire, invalidité-décès
              et allocations familiales.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Nouveaux seuils TVA auto-entrepreneur 2026
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Suite à la loi de finances 2025, les <strong>seuils de franchise en base de TVA</strong>
              ont été abaissés. En 2026 : <strong>85 000 €</strong> (seuil) et <strong>93 500 €</strong>
              (seuil majoré) pour la vente, <strong>37 500 €</strong> et <strong>41 250 €</strong> pour
              les services. En dessous du seuil, vous facturez HT et mentionnez l'article 293 B du CGI.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              Le versement libératoire : intéressant ou non ?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Le <strong>versement libératoire de l'impôt sur le revenu</strong> permet de payer l'IR
              directement sur le CA (1% vente, 1,7% services BIC, 2,2% BNC). Il est avantageux si votre
              taux marginal d'imposition est supérieur à ces taux. Condition : revenu fiscal de référence
              N-2 inférieur à <strong>27 794 €</strong> par part fiscale.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: '#0F172A', fontSize: '15px' }}>
              L'ACRE : exonération partielle la 1ère année
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              L'<strong>ACRE (Aide à la Création et à la Reprise d'Entreprise)</strong> permet une
              réduction de 50% des cotisations sociales pendant les 12 premiers mois d'activité.
              Elle s'obtient automatiquement lors de la déclaration de début d'activité sur guichet-entreprises.fr.
              Elle ne s'applique pas à l'impôt sur le revenu.
            </p>
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: '#F8FAFC' }}>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: '#64748B' }}>
            FAQ — Auto-entrepreneur France 2026
          </h3>
          {[
            {
              q: "Peut-on dépasser le seuil de CA en micro-entreprise ?",
              a: "Si vous dépassez le seuil de CA (188 700 € vente / 77 700 € services) deux années consécutives, vous basculez automatiquement au régime réel simplifié l'année suivante. Un dépassement ponctuel une seule année ne remet pas en cause le régime micro."
            },
            {
              q: "Comment déclarer son CA en tant qu'auto-entrepreneur ?",
              a: "La déclaration du CA se fait mensuellement ou trimestriellement sur le site autoentrepreneur.urssaf.fr. Les cotisations sont calculées en appliquant le taux correspondant à votre activité sur le CA déclaré. En cas de CA nul, la déclaration reste obligatoire (avec 0 €)."
            },
            {
              q: "Quelle protection sociale pour un auto-entrepreneur ?",
              a: "Le micro-entrepreneur est affilié à la Sécurité Sociale des Indépendants (SSI, ex-RSI). Les cotisations donnent droit à : assurance maladie-maternité, retraite de base, retraite complémentaire, invalidité-décès. En revanche, il n'y a pas de cotisation chômage — aucune indemnisation ARE en cas de cessation d'activité."
            },
          ].map((item, i) => (
            <div key={i} className="py-3 border-t" style={{ borderColor: '#E2E8F0' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#0F172A' }}>{item.q}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{item.a}</p>
            </div>
          ))}
        </div>

        <p className="text-xs mt-5 p-3 rounded-lg" style={{ color: '#94A3B8', background: '#F1F5F9' }}>
          <strong>Sources :</strong> URSSAF (urssaf.fr) · DGFiP (impots.gouv.fr) · Légifrance ·
          Loi de finances 2025 (seuils TVA) · guichet-entreprises.fr.
          Mis à jour : janvier 2026. Résultats indicatifs — non contractuels.
        </p>
      </section>
    </div>
  )
}
