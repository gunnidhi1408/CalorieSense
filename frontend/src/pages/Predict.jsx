import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Particles from '../components/Particles'
import { EnergyOrb, FireIcon, PulseWave } from '../components/Shapes'

const FIELDS = [
  { key: 'Age', label: 'Age', unit: 'years', min: 10, max: 100, step: 1, placeholder: '25' },
  { key: 'Gender', label: 'Gender', type: 'select', options: [{ value: '', label: 'Select' },{ value: '1', label: 'Male' }, { value: '0', label: 'Female' }] },
  { key: 'Height', label: 'Height', unit: 'cm', min: 100, max: 250, step: 0.1, placeholder: '175' },
  { key: 'Weight', label: 'Weight', unit: 'kg', min: 20, max: 250, step: 0.1, placeholder: '70' },
  { key: 'Duration', label: 'Exercise Duration', unit: 'min', min: 1, max: 300, step: 1, placeholder: '30' },
  { key: 'Heart_Rate', label: 'Heart Rate', unit: 'bpm', min: 40, max: 220, step: 1, placeholder: '110' },
  { key: 'Body_Temp', label: 'Body Temperature', unit: '°C', min: 35, max: 42, step: 0.1, placeholder: '38.5' },
]

function ProgressBar({ value, min, max, color }) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  return (
    <div className="h-1 w-full rounded-full bg-white/5 mt-2 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  )
}

export default function Predict() {
  const [form, setForm] = useState({
    Age: '', Gender: '', Height: '', Weight: '',
    Duration: '', Heart_Rate: '', Body_Temp: '',
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    // Validate
    for (const f of FIELDS) {
      if (!form[f.key] && form[f.key] !== 0) {
        setError(`Please fill in ${f.label}`)
        setLoading(false)
        return
      }
    }

    try {
      const payload = {}
      for (const f of FIELDS) {
        payload[f.key] = Number(form[f.key])
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Prediction failed')

      setResult(data)

      // Save to localStorage history
      const history = JSON.parse(localStorage.getItem('caloriesense_history') || '[]')
      history.unshift({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now(),
      })
      localStorage.setItem('caloriesense_history', JSON.stringify(history.slice(0, 50)))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fieldColors = ['#22D3EE', '#A78BFA', '#22D3EE', '#FB923C', '#A78BFA', '#22D3EE', '#FB923C']

  return (
    <PageTransition>
      <div className="relative min-h-screen px-6 pt-28 pb-16">
        <Particles count={15} />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-3xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan to-lavender bg-clip-text text-transparent">
                Predict
              </span>
              <span className="text-white/80 ml-3">Calories</span>
            </h1>
            <p className="mt-4 text-white/40 font-body max-w-lg mx-auto">
              Enter your body metrics and exercise data. Our AI will estimate your calorie expenditure.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* ── Form ────────────────────────────────────────── */}
            <motion.form
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="lg:col-span-3 glass-card p-8"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {FIELDS.map((f, i) => (
                  <div key={f.key} className={f.key === 'Duration' ? 'sm:col-span-2' : ''}>
                    <label className="block font-body text-xs tracking-wider uppercase text-white/50 mb-2">
                      <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: fieldColors[i] }} />
                      {f.label}
                      {f.unit && <span className="text-white/30 ml-1">({f.unit})</span>}
                    </label>
                    {f.type === 'select' ? (
                      <select
                        value={form[f.key]}
                        onChange={e => handleChange(f.key, e.target.value)}
                        className="glass-input w-full px-4 py-3 text-white font-body text-sm appearance-none cursor-pointer"
                      >
                        {f.options.map(opt => (
                          <option key={opt.value} value={opt.value} className="bg-charcoal">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <>
                        <input
                          type="number"
                          value={form[f.key]}
                          onChange={e => handleChange(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          min={f.min}
                          max={f.max}
                          step={f.step}
                          className="glass-input w-full px-4 py-3 text-white font-body text-sm placeholder:text-white/20"
                        />
                        {form[f.key] && (
                          <ProgressBar value={Number(form[f.key])} min={f.min} max={f.max} color={fieldColors[i]} />
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 rounded-xl border border-orange/30 bg-orange/10 text-orange text-sm font-body"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="glow-btn mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan/20 to-lavender/20 border border-cyan/30 font-heading text-sm tracking-widest uppercase text-cyan hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-4 h-4 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  'Predict Calories Burned'
                )}
              </button>
            </motion.form>

            {/* ── Result Panel ─────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Loading State */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card p-8 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full border-2 border-cyan/20 animate-spin" style={{ borderTopColor: '#22D3EE' }} />
                        <div className="absolute inset-2 rounded-full border-2 border-lavender/20 animate-spin" style={{ borderBottomColor: '#A78BFA', animationDirection: 'reverse', animationDuration: '1.5s' }} />
                        <div className="absolute inset-4 rounded-full border-2 border-orange/20 animate-spin" style={{ borderTopColor: '#FB923C', animationDuration: '2s' }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <EnergyOrb size={24} className="animate-pulse" />
                        </div>
                      </div>
                    </div>
                    <p className="font-body text-sm text-white/40">Processing your data through the AI model...</p>
                    <div className="mt-4 shimmer h-4 rounded-full w-3/4 mx-auto" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result */}
              <AnimatePresence>
                {result && !loading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="glass-card p-8 border-cyan/20 relative overflow-hidden"
                  >
                    {/* Glow background */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-lavender/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-6">
                        <FireIcon size={24} />
                        <span className="font-heading text-xs tracking-widest uppercase text-white/50">
                          Calories Burned
                        </span>
                      </div>

                      <div className="text-center py-4">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3, type: 'spring' }}
                          className="font-heading text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan via-lavender to-orange bg-clip-text text-transparent"
                        >
                          {result.calories.toFixed(1)}
                        </motion.span>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="font-heading text-lg text-white/40 mt-2 tracking-widest"
                        >
                          KCAL
                        </motion.p>
                      </div>

                      <PulseWave width={200} height={30} className="mx-auto my-4 opacity-30" />

                      {/* Input summary */}
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        {result.inputs && Object.entries(result.inputs).map(([key, val]) => (
                          <div key={key} className="flex justify-between text-xs font-body px-3 py-2 rounded-lg bg-white/5">
                            <span className="text-white/40">{key.replace('_', ' ')}</span>
                            <span className="text-white/70">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty State */}
              {!result && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="glass-card p-8 text-center flex flex-col items-center justify-center min-h-[300px]"
                >
                  <EnergyOrb size={60} className="opacity-30 mb-4" />
                  <p className="font-body text-sm text-white/30">
                    Fill in your metrics and hit predict to see your estimated calorie burn.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
