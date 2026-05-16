import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import data from './data.json'
import { Header } from './components/Header'
import { UnemploymentChart } from './components/UnemploymentChart'
import { Calculator } from './components/Calculator'
import { InsightSection } from './components/InsightSection'
import { ResearchSection } from './components/ResearchSection'
import { ReportSection } from './components/ReportSection'
import { MarketContext } from './components/MarketContext'
import { useAcceptanceRate } from './hooks/useAcceptanceRate'
import { LoginModal } from './components/LoginModal'
import { ApplicationModal } from './components/ApplicationModal'
import { Dashboard } from './components/Dashboard'
import { FullReport } from './components/FullReport'

function CustomCursor() {
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/50 bg-cyan-400/5 blur-sm mix-blend-screen lg:block"
      style={{ x: cursorX, y: cursorY }}
    />
  )
}

export default function App() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -150])
  
  const defaultProfession = data.professions[0]?.id ?? 'it_developer'
  const [age, setAge] = useState(28)
  const [experience, setExperience] = useState(true)
  const [professionId, setProfessionId] = useState(defaultProfession)
  const [languages, setLanguages] = useState(2)
  const [selectedSkills, setSelectedSkills] = useState([])

  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [user, setUser] = useState(null)
  const [view, setView] = useState('home') // 'home' or 'report'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])

  const { acceptanceRate, recommendedVacancies } = useAcceptanceRate({
    age: Number(age) || 0,
    experience,
    professionId,
    languages,
    selectedSkills,
  })

  return (
    <div className="relative min-h-svh bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 font-outfit">
      <CustomCursor />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={(u) => {
          setUser(u)
          setIsLoginOpen(false)
        }}
      />
      <ApplicationModal 
        isOpen={!!selectedJob} 
        onClose={() => setSelectedJob(null)} 
        job={selectedJob} 
      />
      
      {/* Parallax Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div 
          style={{ y: y1 }}
          className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute right-0 top-1/4 h-[700px] w-[700px] rounded-full bg-fuchsia-600/10 blur-[140px]" 
        />
        <motion.div 
          style={{ y: y1 }}
          className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" 
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        {!user && <Header onLoginClick={() => setIsLoginOpen(true)} />}

        <AnimatePresence mode="wait">
          {view === 'report' ? (
            <motion.div
              key="report-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
            >
              <FullReport onBack={() => setView('home')} />
            </motion.div>
          ) : user ? (
            <Dashboard key="dashboard" user={user} onLogout={() => setUser(null)} />
          ) : (
            <motion.div 
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-24"
            >
              <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
                <UnemploymentChart />
                <Calculator 
                  age={age} setAge={setAge}
                  experience={experience} setExperience={setExperience}
                  professionId={professionId} setProfessionId={setProfessionId}
                  languages={languages} setLanguages={setLanguages}
                  selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills}
                  acceptanceRate={acceptanceRate}
                  recommendedVacancies={recommendedVacancies}
                  onApplyClick={setSelectedJob}
                />
              </div>

              <MarketContext />
              <InsightSection />
              <ResearchSection />
              <ReportSection onOpenReport={() => setView('report')} />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-24 pb-12 pt-8 border-t border-white/5">
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
            © 2026 JOB PREDICT KG — BISHKEK LABOR MARKET ANALYTICS V2.0
          </p>
        </footer>
      </div>
    </div>
  )
}
