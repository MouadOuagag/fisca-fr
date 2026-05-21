import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import BrutNetPage from './pages/BrutNetPage'
import AutoEntrepreneurPage from './pages/AutoEntrepreneurPage'
import FraisNotairePage from './pages/FraisNotairePage'
import TeletravailPage from './pages/TeletravailPage'
import CreditPage from './pages/CreditPage'
import MentionsLegales from './pages/legal/MentionsLegales'
import Confidentialite from './pages/legal/Confidentialite'
import CGU from './pages/legal/CGU'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"                           element={<HomePage />} />
          <Route path="/brut-net"                   element={<BrutNetPage />} />
          <Route path="/auto-entrepreneur"          element={<AutoEntrepreneurPage />} />
          <Route path="/frais-notaire"              element={<FraisNotairePage />} />
          <Route path="/teletravail"                element={<TeletravailPage />} />
          <Route path="/credit"                     element={<CreditPage />} />
          <Route path="/mentions-legales"           element={<MentionsLegales />} />
          <Route path="/politique-confidentialite"  element={<Confidentialite />} />
          <Route path="/cgu"                        element={<CGU />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
