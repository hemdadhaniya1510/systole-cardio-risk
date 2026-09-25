import { useEffect, useState } from 'react'
import IntakeForm from '../components/IntakeForm.jsx'
import RiskDashboard from '../components/RiskDashboard.jsx'
import History from '../components/History.jsx'
import { assessRisk } from '../model.js'

const STORAGE_KEY = 'systole-telemetry-log'

export default function Predict() {
  const [current, setCurrent] = useState(null)
  const [records, setRecords] = useState([])

  useEffect(() => {
    try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) setRecords(JSON.parse(saved)) } catch (e) { console.error('Could not load history', e) }
  }, [])

  const handleSubmit = (patient) => {
    const result = assessRisk(patient)
    setCurrent({ patient, result })
    const updated = [{ id: Date.now(), patient, result }, ...records].slice(0, 25)
    setRecords(updated)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) } catch (e) { console.error('Could not save history', e) }
  }

  return (
    <div className="page assessment-page fade-up">
      <header className="console-topbar assessment-topbar"><div><span className="breadcrumb">Workspace / Risk assessment</span><h1>Assessment workspace</h1></div><div className="assessment-meta"><span className="mono">SESSION #{String(records.length + 1).padStart(4, '0')}</span><span className="secure-chip"><span className="status-dot" />Local only</span></div></header>
      <div className="workflow-bar"><div className="workflow-step active"><b>01</b><span>Patient chart</span></div><div className="workflow-line" /><div className={`workflow-step ${current ? 'active' : ''}`}><b>02</b><span>Risk readout</span></div><div className="workflow-line" /><div className={`workflow-step ${current ? 'active' : ''}`}><b>03</b><span>Review history</span></div><div className="workflow-note">⌘ P <span>Quick start</span></div></div>
      <div className="assessment-intro"><div><span className="eyebrow teal">LIVE SCREENING ENGINE</span><h2>Build a patient signal.</h2></div><p>Enter the available chart data below. Systole calculates a population-level estimate and shows which variables moved the result.</p></div>
      <div className="layout assessment-layout"><IntakeForm onSubmit={handleSubmit} /><div className="results-column"><RiskDashboard result={current?.result} patient={current?.patient} /><History records={records} /></div></div>
    </div>
  )
}
