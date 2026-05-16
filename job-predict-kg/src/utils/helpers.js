export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function chanceStyles(rate) {
  if (rate >= 68) {
    return {
      bar: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.55)]',
      text: 'text-emerald-300',
      label: 'Высокий',
    }
  }
  if (rate >= 42) {
    return {
      bar: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.45)]',
      text: 'text-amber-300',
      label: 'Средний',
    }
  }
  return {
    bar: 'bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.45)]',
    text: 'text-rose-300',
    label: 'Низкий',
  }
}
