<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
    <!-- Header -->
    <SectionHeader
      eyebrow="Official Calendar"
      title="Championships & Events"
      description="Browse the complete global calendar for World Championships, Karate 1 circuits, continental championships, and Olympic multisport qualifiers."
      :level="1"
    >
      <template #eyebrow-icon>
        <svg class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </template>

      <template #action>
        <div class="flex flex-wrap items-center gap-2.5">
          <SearchInput
            v-model="searchQuery"
            placeholder="Search by city, title, venue..."
            ariaLabel="Search championships"
            widthClass="w-52 sm:w-64"
          />

          <select
            v-model="selectedYear"
            aria-label="Filter by season year"
            class="text-xs font-semibold py-1.5 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-850 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 shadow-xs cursor-pointer"
          >
            <option value="all">All Seasons</option>
            <option value="2026">Season 2026</option>
            <option value="2027">Season 2027</option>
          </select>
        </div>
      </template>
    </SectionHeader>

    <!-- Category Filter Tabs -->
    <SegmentedControl
      v-model="activeCategory"
      :options="categoryOptions"
    />

    <!-- Events List (Strict Vertical Lane Alignment via EventRow) -->
    <div v-if="filteredEvents.length > 0" class="divide-y divide-gray-200 dark:divide-gray-800">
      <EventRow
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        @click="selectedEvent = event"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <h3 class="text-base font-semibold text-gray-700 dark:text-gray-300">No events found</h3>
      <p class="text-xs text-gray-500 mt-1">Try resetting your filter or search query.</p>
      <button
        type="button"
        @click="resetAllFilters"
        class="mt-4 px-3.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      >
        Clear Filters
      </button>
    </div>

    <!-- Event Modal -->
    <EventModal :event="selectedEvent" @close="selectedEvent = null" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { wkfService } from '../services/wkfService.js'
import SectionHeader from '../components/ui/SectionHeader.vue'
import SegmentedControl from '../components/ui/SegmentedControl.vue'
import SearchInput from '../components/ui/SearchInput.vue'
import EventRow from '../components/ui/EventRow.vue'
import EventModal from '../components/EventModal.vue'

const allEvents = wkfService.getEvents()
const activeCategory = ref('all')
const searchQuery = ref('')
const selectedYear = ref('all')
const selectedEvent = ref(null)

const categories = [
  { id: 'all', label: 'All Events' },
  { id: 'university', label: 'Inter-University' },
  { id: 'divisional', label: 'Divisional & Regional' },
  { id: 'grading', label: 'Dan & Kyu Grading' },
  { id: 'workshop', label: 'Workshops & Camps' },
  { id: 'past', label: 'Past Championships' }
]

const categoryOptions = computed(() => {
  return categories.map(cat => ({
    label: cat.label,
    value: cat.id,
    count: cat.id === 'all'
      ? allEvents.length
      : allEvents.filter(e => e.category === cat.id).length
  }))
})

const filteredEvents = computed(() => {
  return allEvents.filter(e => {
    if (activeCategory.value !== 'all' && e.category !== activeCategory.value) {
      return false
    }
    if (selectedYear.value !== 'all' && !e.dates.includes(selectedYear.value)) {
      return false
    }
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchTitle = e.title.toLowerCase().includes(q)
      const matchLoc = e.location.toLowerCase().includes(q)
      const matchVenue = e.venue.toLowerCase().includes(q)
      if (!matchTitle && !matchLoc && !matchVenue) return false
    }
    return true
  })
})

function resetAllFilters() {
  activeCategory.value = 'all'
  searchQuery.value = ''
  selectedYear.value = 'all'
}
</script>
