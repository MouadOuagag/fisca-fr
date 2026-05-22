import { Helmet } from 'react-helmet-async'

export default function SEOHead({
  title,
  description,
  canonical,
  type = 'website',
  schema = null,
}) {
  const siteName = 'MonBilanFacile.fr'
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Référence Fiscale 2026`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      {canonical && <link rel="canonical" href={`https://monbilanfacile.fr${canonical}`} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      {canonical && <meta property="og:url" content={`https://monbilanfacile.fr${canonical}`} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
