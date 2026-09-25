import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Overview', icon: 'grid' },
  { to: '/predict', label: 'Risk assessment', icon: 'pulse' },
  { to: '/insights', label: 'Data insights', icon: 'chart' },
  { to: '/model', label: 'Model registry', icon: 'layers' },
]

const SUPPORT_ITEMS = [
  { to: '/about', label: 'About', icon: 'info' },
  { to: '/faq', label: 'Help', icon: 'help' },
]

function Icon({ name }) {
  const common = { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    pulse: <path d="M3 12h4l2.2-6 4.2 12 2.3-7H21" />,
    chart: <><path d="M4 19V5" /><path d="M4 19h17" /><path d="m7 15 3-4 3 2 5-7" /></>,
    layers: <><path d="m12 3 8 4-8 4-8-4 8-4Z" /><path d="m4 12 8 4 8-4" /><path d="m4 17 8 4 8-4" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.7 9a2.4 2.4 0 1 1 4 1.8c-1 .7-1.7 1.2-1.7 2.7" /><path d="M12 17h.01" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`side-rail top-header${menuOpen ? ' mobile-menu-open' : ''}`}>
      <NavLink to="/" onClick={closeMenu} className="brand-lockup" aria-label="Systole overview">
        <div className="brand-mark"><Icon name="pulse" /></div>
        <div><strong>Systole</strong><span>Clinical telemetry</span></div>
      </NavLink>
      <button className="mobile-menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      <nav id="primary-navigation" className="rail-nav header-main-nav" aria-label="Primary navigation">
        {NAV_ITEMS.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={closeMenu} className={({ isActive }) => `rail-link${isActive ? ' active' : ''}`}><Icon name={item.icon} /><span>{item.label}</span>{item.to === '/predict' && <kbd>⌘ P</kbd>}</NavLink>)}
      </nav>
      <nav className="rail-nav header-support-nav" aria-label="Support navigation">
        {SUPPORT_ITEMS.map((item) => <NavLink key={item.to} to={item.to} onClick={closeMenu} className="rail-link"><Icon name={item.icon} /><span>{item.label}</span></NavLink>)}
      </nav>
      <div className="header-actions"><div className="header-online"><span className="status-dot" />Model online</div><NavLink to="/predict" onClick={closeMenu} className="header-cta">New assessment <span>↗</span></NavLink></div>
    </header>
  )
}
