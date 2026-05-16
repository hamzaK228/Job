import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Plus, Briefcase, Users, Activity, Loader2, X, Building, CheckCircle2 } from 'lucide-react'
import data from '../data.json'
import { applicationsAPI, vacanciesAPI } from '../utils/api'

function EmployerDashboard({ user }) {
  const [applicants, setApplicants] = useState([])
  const [vacancies, setVacancies] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [newTitle, setNewTitle] = useState('')
  const [newSalary, setNewSalary] = useState('')
  const [newFormat, setNewFormat] = useState('Офис')

  useEffect(() => {
    Promise.all([
      applicationsAPI.getEmployerApps(),
      vacanciesAPI.getAll()
    ]).then(([appData, vacData]) => {
      setApplicants(appData.map(app => ({
        id: app._id,
        name: app.seekerId?.name || 'Unknown',
        role: app.vacancyId?.title || 'Unknown',
        match: app.matchScore,
        status: app.status
      })))
      setVacancies(vacData)
    })
    .catch(console.error)
    .finally(() => setLoading(false))
  }, [])

  const columns = [
    { id: 'new', title: 'Новые отклики' },
    { id: 'reviewed', title: 'Просмотренные' },
    { id: 'interview', title: 'Интервью' },
    { id: 'rejected', title: 'Отказ' },
  ]

  const handleCreateVacancy = async (e) => {
    e.preventDefault()
    try {
      const created = await vacanciesAPI.create({
        title: newTitle,
        format: newFormat,
        salaryRange: newSalary,
        vacancyRate: Math.floor(Math.random() * 20) + 70
      })
      setVacancies([created, ...vacancies])
      setIsModalOpen(false)
      setNewTitle('')
      setNewSalary('')
    } catch(err) {
      alert(err.message)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await applicationsAPI.updateStatus(id, newStatus)
      setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-8 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Панель Компании</h2>
          <p className="mt-1 text-sm text-slate-400 font-medium">Управление вакансиями и кандидатами</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-xl bg-cyan-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-500/20 hover:text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.1)] border border-cyan-400/20">
          <Plus className="size-4" /> Разместить Вакансию
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl pointer-events-auto p-6 sm:p-8"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <X className="size-5" />
                </button>
                <h3 className="text-xl font-bold text-white mb-6 uppercase">Новая Вакансия</h3>
                <form onSubmit={handleCreateVacancy} className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Должность</span>
                    <input type="text" required value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Например, Frontend Developer" className="w-full rounded-xl border border-white/5 bg-slate-950/50 px-4 py-3 text-white outline-none focus:border-cyan-400/40 focus:ring-4 ring-cyan-400/20" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Зарплата</span>
                    <input type="text" required value={newSalary} onChange={e => setNewSalary(e.target.value)} placeholder="Например, 120,000 сом" className="w-full rounded-xl border border-white/5 bg-slate-950/50 px-4 py-3 text-white outline-none focus:border-cyan-400/40 focus:ring-4 ring-cyan-400/20" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Формат работы</span>
                    <select value={newFormat} onChange={e => setNewFormat(e.target.value)} className="w-full rounded-xl border border-white/5 bg-slate-950/50 px-4 py-3 text-white outline-none focus:border-cyan-400/40 focus:ring-4 ring-cyan-400/20 appearance-none">
                      <option>Офис</option>
                      <option>Удаленка</option>
                      <option>Гибрид</option>
                    </select>
                  </label>
                  <button type="submit" className="mt-4 w-full rounded-xl bg-cyan-500 px-4 py-3 font-bold uppercase tracking-widest text-slate-950 hover:bg-cyan-400 transition-colors">
                    Опубликовать
                  </button>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="size-8 animate-spin text-cyan-500" /></div>
      ) : (
        <>
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Активные Вакансии</h3>
            {vacancies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vacancies.map(v => (
                  <div key={v.id} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 flex items-center gap-4 hover:border-cyan-500/20 transition-colors">
                    <div className="flex size-10 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Briefcase className="size-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{v.title}</h4>
                      <p className="text-xs text-slate-400">{v.salaryRange} • {v.format}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Нет активных вакансий</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {columns.map(col => (
              <div key={col.id} className="rounded-3xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-md">
                <h3 className="mb-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {col.title}
                  <span className="bg-white/5 px-2 py-0.5 rounded-full">{applicants.filter(a => a.status === col.id).length}</span>
                </h3>
                <div className="space-y-4 min-h-[150px]">
                  {applicants.filter(a => a.status === col.id).map(applicant => (
                    <motion.div
                      layoutId={`applicant-${applicant.id}`}
                      key={applicant.id}
                      className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 hover:border-cyan-400/30 transition-colors relative group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold text-white text-sm">{applicant.name}</p>
                        <span className="text-xs font-bold text-cyan-400 font-mono-data">{applicant.match}%</span>
                      </div>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{applicant.role}</p>
                      
                      <div className="absolute -top-3 -right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-white/10 rounded-lg p-1 shadow-xl">
                         {col.id !== 'rejected' && <button onClick={()=>handleStatusChange(applicant.id, 'rejected')} className="text-[10px] bg-red-500/10 px-2 py-1 rounded hover:bg-red-500/20 text-red-400">Отказ</button>}
                         {col.id === 'new' && <button onClick={()=>handleStatusChange(applicant.id, 'reviewed')} className="text-[10px] bg-cyan-500/10 px-2 py-1 rounded hover:bg-cyan-500/20 text-cyan-400">Просмотр</button>}
                         {col.id === 'reviewed' && <button onClick={()=>handleStatusChange(applicant.id, 'interview')} className="text-[10px] bg-emerald-500/10 px-2 py-1 rounded hover:bg-emerald-500/20 text-emerald-400">Интервью</button>}
                      </div>
                    </motion.div>
                  ))}
                  {applicants.filter(a => a.status === col.id).length === 0 && (
                    <div className="py-8 text-center border-2 border-dashed border-white/5 rounded-xl">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Пусто</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function SeekerDashboard({ user }) {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    applicationsAPI.getSeekerApps()
      .then(data => {
        setApplications(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const statusMap = {
    'new': { label: 'ОТПРАВЛЕНО', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
    'reviewed': { label: 'ПРОСМОТРЕНО', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
    'interview': { label: 'ИНТЕРВЬЮ', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
    'rejected': { label: 'ОТКАЗ', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Мои Отклики</h2>
        <p className="mt-1 text-sm text-slate-400 font-medium">Статус ваших заявок на работу</p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="size-8 animate-spin text-cyan-500" /></div>
      ) : (
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-4 sm:p-8 backdrop-blur-md">
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map(app => {
                const s = statusMap[app.status] || statusMap.new
                return (
                  <div key={app._id} className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-slate-900/50 p-6 transition-colors hover:border-white/10 hover:bg-slate-900/80">
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 items-center justify-center rounded-full bg-white/5 text-slate-300">
                        <Briefcase className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{app.vacancyId?.title || 'Unknown'}</h3>
                        <p className="text-sm font-medium text-slate-400">{app.vacancyId?.company || 'Unknown Company'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Совпадение</p>
                        <p className="font-mono-data text-lg font-bold text-emerald-400">{app.matchScore}%</p>
                      </div>
                      
                      <div className={`flex items-center justify-center rounded-xl border ${s.border} ${s.bg} px-4 py-2 min-w-[140px]`}>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${s.color}`}>
                          {s.label}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-sm font-medium text-slate-400">Вы еще не откликались на вакансии.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Dashboard({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <header className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20">
                <Users className="size-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {user.role === 'employer' ? 'Работодатель' : 'Соискатель'}
                </p>
                <p className="font-bold text-white">{user.name || user.email}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut className="size-4" />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {user.role === 'employer' ? <EmployerDashboard user={user} /> : <SeekerDashboard user={user} />}
        </motion.div>
      </main>
    </div>
  )
}
