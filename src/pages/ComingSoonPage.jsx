export default function ComingSoonPage({ title, description, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: '#F1F5F9' }}>
        {Icon && <Icon size={26} style={{ color: '#94A3B8' }} />}
      </div>
      <h1 className="text-2xl font-bold mb-3" style={{ color: '#0F172A' }}>{title}</h1>
      <p className="text-sm max-w-sm leading-relaxed mb-6" style={{ color: '#64748B' }}>{description}</p>
      <span className="px-5 py-2 rounded-full text-sm font-bold" style={{ background: '#EFF6FF', color: '#1D4ED8' }}>
        Disponible prochainement
      </span>
    </div>
  )
}
