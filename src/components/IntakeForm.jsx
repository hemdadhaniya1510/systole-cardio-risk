import { useState } from 'react'

const DEFAULTS = { ageYears: 45, gender: 2, heightCm: 170, weightKg: 75, apHi: 120, apLo: 80, cholesterol: 1, gluc: 1, smoke: 0, alco: 0, active: 1 }

function Chip({ active, onClick, children }) { return <button type="button" className={`toggle-chip ${active ? 'active' : ''}`} onClick={onClick} aria-pressed={active}><span className="chip-check">{active ? '✓' : '+'}</span>{children}</button> }
function Field({ id, label, hint, children, wide = false }) { return <div className={`field ${wide ? 'span-2' : ''}`}><div className="field-label-row"><label htmlFor={id}>{label}</label>{hint && <span>{hint}</span>}</div>{children}</div> }

export default function IntakeForm({ onSubmit }) {
  const [form, setForm] = useState(DEFAULTS)
  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const handleSubmit = (e) => { e.preventDefault(); onSubmit({ ...form, ageYears: Number(form.ageYears), heightCm: Number(form.heightCm), weightKg: Number(form.weightKg), apHi: Number(form.apHi), apLo: Number(form.apLo), gender: Number(form.gender), cholesterol: Number(form.cholesterol), gluc: Number(form.gluc) }) }

  return <form className="panel intake-panel" onSubmit={handleSubmit}>
    <div className="panel-header"><div><div className="eyebrow">01 / Chart intake</div><h2>Patient profile</h2></div><span className="panel-index">A-01</span></div>
    <div className="panel-body">
      <div className="form-section"><div className="form-section-title"><span>Demographics</span><small>Basic patient context</small></div><div className="field-grid">
        <Field id="ageYears" label="Age" hint="years"><div className="input-with-unit"><input id="ageYears" type="number" min="18" max="100" value={form.ageYears} onChange={(e) => update('ageYears', e.target.value)} required /><span>yrs</span></div></Field>
        <Field id="gender" label="Sex"><select id="gender" value={form.gender} onChange={(e) => update('gender', e.target.value)}><option value={1}>Female</option><option value={2}>Male</option></select></Field>
        <Field id="heightCm" label="Height" hint="stature"><div className="input-with-unit"><input id="heightCm" type="number" min="130" max="220" value={form.heightCm} onChange={(e) => update('heightCm', e.target.value)} required /><span>cm</span></div></Field>
        <Field id="weightKg" label="Weight" hint="current"><div className="input-with-unit"><input id="weightKg" type="number" min="30" max="200" value={form.weightKg} onChange={(e) => update('weightKg', e.target.value)} required /><span>kg</span></div></Field>
      </div></div>
      <div className="form-section"><div className="form-section-title"><span>Hemodynamics</span><small>Resting blood pressure</small></div><div className="bp-entry"><Field id="apHi" label="Systolic"><div className="input-with-unit"><input id="apHi" type="number" min="70" max="240" value={form.apHi} onChange={(e) => update('apHi', e.target.value)} required /><span>mmHg</span></div></Field><span className="bp-slash">/</span><Field id="apLo" label="Diastolic"><div className="input-with-unit"><input id="apLo" type="number" min="40" max="180" value={form.apLo} onChange={(e) => update('apLo', e.target.value)} required /><span>mmHg</span></div></Field></div></div>
      <div className="form-section"><div className="form-section-title"><span>Labs & lifestyle</span><small>Optional, but improves signal</small></div><div className="field-grid"><Field id="cholesterol" label="Cholesterol"><select id="cholesterol" value={form.cholesterol} onChange={(e) => update('cholesterol', e.target.value)}><option value={1}>Normal</option><option value={2}>Above normal</option><option value={3}>Well above normal</option></select></Field><Field id="gluc" label="Glucose"><select id="gluc" value={form.gluc} onChange={(e) => update('gluc', e.target.value)}><option value={1}>Normal</option><option value={2}>Above normal</option><option value={3}>Well above normal</option></select></Field><Field label="Lifestyle profile" wide><div className="toggle-row"><Chip active={form.smoke === 1} onClick={() => update('smoke', form.smoke ? 0 : 1)}>Smoker</Chip><Chip active={form.alco === 1} onClick={() => update('alco', form.alco ? 0 : 1)}>Alcohol</Chip><Chip active={form.active === 1} onClick={() => update('active', form.active ? 0 : 1)}>Active</Chip></div></Field></div></div>
      <button type="submit" className="submit-btn"><span>Run risk assessment</span><span className="button-arrow">→</span></button>
      <p className="disclaimer"><b>Screening use only.</b> This statistical estimate is not a diagnosis and does not replace clinical evaluation.</p>
    </div>
  </form>
}
