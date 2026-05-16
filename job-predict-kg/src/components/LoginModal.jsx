import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Briefcase, Loader2 } from 'lucide-react'
import { authAPI } from '../utils/api'

export function LoginModal({ isOpen, onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState('seeker')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      let res;
      if (isLogin) {
        res = await authAPI.login({ email, password })
      } else {
        res = await authAPI.register({ name, email, password, role })
      }
      localStorage.setItem('token', res.token)
      onSuccess(res.user)
    } catch (err) {
      setError(err.message || 'Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
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

                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold tracking-tight text-white uppercase">
                    {isLogin ? 'Вход в систему' : 'Регистрация'}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400 font-medium">
                    {isLogin
                      ? 'Войдите, чтобы управлять вакансиями'
                      : 'Создайте аккаунт для отклика на вакансии'}
                  </p>
                </div>

                <div className="flex rounded-xl bg-slate-950/50 p-1 mb-6 ring-1 ring-white/5">
                  <button
                    type="button"
                    onClick={() => { setIsLogin(true); setError(''); }}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      isLogin ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Вход
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsLogin(false); setError(''); }}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      !isLogin ? 'bg-fuchsia-500/20 text-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.1)]' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Регистрация
                  </button>
                </div>

                {error && (
                  <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400 font-medium text-center">
                    {error}
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          <User className="size-3.5" />
                          Имя
                        </span>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-xl border border-white/5 bg-slate-950/80 px-4 py-3 text-white outline-none ring-cyan-400/20 transition-all focus:border-cyan-400/40 focus:ring-4 font-medium"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          <Briefcase className="size-3.5" />
                          Роль
                        </span>
                        <select 
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full rounded-xl border border-white/5 bg-slate-950/80 px-4 py-3 text-white outline-none ring-cyan-400/20 transition-all focus:border-cyan-400/40 focus:ring-4 font-medium appearance-none"
                        >
                          <option value="seeker">Соискатель</option>
                          <option value="employer">Работодатель</option>
                        </select>
                      </label>
                    </div>
                  )}

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <Mail className="size-3.5" />
                      Email
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/5 bg-slate-950/80 px-4 py-3 text-white outline-none ring-cyan-400/20 transition-all focus:border-cyan-400/40 focus:ring-4 font-medium"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <Lock className="size-3.5" />
                      Пароль
                    </span>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-white/5 bg-slate-950/80 px-4 py-3 text-white outline-none ring-cyan-400/20 transition-all focus:border-cyan-400/40 focus:ring-4 font-medium"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 flex w-full justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading && <Loader2 className="size-4 animate-spin" />}
                    {isLogin ? 'Войти' : 'Создать аккаунт'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

