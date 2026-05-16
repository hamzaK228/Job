import React from 'react'
import { motion } from 'framer-motion'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import data from '../data.json'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-cyan-400/20">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">{label} ГОД</p>
      <ul className="space-y-2">
        {payload.map((item) => (
          <li key={item.name} className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">{item.name}</span>
            </div>
            <span className="font-mono-data text-sm font-bold text-white">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function UnemploymentChart() {
  const chartData = data.unemployment.map((row) => ({
    year: String(row.year),
    total: row.total,
    youth: row.youth,
    kind: row.kind,
  }))

  return (
    <motion.section 
      whileHover={{ rotateX: 0.5, rotateY: -0.5 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.01] p-6 shadow-2xl backdrop-blur-3xl sm:p-8"
    >
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">Маркет-Мониторинг</h2>
          <p className="mt-1 text-sm text-slate-400 font-medium">
            Динамика безработицы в столичном регионе.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950 px-3 py-1.5 shadow-inner">
          <div className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-200">Live Forecast 2026</span>
        </div>
      </div>

      <div className="min-h-[350px] w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
              dy={15}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 'auto']}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ top: -40, right: 0 }}
              formatter={(value) => (
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-4">{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="total"
              name="Общий тренд"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={{ r: 4, fill: '#020617', stroke: '#22d3ee', strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#22d3ee' }}
              filter="url(#glow)"
              animationDuration={2000}
            />
            <Line
              type="monotone"
              dataKey="youth"
              name="Молодежный"
              stroke="#e879f9"
              strokeWidth={3}
              dot={{ r: 4, fill: '#020617', stroke: '#e879f9', strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#e879f9' }}
              filter="url(#glow)"
              animationDuration={2500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 leading-relaxed max-w-[70%]">
          Аналитический прогноз базируется на исторических данных 2020-2025 гг. с учетом коэффициента сезонности.
        </p>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Delta (Forecast)</p>
          <p className="text-xs font-bold text-emerald-400">-0.2% YoY</p>
        </div>
      </div>
    </motion.section>
  )
}
