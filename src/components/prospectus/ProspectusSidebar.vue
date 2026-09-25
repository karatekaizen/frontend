<template>
  <div class="flex flex-col h-full bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs overflow-hidden">
    <!-- Header with Search -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-800 space-y-3 shrink-0">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="size-2 rounded-full bg-rose-500 animate-pulse"></span>
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Shito-Ryu Syllabus
          </h3>
        </div>
        <span class="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          42 Docs
        </span>
      </div>

      <SearchInput
        v-model="searchQuery"
        placeholder="Search syllabus techniques..."
        width-class="w-full"
        size="sm"
      />
    </div>

    <!-- Tree Navigation List -->
    <div class="flex-1 overflow-y-auto p-2.5 space-y-1 custom-scrollbar">
      <!-- Search Results View if Searching -->
      <div v-if="searchQuery.trim()" class="space-y-1">
        <div class="px-2 py-1 text-[11px] font-mono text-gray-400 uppercase tracking-wider">
          Matching Techniques ({{ searchResults.length }})
        </div>
        <button
          v-for="item in searchResults"
          :key="item.route"
          type="button"
          @click="$emit('select-item', item)"
          class="w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between group cursor-pointer"
          :class="[
            selectedRoute === item.route 
              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold shadow-xs' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800'
          ]"
        >
          <div class="min-w-0 flex-1 pr-2">
            <p class="truncate font-medium">{{ item.meta_label || item.title }}</p>
            <p class="text-[10px] text-gray-400 font-mono truncate">{{ item.category_label || item.route }}</p>
          </div>
          <span v-if="selectedRoute === item.route" class="size-1.5 rounded-full bg-rose-500 shrink-0"></span>
        </button>
        <div v-if="searchResults.length === 0" class="p-6 text-center text-xs text-gray-400">
          No techniques match "{{ searchQuery }}"
        </div>
      </div>

      <!-- Hierarchical Tree View (Normal) -->
      <template v-else>
        <div v-for="cat in categories" :key="cat.id" class="space-y-0.5">
          <!-- Leaf Category (Movement, Defense, Strikes, Kicks, Kata, Footwork, Grading, Root Overview) -->
          <button
            v-if="!cat.hasChildren"
            type="button"
            :data-prospectus-route="cat.route"
            @click="$emit('select-item', { route: cat.route, title: cat.title })"
            class="w-full flex items-center justify-between px-3 py-2 text-left rounded-xl text-xs transition-colors group cursor-pointer"
            :class="[
              selectedRoute === cat.route 
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold shadow-xs' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="size-1.5 rounded-full" :class="selectedRoute === cat.route ? 'bg-rose-500' : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-rose-400'"></span>
              <span class="truncate">{{ cat.title }}</span>
            </div>
            <span v-if="selectedRoute === cat.route" class="size-1.5 rounded-full bg-rose-500 shrink-0"></span>
          </button>

          <!-- Group Category with Children (Stances, Blocks, Punches, In the Dojo) -->
          <div v-else class="space-y-0.5">
            <div
              class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors group"
              :class="[
                selectedRoute === cat.route 
                  ? 'bg-rose-50/70 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400' 
                  : 'text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
              ]"
            >
              <!-- Click Label to view category overview -->
              <button
                type="button"
                :data-prospectus-route="cat.route"
                @click="$emit('select-item', { route: cat.route, title: cat.title })"
                class="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer"
              >
                <svg 
                  class="size-3.5 shrink-0 transition-transform duration-200 text-gray-400 group-hover:text-rose-500"
                  :class="isCategoryOpen(cat.id) ? 'rotate-90 text-rose-500' : ''"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                </svg>
                <span class="truncate">{{ cat.title }}</span>
              </button>

              <!-- Chevron & Count Badge to toggle accordion -->
              <button
                type="button"
                @click.stop="toggleCategory(cat.id)"
                class="p-1 rounded-md hover:bg-gray-200/60 dark:hover:bg-gray-700/60 transition-colors cursor-pointer"
                :title="isCategoryOpen(cat.id) ? 'Collapse' : 'Expand'"
              >
                <span class="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  {{ cat.items.length }}
                </span>
              </button>
            </div>

            <!-- Nested Child Items Container -->
            <div 
              v-show="isCategoryOpen(cat.id)"
              class="ml-3 pl-3 border-l border-gray-200 dark:border-gray-800 py-0.5 space-y-0.5"
            >
              <!-- Child: Category Overview Link -->
              <button
                type="button"
                :data-prospectus-route="`${cat.route}-overview`"
                @click="$emit('select-item', { route: cat.route, title: `${cat.title} — Overview` })"
                class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between cursor-pointer"
                :class="[
                  selectedRoute === cat.route 
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                ]"
              >
                <span class="italic text-[11px]">সংক্ষিপ্ত বিবরণ (Overview)</span>
                <span v-if="selectedRoute === cat.route" class="size-1.5 rounded-full bg-rose-500 shrink-0"></span>
              </button>

              <!-- Child Techniques -->
              <button
                v-for="item in cat.items"
                :key="item.route"
                type="button"
                :data-prospectus-route="item.route"
                @click="$emit('select-item', item)"
                class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between group cursor-pointer"
                :class="[
                  selectedRoute === item.route 
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold shadow-xs' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                ]"
              >
                <span class="truncate pr-1">{{ item.title }}</span>
                <span v-if="selectedRoute === item.route" class="size-1.5 rounded-full bg-rose-500 shrink-0"></span>
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import SearchInput from '../ui/SearchInput.vue'
import { PROSPECTUS_DOCS } from '../../data/prospectusData.js'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  selectedRoute: {
    type: String,
    default: ''
  }
})

defineEmits(['select-item'])

const searchQuery = ref('')
const openCategories = ref(new Set(['stances', 'blocks', 'punches', 'in-the-dojo']))

function toggleCategory(catId) {
  if (openCategories.value.has(catId)) {
    openCategories.value.delete(catId)
  } else {
    openCategories.value.add(catId)
  }
}

function isCategoryOpen(catId) {
  return openCategories.value.has(catId)
}

function ensureCategoryForRoute(route) {
  if (!route) return
  const parts = route.replace(/^\/+/, '').split('/')
  if (parts.length >= 2) {
    const cat = parts[1] // e.g. stances, blocks, punches, in-the-dojo
    openCategories.value.add(cat)
  }
}

function scrollActiveIntoView() {
  nextTick(() => {
    const activeEl = document.querySelector(`[data-prospectus-route="${props.selectedRoute}"]`)
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  })
}

watch(
  () => props.selectedRoute,
  (newRoute) => {
    ensureCategoryForRoute(newRoute)
    scrollActiveIntoView()
  },
  { immediate: true }
)

onMounted(() => {
  ensureCategoryForRoute(props.selectedRoute)
  scrollActiveIntoView()
})

const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return PROSPECTUS_DOCS.filter(d => 
    d.title?.toLowerCase().includes(q) ||
    d.meta_label?.toLowerCase().includes(q) ||
    d.slug?.toLowerCase().includes(q) ||
    d.category?.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.4);
  border-radius: 4px;
}
</style>
