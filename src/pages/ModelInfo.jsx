import { FEATURES, COEFFICIENTS, METRICS } from '../model.js'

const FEATURE_LABELS = {
  age_years: 'Age',
  gender: 'Sex',
  bmi: 'BMI',
  ap_hi: 'Systolic BP',
  ap_lo: 'Diastolic BP',
  pulse_pressure: 'Pulse pressure',
  cholesterol: 'Cholesterol',
  gluc: 'Glucose',
  smoke: 'Smoking',
  alco: 'Alcohol intake',
  active: 'Physical activity'
}

const importances = FEATURES
  .map((f, i) => ({ feature: f, label: FEATURE_LABELS[f], weight: Math.abs(COEFFICIENTS[i]) }))
  .sort((a, b) => b.weight - a.weight)

const totalWeight = importances.reduce((sum, f) => sum + f.weight, 0)

function Bar({ label, pct }) {
  return (
    <div className="perf-row">
      <div className="perf-row-top">
        <span>{label}</span>
        <strong>{pct.toFixed(1)}%</strong>
      </div>
      <div className="perf-track">
        <div className="perf-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function ModelInfo() {
  return (
    <div className="page fade-up">
      <div className="page-head center">
        <h1>Logistic Regression</h1>
        <p>
          This model includes the following hyperparameters and evaluation metrics.
          Trained using scikit-learn.
        </p>
      </div>

      <div className="stat-grid stat-grid-3">
        <div className="panel">
          <div className="panel-header"><h2>Model</h2></div>
          <div className="panel-body kv-list">
            <div><span>Algorithm</span><strong>Logistic Regression</strong></div>
            <div><span>Library</span><strong>scikit-learn</strong></div>
            <div><span>Feature count</span><strong>{FEATURES.length}</strong></div>
            <div><span>Split</span><strong>80 / 20 train-test</strong></div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header"><h2>Hyperparameters</h2></div>
          <div className="panel-body kv-list">
            <div><span>Solver</span><strong>lbfgs</strong></div>
            <div><span>Penalty</span><strong>L2</strong></div>
            <div><span>Max iterations</span><strong>1000</strong></div>
            <div><span>Regularization (C)</span><strong>1.0</strong></div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header"><h2>Performance</h2></div>
          <div className="panel-body">
            <Bar label="Accuracy" pct={METRICS.accuracy * 100} />
            <Bar label="F1 score" pct={METRICS.f1 * 100} />
            <Bar label="ROC AUC" pct={METRICS.rocAuc * 100} />
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 22 }}>
        <div className="panel-header">
          <div>
            <div className="eyebrow">Weights</div>
            <h2>Top feature importance</h2>
          </div>
        </div>
        <div className="panel-body">
          <div style={{ color: 'var(--ink-secondary)', fontSize: '0.84rem', marginBottom: 16 }}>
            Features contributing most to predictions, ranked by absolute
            standardized coefficient.
          </div>
          {importances.map((f) => (
            <Bar key={f.feature} label={f.label} pct={(f.weight / totalWeight) * 100} />
          ))}
        </div>
      </div>
    </div>
  )
}
