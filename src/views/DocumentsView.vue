<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
    <!-- Header -->
    <SectionHeader
      eyebrow="Official Governance & Regulations"
      title="Rules, Statutes & Directives"
      description="Official WKF governing documents, competition rules, approved kata syllabus, anti-doping codes in accordance with WADA guidelines, and organizer handbooks."
      :level="1"
    >
      <template #eyebrow-icon>
        <svg class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </template>
    </SectionHeader>

    <!-- Filters & Search Toolbar (Frappe Desk Surface Style) -->
    <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      <SegmentedControl
        v-model="activeCategory"
        :options="categoryOptions"
      />

      <SearchInput
        v-model="searchQuery"
        placeholder="Filter documents..."
        ariaLabel="Filter official documents"
        widthClass="w-full md:w-72"
        :shortcut="true"
      />
    </div>

    <!-- Documents List (Strict Vertical Lane Alignment) -->
    <div class="divide-y divide-gray-200 dark:divide-gray-800">
      <div
        v-for="doc in filteredItems"
        :key="doc.title"
        class="py-4 px-3 -mx-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850/80 transition-colors group flex items-center justify-between gap-4"
      >
        <!-- Col 1: Fixed Format Slot (w-12) -->
        <div class="w-12 shrink-0 flex items-center justify-center">
          <div class="size-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex flex-col items-center justify-center font-black text-[10px] tracking-wider border border-rose-200/80 dark:border-rose-800">
            <svg class="size-4 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            <span class="leading-none mt-0.5">PDF</span>
          </div>
        </div>

        <!-- Col 2: Title & Description (Fluid Lane) -->
        <div class="flex-1 min-w-0 pr-2">
          <h3 class="text-sm font-bold text-gray-950 dark:text-white group-hover:text-rose-600 transition-colors truncate">
            {{ doc.title }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
            {{ doc.description }}
          </p>
        </div>

        <!-- Col 3: Category Badge (w-32 fixed lane) -->
        <div class="w-32 shrink-0 hidden md:flex items-center">
          <WkfBadge variant="default" size="sm">
            {{ doc.category }}
          </WkfBadge>
        </div>

        <!-- Col 4: Metadata Size (w-24 fixed lane) -->
        <div class="w-24 shrink-0 text-right hidden sm:block">
          <span class="text-xs font-mono font-medium text-gray-500 dark:text-gray-400">
            {{ doc.size }}
          </span>
        </div>

        <!-- Col 5: Download Action (w-32 fixed lane) -->
        <div class="w-32 shrink-0 text-right">
          <button
            type="button"
            @click="downloadDocument(doc)"
            class="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold text-xs hover:bg-gray-100 dark:hover:bg-gray-750 transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <svg class="size-3.5 text-gray-500 group-hover:text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>Download</span>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredItems.length === 0" class="py-16 text-center text-sm text-gray-500">
        <p>No documents match your query "{{ searchQuery }}".</p>
        <button
          type="button"
          @click="resetFilters"
          class="mt-3 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { wkfService } from '../services/wkfService.js'
import { showToast } from '../store/toastStore.js'
import { useFilterableList } from '../composables/useFilterableList.js'
import SectionHeader from '../components/ui/SectionHeader.vue'
import SegmentedControl from '../components/ui/SegmentedControl.vue'
import SearchInput from '../components/ui/SearchInput.vue'
import WkfBadge from '../components/ui/WkfBadge.vue'

const docs = wkfService.getOfficialDocuments()

const categories = [
  'All Documents',
  'Rules',
  'Kata',
  'Ranking',
  'Integrity',
  'Social Legacy',
  'Governance',
  'Equipment'
]

const {
  activeCategory,
  searchQuery,
  filteredItems,
  resetFilters,
  getCategoryCount
} = useFilterableList(docs, {
  defaultCategory: 'All Documents',
  categoryField: 'category',
  searchFields: ['title', 'description', 'category']
})

const categoryOptions = computed(() => {
  return categories.map(cat => ({
    label: cat,
    value: cat,
    count: getCategoryCount(cat)
  }))
})

function downloadDocument(doc) {
  showToast({
    title: 'Downloading Document',
    message: `${doc.title} (${doc.size})`,
    type: 'success'
  })
}
</script>
