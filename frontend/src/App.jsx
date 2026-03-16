import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Predict from './pages/Predict'
import Insights from './pages/Insights'
import Visualize from './pages/Visualize'
import About from './pages/About'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/visualize" element={<Visualize />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen gradient-bg">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  )
}
