import Header from './Header'
import { AdZoneBanner } from '../ui/AdZone'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen" style={{ background: '#F4F6FA' }}>
      <Header />
      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6">
        {/* AdSense Banner Zone — Top of content */}
        <AdZoneBanner />
        {children}
      </div>
    </div>
  )
}
