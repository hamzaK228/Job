import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Info } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import data from '../data.json'

const COLORS = ['#22d3ee', '#818cf8', '#c084fc', '#94a3b8']

export function MarketContext() {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Regional Dominance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 rounded-[32px] border border-white/10 bg-slate-950/40 p-8 shadow-2xl backdrop-blur-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="size-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Региональное Доминирование</h3>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="h-48 w-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.regionalDistribution}
                    dataKey="vacancies"
                    nameKey="region"
                    innerRadius="60%"
                    outerRadius="90%"
                    stroke="none"
                  >
                    {data.regionalDistribution.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '10px', fontWeight: 'bold', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex-1 space-y-4">
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Бишкек остается абсолютным центром притяжения талантов, аккумулируя <span className="text-cyan-400 font-bold">92% всех вакансий</span> в технологичном и коммерческом секторах.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {data.regionalDistribution.map((reg, i) => (
                  <div key={reg.region} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{reg.region}</span>
                    <span className="text-xs font-bold text-white">{reg.vacancies}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Tips / Market Pulse */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-[32px] border border-white/10 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 p-8 shadow-2xl backdrop-blur-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Info className="size-5 text-indigo-400" />
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Market Pulse</h3>
          </div>
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/10">
              <p className="text-[10px] font-bold text-indigo-300 uppercase mb-2">Focus Skills 2026</p>
              <p className="text-xs text-slate-400 font-medium italic">"Работодатели в Бишкеке все чаще требуют знание международных стандартов (ГОСТ/IFRS) даже для junior-позиций."</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/10">
              <p className="text-[10px] font-bold text-fuchsia-300 uppercase mb-2">Salary Insight</p>
              <p className="text-xs text-slate-400 font-medium italic">"Реальные зарплаты в текстильной промышленности (Швеи) в Бишкеке сейчас выше, чем стартовые позиции в IT-поддержке."</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
