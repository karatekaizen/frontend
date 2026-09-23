<template>
  <div v-if="athlete" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-950/70 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

    <div class="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
      <div
        class="relative w-full max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 text-left shadow-2xl transition-all border border-gray-200 dark:border-gray-800"
        @click.stop
      >
        <!-- Top Gradient Banner with Title & Close -->
        <div class="bg-gradient-to-r from-gray-950 via-rose-950 to-gray-950 px-6 py-4 flex items-center justify-between border-b border-gray-800">
          <div class="flex items-center gap-2">
            <span class="size-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span class="text-xs font-bold text-white tracking-wider uppercase">
              WKF Official Athlete Dossier
            </span>
          </div>

          <button
            @click="$emit('close')"
            class="size-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Close dialog"
          >
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Protected Athlete Profile Content -->
        <ErrorBoundary :compact="true" title="Athlete Record Unavailable">
          <div class="p-6 space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
              <div class="flex items-center gap-4">
                <img
                  :src="athlete.avatar"
                  :alt="athlete.name"
                  class="size-16 sm:size-20 rounded-2xl object-cover border-2 border-gray-200 dark:border-gray-700 shadow-sm shrink-0"
                />
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-xl sm:text-2xl font-black text-gray-950 dark:text-white font-sans tracking-tight">
                      {{ athlete.name }}
                    </h2>
                    <span class="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {{ athlete.code }}
                    </span>
                  </div>
                  <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                    <span>{{ athlete.country }}</span>
                    <span>•</span>
                    <span class="text-rose-600 dark:text-rose-400 font-bold">WKF Rank #{{ athlete.rank }}</span>
                  </div>
                </div>
              </div>

              <!-- Points Metric Box -->
              <div class="sm:text-right p-3 rounded-xl bg-gray-50 dark:bg-gray-850 border border-gray-200/80 dark:border-gray-700 shrink-0">
                <div class="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  World Ranking Points
                </div>
                <div class="text-xl sm:text-2xl font-black text-gray-950 dark:text-white font-mono mt-0.5">
                  {{ athlete.points?.toLocaleString() }} <span class="text-xs font-medium text-gray-400">pts</span>
                </div>
              </div>
            </div>

            <!-- Accolade Badge -->
            <div class="p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-bold">
                <svg class="size-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
                </svg>
                <span>{{ athlete.title }}</span>
              </div>
              <span class="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Season Active</span>
            </div>

            <!-- Stats Grid (Metric Blocks) -->
            <div class="grid grid-cols-3 gap-3">
              <div class="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-850 border border-gray-200/80 dark:border-gray-750 text-center">
                <div class="text-lg font-black text-gray-950 dark:text-white font-mono">88.5%</div>
                <div class="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">Win Ratio</div>
              </div>
              <div class="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-850 border border-gray-200/80 dark:border-gray-750 text-center">
                <div class="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">14</div>
                <div class="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">Gold Medals</div>
              </div>
              <div class="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-850 border border-gray-200/80 dark:border-gray-750 text-center">
                <div class="text-lg font-black text-rose-600 dark:text-rose-400 font-mono">28.8</div>
                <div class="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">Avg Score</div>
              </div>
            </div>

            <!-- Recent Highlights & Tournaments -->
            <div class="space-y-2">
              <div class="text-xs font-bold text-gray-950 dark:text-white uppercase tracking-wider">
                Recent Highlights & Tournaments
              </div>
              <div class="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-850 border border-gray-200/80 dark:border-gray-750 flex items-center justify-between">
                  <span class="font-medium text-gray-900 dark:text-white">2026 Asian Games Aichi-Nagoya</span>
                  <span class="font-bold text-amber-600 dark:text-amber-400 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px]">
                    <svg class="size-3.5 fill-amber-500" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M8 14L6 22l6-3 6 3-2-8"/></svg>
                    Gold Medalist
                  </span>
                </div>
                <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-850 border border-gray-200/80 dark:border-gray-750 flex items-center justify-between">
                  <span class="font-medium text-gray-900 dark:text-white">Karate 1 Premier League Paris 2026</span>
                  <span class="font-bold text-amber-600 dark:text-amber-400 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px]">
                    <svg class="size-3.5 fill-amber-500" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M8 14L6 22l6-3 6 3-2-8"/></svg>
                    Gold Medalist
                  </span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <a
                href="https://wkf.net"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <span>Full Federation Profile</span>
                <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>

              <button
                @click="$emit('close')"
                class="px-4 py-2 rounded-xl bg-gray-950 dark:bg-white text-white dark:text-gray-950 font-bold text-xs hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorBoundary from './ui/ErrorBoundary.vue'

defineProps({
  athlete: {
    type: Object,
    default: null
  }
})

defineEmits(['close'])
</script>
