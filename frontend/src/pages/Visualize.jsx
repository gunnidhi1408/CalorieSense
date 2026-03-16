import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, Cell,
} from 'recharts'
import PageTransition from '../components/PageTransition'
import Particles from '../components/Particles'
import { EnergyOrb } from '../components/Shapes'

const COLORS = ['#22D3EE', '#A78BFA', '#FB923C']

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-4 py-3 text-xs">
      <p className="text-white/50 font-body mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-heading" style={{ color: p.color }}>
          {p.value?.toFixed(1)} kcal
        </p>
      ))}
    </div>
  )
}

export default function Visualize() {
  const [history, setHistory] = useState([])
  const [selectedIdx, setSelectedIdx] = useState(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('caloriesense_history') || '[]')
    setHistory(stored)
  }, [])

  const chartData = history.map((h, i) => ({
    name: `#${history.length - i}`,
    calories: h.calories,
    duration: h.inputs?.Duration || 0,
  })).reverse()

  const radarData = selectedIdx !== null && history[selectedIdx]
    ? [
        { metric: 'Age', value: (history[selectedIdx].inputs.Age / 100) * 100 },
        { metric: 'Height', value: (history[selectedIdx].inputs.Height / 250) * 100 },
        { metric: 'Weight', value: (history[selectedIdx].inputs.Weight / 250) * 100 },
        { metric: 'Duration', value: (history[selectedIdx].inputs.Duration / 300) * 100 },
        { metric: 'Heart Rate', value: (history[selectedIdx].inputs.Heart_Rate / 220) * 100 },
        { metric: 'Body Temp', value: ((history[selectedIdx].inputs.Body_Temp - 35) / 7) * 100 },
      ]
    : null

  if (history.length === 0) {
    return (
      <PageTransition>
        <div className="relative min-h-screen px-6 pt-28 pb-16">
          <Particles count={10} />
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange to-cyan bg-clip-text text-transparent">Visualize</span>
            </h1>
            <div className="glass-card p-16 mt-8">
              <EnergyOrb size={60} className="mx-auto opacity-30 mb-4" />
              <h3 className="font-heading text-lg text-white/50 mb-2">No Data Yet</h3>
              <p className="font-body text-sm text-white/30">Make some predictions first.</p>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="relative min-h-screen px-6 pt-28 pb-16">
        <Particles count={10} />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-orange to-cyan bg-clip-text text-transparent">Visualize</span>
            </h1>
            <p className="mt-4 text-white/40 font-body max-w-lg mx-auto">Track your prediction history.</p>
          </motion.div>

          {/* Area Chart */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6 md:p-8 mb-8">
            <h2 className="font-heading text-sm tracking-widest uppercase text-cyan/60 mb-6">Calorie Burn Trend</h2>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="calorieGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="calories" stroke="#22D3EE" strokeWidth={2} fill="url(#calorieGrad)" dot={{ fill: '#22D3EE', r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Bar Chart */}
            <div className="glass-card p-6 md:p-8">
              <h2 className="font-heading text-sm tracking-widest uppercase text-lavender/60 mb-6">Duration</h2>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Bar dataKey="duration" radius={[6, 6, 0, 0]}>
                      {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % 3]} fillOpacity={0.6} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="glass-card p-6 md:p-8">
              <h2 className="font-heading text-sm tracking-widest uppercase text-orange/60 mb-4">Metric Profile</h2>
              {radarData ? (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
                      <PolarRadiusAxis tick={false} axisLine={false} />
                      <Radar dataKey="value" stroke="#FB923C" fill="#FB923C" fillOpacity={0.2} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-56 flex items-center justify-center">
                  <p className="text-white/30 font-body text-sm">Select a prediction below</p>
                </div>
              )}
            </div>
          </div>

          {/* History List */}
          <div className="glass-card p-6 md:p-8">
            <h2 className="font-heading text-sm tracking-widest uppercase text-white/50 mb-6">Prediction History</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {history.map((h, i) => (
                <div
                  key={h.id || i}
                  onClick={() => setSelectedIdx(i)}
                  className={`flex items-center justify-between px-5 py-4 rounded-xl cursor-pointer transition-all ${
                    selectedIdx === i ? 'bg-cyan/10 border border-cyan/20' : 'bg-white/5 border border-transparent hover:bg-white/8'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-heading"
                      style={{ background: `${COLORS[i % 3]}15`, color: COLORS[i % 3] }}>
                      {history.length - i}
                    </span>
                    <span className="font-heading text-sm text-white/80">{h.calories?.toFixed(1)} kcal</span>
                    <span className="font-body text-xs text-white/30">{h.inputs?.Duration}min</span>
                  </div>
                  <span className="font-body text-xs text-white/20">
                    {h.timestamp ? new Date(h.timestamp).toLocaleDateString() : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
