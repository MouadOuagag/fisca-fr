import Header from './Header'
import Footer from './Footer'
import CookieBanner from '../ui/CookieBanner'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F6FA' }}>
      <Header />
      <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
