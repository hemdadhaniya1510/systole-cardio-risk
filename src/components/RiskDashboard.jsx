import PulseWave from './PulseWave.jsx'
import RiskGauge from './RiskGauge.jsx'
import { bpCategory, METRICS } from '../model.js'

const CATEGORY_LABEL = { low: 'Low risk', moderate: 'Moderate risk', high: 'Elevated risk' }
const CATEGORY_COPY = { low: 'Indicators fall within a stable range.', moderate: 'Several indicators warrant attention.', high: 'Multiple indicators suggest elevated risk.' }
function bpTileColor(apHi, apLo) { const cat = bpCategory(apHi, apLo); return cat === 'Normal' ? 'var(--stable)' : (cat === 'Low' || cat === 'Elevated') ? 'var(--caution)' : 'var(--pulse)' }
function bmiTileColor(bmi) { return bmi < 25 ? 'var(--stable)' : bmi < 30 ? 'var(--caution)' : 'var(--pulse)' }
function ppTileColor(pp) { return pp >= 40 && pp <= 60 ? 'var(--stable)' : pp > 60 && pp <= 80 ? 'var(--caution)' : 'var(--pulse)' }

function VitalTiles({ result, patient }) { const tiles = [{ label: 'Blood pressure', value: `${patient.apHi}/${patient.apLo}`, unit: 'mmHg', color: bpTileColor(patient.apHi, patient.apLo) }, { label: 'Body mass index', value: result.bmi.toFixed(1), unit: 'kg/m²', color: bmiTileColor(result.bmi) }, { label: 'Pulse pressure', value: result.pulsePressure, unit: 'mmHg', color: ppTileColor(result.pulsePressure) }, { label: 'Risk score', value: Math.round(result.probability * 100), unit: '%', color: result.category === 'high' ? 'var(--pulse)' : result.category === 'moderate' ? 'var(--caution)' : 'var(--stable)' }]
  return <div className="vital-tiles">{tiles.map((t) => <div className="vital-tile" key={t.label} style={{ '--tile-color': t.color }}><div className="vital-tile-label">{t.label}</div><div className="vital-tile-value">{t.value}<span>{t.unit}</span></div></div>)}</div> }

function ModelStrip() { return <div className="model-strip"><div><strong>{(METRICS.rocAuc * 100).toFixed(1)}%</strong><span>ROC-AUC</span></div><div><strong>{(METRICS.accuracy * 100).toFixed(1)}%</strong><span>accuracy</span></div><div><strong>{METRICS.nTrain.toLocaleString()}</strong><span>training rows</span></div><div className="model-live"><span className="tiny-dot" /> Logistic regression v1.0</div></div> }

export default function RiskDashboard({ result, patient }) {
  if (!result) return <div className="panel panel-glow empty-dashboard"><div className="panel-header"><div><div className="eyebrow">02 / Risk readout</div><h2>Awaiting patient signal</h2></div><div className="status-label"><span className="status-dot" />Model ready</div></div><div className="empty-state"><PulseWave intensity={0.04} color="var(--line-strong)" height={70} /><strong>Your result will appear here</strong><span>Complete the patient chart and run the assessment.</span></div><ModelStrip /></div>
  const pct = Math.round(result.probability * 100); const color = result.category === 'high' ? 'var(--pulse)' : result.category === 'moderate' ? 'var(--caution)' : 'var(--stable)'
  return <div className="panel panel-glow fade-up" key={patient.ageYears + '-' + pct}>
    <div className="panel-header"><div><div className="eyebrow">02 / Risk readout</div><h2>Clinical signal detected</h2></div><div className="status-label"><span className="status-dot" style={{ background: color }} />Live estimate</div></div>
    <PulseWave intensity={result.probability} color={color} height={64} /><VitalTiles result={result} patient={patient} />
    <div className="risk-readout"><RiskGauge value={pct} color={color} /><div className="risk-readout-side"><div className={`risk-category ${result.category}`}>{CATEGORY_LABEL[result.category]}</div><div className="risk-copy">{CATEGORY_COPY[result.category]} The score reflects the current chart, not a diagnosis.</div><div className="risk-meta"><div><span>Blood pressure</span><strong>{bpCategory(patient.apHi, patient.apLo)}</strong></div><div><span>Model probability</span><strong>{result.probability.toFixed(3)}</strong></div></div></div></div>
    <div className="factor-list"><div className="factor-heading"><div><div className="eyebrow">EXPLAINABILITY</div><h3>What moved the score</h3></div><span>relative contribution</span></div>{result.topFactors.map((f, i) => { const magnitude = Math.min(Math.abs(f.contribution) / 1.2, 1) * 50; const isUp = f.contribution > 0; return <div className="factor-row" key={f.feature} style={{ animationDelay: `${i * 60}ms` }}><div className="factor-name"><span>{String(i + 1).padStart(2, '0')}</span>{f.label}</div><div className="factor-bar-track"><div className={`factor-bar-fill ${isUp ? 'up' : 'down'}`} style={{ width: `${magnitude}%` }} /></div><div className={`factor-value ${isUp ? 'up-text' : 'down-text'}`}>{isUp ? '+' : '−'}{Math.abs(f.contribution).toFixed(2)}</div></div> })}</div><ModelStrip />
  </div>
}
