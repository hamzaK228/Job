import React, { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'
import { User, Zap, Briefcase, Languages, TrendingDown, ChevronRight } from 'lucide-react'
import data from '../data.json'
import { chanceStyles } from '../utils/helpers'
import { SkillsSection } from './SkillsSection'

function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [value])

  return <span>{displayValue}</span>
}

export function Calculator({ 
  age, setAge, 
  experience, setExperience, 
  professionId, setProfessionId, 
  languages, setLanguages,
  selectedSkills, setSelectedSkills,
  acceptanceRate,
  recommendedVacancies,
  onApplyClick
}) {
  const profession = data.professions.find(p => p.id === professionId)

  return (
    <motion.section 
      whileHover={{ scale: 1.005, rotateX: -0.5, rotateY: 0.5 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.01] p-6 shadow-2xl backdrop-blur-3xl sm:p-8 perspective-1000"
    >
      <div className="mb-6 relative">
        <div className="absolute -left-8 top-0 h-full w-1 bg-cyan-500/50 blur-sm rounded-full" />
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">Персональный Индекс</h2>
        <p className="mt-1 text-sm text-slate-400 font-medium">
          Аналитика шансов трудоустройства в реальном времени.
        </p>
      </div>

      <div className="grid flex-1 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="group block">
            <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-cyan-400 transition-colors">
              <User className="size-3.5" />
              Ваш Возраст
            </span>
            <input
              type="number"
              min={16}
              max={75}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-slate-950/80 px-4 py-3.5 text-white outline-none ring-cyan-400/20 transition-all focus:border-cyan-400/40 focus:ring-4 font-mono-data"
            />
          </label>

          <div>
            <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <Zap className="size-3.5" />
              Трудовой Опыт
            </span>
            <div className="grid grid-cols-2 gap-4">
              {[ { label: 'ИМЕЕТСЯ', val: true, color: 'cyan' }, { label: 'НЕТ', val: false, color: 'fuchsia' } ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => setExperience(btn.val)}
                  className={`rounded-xl border py-3 text-[10px] font-bold tracking-widest transition-all duration-300 ${
                    experience === btn.val
                      ? `border-${btn.color}-400/50 bg-${btn.color}-500/10 text-${btn.color}-200 shadow-[0_0_25px_rgba(var(--${btn.color}-glow))]`
                      : 'border-white/5 bg-slate-950/40 text-slate-500 hover:border-white/20'
                  }`}
                  style={{
                    '--cyan-glow': '34, 211, 238, 0.2',
                    '--fuchsia-glow': '232, 121, 249, 0.2'
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <Briefcase className="size-3.5" />
            Специализация
          </span>
          <select
            value={professionId}
            onChange={(e) => {
              setProfessionId(e.target.value)
              setSelectedSkills([]) // Reset skills on profession change
            }}
            className="w-full cursor-pointer appearance-none rounded-xl border border-white/5 bg-slate-950/80 px-4 py-3.5 text-white outline-none ring-cyan-400/20 transition-all focus:border-cyan-400/40 focus:ring-4 font-medium"
          >
            {data.professions.map((p) => (
              <option key={p.id} value={p.id} className="bg-slate-900">
                {p.label.toUpperCase()}
              </option>
            ))}
          </select>
        </label>

        <SkillsSection 
          professionId={professionId} 
          selectedSkills={selectedSkills} 
          setSelectedSkills={setSelectedSkills} 
        />

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <Languages className="size-3.5" />
            Языковой Стек
          </span>
          <div className="relative h-2 w-full rounded-full bg-slate-900 overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${(languages / 5) * 100}%` }}
               className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500" 
             />
          </div>
          <input
            type="range"
            min={0}
            max={5}
            step={1}
            value={languages}
            onChange={(e) => setLanguages(Number(e.target.value))}
            className="absolute -mt-2 w-full opacity-0 cursor-pointer"
          />
          <div className="mt-3 flex justify-between text-[10px] font-bold text-slate-500 tracking-tighter">
            <span>0 ЯЗЫКОВ</span>
            <span className="text-cyan-400 font-mono-data bg-cyan-400/10 px-2 py-0.5 rounded-md">{languages} УРОВЕНЬ</span>
            <span>5+ ЯЗЫКОВ</span>
          </div>
        </label>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div 
          layout
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 p-5"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-fuchsia-500/5" />
          <p className="relative text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Acceptance Rate Index
          </p>
          <div className="relative mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-bold tracking-tighter text-white font-mono-data">
              <AnimatedNumber value={acceptanceRate} />
            </span>
            <span className="text-xl font-bold text-cyan-400/80">%</span>
          </div>
        </motion.div>

        <motion.div 
          layout
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 p-5"
        >
          <p className="relative text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Expectations Gap
          </p>
          <div className="relative mt-2 flex items-baseline gap-2">
            <span className={`text-4xl font-bold tracking-tighter font-mono-data ${profession?.expectationsGap.startsWith('+') ? 'text-rose-400' : 'text-emerald-400'}`}>
              {profession?.expectationsGap}
            </span>
          </div>
          <p className="relative mt-1 text-[8px] font-bold text-slate-600 uppercase tracking-tighter">
            Разрыв между ожидаемой и реальной ЗП
          </p>
        </motion.div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Приоритетные Вакансии
          </h3>
          <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Найдено: {recommendedVacancies.length}</span>
        </div>
        <ul className="space-y-4">
          {recommendedVacancies.map((job, i) => {
            const styles = chanceStyles(job.vacancyRate)
            return (
              <motion.li
                layout
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 8 }}
                className="group relative flex gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-md transition-all hover:bg-white/[0.04] hover:border-white/10"
              >
                <div className={`mt-1 h-12 w-1.5 shrink-0 rounded-full ${styles.bar}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-bold text-white group-hover:text-cyan-400 transition-colors">{job.title}</p>
                    <span className={`rounded-lg px-2 py-1 text-[9px] font-bold uppercase tracking-widest ${styles.text} bg-white/5`}>
                      {styles.label} · {job.vacancyRate}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 font-medium">{job.company}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2">
                      {[job.format, job.salaryRange].map(tag => (
                        <span key={tag} className="rounded-md bg-slate-950 px-2 py-1 text-[9px] font-bold text-slate-400 border border-white/5 uppercase tracking-tighter">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => onApplyClick(job)}
                      className="flex items-center gap-1 rounded-lg bg-cyan-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-500/20 hover:text-cyan-300"
                    >
                      Откликнуться <ChevronRight className="size-3" />
                    </button>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </motion.section>
  )
}
