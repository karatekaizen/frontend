<template>
  <div>
    <!-- When an error is captured, render the fallback UI -->
    <template v-if="hasError">
      <!-- Fallback Slot Override if Parent provided one -->
      <slot name="fallback" :error="error" :retry="retry">
        <!-- Compact Component-Level Error UI -->
        <div
          v-if="compact"
          class="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 my-2 flex items-start justify-between gap-3 text-xs"
        >
          <div class="flex items-start gap-2.5">
            <svg class="size-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <div>
              <div class="font-bold text-rose-900 dark:text-rose-200">
                {{ title || 'Section Unavailable' }}
              </div>
              <p class="text-rose-700 dark:text-rose-300 mt-0.5 line-clamp-2">
                {{ error?.message || message }}
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="retry"
            class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-gray-800 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 shadow-2xs shrink-0 cursor-pointer transition-all"
          >
            Retry
          </button>
        </div>

        <!-- Full Page-Level Error Surface -->
        <div
          v-else
          class="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6"
        >
          <div class="inline-flex items-center justify-center size-16 rounded-2xl bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-xs">
            <svg class="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>

          <div class="space-y-2">
            <h2 class="text-2xl sm:text-3xl font-black text-gray-950 dark:text-white tracking-tight font-sans">
              {{ title || 'Unable to Load Page' }}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
              {{ message || 'An unexpected issue occurred while rendering this view. You can retry loading or return to the portal homepage.' }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              @click="retry"
              class="px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 text-white hover:bg-rose-700 shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>Try Again</span>
            </button>

            <router-link
              to="/"
              class="px-4 py-2 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 transition-all text-decoration-none"
            >
              Back to Home
            </router-link>
          </div>

          <!-- Technical Details Accordion (for diagnostics without breaking aesthetics) -->
          <div v-if="error" class="pt-4 max-w-xl mx-auto text-left">
            <button
              type="button"
              @click="showDetails = !showDetails"
              class="text-[11px] font-mono text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 mx-auto cursor-pointer"
            >
              <span>{{ showDetails ? '▼ Hide technical details' : '▶ View technical details' }}</span>
            </button>

            <div
              v-if="showDetails"
              class="mt-3 p-3.5 rounded-xl bg-gray-900 text-gray-200 font-mono text-[11px] overflow-x-auto border border-gray-800 space-y-1.5"
            >
              <div class="text-rose-400 font-bold break-words">{{ error?.toString() }}</div>
              <div v-if="errorInfo" class="text-gray-400 text-[10px]">{{ errorInfo }}</div>
            </div>
          </div>
        </div>
      </slot>
    </template>

    <!-- Normal Content when no error -->
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { captureError } from '../../store/errorStore.js'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  compact: {
    type: Boolean,
    default: false
  },
  onRetry: {
    type: Function,
    default: null
  }
})

const emit = defineEmits(['error', 'retry'])

const hasError = ref(false)
const error = ref(null)
const errorInfo = ref(null)
const showDetails = ref(false)

onErrorCaptured((err, instance, info) => {
  hasError.value = true
  error.value = err
  errorInfo.value = info

  // Log to error store (with notify=false because Boundary shows its own clean fallback)
  captureError(err, `ErrorBoundary:${info}`, false)
  emit('error', { error: err, info })

  // Return false to prevent error bubbling up and crashing parent trees
  return false
})

function retry() {
  hasError.value = false
  error.value = null
  errorInfo.value = null
  showDetails.value = false

  if (props.onRetry) {
    props.onRetry()
  }
  emit('retry')
}
</script>
