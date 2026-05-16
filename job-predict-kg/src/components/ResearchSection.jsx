import React from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const SURVEY_PIE = [
  { name: 'ЛИЧНЫЙ ИНТЕРЕС', value: 56.5 },
  { name: 'ТРУДОВАЯ МИГРАЦИЯ', value: 29.6 },
  { name: 'ДРУГИЕ ФАКТОРЫ', value: 13.9 },
]

const COLORS = ['#fb7185', '#c084fc', '#22d3ee']

function SurveyPieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950 p-3 shadow-2xl backdrop-blur-xl">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.name}</p>
      <p className="mt-1 font-mono-data text-lg font-bold text-cyan-400">{item.value}%</p>
    </div>
  )
}

export function ResearchSection() {
  return (
    <section className="mt-24 sm:mt-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.99 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-[40px] border border-white/10 bg-slate-950/40 p-8 shadow-2xl backdrop-blur-3xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 size-64 bg-fuchsia-600/5 blur-[100px] -z-10" />
        
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 shadow-inner">
              <Users className="size-4 text-cyan-400" />
              Field Research Report
            </div>
            
            <h2 className="text-3xl font-bold text-white tracking-tighter uppercase sm:text-5xl leading-[1.1]">
              Реальные <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">приоритеты</span><br />молодежи Бишкека
            </h2>
            
            <p className="mt-6 text-sm leading-relaxed text-slate-400 font-medium max-w-xl">
              Глубокое исследование Минтруда КР выявило структурный разрыв между ожиданиями нового поколения и реальным рынком труда столицы.
            </p>
            
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                { color: 'cyan', label: 'IT FOCUS', text: '75%+ стремятся в Digital сектор' },
                { color: 'fuchsia', label: 'REAL DEMAND', text: 'Дефицит в медицине и услугах' },
                { color: 'indigo', label: 'MIGRATION', text: '30% ориентированы на релокацию' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-1 p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                  <span className={`text-[9px] font-bold text-${item.color}-400 uppercase tracking-[0.2em]`}>{item.label}</span>
                  <span className="text-xs font-bold text-slate-300">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative w-full lg:max-w-md aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" />
            <div className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SURVEY_PIE}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="65%"
                    outerRadius="90%"
                    paddingAngle={8}
                    stroke="none"
                  >
                    {SURVEY_PIE.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<SurveyPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target Share</p>
                <p className="text-3xl font-bold text-white font-mono-data">2026</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
