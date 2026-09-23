<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

    <div class="flex min-h-full items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 text-center">
      <div
        class="relative w-full max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 text-left shadow-2xl transition-all border border-gray-200 dark:border-gray-800"
        @click.stop
      >
        <!-- Search Input Bar -->
        <div class="relative border-b border-gray-200 dark:border-gray-800 p-4 flex items-center gap-3">
          <svg class="size-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            placeholder="Type to search events, athletes, articles, documents..."
            class="w-full text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 bg-transparent focus:outline-none"
            @keydown.esc="$emit('close')"
          />
          <kbd class="px-2 py-0.5 text-[10px] font-semibold text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
            ESC
          </kbd>
        </div>

        <!-- Protected Search Results List -->
        <ErrorBoundary :compact="true" title="Search Index Temporarily Unavailable">
          <div class="max-h-96 overflow-y-auto p-2 space-y-4 text-xs">
          <!-- Quick Page Navigation -->
          <div>
            <div class="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Pages & Portals
            </div>
            <div class="grid grid-cols-2 gap-1 mt-1">
              <button
                v-for="p in pages"
                :key="p.path"
                @click="goTo(p.path)"
                class="text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-800 dark:text-gray-200 flex items-center justify-between"
              >
                <span>{{ p.title }}</span>
                <span class="text-gray-400 text-[10px]">→</span>
              </button>
            </div>
          </div>

          <!-- Events Group -->
          <div v-if="matchedEvents.length > 0">
            <div class="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Championships & Events ({{ matchedEvents.length }})
            </div>
            <div class="space-y-1">
              <button
                v-for="item in matchedEvents"
                :key="item.id"
                @click="goTo('/events')"
                class="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-700 dark:hover:text-rose-300 flex items-center justify-between transition-colors group"
              >
                <div class="flex items-center gap-2.5 truncate">
                  <span class="text-base">{{ item.flag }}</span>
                  <span class="font-semibold text-gray-900 dark:text-white group-hover:text-rose-600 truncate">{{ item.title }}</span>
                </div>
                <span class="text-[10px] font-mono text-gray-400 shrink-0">{{ item.dates }}</span>
              </button>
            </div>
          </div>

          <!-- Athletes Group -->
          <div v-if="matchedAthletes.length > 0">
            <div class="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Ranked Athletes ({{ matchedAthletes.length }})
            </div>
            <div class="space-y-1">
              <button
                v-for="item in matchedAthletes"
                :key="item.name"
                @click="goTo('/ranking')"
                class="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-700 dark:hover:text-rose-300 flex items-center justify-between transition-colors group"
              >
                <div class="flex items-center gap-2.5">
                  <img :src="item.avatar" class="size-6 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
                  <span class="font-semibold text-gray-900 dark:text-white group-hover:text-rose-600">{{ item.name }}</span>
                  <span class="text-[10px] text-gray-500 font-mono">{{ item.country }} ({{ item.code }})</span>
                </div>
                <span class="text-[10px] font-bold text-rose-600 font-mono">{{ item.points }} pts</span>
              </button>
            </div>
          </div>

          <!-- Articles Group -->
          <div v-if="matchedArticles.length > 0">
            <div class="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              News Dispatches ({{ matchedArticles.length }})
            </div>
            <div class="space-y-1">
              <button
                v-for="item in matchedArticles"
                :key="item.id"
                @click="goTo('/news/' + item.id)"
                class="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-700 dark:hover:text-rose-300 flex items-center justify-between transition-colors group"
              >
                <div class="flex items-center gap-2 truncate">
                  <span class="size-1.5 rounded-full bg-rose-500 shrink-0"></span>
                  <span class="font-semibold text-gray-900 dark:text-white group-hover:text-rose-600 truncate">{{ item.title }}</span>
                </div>
                <span class="text-[10px] text-gray-400 shrink-0">{{ item.date }}</span>
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>

        <!-- Footer -->
        <div class="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-500">
          <span>Navigate with click or Enter</span>
          <span>WKF Unified Navigation</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { wkfService } from '../services/wkfService.js'
import ErrorBoundary from './ui/ErrorBoundary.vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const router = useRouter()
const query = ref('')
const inputRef = ref(null)

const pages = [
  { title: "Home", path: "/" },
  { title: "Events & Calendar", path: "/events" },
  { title: "World Rankings", path: "/ranking" },
  { title: "News Center", path: "/news" },
  { title: "Approved Brands", path: "/approved" },
  { title: "About WKF Governance", path: "/about" },
  { title: "Olympics", path: "/olympics" },
  { title: "Rules & Documents", path: "/documents" },
  { title: "Social Legacy", path: "/social-legacy" }
]

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    query.value = ''
    nextTick(() => {
      if (inputRef.value) inputRef.value.focus()
    })
  }
})

function goTo(path) {
  emit('close')
  router.push(path)
}

const allAthletes = computed(() => {
  const categories = ['male-kata', 'female-kata', 'male-kumite-75', 'male-kumite-60', 'female-kumite-68', 'female-kumite-50']
  const list = []
  for (const cat of categories) {
    list.push(...wkfService.getRankings(cat))
  }
  return list.filter((a, index, self) => index === self.findIndex(t => t.name === a.name))
})

const matchedEvents = computed(() => {
  const events = wkfService.getEvents()
  if (!query.value.trim()) return events.slice(0, 3)
  const q = query.value.toLowerCase()
  return events.filter(e => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)).slice(0, 4)
})

const matchedAthletes = computed(() => {
  if (!query.value.trim()) return allAthletes.value.slice(0, 3)
  const q = query.value.toLowerCase()
  return allAthletes.value.filter(a => a.name.toLowerCase().includes(q) || a.country.toLowerCase().includes(q)).slice(0, 4)
})

const matchedArticles = computed(() => {
  const articles = wkfService.getNewsArticles()
  if (!query.value.trim()) return articles.slice(0, 3)
  const q = query.value.toLowerCase()
  return articles.filter(a => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)).slice(0, 4)
})
</script>
