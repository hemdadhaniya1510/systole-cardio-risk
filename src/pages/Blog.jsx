const POSTS = [
  {
    tag: 'Methodology',
    title: 'Why logistic regression is still the right call for screening tools',
    date: 'Mar 2025',
    excerpt: 'Interpretability beats raw accuracy when every prediction needs to explain itself to the person reading it.'
  },
  {
    tag: 'Data',
    title: 'Cleaning 70,000 records down to a usable training set',
    date: 'Feb 2025',
    excerpt: 'Blood pressure readings below diastolic, implausible heights, and other outliers we had to remove before training.'
  },
  {
    tag: 'Guide',
    title: 'Reading your pulse pressure: what the number actually means',
    date: 'Jan 2025',
    excerpt: 'The gap between systolic and diastolic pressure is one of the model\u2019s stronger predictors — here\u2019s why.'
  },
  {
    tag: 'Product',
    title: 'What changed in the console redesign',
    date: 'Dec 2024',
    excerpt: 'A tour of the chart-sheet aesthetic, the new risk gauge, and why we moved away from a dashboard look.'
  },
  {
    tag: 'Guide',
    title: 'Cholesterol and glucose categories, explained simply',
    date: 'Nov 2024',
    excerpt: 'The model uses three-tier categories rather than raw lab values — what "above normal" is actually standing in for.'
  },
  {
    tag: 'Methodology',
    title: 'How we picked a decision threshold for high risk',
    date: 'Oct 2024',
    excerpt: 'Balancing false positives against false negatives when the stakes of missing a case are so different from a false alarm.'
  }
]

const TAG_CLASS = {
  Methodology: 'moderate',
  Data: 'low',
  Guide: 'high',
  Product: 'moderate'
}

export default function Blog() {
  return (
    <div className="page fade-up">
      <div className="page-head">
        <div className="eyebrow">Articles</div>
        <h1>Notes on the model, the data, and heart health</h1>
        <p>Short write-ups from the team on methodology decisions, dataset quirks, and how to read your own results.</p>
      </div>

      <div className="blog-grid">
        {POSTS.map((p) => (
          <a href="/blog" className="blog-card" key={p.title} onClick={(e) => e.preventDefault()}>
            <div className="blog-card-top">
              <span className={`pill ${TAG_CLASS[p.tag] || 'low'}`}>{p.tag}</span>
              <span className="blog-card-date">{p.date}</span>
            </div>
            <div className="blog-card-title">{p.title}</div>
            <div className="blog-card-excerpt">{p.excerpt}</div>
            <div className="blog-card-read">
              Read article
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
