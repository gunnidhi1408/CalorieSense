import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Particles from '../components/Particles'
import { DataFlow, HexGrid, EnergyOrb } from '../components/Shapes'

const FEATURES_INFO = [
  { name: 'Age', desc: 'Years old – metabolic rate changes with age', range: '10–100' },
  { name: 'Gender', desc: 'Biological sex affects basal metabolism', range: 'Male / Female' },
  { name: 'Height', desc: 'Body height in centimeters', range: '100–250 cm' },
  { name: 'Weight', desc: 'Body mass in kilograms', range: '20–250 kg' },
  { name: 'Duration', desc: 'Exercise session length', range: '1–300 min' },
  { name: 'Heart Rate', desc: 'Average beats per minute during exercise', range: '40–220 bpm' },
  { name: 'Body Temp', desc: 'Core body temperature during activity', range: '35–42 °C' },
]

export default function About() {
  const [meta, setMeta] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/meta`)
      .then(r => r.json())
      .then(setMeta)
      .catch(() => {})
  }, [])

  return (
    <PageTransition>
      <div className="relative min-h-screen px-6 pt-28 pb-16">
        <Particles count={10} />
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-heading text-3xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan via-lavender to-orange bg-clip-text text-transparent">About the Model</span>
            </h1>
            <p className="mt-4 text-white/40 font-body max-w-lg mx-auto">
              Understanding the science and data behind CalorieSense predictions.
            </p>
          </motion.div>

          {/* Algorithm Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 md:p-10 mb-8">
            <div className="flex items-start gap-6 flex-col md:flex-row">
              <DataFlow size={100} className="flex-shrink-0 mx-auto md:mx-0 opacity-70" />
              <div>
                <h2 className="font-heading text-lg tracking-wider text-white/80 mb-3">Random Forest Regressor</h2>
                <p className="font-body text-sm text-white/40 leading-relaxed mb-4">
                  CalorieSense uses a <span className="text-cyan">Random Forest</span> ensemble of 200 decision trees. Each tree is trained on a random bootstrap sample of the data and evaluates a random subset of features at each split, reducing overfitting and improving generalization.
                </p>
                <p className="font-body text-sm text-white/40 leading-relaxed">
                  The final prediction is the <span className="text-lavender">average</span> of all 200 individual tree predictions, producing accurate and stable estimates.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'R² Score', value: meta?.r2_score ?? '~0.98', color: '#22D3EE' },
              { label: 'MAE', value: meta?.mae ? `${meta.mae} kcal` : '~3.5 kcal', color: '#A78BFA' },
              { label: 'Training Samples', value: meta?.n_samples?.toLocaleString() ?? '5,000', color: '#FB923C' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <span className="font-heading text-2xl font-bold" style={{ color: s.color }}>{s.value}</span>
                <p className="font-body text-xs text-white/40 mt-2 tracking-wider uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Dataset */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 md:p-10 mb-8">
            <h2 className="font-heading text-sm tracking-widest uppercase text-white/50 mb-6">Training Dataset</h2>
            <p className="font-body text-sm text-white/40 leading-relaxed mb-6">
              The model is trained on a synthetic dataset of <span className="text-cyan">5,000 samples</span> generated with physics-inspired calorie formulas incorporating BMR factors, exercise intensity, and body temperature effects. Realistic noise is added for robustness.
            </p>
            <h3 className="font-heading text-xs tracking-widest uppercase text-white/40 mb-4">Input Features</h3>
            <div className="space-y-3">
              {FEATURES_INFO.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5"
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: ['#22D3EE','#A78BFA','#FB923C'][i % 3] }} />
                  <span className="font-heading text-xs text-white/70 w-24">{f.name}</span>
                  <span className="font-body text-xs text-white/40 flex-1">{f.desc}</span>
                  <span className="font-body text-xs text-white/30 hidden sm:block">{f.range}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 md:p-10">
            <h2 className="font-heading text-sm tracking-widest uppercase text-white/50 mb-6">Technology Stack</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { layer: 'Frontend', items: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts'] },
                { layer: 'Backend', items: ['Node.js', 'Express.js', 'Axios'] },
                { layer: 'ML', items: ['Python', 'Scikit-learn', 'Flask', 'NumPy', 'Pandas'] },
              ].map((stack, i) => (
                <div key={stack.layer} className="p-5 rounded-xl bg-white/5">
                  <h3 className="font-heading text-xs tracking-wider uppercase mb-3" style={{ color: ['#22D3EE','#A78BFA','#FB923C'][i] }}>
                    {stack.layer}
                  </h3>
                  <ul className="space-y-1">
                    {stack.items.map(item => (
                      <li key={item} className="font-body text-xs text-white/40">· {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
