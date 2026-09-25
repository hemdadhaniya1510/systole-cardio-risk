import { useState } from 'react'
import { Link } from 'react-router-dom'

const FAQS = [
  {
    q: 'Is Systole a medical diagnosis?',
    a: 'No. Systole produces a statistical screening estimate from a logistic regression model. It is not a medical device and cannot diagnose cardiovascular disease. Always confirm any concerns with a licensed clinician.'
  },
  {
    q: 'What data do I need to run an assessment?',
    a: 'Eleven inputs: age, sex, height/weight (for BMI), systolic and diastolic blood pressure, cholesterol category, glucose category, and whether you smoke, drink alcohol, or are physically active.'
  },
  {
    q: 'Where is my data stored?',
    a: 'Entirely in your browser. Scoring runs client-side and history entries are saved to local storage only — nothing is transmitted to a server.'
  },
  {
    q: 'How accurate is the model?',
    a: 'The model was evaluated on a held-out 20% test split of the training data. Exact accuracy, F1, and ROC AUC figures are published on the Model Info page. Like any screening model, it can be wrong in either direction.'
  },
  {
    q: 'Can I clear my saved history?',
    a: 'Yes. History entries live in your browser\u2019s local storage, so clearing your browser data for this site removes them. A future release will add an in-app clear button.'
  },
  {
    q: 'What dataset was the model trained on?',
    a: 'A public cardiovascular disease survey of 70,000 patient records, cleaned down to 68,523 rows after removing biologically implausible entries. Details are on the Data Insights page.'
  },
  {
    q: 'Why logistic regression instead of a deep model?',
    a: 'Logistic regression is fast, runs entirely in the browser without a backend, and — critically for a screening tool — its coefficients are interpretable, so every prediction ships with a transparent list of contributing factors.'
  }
]

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="faq-item">
      <button type="button" className="faq-question" onClick={onToggle} aria-expanded={open}>
        <span>{item.q}</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          className={`faq-chevron ${open ? 'open' : ''}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div className="faq-answer">{item.a}</div>}
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="page fade-up">
      <div className="page-head center">
        <div className="eyebrow">FAQ</div>
        <h1>Frequently asked questions</h1>
        <p>Everything about how Systole scores risk, what it does with your data, and where it falls short.</p>
      </div>

      <div className="panel" style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="panel-body" style={{ padding: '8px 24px' }}>
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>

      <div className="page-head center" style={{ marginTop: 34, marginBottom: 0 }}>
        <p className="muted-note">
          Still have a question? <Link to="/contact">Get in touch</Link>.
        </p>
      </div>
    </div>
  )
}
