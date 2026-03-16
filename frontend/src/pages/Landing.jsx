import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Particles from '../components/Particles'
import { OrbitRings, EnergyOrb, PulseWave } from '../components/Shapes'

const features = [
  {
    title: 'AI-Powered Predictions',
    desc: 'Random Forest model trained on thousands of exercise data points for accurate calorie estimation.',
    color: 'cyan',
  },
  {
    title: 'Instant Results',
    desc: 'Get your predicted calorie burn in milliseconds with our optimized ML pipeline.',
    color: 'lavender',
  },
  {
    title: 'Visual Analytics',
    desc: 'Track and visualize your prediction history with creative, artistic data charts.',
    color: 'orange',
  },
]

export default function Landing() {
  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden">
        <Particles count={30} />

        {/* ── Hero Section ───────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
          {/* Decorative orbit rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
            <OrbitRings size={500} />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              <span className="text-xs tracking-widest uppercase text-white/60 font-body">
                AI-Powered Calorie Intelligence
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-cyan via-lavender to-orange bg-clip-text text-transparent">
                Calorie
              </span>
              <br />
              <span className="text-white/90">Sense</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-lg md:text-xl text-white/50 font-body max-w-2xl mx-auto leading-relaxed"
            >
              Harness the power of machine learning to predict your calorie burn
              with precision. Input your body metrics and let our AI decode your
              energy expenditure.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/predict"
                className="glow-btn relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan/20 to-lavender/20 border border-cyan/30 font-heading text-sm tracking-widest uppercase text-cyan hover:text-white transition-colors"
              >
                Predict Your Calories
              </Link>
              <Link
                to="/insights"
                className="px-8 py-4 rounded-2xl border border-white/10 font-body text-sm tracking-wide text-white/50 hover:text-white/80 hover:border-white/20 transition-all"
              >
                How It Works
              </Link>
            </motion.div>

            {/* Decorative elements below CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-16 flex justify-center gap-8 items-center"
            >
              <PulseWave width={120} height={40} className="opacity-40" />
              <EnergyOrb size={50} className="animate-pulse-glow" />
              <PulseWave width={120} height={40} className="opacity-40" />
            </motion.div>
          </div>

          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-charcoal to-transparent" />
        </section>

        {/* ── Features Section ──────────────────────────────────── */}
        <section className="relative px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-2xl md:text-3xl text-center mb-4"
            >
              <span className="bg-gradient-to-r from-cyan to-lavender bg-clip-text text-transparent">
                Why CalorieSense?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 text-center max-w-xl mx-auto mb-16 font-body"
            >
              Not just another fitness calculator — a machine learning system that understands your body.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glass-card p-8 hover:border-cyan/20 transition-all duration-500 group"
                >
                  {/* Abstract indicator */}
                  <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-${feat.color}/10 group-hover:bg-${feat.color}/20 transition-colors`}>
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br from-${feat.color} to-transparent opacity-70`}
                      style={{
                        background: feat.color === 'cyan' ? 'linear-gradient(135deg, #22D3EE, transparent)' 
                          : feat.color === 'lavender' ? 'linear-gradient(135deg, #A78BFA, transparent)' 
                          : 'linear-gradient(135deg, #FB923C, transparent)'
                      }}
                    />
                  </div>
                  <h3 className="font-heading text-sm tracking-wider uppercase text-white/80 mb-3">
                    {feat.title}
                  </h3>
                  <p className="font-body text-sm text-white/40 leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Visual Energy Section ─────────────────────────────── */}
        <section className="relative px-6 py-24 overflow-hidden">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            {/* Animated energy visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <OrbitRings size={300} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <EnergyOrb size={80} className="animate-pulse-glow" />
              </div>
              {/* Floating stats */}
              <div className="absolute top-4 right-0 glass-card px-3 py-2 text-xs animate-float">
                <span className="text-cyan font-heading">98.2%</span>
                <span className="text-white/40 ml-1">Accuracy</span>
              </div>
              <div className="absolute bottom-8 left-0 glass-card px-3 py-2 text-xs animate-float-delayed">
                <span className="text-lavender font-heading">5K+</span>
                <span className="text-white/40 ml-1">Data Points</span>
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl md:text-4xl mb-6">
                <span className="text-white/90">Decode Your</span><br />
                <span className="bg-gradient-to-r from-orange to-lavender bg-clip-text text-transparent">
                  Body Energy
                </span>
              </h2>
              <p className="text-white/40 font-body leading-relaxed mb-6 max-w-lg">
                Our Random Forest model analyzes 7 physiological parameters to predict
                your calorie expenditure during exercise. Each variable — from heart rate
                to body temperature — acts as a signal that our AI synthesizes into a
                precise energy estimate.
              </p>
              <Link
                to="/predict"
                className="inline-flex items-center gap-2 text-cyan font-body text-sm hover:gap-4 transition-all"
              >
                Start Predicting
                <span className="text-lg">→</span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────── */}
        <footer className="border-t border-white/5 px-6 py-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <EnergyOrb size={24} />
              <span className="font-heading text-xs tracking-widest text-white/40">CalorieSense</span>
            </div>
            <p className="font-body text-xs text-white/30">
              Powered by Machine Learning · Built with React & Python
            </p>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
