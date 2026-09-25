import { useEffect, useRef, useId } from 'react'

// Builds a repeating ECG-style path (flat line, small p-wave, sharp QRS spike, t-wave)
function buildBeat(width, baseline, amplitude) {
  const w = width
  const b = baseline
  const a = amplitude
  return `
    M0,${b}
    L${w * 0.08},${b}
    Q${w * 0.11},${b - a * 0.15} ${w * 0.14},${b}
    L${w * 0.22},${b}
    L${w * 0.26},${b + a * 0.1}
    L${w * 0.30},${b - a * 1.0}
    L${w * 0.34},${b + a * 0.5}
    L${w * 0.38},${b}
    L${w * 0.5},${b}
    Q${w * 0.58},${b - a * 0.3} ${w * 0.64},${b}
    L${w}, ${b}
  `
}

export default function PulseWave({ intensity = 0.15, color = 'var(--pulse)', height = 64 }) {
  const pathRef = useRef(null)
  const dotRef = useRef(null)
  const gridId = useId()

  const clamped = Math.min(Math.max(intensity, 0), 1)
  const amplitude = 12 + clamped * 20
  const speed = 3.2 - clamped * 2.1
  const beatWidth = 220
  const baseline = height / 2

  const singleBeat = buildBeat(beatWidth, baseline, amplitude)
  const fullPath = singleBeat + singleBeat.replace(/M0/, `M${beatWidth}`)

  useEffect(() => {
    const el = pathRef.current
    const dot = dotRef.current
    if (el) el.style.animationDuration = `${speed}s`
    if (dot) dot.style.animationDuration = `${speed}s`
  }, [speed])

  return (
    <div className="ecg-strip">
      <svg
        viewBox={`0 0 ${beatWidth * 2} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        role="img"
        aria-label="Pulse waveform"
      >
        <defs>
          <pattern id={`grid-${gridId}`} width="11" height="11" patternUnits="userSpaceOnUse">
            <path d="M 11 0 L 0 0 0 11" fill="none" stroke="var(--line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${gridId})`} />
        <path
          ref={pathRef}
          className="pulse-path"
          d={fullPath}
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            color,
            animationName: 'pulse-scroll',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        />
        <circle
          ref={dotRef}
          className="pulse-dot"
          r="3.2"
          fill={color}
          style={{
            color,
            offsetPath: `path('${fullPath.replace(/\s+/g, ' ').trim()}')`,
            animationName: 'pulse-scroll-dot',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        />
      </svg>
      <style>{`
        @keyframes pulse-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-${beatWidth}px); }
        }
        @keyframes pulse-scroll-dot {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          path, circle { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
