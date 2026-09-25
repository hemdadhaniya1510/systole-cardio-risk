import { Link } from 'react-router-dom'
import PulseWave from '../components/PulseWave.jsx'
import GlyphPortal from '../components/GlyphPortal.jsx'
import { METRICS } from '../model.js'

const SIGNALS = [
  { label: 'Model confidence', value: `${(METRICS.rocAuc * 100).toFixed(1)}%`, note: 'ROC-AUC', tone: 'teal' },
  { label: 'Assessment latency', value: '< 20ms', note: 'in-browser', tone: 'blue' },
  { label: 'Records in model', value: '68.5k', note: 'cleaned cohort', tone: 'violet' },
]

function Arrow() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> }

export default function Home() {
  return (
    <div className="page dashboard-page fade-up">
      <GlyphPortal word="SYSTOLE">
        <div className="portal-content-inner">
          <span className="eyebrow teal">CARDIOVASCULAR SCREENING / 01</span>
          <h2>Step inside the signal.</h2>
          <p>Eleven clinical variables, one explainable screening readout. Built for calm, fast decisions.</p>
          <Link to="/predict" className="portal-cta">Enter assessment <span>↘</span></Link>
        </div>
      </GlyphPortal>
      <header className="console-topbar">
        <div><span className="breadcrumb">Workspace / Overview</span><h1>Clinical screening overview</h1></div>
        <div className="topbar-actions"><div className="secure-chip"><span className="status-dot" />Local session secure</div><Link to="/predict" className="topbar-cta">New assessment <Arrow /></Link></div>
      </header>

      <section className="overview-hero">
        <div className="hero-intro">
          <div className="eyebrow teal">CARDIOVASCULAR SCREENING / 01</div>
          <h2>See the signal<br /><em>before it escalates.</em></h2>
          <p>Systole transforms 11 clinical variables into a fast, explainable cardiovascular risk screening estimate — entirely in your browser.</p>
          <div className="hero-actions"><Link to="/predict" className="btn-primary">Start assessment <Arrow /></Link><Link to="/insights" className="text-link">Explore model performance <Arrow /></Link></div>
          <div className="hero-meta"><span><b className="pulse-live" /> Screening engine ready</span><span>Last synced just now</span></div>
        </div>
        <div className="telemetry-card">
          <div className="telemetry-header"><span><b className="tiny-dot" /> LIVE TELEMETRY</span><span className="mono">SYS / 24.09</span></div>
          <div className="telemetry-screen"><PulseWave intensity={0.58} color="var(--accent)" height={132} /><div className="telemetry-readout"><div><small>HEART RATE</small><strong>72 <i>BPM</i></strong></div><div><small>OXYGEN SAT.</small><strong>98 <i>%</i></strong></div><div><small>RHYTHM</small><strong className="ok-text">STABLE</strong></div></div></div>
          <div className="telemetry-footer"><span>Signal quality</span><span className="quality-bars"><i /><i /><i /><i /><i /></span><strong>Excellent</strong></div>
        </div>
      </section>

      <div className="section-heading"><div><span className="eyebrow">SYSTEM STATUS</span><h3>Operational at a glance</h3></div><span className="updated-label">Updated 09:42:18</span></div>
      <section className="signal-grid">{SIGNALS.map((signal) => <div className={`signal-card ${signal.tone}`} key={signal.label}><div className="signal-top"><span>{signal.label}</span><span className="signal-arrow">↗</span></div><strong>{signal.value}</strong><small>{signal.note}</small><div className="signal-spark"><span /><span /><span /><span /><span /><span /><span /></div></div>)}</section>

      <section className="lower-grid">
        <div className="info-panel protocol-panel"><div className="panel-kicker">01 / WORKFLOW</div><h3>A clearer path from intake to insight.</h3><p>Designed for quick, repeatable screening. Enter the chart, review the explainable readout, and keep a local trail of assessments.</p><div className="protocol-steps"><div><b>01</b><span>Enter patient chart</span></div><div><b>02</b><span>Run risk assessment</span></div><div><b>03</b><span>Review contributing factors</span></div></div><Link to="/predict" className="panel-link">Open assessment workspace <Arrow /></Link></div>
        <div className="info-panel model-panel"><div className="panel-kicker">02 / MODEL SNAPSHOT</div><div className="model-score"><strong>{(METRICS.accuracy * 100).toFixed(1)}%</strong><span>validation accuracy</span></div><div className="metric-track"><span style={{ width: `${METRICS.accuracy * 100}%` }} /></div><div className="model-details"><span><b>ROC-AUC</b>{(METRICS.rocAuc * 100).toFixed(1)}%</span><span><b>RECALL</b>{(METRICS.recall * 100).toFixed(1)}%</span></div><Link to="/model" className="panel-link">View model registry <Arrow /></Link></div>
      </section>
    </div>
  )
}
