import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import OnboardingPage from './pages/OnboardingPage'
import HomePage from './pages/HomePage'
import BrutNetArticle from './pages/blog/BrutNetArticle'
import AutoEntrepreneurArticle from './pages/blog/AutoEntrepreneurArticle'
import FraisNotaireArticle from './pages/blog/FraisNotaireArticle'
import TeletravailArticle from './pages/blog/TeletravailArticle'
import CreditArticle from './pages/blog/CreditArticle'
import BlogIndex from './pages/blog/BlogIndex'
import ArticlePage from './pages/blog/ArticlePage'
import MentionsLegales from './pages/legal/MentionsLegales'
import Confidentialite from './pages/legal/Confidentialite'
import CGU from './pages/legal/CGU'
import AProposPage from './pages/AProposPage'

function LayoutRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/"                          element={<HomePage />} />
        <Route path="/brut-net"                  element={<BrutNetArticle />} />
        <Route path="/auto-entrepreneur"         element={<AutoEntrepreneurArticle />} />
        <Route path="/frais-notaire"             element={<FraisNotaireArticle />} />
        <Route path="/teletravail"               element={<TeletravailArticle />} />
        <Route path="/credit"                    element={<CreditArticle />} />
        <Route path="/blog"                      element={<BlogIndex />} />
        <Route path="/articles/:slug"            element={<ArticlePage />} />
        <Route path="/mentions-legales"          element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<Confidentialite />} />
        <Route path="/cgu"                       element={<CGU />} />
        <Route path="/a-propos"                  element={<AProposPage />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/commencer" element={<OnboardingPage />} />
        <Route path="*"          element={<LayoutRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
