import React from 'react'
import { motion } from 'framer-motion'
import { Landmark, GraduationCap, FileDown } from 'lucide-react'

export function ReportSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-24 sm:mt-32 pb-12"
    >
      <div className="group relative rounded-[40px] border border-white/10 bg-slate-950/40 p-8 shadow-3xl backdrop-blur-3xl overflow-hidden sm:p-12">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-fuchsia-500/5 group-hover:opacity-100 opacity-50 transition-opacity" />
        
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex flex-col sm:flex-row gap-8 items-start">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-slate-950 text-fuchsia-400 shadow-2xl ring-1 ring-white/5">
              <Landmark className="size-8" />
            </div>
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                <GraduationCap className="size-4 text-fuchsia-500" />
                Public Administration Integration
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase sm:text-5xl leading-tight">
                Практическая <br />Имплементация
              </h2>
              <p className="mt-6 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 sm:text-base">
                Итоговый пакет аналитических материалов направлен в Министерство труда КР для интеграции в образовательные стандарты и профориентационные модули.
              </p>
            </div>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05, rotateZ: 1 }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0"
          >
            <a
              href="/oficialnyj-otchet-proekta.pdf"
              download
              className="relative inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5 text-sm font-black text-slate-950 shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] uppercase tracking-widest"
            >
              <FileDown className="size-5" />
              Download Full PDF Report
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
