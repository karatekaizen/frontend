import { reactive } from 'vue'
import { showToast } from './toastStore.js'

/**
 * Centralized Error Store
 * Tracks runtime exceptions, component failures, and network errors.
 */
export const errorStore = reactive({
  lastError: null,
  errorLog: []
})

/**
 * Capture and log an error with context and notify the user if appropriate.
 * 
 * @param {Error|string} error - The caught exception or message
 * @param {string} [context='app'] - Originating context (e.g. 'router', 'vue', 'promise', 'component')
 * @param {boolean} [notify=true] - Whether to show a toast alert to the user
 */
export function captureError(error, context = 'app', notify = true) {
  const errObj = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    message: error?.message || String(error),
    stack: error?.stack || null,
    context
  }

  errorStore.lastError = errObj
  errorStore.errorLog.unshift(errObj)

  // Keep log capped at 50 entries
  if (errorStore.errorLog.length > 50) {
    errorStore.errorLog.pop()
  }

  console.error(`[WKF Portal Error][${context}]:`, error)

  if (notify) {
    showToast({
      title: 'Something went wrong',
      message: errObj.message || 'An unexpected error occurred.',
      type: 'error',
      duration: 5000
    })
  }

  return errObj
}

export function clearLastError() {
  errorStore.lastError = null
}

export function clearErrorLog() {
  errorStore.lastError = null
  errorStore.errorLog = []
}
