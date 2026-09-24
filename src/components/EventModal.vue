<template>
  <div v-if="event" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-950/70 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

    <div class="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
      <div
        class="relative w-full max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 text-left shadow-2xl transition-all border border-gray-200 dark:border-gray-800"
        @click.stop
      >
        <!-- Modal Top Bar -->
        <div class="p-6 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                {{ event.categoryLabel }}
              </span>
              <span class="text-xs font-mono font-bold text-gray-500">
                {{ event.dates }}
              </span>
            </div>
            <h3 class="text-lg font-black text-gray-950 dark:text-white font-sans">
              {{ event.title }}
            </h3>
          </div>

          <button
            @click="$emit('close')"
            class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Protected Event Body -->
        <ErrorBoundary :compact="true" title="Event Bulletin Unavailable">
          <div class="p-6 space-y-5 text-xs">
            <!-- Location & Venue Card -->
            <div class="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-850 border border-gray-100 dark:border-gray-800 space-y-2">
              <div class="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                <span class="text-xl">{{ event.flag }}</span>
                <span>{{ event.location }}</span>
              </div>
              <div class="text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                <svg class="size-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{{ event.venue }}</span>
              </div>
            </div>

            <!-- Stats Overview -->
            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-850 border border-gray-100 dark:border-gray-800">
                <span class="text-gray-500 dark:text-gray-400 text-[11px]">Expected Athletes</span>
                <div class="text-lg font-bold font-mono text-gray-900 dark:text-white mt-0.5">
                  {{ event.athletesCount }}
                </div>
              </div>
              <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-850 border border-gray-100 dark:border-gray-800">
                <span class="text-gray-500 dark:text-gray-400 text-[11px]">National Federations</span>
                <div class="text-lg font-bold font-mono text-gray-900 dark:text-white mt-0.5">
                  {{ event.nationsCount }}
                </div>
              </div>
            </div>

            <!-- Disciplinary Categories -->
            <div class="space-y-2">
              <span class="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px]">Competition Disciplines</span>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="cat in event.categories"
                  :key="cat"
                  class="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-[11px]"
                >
                  {{ cat }}
                </span>
              </div>
            </div>

            <!-- Official Bulletin Download Banner -->
            <div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="size-9 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  PDF
                </div>
                <div>
                  <div class="font-bold text-gray-900 dark:text-white text-xs">{{ event.bulletin }}</div>
                  <div class="text-[11px] text-gray-500 dark:text-gray-400">Technical Handbook & Schedule</div>
                </div>
              </div>

              <button
                @click="downloadBulletin"
                class="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
              >
                Download
              </button>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="p-4 bg-gray-50 dark:bg-gray-850/60 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 flex-wrap">
            <span class="text-[11px] text-gray-500 dark:text-gray-400">
              Status: <strong class="text-gray-900 dark:text-white">{{ event.status }}</strong>
            </span>
            <div class="flex items-center gap-2">
              <button
                v-if="isRegistered"
                @click="handleUnregister"
                class="px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                Withdraw
              </button>
              <button
                v-else
                @click="handleRegister"
                class="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Register for Event
              </button>
              <button
                @click="$emit('close')"
                class="px-3 py-1.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold text-xs hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ErrorBoundary from './ui/ErrorBoundary.vue'
import { showToast } from '../store/toastStore.js'
import { authStore, authState } from '../store/authStore.js'

const props = defineProps({
  event: {
    type: Object,
    default: null
  }
})

defineEmits(['close'])

const isRegistered = computed(() => {
  if (!props.event) return false
  const id = props.event.id || props.event.title
  return authState.registeredEvents.some(e => (e.id || e.title) === id)
})

function handleRegister() {
  authStore.registerForEvent(props.event)
}

function handleUnregister() {
  const id = props.event?.id || props.event?.title
  if (id) authStore.unregisterFromEvent(id)
}

function downloadBulletin() {
  showToast({
    title: 'Downloading Bulletin',
    message: props.event.bulletin,
    type: 'success'
  })
}
</script>
