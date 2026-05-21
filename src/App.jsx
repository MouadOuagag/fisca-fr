import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Briefcase, Building2, Wifi, Home } from 'lucide-react'
import Layout from './components/layout/Layout'
import BrutNetPage from './pages/BrutNetPage'
import ComingSoonPage from './pages/ComingSoonPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<BrutNetPage />} />
          <Route path="/auto-entrepreneur" element={
            <ComingSoonPage title="Simulateur Auto-Entrepreneur"
              description="Calcul des cotisations sociales (12,3% à 23,2% selon activité) et seuils de franchise TVA pour les micro-entrepreneurs 2026."
              icon={Briefcase} />} />
          <Route path="/frais-notaire" element={
            <ComingSoonPage title="Simulateur Frais de Notaire"
              description="Estimation des frais d'acquisition immobilière (neuf/ancien) selon le département et le prix de vente 2026."
              icon={Building2} />} />
          <Route path="/teletravail" element={
            <ComingSoonPage title="Calculateur Télétravail"
              description="Indemnités télétravail exonérées (internet, électricité, mobilier) selon la convention collective 2026."
              icon={Wifi} />} />
          <Route path="/credit" element={
            <ComingSoonPage title="Simulateur Crédit Immobilier"
              description="Mensualités, coût total du crédit et taux d'endettement selon les taux du marché français 2026."
              icon={Home} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
