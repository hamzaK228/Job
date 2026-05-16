import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle } from 'lucide-react'
import data from '../data.json'

export function SkillsSection({ professionId, selectedSkills, setSelectedSkills }) {
  const profession = data.professions.find(p => p.id === professionId)
  const skills = profession?.skills || []

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  return (
    <div className="mt-8">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        Проверка компетенций (Skills Gap)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {skills.map((skill) => {
            const isSelected = selectedSkills.includes(skill)
            return (
              <motion.button
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleSkill(skill)}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                  isSelected 
                    ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-200' 
                    : 'border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/10'
                }`}
              >
                {isSelected ? (
                  <CheckCircle2 className="size-4 shrink-0 text-cyan-400" />
                ) : (
                  <Circle className="size-4 shrink-0" />
                )}
                <span className="text-xs font-bold uppercase tracking-tighter">{skill}</span>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>
      <p className="mt-4 text-[9px] font-medium text-slate-500 italic">
        * Каждая подтвержденная компетенция повышает ваш Acceptance Rate на 2.5%
      </p>
    </div>
  )
}
