import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import { captureError } from './store/errorStore.js'

const app = createApp(App)

// 1. Vue Global Error Handler
app.config.errorHandler = (err, instance, info) => {
  captureError(err, `Vue:${info}`, true)
}

// 2. Vue Global Warning Handler (development diagnostics)
app.config.warnHandler = (msg, instance, trace) => {
  if (import.meta.env.DEV) {
    console.warn(`[WKF Warning]: ${msg}`, trace)
  }
}

// 3. Global Unhandled Promise Rejections (e.g. async fetch / dynamic import failures)
window.addEventListener('unhandledrejection', (event) => {
  captureError(event.reason || 'Unhandled Promise Rejection', 'Promise', true)
})

// 4. Global Window Runtime Errors
window.addEventListener('error', (event) => {
  // Ignore harmless resize observer loop limits
  if (event.message?.includes('ResizeObserver loop')) return
  captureError(event.error || event.message, 'Window', false)
})

app.use(router)
app.mount('#app')
