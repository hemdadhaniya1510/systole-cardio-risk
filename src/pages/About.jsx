import { Link } from 'react-router-dom'
import { METRICS } from '../model.js'

const VALUES = [
  {
    title: 'Screening, not diagnosis',
    body: 'Systole is built to flag risk patterns worth a conversation with a clinician — never to replace one.'
  },
  {
    title: 'Runs on your device',
    body: 'The model executes entirely client-side. Nothing you enter is sent to a server or stored off your browser.'
  },
  {
    title: 'Transparent by default',
    body: 'Every coefficient, metric, and data-cleaning step is documented on the Model Info and Data Insights pages.'
  }
]

const TIMELINE = [
  { year: '2023', label: 'Dataset curated', body: 'Cardiovascular Disease survey data cleaned to 68,523 usable records.' },
  { year: '2024', label: 'Model trained', body: 'Logistic regression trained offline in scikit-learn, exported to the browser.' },
  { year: '2025', label: 'Console shipped', body: 'Systole console released with instant, local scoring and history tracking.' }
]

export default function About() {
  return (
    <div className="page fade-up">
      <div className="page-head center">
        <div className="eyebrow">About Systole</div>
        <h1>A quiet, honest screening tool</h1>
        <p>
          Systole started as a way to make a well-understood statistical
          model — logistic regression on clinical vitals — accessible and
          instant, without asking anyone to hand over their health data.
        </p>
      </div>

      <div className="stat-grid stat-grid-3">
        {VALUES.map((v) => (
          <div className="stat-card" key={v.title}>
            <div className="stat-title">{v.title}</div>
            <div className="stat-body">{v.body}</div>
          </div>
        ))}
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="eyebrow">Why it exists</div>
              <h2>The gap between symptoms and screening</h2>
            </div>
          </div>
          <div className="panel-body prose">
            <p>
              Most people only think about cardiovascular risk after a scare,
              or during an annual check-up that's months away. The variables
              that matter most — blood pressure, cholesterol, glucose,
              activity, smoking — are ones people often already know, just
              never see combined into a single estimate.
            </p>
            <p>
              Systole takes eleven of those variables and scores them with a
              model trained on tens of thousands of clinical records, giving
              a probability and a ranked list of contributing factors in
              under a second, with a held-out accuracy of{' '}
              <strong>{(METRICS.accuracy * 100).toFixed(1)}%</strong>.
            </p>
            <p className="muted-note">
              See the <Link to="/model">Model Info</Link> page for the full
              methodology, or <Link to="/disclaimer">Disclaimer</Link> for
              the limits of what this tool can tell you.
            </p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="eyebrow">Timeline</div>
              <h2>How it came together</h2>
            </div>
          </div>
          <div className="panel-body">
            <div className="kv-list">
              {TIMELINE.map((t) => (
                <div key={t.year} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 700 }}>
                    {t.year} — {t.label}
                  </span>
                  <span style={{ color: 'var(--ink-secondary)', fontSize: '0.82rem' }}>{t.body}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
