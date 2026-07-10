import Header from './Header'
import Footer from './Footer'
import BottomNav from './BottomNav'
import CookieBanner from '../ui/CookieBanner'

export default function Layout({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
    }}>
      <Header />
      <main
        id="main-content"
        role="main"
        style={{
          flex: 1,
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%',
          padding: '1.5rem 1rem 6rem',
        }}>
        {children}
      </main>
      <Footer />
      <BottomNav />
      <CookieBanner />
    </div>
  )
}
