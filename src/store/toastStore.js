import { reactive } from 'vue'

export const toastStore = reactive({
  toasts: []
})

let toastId = 0

export function showToast({ title, message = '', type = 'info', duration = 3500 }) {
  const id = ++toastId
  const toast = { id, title, message, type }
  toastStore.toasts.push(toast)

  if (duration > 0) {
    setTimeout(() => {
      dismissToast(id)
    }, duration)
  }
}

export function dismissToast(id) {
  const index = toastStore.toasts.findIndex(t => t.id === id)
  if (index !== -1) {
    toastStore.toasts.splice(index, 1)
  }
}
