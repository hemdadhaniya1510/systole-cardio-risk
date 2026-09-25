import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function History({ records }) {
  if (!records.length) return null

  const chartData = records.map((r, i) => ({
    idx: i + 1,
    systolic: r.patient.apHi,
    diastolic: r.patient.apLo,
    bmi: Number(r.result.bmi.toFixed(1)),
    risk: Math.round(r.result.probability * 100)
  }))

  return (
    <div className="panel" style={{ marginTop: 22 }}>
      <div className="panel-header">
        <div>
          <div className="eyebrow">Log</div>
          <h2>Assessment history</h2>
        </div>
      </div>

      <div className="chart-panel">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData} margin={{ top: 8, right: 12, left: -14, bottom: 4 }}>
            <CartesianGrid stroke="#DEE5E0" vertical={false} />
            <XAxis dataKey="idx" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono', fill: '#8B9A96' }} stroke="#C7D1CA" />
            <YAxis tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono', fill: '#8B9A96' }} stroke="#C7D1CA" />
            <Tooltip
              contentStyle={{ fontFamily: 'IBM Plex Mono', fontSize: 12, background: '#FFFFFF', border: '1px solid #DEE5E0', borderRadius: 8, color: '#172530' }}
              labelStyle={{ color: '#172530' }}
            />
            <Line type="monotone" dataKey="systolic" stroke="#B23B3B" strokeWidth={2} dot={false} name="Systolic" />
            <Line type="monotone" dataKey="diastolic" stroke="#A9700A" strokeWidth={2} dot={false} name="Diastolic" />
            <Line type="monotone" dataKey="risk" stroke="#0E6F6B" strokeWidth={2} dot={false} name="Risk %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Age</th>
              <th>BP</th>
              <th>BMI</th>
              <th>Risk</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.patient.ageYears}</td>
                <td>{r.patient.apHi}/{r.patient.apLo}</td>
                <td>{r.result.bmi.toFixed(1)}</td>
                <td>{Math.round(r.result.probability * 100)}%</td>
                <td><span className={`pill ${r.result.category}`}>{r.result.category}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
