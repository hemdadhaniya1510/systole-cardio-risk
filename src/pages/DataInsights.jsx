const RAW_RECORDS = 70000
const FINAL_RECORDS = 68523
const REMOVED = RAW_RECORDS - FINAL_RECORDS
const REMOVED_PCT = ((REMOVED / RAW_RECORDS) * 100).toFixed(2)

const IDEAL_RANGES = [
  { label: 'Blood pressure', value: '~120 / 80 mmHg' },
  { label: 'Cholesterol', value: 'Normal category' },
  { label: 'Fasting glucose', value: 'Normal category' },
  { label: 'BMI', value: '18.5 – 24.9 kg/m²' },
  { label: 'Pulse pressure', value: '40 – 60 mmHg' },
  { label: 'Activity', value: 'Physically active' }
]

export default function DataInsights() {
  return (
    <div className="page fade-up">
      <div className="page-head">
        <div className="eyebrow">Data Source</div>
        <h1>Where the model's data comes from</h1>
        <p>
          The dataset is sourced from a public cardiovascular disease survey of
          {' '}{RAW_RECORDS.toLocaleString()} patient records, each capturing vitals,
          lab values, and lifestyle habits alongside a confirmed diagnosis label.
        </p>
      </div>

      <div className="stat-grid stat-grid-3">
        <div className="info-card">
          <div className="info-card-label">Raw records</div>
          <div className="info-card-sub">Before cleaning</div>
          <div className="info-card-value">{RAW_RECORDS.toLocaleString()}</div>
        </div>
        <div className="info-card">
          <div className="info-card-label">Rows removed</div>
          <div className="info-card-sub">{REMOVED_PCT}%</div>
          <div className="info-card-value">{REMOVED.toLocaleString()}</div>
        </div>
        <div className="info-card">
          <div className="info-card-label">Final records</div>
          <div className="info-card-sub">Used for training + testing</div>
          <div className="info-card-value">{FINAL_RECORDS.toLocaleString()}</div>
        </div>
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="eyebrow">Understanding CVD</div>
              <h2>What CVD is, and how the model helps</h2>
            </div>
          </div>
          <div className="panel-body prose">
            <p>
              Cardiovascular disease (CVD) is an umbrella term for conditions
              affecting the heart and blood vessels, including coronary artery
              disease, heart attack, and stroke. Blood pressure, cholesterol,
              blood glucose, body weight, and age are among the most common
              contributing factors.
            </p>
            <ul>
              <li><strong>Impact.</strong> CVD reduces physical capacity, raises long-term care needs, and increases the risk of sudden cardiac events.</li>
              <li><strong>Prevention.</strong> Catching elevated risk factors early gives more room to intervene before symptoms appear.</li>
              <li><strong>Model's role.</strong> Systole finds patterns across historical clinical records to estimate risk probability — a screening aid, not a diagnosis.</li>
            </ul>
            <p className="muted-note">
              Predictions are for research and educational use. Always consult a
              qualified healthcare professional for medical decisions.
            </p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="eyebrow">Reference</div>
              <h2>Ideal ranges</h2>
            </div>
          </div>
          <div className="panel-body">
            <div className="range-grid">
              {IDEAL_RANGES.map((r) => (
                <div className="range-card" key={r.label}>
                  <div className="range-card-label">{r.label}</div>
                  <div className="range-card-value">{r.value}</div>
                </div>
              ))}
            </div>
            <div className="disclaimer" style={{ marginTop: 18 }}>
              Values outside these ranges don't guarantee elevated risk on their
              own — the model weighs them together with age, sex, and lifestyle.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
