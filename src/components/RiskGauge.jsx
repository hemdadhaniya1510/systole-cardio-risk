import { useEffect, useState } from 'react'

// Semi-circle dial styled like a printed instrument gauge on a paper chart:
// flat ink colour, bold ticks, no glow.
export default function RiskGauge({ value = 0, color = 'var(--pulse)', size = 210 }) {
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(value), 80)
    return () => clearTimeout(t)
  }, [value])

  const radius = 84
  const cx = size / 2
  const cy = size / 2 + 8
  const circumference = Math.PI * radius
  const offset = circumference - (animated / 100) * circumference

  const majorTicks = [0, 20, 40, 60, 80, 100]
  const minorTicks = Array.from({ length: 21 }, (_, i) => i * 5)

  const polarToCartesian = (angleDeg, r) => {
    const rad = (angleDeg * Math.PI) / 180
    return {
      x: cx - r * Math.cos(rad),
      y: cy - r * Math.sin(rad)
    }
  }

  return (
    <div className="gauge-wrap">
      <svg width={size} height={size / 2 + 36} viewBox={`0 0 ${size} ${size / 2 + 36}`}>
        {/* minor tick marks */}
        {minorTicks.map((t) => {
          const angle = 180 - t * 1.8
          const isMajor = majorTicks.includes(t)
          const outer = polarToCartesian(angle, radius + 10)
          const inner = polarToCartesian(angle, radius + (isMajor ? 1 : 4))
          return (
            <line
              key={t}
              x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
              stroke="var(--ink-muted)" strokeWidth={isMajor ? 1.5 : 1} opacity={isMajor ? 0.7 : 0.35}
            />
          )
        })}

        {/* major tick numerals */}
        {majorTicks.map((t) => {
          const angle = 180 - t * 1.8
          const pos = polarToCartesian(angle, radius + 21)
          return (
            <text key={t} x={pos.x} y={pos.y + 3} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-muted)">
              {t}
            </text>
          )
        })}

        {/* track */}
        <path
          d={`M ${cx - radius},${cy} A ${radius},${radius} 0 0 1 ${cx + radius},${cy}`}
          fill="none"
          stroke="var(--line)"
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* fill */}
        <path
          className="gauge-fill-path"
          d={`M ${cx - radius},${cy} A ${radius},${radius} 0 0 1 ${cx + radius},${cy}`}
          fill="none"
          stroke={color}
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ color, transition: 'stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />

        {/* needle */}
        <g style={{ transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)', transformOrigin: `${cx}px ${cy}px` }}
           transform={`rotate(${(animated / 100) * 180 - 180}, ${cx}, ${cy})`}>
          <line x1={cx} y1={cy} x2={cx - radius + 20} y2={cy} stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
          <circle cx={cx} cy={cy} r="5" fill="var(--ink)" />
        </g>

        <text x={cx} y={cy - 22} textAnchor="middle" className="gauge-value" fill={color}>
          {Math.round(animated)}%
        </text>
        <text x={cx} y={cy - 5} textAnchor="middle"
          fontFamily="var(--font-body)" fontWeight="600" fontSize="8" letterSpacing="1.2" fill="var(--ink-muted)">
          10-YR RISK
        </text>
      </svg>
    </div>
  )
}
