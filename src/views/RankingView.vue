<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
    <!-- Header -->
    <SectionHeader
      eyebrow="Official Leaderboard"
      title="WKF World Ranking"
      description="Global standings calculated across official WKF sanctioned competitions, Olympic qualifiers, and World Championships."
      :level="1"
    >
      <template #eyebrow-icon>
        <svg class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      </template>

      <template #action>
        <SearchInput
          v-model="searchQuery"
          placeholder="Filter athlete or country..."
          ariaLabel="Filter rankings"
          widthClass="w-48 sm:w-60"
        />
      </template>
    </SectionHeader>

    <!-- Category Selector Pills (Frappe SegmentedControl) -->
    <SegmentedControl
      v-model="selectedCategory"
      :options="availableCategories"
    />

    <!-- Ranking Table (Information on Surfaces, Clean Table) -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-800 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            <th class="py-3 px-3 w-16 text-center">Rank</th>
            <th class="py-3 px-3">Athlete</th>
            <th class="py-3 px-3">Country / NF</th>
            <th class="py-3 px-3 hidden md:table-cell">Distinction</th>
            <th class="py-3 px-3 text-right">Points</th>
            <th class="py-3 px-3 w-20 text-center">Trend</th>
            <th class="py-3 px-3 w-24 text-right">Dossier</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
          <AthleteRow
            v-for="athlete in filteredAthletes"
            :key="athlete.name"
            :athlete="athlete"
            @click="activeAthlete = athlete"
          />
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="filteredAthletes.length === 0" class="py-16 text-center text-sm text-gray-500">
        <p>No athletes found matching "{{ searchQuery }}".</p>
        <button
          type="button"
          @click="searchQuery = ''"
          class="mt-3 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Reset Search
        </button>
      </div>
    </div>

    <!-- Athlete Dossier Modal -->
    <AthleteModal :athlete="activeAthlete" @close="activeAthlete = null" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { wkfService } from '../services/wkfService.js'
import SectionHeader from '../components/ui/SectionHeader.vue'
import SegmentedControl from '../components/ui/SegmentedControl.vue'
import SearchInput from '../components/ui/SearchInput.vue'
import AthleteRow from '../components/ui/AthleteRow.vue'
import AthleteModal from '../components/AthleteModal.vue'

const selectedCategory = ref('male-kata')
const searchQuery = ref('')
const activeAthlete = ref(null)

const availableCategories = [
  { value: 'male-kata', label: 'Male Kata' },
  { value: 'female-kata', label: 'Female Kata' },
  { value: 'male-kumite-75', label: 'Male Kumite -75kg' },
  { value: 'male-kumite-60', label: 'Male Kumite -60kg' },
  { value: 'female-kumite-68', label: 'Female Kumite -68kg' },
  { value: 'female-kumite-50', label: 'Female Kumite -50kg' }
]

const currentList = computed(() => {
  return wkfService.getRankings(selectedCategory.value)
})

const filteredAthletes = computed(() => {
  if (!searchQuery.value.trim()) return currentList.value
  const q = searchQuery.value.toLowerCase()
  return currentList.value.filter(a => {
    return a.name.toLowerCase().includes(q) ||
           a.country.toLowerCase().includes(q) ||
           a.code.toLowerCase().includes(q)
  })
})
</script>
