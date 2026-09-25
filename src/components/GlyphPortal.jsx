import { useEffect, useRef, useState } from 'react'

export default function GlyphPortal({ word = 'SYSTOLE', children }) {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [focus, setFocus] = useState(0)
  const chars = [...word]

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const travel = Math.max(1, section.offsetHeight - window.innerHeight)
      setProgress(Math.min(1, Math.max(0, -rect.top / travel)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  const zoom = 1 + progress * 14
  const opacity = Math.max(0, 1 - progress * 2.8)
  const contentOpacity = Math.min(1, Math.max(0, (progress - 0.62) * 3.2))
  const rotation = (progress < .35 ? progress * -3 : -.9)

  return <section ref={sectionRef} className="glyph-portal" aria-label="Systole portal" style={{ '--portal-progress': progress }}>
    <div className="glyph-pin">
      <div className="glyph-atmosphere" style={{ transform: `scale(${1 + progress * .18})`, opacity: .8 + progress * .2 }} />
      <div className="glyph-grid" style={{ opacity: .16 + progress * .1 }} />
      <div className="glyph-stage">
        <p className="glyph-eyebrow" style={{ opacity }}>A clearer signal begins here</p>
        <div className="glyph-word" style={{ transform: `translate(-50%, -50%) scale(${zoom}) rotate(${rotation}deg)`, opacity: Math.max(.08, opacity) }}>{chars.map((char, index) => <button key={`${char}-${index}`} type="button" className={index === focus ? 'selected' : ''} onClick={() => setFocus(index)} aria-label={`Focus letter ${char}`}>{char}</button>)}</div>
        <div className="glyph-focus" style={{ opacity: .24 + progress * .7, transform: `translate(-50%, -50%) scale(${1 + progress * 2})` }} />
        <div className="glyph-caption" style={{ opacity }}><span>Scroll to enter the signal</span><span className="glyph-arrow">↓</span></div>
      </div>
      <div className="glyph-footer" style={{ opacity }}><span>01 — PORTAL / OPENING FRAME</span><span>Local clinical intelligence</span></div>
      <div className="glyph-content" style={{ opacity: contentOpacity, transform: `translateY(${(1 - contentOpacity) * 22}px)` }}>{children}</div>
    </div>
  </section>
}
