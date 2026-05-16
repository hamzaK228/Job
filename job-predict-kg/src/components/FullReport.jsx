import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Zap, 
  ArrowLeft, 
  ChevronRight, 
  Landmark, 
  PieChart, 
  BarChart3, 
  Globe 
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell
} from 'recharts'

const wageData = [
  { name: 'Бишкек', amount: 54000, color: '#22d3ee' },
  { name: 'Ош', amount: 26800, color: '#818cf8' },
  { name: 'Джалал-Абад', amount: 29500, color: '#c084fc' },
  { name: 'Чуй', amount: 32000, color: '#f472b6' },
]

const growthData = [
  { year: '2021', jobs: 120000 },
  { year: '2022', jobs: 155000 },
  { year: '2023', jobs: 210000 },
  { year: '2024', jobs: 263100 },
]

export function FullReport({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Назад к Калькулятору
            </button>
            <div className="flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              <Landmark className="size-4" />
              Official Analytics 2024–2025
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <header className="relative mb-24 overflow-hidden rounded-[40px] border border-white/10 bg-slate-900/50 p-8 sm:p-16 lg:p-20">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 max-w-3xl"
          >
            <span className="mb-6 inline-block text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
              Digital Transformation Report
            </span>
            <h1 className="text-5xl font-black tracking-tighter text-white sm:text-7xl lg:text-8xl uppercase leading-[0.9]">
              Рынок Труда <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500">Бишкека</span>
            </h1>
            <p className="mt-8 text-lg font-medium leading-relaxed text-slate-400 border-l-2 border-cyan-500/30 pl-8">
              Комплексный анализ социально-экономических показателей столицы на основе данных Нацстаткома КР. 
              Столица остается главным локомотивом роста занятости и инноваций в 2025 году.
            </p>
          </motion.div>
        </header>

        {/* Key Stats Grid */}
        <section className="mb-32 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Средняя Зарплата', value: '54,000 сом', icon: TrendingUp, detail: '+12% к прошлому году', color: 'text-cyan-400' },
            { label: 'Уровень Безработицы', value: '1.8%', icon: PieChart, detail: 'Самый низкий в СНГ', color: 'text-emerald-400' },
            { label: 'Новых Рабочих Мест', value: '263,100', icon: Briefcase, detail: 'Итоги 2024 года', color: 'text-fuchsia-400' },
            { label: 'ВВП Бишкека', value: '42%', icon: Globe, detail: 'От общего ВВП страны', color: 'text-indigo-400' },
          ].map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
              className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-colors hover:border-white/10"
            >
              <div className={`mb-6 flex size-12 items-center justify-center rounded-2xl bg-slate-950 shadow-inner group-hover:scale-110 transition-transform`}>
                <stat.icon className={`size-6 ${stat.color}`} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-white tracking-tight">{stat.value}</p>
              <p className="mt-2 text-xs font-medium text-slate-500">{stat.detail}</p>
            </motion.div>
          ))}
        </section>

        {/* Charts Section */}
        <section className="mb-32 grid gap-8 lg:grid-cols-2">
          {/* Wage Disparity */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[40px] border border-white/5 bg-slate-900/30 p-8 sm:p-12"
          >
            <div className="mb-10 flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                <BarChart3 className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase">Региональный Дисбаланс</h3>
                <p className="text-xs text-slate-500 font-medium">Сравнение номинальных зарплат (2025)</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wageData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#64748b" 
                    fontSize={12} 
                    fontWeight={600}
                    width={100}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="amount" radius={[0, 8, 8, 0]} barSize={32}>
                    {wageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Job Creation Trend */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[40px] border border-white/5 bg-slate-900/30 p-8 sm:p-12"
          >
            <div className="mb-10 flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-fuchsia-500/10 text-fuchsia-400">
                <TrendingUp className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase">Динамика Рынка</h3>
                <p className="text-xs text-slate-500 font-medium">Рост созданных рабочих мест в год</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={12} fontWeight={600} />
                  <YAxis stroke="#64748b" fontSize={12} fontWeight={600} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="jobs" 
                    stroke="#d946ef" 
                    strokeWidth={4} 
                    dot={{ fill: '#d946ef', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </section>

        {/* Deep Dive Section */}
        <section className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Ключевые Инсайты</h2>
            
            <div className="space-y-8">
              <div className="flex gap-8 border-t border-white/5 pt-8">
                <span className="text-4xl font-black text-slate-800 tabular-nums">01</span>
                <div>
                  <h4 className="text-lg font-bold text-white uppercase mb-3">Новый Трудовой Кодекс (2025)</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Вступление в силу обновленного Трудового кодекса легализовало удаленную и гибридную работу в Кыргызстане. 
                    Это открыло двери для аутсорс-компаний и повысило мобильность кадров в Бишкеке.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 border-t border-white/5 pt-8">
                <span className="text-4xl font-black text-slate-800 tabular-nums">02</span>
                <div>
                  <h4 className="text-lg font-bold text-white uppercase mb-3">Секторный Рост в IT и Сервисе</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Бишкек концентрирует 85% всех IT-вакансий страны. Средний оклад опытного разработчика в 2025 году 
                    превысил отметку в 150,000 сом, что создает значительный отрыв от традиционных отраслей.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 border-t border-white/5 pt-8">
                <span className="text-4xl font-black text-slate-800 tabular-nums">03</span>
                <div>
                  <h4 className="text-lg font-bold text-white uppercase mb-3">Дефицит Кадров в Гос. Секторе</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Несмотря на общую низкую безработицу, наблюдается критическая нехватка учителей и медиков в столице 
                    из-за конкуренции с частным сектором, где заработные платы в 2.5 раза выше.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-cyan-500/10 border border-cyan-400/20 p-8">
              <Zap className="size-8 text-cyan-400 mb-6" />
              <h4 className="text-lg font-bold text-white uppercase mb-3">Bishkek Quick Fact</h4>
              <p className="text-sm text-cyan-100/70 leading-relaxed">
                Каждый второй житель Бишкека в возрасте до 30 лет занят в сфере услуг, IT или креативных индустриях. 
                Столица молодеет в профессиональном плане.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900 border border-white/5 p-8">
              <PieChart className="size-8 text-slate-400 mb-6" />
              <h4 className="text-lg font-bold text-white uppercase mb-3">Demographics</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                В 2025 году на рынок труда Бишкека выйдет рекордное количество выпускников вузов — более 22,000 человек.
              </p>
            </div>
          </aside>
        </section>

        <footer className="mt-32 pt-12 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
            © 2025 JOB PREDICT KG — NATIONAL STATISTICAL DATA INTEGRATION
          </p>
        </footer>
      </main>
    </div>
  )
}
