import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { applicationsAPI } from '../utils/api'

export function ApplicationModal({ isOpen, onClose, job }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Reset state when job changes or modal opens
  React.useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false)
      setCoverLetter('')
      setError('')
    }
  }, [isOpen, job])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      // Mock vacancy ID if no live data is bound to job yet
      const vacancyId = job._id || '64f1b2c3e4b0d9c8b7a6f5e4'
      await applicationsAPI.apply({
        vacancyId,
        coverLetter,
        matchScore: job.rate || 85 // mock score
      })
      setIsSubmitted(true)
    } catch (err) {
      setError(err.message || 'Ошибка отправки отклика')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && job && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur-xl pointer-events-auto"
            >
              <div className="relative p-6 sm:p-8">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <X className="size-5" />
                </button>

                {!isSubmitted ? (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold tracking-tight text-white uppercase pr-8">
                        Отклик на вакансию
                      </h2>
                      <p className="mt-2 text-sm text-slate-400 font-medium">
                        Вы откликаетесь на позицию <span className="text-cyan-400 font-bold">{job.title}</span> в компании <span className="text-white font-bold">{job.company}</span>.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-slate-950/50 p-4 mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Ваш профиль (будет отправлен)</p>
                      <ul className="text-sm text-slate-300 font-medium space-y-1">
                        <li>• Данные из калькулятора (возраст, опыт)</li>
                        <li>• Выбранный стек технологий</li>
                        <li>• Уровень языков</li>
                      </ul>
                    </div>

                    {error && (
                      <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400 font-medium text-center">
                        {error}
                      </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          Сопроводительное письмо (опционально)
                        </span>
                        <textarea
                          rows={3}
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          className="w-full rounded-xl border border-white/5 bg-slate-950/80 px-4 py-3 text-white outline-none ring-cyan-400/20 transition-all focus:border-cyan-400/40 focus:ring-4 font-medium resize-none"
                          placeholder="Почему вы подходите на эту роль?"
                        />
                      </label>

                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] active:scale-95 disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                        Отправить Отклик
                      </button>
                    </form>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center flex flex-col items-center"
                  >
                    <div className="rounded-full bg-emerald-500/20 p-4 mb-4 ring-1 ring-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="size-12 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase mb-2">Отклик отправлен!</h2>
                    <p className="text-sm text-slate-400 font-medium">
                      Ваша заявка на позицию {job.title} успешно передана работодателю. Ожидайте ответа на Email.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-8 rounded-xl bg-white/5 border border-white/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                    >
                      Закрыть
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

