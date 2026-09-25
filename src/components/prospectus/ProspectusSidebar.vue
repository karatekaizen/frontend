<template>
  <div class="flex flex-col h-full bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs overflow-hidden">
    <!-- Header with Search -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-800 space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="size-2 rounded-full bg-rose-500 animate-pulse"></span>
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Shito-Ryu Syllabus
          </h3>
        </div>
        <span class="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          {{ totalTechniques }} Techs
        </span>
      </div>

      <SearchInput
        v-model="searchQuery"
        placeholder="Filter syllabus..."
        width-class="w-full"
        size="sm"
      />
    </div>

    <!-- Tree Navigation List -->
    <div class="flex-1 overflow-y-auto p-2 divide-y divide-gray-100 dark:divide-gray-800/60 custom-scrollbar">
      <div 
        v-for="category in filteredCategories" 
        :key="category.id" 
        class="py-1"
      >
        <!-- Category Accordion Toggle -->
        <button
          type="button"
          @click="toggleCategory(category.id)"
          class="w-full flex items-center justify-between px-3 py-2 text-left rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <svg 
              class="size-4 shrink-0 transition-transform duration-200 text-gray-400 group-hover:text-rose-500"
              :class="isCategoryOpen(category.id) ? 'rotate-90 text-rose-500' : ''"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
              {{ category.name }}
            </span>
          </div>

          <span class="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-rose-50 dark:group-hover:bg-rose-900/30 group-hover:text-rose-600 transition-colors">
            {{ category.items.length }}
          </span>
        </button>

        <!-- Techniques List under Category -->
        <transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="transform -translate-y-1 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
        >
          <div 
            v-if="isCategoryOpen(category.id)" 
            class="pl-7 pr-1 py-1 space-y-0.5"
          >
            <button
              v-for="item in category.items"
              :key="item.route"
              type="button"
              @click="$emit('select-item', item)"
              class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between group cursor-pointer"
              :class="[
                selectedRoute === item.route 
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold shadow-xs' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              ]"
            >
              <span class="truncate pr-2">{{ cleanTitle(item.title) }}</span>
              <span 
                v-if="selectedRoute === item.route"
                class="size-1.5 rounded-full bg-rose-500 shrink-0"
              ></span>
            </button>
          </div>
        </transition>
      </div>

      <div v-if="filteredCategories.length === 0" class="p-6 text-center text-xs text-gray-400">
        No techniques match "{{ searchQuery }}"
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SearchInput from '../ui/SearchInput.vue'

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
const openCategories = ref(new Set(['stances', 'punches', 'blocks']))

const totalTechniques = computed(() => {
  return props.categories.reduce((acc, c) => acc + (c.items?.length || 0), 0)
})

function cleanTitle(title) {
  if (!title) return ''
  return title.replace(/^[#\s]+/, '').split('—')[0].trim()
}

function toggleCategory(id) {
  if (openCategories.value.has(id)) {
    openCategories.value.delete(id)
  } else {
    openCategories.value.add(id)
  }
}

function isCategoryOpen(id) {
  if (searchQuery.value.trim()) return true
  return openCategories.value.has(id)
}

const filteredCategories = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return props.categories

  return props.categories
    .map(cat => {
      const matchedItems = (cat.items || []).filter(item => 
        item.title?.toLowerCase().includes(query) ||
        item.route?.toLowerCase().includes(query)
      )
      return {
        ...cat,
        items: matchedItems
      }
    })
    .filter(cat => cat.items.length > 0 || cat.name?.toLowerCase().includes(query))
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
