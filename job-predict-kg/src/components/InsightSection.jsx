import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Stethoscope, Languages, TrendingUp } from 'lucide-react'

const insights = [
  {
    icon: Briefcase,
    title: 'Дисбаланс IT-Сектора',
    text: 'Перенасыщение junior-позиций при дефиците senior-кадров. Высокая конкуренция среди самоучек.',
    tag: 'HIGH COMPETITION',
    color: 'cyan'
  },
  {
    icon: Stethoscope,
    title: 'Социальный Дефицит',
    text: 'Критическая нехватка кадров в медицине и образовании. Стабильный спрос, но низкий входной чек.',
    tag: 'LABOR SHORTAGE',
    color: 'fuchsia'
  },
  {
    icon: Languages,
    title: 'Языковой Множитель',
    text: 'Знание английского и китайского языков увеличивает шансы на оффер в 2.4 раза в коммерческом секторе.',
    tag: 'GROWTH DRIVER',
    color: 'indigo'
  }
]

export function InsightSection() {
  return (
    <section className="mt-24 sm:mt-32 relative">
      <div className="absolute -left-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500">
          Executive Summary
        </p>
        <h2 className="text-3xl font-bold text-white tracking-tighter uppercase sm:text-4xl">
          Аналитические Инсайты
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {insights.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative flex flex-col rounded-3xl border border-white/10 bg-slate-950/40 p-8 shadow-2xl backdrop-blur-3xl overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 size-32 bg-gradient-to-br from-white/10 to-transparent blur-3xl group-hover:from-white/20 transition-all" />
            
            <div className={`mb-6 inline-flex size-14 items-center justify-center rounded-2xl border border-${item.color}-400/30 bg-${item.color}-500/10 text-${item.color}-300 shadow-xl`}>
              <item.icon className="size-7" />
            </div>
            
            <span className={`mb-3 inline-block text-[9px] font-bold tracking-widest text-${item.color}-400 uppercase`}>
              {item.tag}
            </span>
            
            <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-200 transition-colors">
              {item.title}
            </h3>
            
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400 font-medium">
              {item.text}
            </p>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Sector Analysis</span>
              <TrendingUp className={`size-4 text-${item.color}-400`} />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
