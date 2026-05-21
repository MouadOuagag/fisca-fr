import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import BrutNetPage from './pages/BrutNetPage'
import AutoEntrepreneurPage from './pages/AutoEntrepreneurPage'
import FraisNotairePage from './pages/FraisNotairePage'
import TeletravailPage from './pages/TeletravailPage'
import CreditPage from './pages/CreditPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"                  element={<HomePage />} />
          <Route path="/brut-net"          element={<BrutNetPage />} />
          <Route path="/auto-entrepreneur" element={<AutoEntrepreneurPage />} />
          <Route path="/frais-notaire"     element={<FraisNotairePage />} />
          <Route path="/teletravail"       element={<TeletravailPage />} />
          <Route path="/credit"            element={<CreditPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
