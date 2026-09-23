import { reactive, watch } from 'vue'

export const tweakStore = reactive({
  spacing: 'relaxed',   // 'relaxed' | 'compact'
  surface: 'clean',     // 'clean' (surfaces, not in boxes) | 'cards'
  theme: 'light',       // 'light' | 'dark'
  primaryAccent: 'wkf', // 'wkf' (crimson) | 'frappe' (blue) | 'neutral'
})

// Apply theme to document
export function initTheme() {
  watch(() => tweakStore.theme, (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.removeAttribute('data-theme')
    }
  }, { immediate: true })
}
