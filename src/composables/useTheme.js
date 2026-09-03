import { ref } from 'vue'

const currentTheme = ref(localStorage.getItem('theme') || 'dark')

export function useTheme() {
  const applyTheme = (theme) => {
    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  const toggleTheme = () => {
    const nextTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
    applyTheme(nextTheme)
  }

  // Weka theme iliyohifadhiwa mara tu app inapofunguka
  applyTheme(currentTheme.value)

  return {
    currentTheme,
    toggleTheme
  }
}