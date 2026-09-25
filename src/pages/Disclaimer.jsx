export default function Disclaimer() {
  return (
    <div className="page fade-up">
      <div className="page-head">
        <div className="eyebrow">Disclaimer</div>
        <h1>Read this before using Systole</h1>
      </div>

      <div className="panel">
        <div className="panel-body prose">
          <p>
            Systole produces a statistical screening estimate from a logistic
            regression model trained on population survey data. It is
            <strong> not a medical device</strong>, does not provide a diagnosis,
            and does not replace evaluation by a licensed clinician.
          </p>
          <ul>
            <li>Predictions reflect patterns in historical survey data and may not generalize to every individual.</li>
            <li>The model can be wrong in both directions — a low estimate does not rule out disease, and a high estimate does not confirm it.</li>
            <li>Chart entries are stored only in your browser's local storage and are never transmitted anywhere.</li>
            <li>If you have symptoms or concerns about your cardiovascular health, speak with a healthcare professional promptly.</li>
          </ul>
          <p className="muted-note">
            By using this tool you acknowledge it is intended for research and
            educational purposes only.
          </p>
        </div>
      </div>
    </div>
  )
}
