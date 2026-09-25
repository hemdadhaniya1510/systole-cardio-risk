import { Link } from 'react-router-dom'

const COLUMNS = [
  {
    heading: 'Product',
    links: [
      { to: '/predict', label: 'Run assessment' },
      { to: '/insights', label: 'Data insights' },
      { to: '/model', label: 'Model info' }
    ]
  },
  {
    heading: 'Resources',
    links: [
      { to: '/blog', label: 'Articles' },
      { to: '/faq', label: 'FAQ' },
      { to: '/disclaimer', label: 'Disclaimer' }
    ]
  },
  {
    heading: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="site-footer-brand">
          <Link to="/" className="topnav-brand" aria-label="Systole overview">
            <div className="masthead-mark" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M2 12h4l2-7 4 14 3-10 2 3h5" stroke="var(--accent)" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span>Systole</span>
          </Link>
          <div className="site-footer-kicker">LOCAL / EXPLAINABLE / PRIVATE</div>
          <p>
            A browser-side cardiovascular screening estimate — not a
            diagnosis, never a replacement for a clinician.
          </p>
          <Link to="/predict" className="site-footer-primary-link">Start a new assessment <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="site-footer-cols">
          {COLUMNS.map((col) => (
            <div className="site-footer-col" key={col.heading}>
              <div className="site-footer-heading">{col.heading}</div>
              {col.links.map((l) => (
                <Link key={l.to} to={l.to} className="site-footer-link">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Systole · Screening estimate only</span>
        <span className="site-footer-note"><span className="status-dot" /> Model trained offline · Runs locally in your browser</span>
      </div>
    </footer>
  )
}
