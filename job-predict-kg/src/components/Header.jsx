import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Activity, User } from 'lucide-react'
import data from '../data.json'

export function Header({ onLoginClick }) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
        >
          <Sparkles className="size-4" />
          Predictive Analytics Engine v2.0
        </motion.div>
        
        <h1 className="text-4xl font-black tracking-tighter text-white sm:text-6xl uppercase leading-[0.95]">
          Bishkek <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500">Employment</span><br />
          Prospects
        </h1>
        
        <p className="mt-6 max-w-xl text-sm font-medium leading-relaxed text-slate-500 sm:text-base border-l-2 border-white/10 pl-6">
          Масштабный анализ трудового рынка Бишкека: от мониторинга безработицы до персонального индекса успешности на базе Big Data.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLoginClick}
          className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-xl backdrop-blur-md transition-all hover:bg-white/10 hover:border-cyan-400/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
        >
          <User className="size-4 text-cyan-400" />
          Войти
        </motion.button>

        <motion.div 
          whileHover={{ scale: 1.02, rotateY: 10 }}
          className="relative group p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent shadow-2xl"
        >
          <div className="flex items-center gap-5 rounded-[22px] bg-slate-950 px-8 py-6 backdrop-blur-3xl ring-1 ring-white/5">
            <div className="relative">
              <div className="absolute inset-0 bg-fuchsia-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
              <Activity className="relative size-8 text-fuchsia-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">Target Region</p>
              <p className="text-2xl font-black text-white tracking-tight uppercase">{data.meta.city}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
