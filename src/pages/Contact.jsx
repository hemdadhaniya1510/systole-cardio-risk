import { useState } from 'react'

const TOPICS = ['General question', 'Bug report', 'Data / privacy', 'Partnership']

export default function Contact() {
  const [topic, setTopic] = useState(TOPICS[0])
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="page fade-up">
      <div className="page-head center">
        <div className="eyebrow">Contact</div>
        <h1>Get in touch</h1>
        <p>Questions about the model, a bug, or feedback on the console — send it over.</p>
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="eyebrow">Message</div>
              <h2>Send us a note</h2>
            </div>
          </div>
          <div className="panel-body">
            {submitted ? (
              <div className="empty-state" style={{ padding: '40px 10px' }}>
                <div style={{ color: 'var(--stable)', fontWeight: 700, marginBottom: 6 }}>Message received</div>
                Thanks for writing in — this is a demo form, so nothing was sent,
                but in production this is where a reply would land in your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="field-grid">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Jane Doe" required />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="jane@example.com" required />
                  </div>
                  <div className="field span-2">
                    <label htmlFor="topic">Topic</label>
                    <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field span-2">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="What's on your mind?"
                      required
                      className="contact-textarea"
                    />
                  </div>
                </div>
                <button type="submit" className="submit-btn">Send message</button>
                <div className="disclaimer">
                  This form is for product feedback only. Do not send personal
                  health information — Systole does not store or transmit any
                  data you enter into the assessment.
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="eyebrow">Other ways</div>
              <h2>Reach the team</h2>
            </div>
          </div>
          <div className="panel-body kv-list">
            <div><span>General</span><strong>hello@systole.app</strong></div>
            <div><span>Bug reports</span><strong>bugs@systole.app</strong></div>
            <div><span>Data / privacy</span><strong>privacy@systole.app</strong></div>
            <div><span>Response time</span><strong>2–3 business days</strong></div>
          </div>
        </div>
      </div>
    </div>
  )
}
