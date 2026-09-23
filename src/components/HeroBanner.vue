<template>
  <div class="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white border-b border-gray-800/80">
    <!-- Background Karate Hero Visual with Cinematic Gradient Overlays -->
    <div class="absolute inset-0 opacity-35 mix-blend-screen pointer-events-none">
      <img
        :src="currentStory.image"
        :alt="currentStory.title"
        class="w-full h-full object-cover object-center scale-105 transition-all duration-1000 ease-out"
      />
    </div>

    <!-- Soft Radial Gradient Vignettes for Perfect Contrast -->
    <div class="absolute inset-0 bg-radial from-transparent via-gray-950/70 to-gray-950 pointer-events-none"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <!-- Left Content -->
        <div class="lg:col-span-7 space-y-6">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-sm tracking-wide">
              <span class="size-1.5 rounded-full bg-white animate-ping"></span>
              LIVE COMPETITION
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-800/90 text-gray-300 border border-gray-700/80 backdrop-blur-sm">
              {{ currentStory.category }}
            </span>
            <span class="text-xs text-gray-400">
              {{ currentStory.date }} • {{ currentStory.readTime }}
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] font-sans">
            {{ currentStory.title }}
          </h1>

          <p class="text-base sm:text-lg text-gray-300 max-w-2xl font-normal leading-relaxed">
            {{ currentStory.summary }}
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <router-link
              :to="'/news/' + currentStory.id"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all shadow-sm hover:shadow-rose-600/30 active:scale-95 text-decoration-none cursor-pointer"
            >
              <span>Read Full Report</span>
              <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </router-link>

            <router-link
              to="/events"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-all text-decoration-none cursor-pointer"
            >
              <span>Tournament Calendar</span>
            </router-link>

            <a
              href="https://lms.kaizen.paradox-bd.com"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600/30 to-rose-600/30 hover:from-amber-600/40 hover:to-rose-600/40 text-amber-200 font-semibold text-sm border border-amber-500/30 backdrop-blur-sm transition-all text-decoration-none cursor-pointer"
            >
              <span>Kaizen Academy (LMS)</span>
              <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <!-- Clickable Story Thumbnails / Carousel Switcher -->
          <div class="pt-4 flex flex-wrap items-center gap-2">
            <button
              v-for="(story, index) in stories"
              :key="story.id"
              @click="currentIndex = index"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left border"
              :class="currentIndex === index
                ? 'bg-white/15 border-rose-500 text-white shadow-xs'
                : 'bg-white/5 border-transparent text-gray-400 hover:text-white hover:bg-white/10'"
            >
              <div class="text-[10px] text-rose-400 font-bold uppercase tracking-wider">{{ story.category }}</div>
              <div class="truncate max-w-[180px] font-medium">{{ story.title }}</div>
            </button>
          </div>
        </div>

        <!-- Right Quick Info Card: Asian Games Live Spotlight -->
        <div class="lg:col-span-5">
          <div class="rounded-2xl border border-gray-800 bg-gray-900/90 p-5 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-4">
            <!-- Top Tag -->
            <div class="flex items-center justify-between border-b border-gray-800 pb-3">
              <div class="flex items-center gap-2">
                <span class="size-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span class="text-xs font-bold text-gray-200 uppercase tracking-wider">Tatami 1 • Asian Games</span>
              </div>
              <span class="text-[11px] font-mono font-bold text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2.5 py-0.5 rounded-full">
                FINALS BOUT
              </span>
            </div>

            <!-- Match Card Kumite -75kg -->
            <div class="space-y-3">
              <div class="flex items-center justify-between text-xs text-gray-400 font-medium">
                <span class="uppercase tracking-wider">Men's Kumite -75kg Final</span>
                <span class="text-rose-400 font-bold">● 48.2K Live</span>
              </div>

              <!-- Competitor 1 (AKA - Red) -->
              <div class="flex items-center justify-between p-3 rounded-xl bg-gray-950/70 border border-rose-900/40">
                <div class="flex items-center gap-3">
                  <span class="px-2 py-0.5 rounded bg-rose-600 text-white font-black text-[10px]">AKA</span>
                  <div>
                    <div class="text-sm font-bold text-white flex items-center gap-2">
                      <span>K. Nishiyama</span>
                      <span class="text-[10px] font-mono font-bold px-1 py-0.2 rounded bg-gray-800 text-gray-300">JPN</span>
                    </div>
                    <div class="text-[11px] text-gray-400">Japan • World Rank #1 (Senshu ★)</div>
                  </div>
                </div>
                <div class="text-3xl font-black text-rose-400 font-mono">
                  4
                </div>
              </div>

              <!-- Competitor 2 (AO - Blue) -->
              <div class="flex items-center justify-between p-3 rounded-xl bg-gray-950/70 border border-blue-900/40">
                <div class="flex items-center gap-3">
                  <span class="px-2 py-0.5 rounded bg-blue-600 text-white font-black text-[10px]">AO</span>
                  <div>
                    <div class="text-sm font-bold text-white flex items-center gap-2">
                      <span>N. Azhikanov</span>
                      <span class="text-[10px] font-mono font-bold px-1 py-0.2 rounded bg-gray-800 text-gray-300">KAZ</span>
                    </div>
                    <div class="text-[11px] text-gray-400">Kazakhstan • World Rank #4</div>
                  </div>
                </div>
                <div class="text-3xl font-black text-blue-400 font-mono">
                  2
                </div>
              </div>

              <!-- Timing and Action -->
              <div class="flex items-center justify-between pt-2 text-xs text-gray-400">
                <span class="flex items-center gap-1.5 font-mono">
                  <svg class="size-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Remaining: 00:32 (Round 2)
                </span>
                <a
                  href="https://www.youtube.com/@WKFKarateWorldChamps"
                  target="_blank"
                  rel="noopener"
                  class="text-rose-400 hover:text-rose-300 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Watch Stream</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Quick Metrics Strip (Frappe UI Minimal Stats Ribbon) -->
      <div class="mt-12 pt-8 border-t border-gray-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
        >
          <div class="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
            {{ stat.value }}
          </div>
          <div class="text-xs font-semibold text-gray-300 mt-1">
            {{ stat.label }}
          </div>
          <div class="text-[11px] text-gray-400 mt-0.5">
            {{ stat.change }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  stories: {
    type: Array,
    required: true
  },
  stats: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)
const currentStory = computed(() => props.stories[currentIndex.value] || props.stories[0])

let timer = null
onMounted(() => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.stories.length
  }, 8000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
