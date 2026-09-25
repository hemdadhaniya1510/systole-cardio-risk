import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import DataInsights from './pages/DataInsights.jsx'
import ModelInfo from './pages/ModelInfo.jsx'
import Disclaimer from './pages/Disclaimer.jsx'
import Predict from './pages/Predict.jsx'
import About from './pages/About.jsx'
import Faq from './pages/Faq.jsx'
import Contact from './pages/Contact.jsx'
import Blog from './pages/Blog.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <div className="paper-texture" aria-hidden="true" />

      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insights" element={<DataInsights />} />
          <Route path="/model" element={<ModelInfo />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <Footer />
      </main>
    </div>
  )
}
