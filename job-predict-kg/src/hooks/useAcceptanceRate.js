import { useMemo } from 'react'
import { clamp } from '../utils/helpers'
import data from '../data.json'

export function useAcceptanceRate(inputs) {
  const { age, experience, professionId, languages, selectedSkills = [] } = inputs

  const acceptanceRate = useMemo(() => {
    const prof = data.professions.find((p) => p.id === professionId)
    if (!prof) return 0

    const base = prof.baseSuccessProbability
    const graduates = Math.max(prof.graduates, 1)
    const tightness = (prof.graduates - prof.vacancies) / graduates
    const marketAdjust = clamp(-tightness * 26, -18, 16)

    let ageFactor = 0
    if (age < 21) ageFactor = -8
    else if (age <= 24) ageFactor = 2
    else if (age <= 32) ageFactor = 10
    else if (age <= 42) ageFactor = 6
    else if (age > 54) ageFactor = -9

    const experienceBonus = experience ? 17 : 0
    const langCount = clamp(Number(languages) || 0, 0, 6)
    const languageBonus = langCount * 3.2

    // Skill Bonus
    const skillBonus = selectedSkills.length * 2.5

    const latest = data.unemployment[data.unemployment.length - 1]
    const macroHeadwind = clamp((latest.total - 5.2) * 1.4, -4, 8)

    const raw =
      base + marketAdjust + ageFactor + experienceBonus + languageBonus + skillBonus - macroHeadwind

    return Math.round(clamp(raw, 7, 98))
  }, [age, experience, professionId, languages, selectedSkills])

  const recommendedVacancies = useMemo(() => {
    const pool = data.vacancies.filter((v) => v.professionId === professionId)
    const scored = pool.map((v) => {
      const difficultyPenalty = v.difficultyPenalty ?? 0
      const vacancyRate = Math.round(clamp(acceptanceRate - difficultyPenalty * 0.9, 6, 95))
      return { ...v, vacancyRate }
    })
    scored.sort((a, b) => b.vacancyRate - a.vacancyRate)
    return scored
  }, [professionId, acceptanceRate])

  return { acceptanceRate, recommendedVacancies }
}
