import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Particles from '../components/Particles'
import { DataFlow, HexGrid, PulseWave, EnergyOrb } from '../components/Shapes'

const steps = [
  {
    num: '01',
    title: 'Data Collection',
    desc: 'Your 7 body and exercise metrics are captured through our immersive interface.',
    color: '#22D3EE',
  },
  {
    num: '02',
    title: 'Feature Engineering',
    desc: 'Raw inputs are normalized and transformed into feature vectors the model understands.',
    color: '#A78BFA',
  },
  {
    num: '03',
    title: 'Random Forest Inference',
    desc: '200 decision trees independently evaluate your data, each analyzing different feature combinations.',
    color: '#FB923C',
  },
  {
    num: '04',
    title: 'Ensemble Aggregation',
    desc: 'All tree predictions are averaged to produce a robust, accurate calorie estimate.',
    color: '#22D3EE',
  },
]

const features = [
  { name: 'Duration', importance: 0.35, color: '#22D3EE' },
  { name: 'Heart Rate', importance: 0.25, color: '#A78BFA' },
  { name: 'Body Temp', importance: 0.15, color: '#FB923C' },
  { name: 'Weight', importance: 0.10, color: '#22D3EE' },
  { name: 'Height', importance: 0.07, color: '#A78BFA' },
  { name: 'Age', importance: 0.05, color: '#FB923C' },
  { name: 'Gender', importance: 0.03, color: '#22D3EE' },
]

export default function Insights() {
  return (
    <PageTransition>
      <div className="relative min-h-screen px-6 pt-28 pb-16">
        <Particles count={12} />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-3xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-lavender to-cyan bg-clip-text text-transparent">
                AI Insights
              </span>
            </h1>
            <p className="mt-4 text-white/40 font-body max-w-lg mx-auto">
              Understand how our machine learning model transforms your inputs into accurate calorie predictions.
            </p>
          </motion.div>

          {/* ── Neural Network Diagram ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 mb-16 flex flex-col items-center"
          >
            <h2 className="font-heading text-sm tracking-widest uppercase text-cyan/70 mb-8">
              Model Architecture
            </h2>
            <div className="flex items-center gap-6 md:gap-12 flex-wrap justify-center">
              {/* Input Layer */}
              <div className="flex flex-col items-center gap-2">
                <span className="font-body text-xs text-white/40 mb-2">Input Layer</span>
                {['Age', 'Gender', 'Height', 'Weight', 'Duration', 'HR', 'Temp'].map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="px-3 py-1.5 rounded-lg bg-cyan/10 border border-cyan/20 text-xs font-body text-cyan/70"
                  >
                    {f}
                  </motion.div>
                ))}
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center gap-1">
                <PulseWave width={80} height={30} />
                <span className="text-white/20 text-xs font-body mt-1">Normalize</span>
              </div>

              {/* Random Forest */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <span className="font-body text-xs text-white/40 mb-3">Random Forest</span>
                <div className="relative p-6 rounded-2xl border border-lavender/20 bg-lavender/5">
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                      >
                        <HexGrid size={28} className="opacity-60" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-center text-xs text-lavender/50 mt-3 font-body">200 Trees</p>
                </div>
              </motion.div>

              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center gap-1">
                <PulseWave width={80} height={30} />
                <span className="text-white/20 text-xs font-body mt-1">Average</span>
              </div>

              {/* Output */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center"
              >
                <span className="font-body text-xs text-white/40 mb-3">Output</span>
                <div className="p-6 rounded-2xl border border-orange/20 bg-orange/5 flex flex-col items-center">
                  <EnergyOrb size={40} className="mb-2" />
                  <span className="font-heading text-sm text-orange/80">Calories</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Pipeline Steps ─────────────────────────────────── */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-heading text-sm tracking-widest uppercase text-center text-white/50 mb-12"
            >
              Prediction Pipeline
            </motion.h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan/30 via-lavender/30 to-orange/30" />

              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative flex items-start gap-6 mb-12 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
                    style={{ background: step.color, boxShadow: `0 0 12px ${step.color}` }}
                  />

                  {/* Card */}
                  <div className={`ml-16 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="glass-card p-6 hover:border-white/10 transition-all">
                      <span className="font-heading text-2xl font-bold" style={{ color: step.color, opacity: 0.3 }}>
                        {step.num}
                      </span>
                      <h3 className="font-heading text-sm tracking-wider uppercase text-white/80 mt-2 mb-2">
                        {step.title}
                      </h3>
                      <p className="font-body text-sm text-white/40 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Feature Importance ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <h2 className="font-heading text-sm tracking-widest uppercase text-white/50 mb-8 text-center">
              Feature Importance
            </h2>
            <div className="max-w-lg mx-auto space-y-4">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <span className="font-body text-xs text-white/50 w-24 text-right">{feat.name}</span>
                  <div className="flex-1 h-6 rounded-lg bg-white/5 overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${feat.importance * 100 * 2.5}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                      className="h-full rounded-lg"
                      style={{ background: `linear-gradient(90deg, ${feat.color}, transparent)` }}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 font-heading text-xs text-white/40">
                      {(feat.importance * 100).toFixed(0)}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
