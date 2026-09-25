<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Header -->
    <SectionHeader
      eyebrow="Training Locations & Branches"
      title="Our Dojo Network"
      description="Find your nearest official Kaizen Karate Academy dojo. All branches offer standardized WKF curriculum, accredited black belt examinations, and championship squad pathways."
    />

    <!-- Filters & Search Toolbar -->
    <div class="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <SegmentedControl
        v-model="selectedCity"
        :options="cityTabs"
      />

      <div class="w-full md:w-72">
        <SearchInput
          v-model="searchQuery"
          placeholder="Search by dojo, city or sensei…"
        />
      </div>
    </div>

    <!-- Dojo Cards Grid -->
    <div v-if="filteredDojos.length > 0" class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <DojoCard
        v-for="dojo in filteredDojos"
        :key="dojo.slug"
        :dojo="dojo"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="mt-12 text-center py-16 px-4 bg-white dark:bg-gray-850 rounded-2xl border border-gray-200 dark:border-gray-800">
      <div class="size-12 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 mx-auto flex items-center justify-center mb-3">
        <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h3 class="text-base font-bold text-gray-900 dark:text-white">No dojos found</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
        No training branch matched your search "{{ searchQuery }}". Try clearing your search or city filter.
      </p>
      <button
        @click="resetFilters"
        class="mt-4 px-3.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200 transition-colors cursor-pointer"
      >
        Reset Filters
      </button>
    </div>

    <!-- Affiliate Dojo Banner -->
    <div class="mt-16 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900 dark:from-gray-850 dark:via-gray-900 dark:to-black rounded-3xl p-8 sm:p-10 border border-gray-800 text-white relative overflow-hidden shadow-xl">
      <div class="relative z-10 max-w-2xl">
        <span class="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30 mb-3">
          Branch Affiliation Program
        </span>
        <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Affiliate Your Dojo With Kaizen
        </h2>
        <p class="text-sm text-gray-300 mt-2 leading-relaxed">
          Are you a certified karate instructor or university club seeking official affiliation, WKF pathway integration, and national tournament sanctioning? Join our growing national martial arts ecosystem.
        </p>
        <div class="mt-6 flex flex-wrap items-center gap-3">
          <router-link
            to="/about"
            class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-sm text-decoration-none cursor-pointer"
          >
            Learn About Lineage & Criteria
          </router-link>
          <a
            href="mailto:affiliate@kaizenkarate.org"
            class="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition border border-gray-700 text-decoration-none"
          >
            Contact Technical Board
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SectionHeader from '../components/ui/SectionHeader.vue'
import SegmentedControl from '../components/ui/SegmentedControl.vue'
import SearchInput from '../components/ui/SearchInput.vue'
import DojoCard from '../components/ui/DojoCard.vue'
import { dojoService } from '../services/dojoService.js'

const searchQuery = ref('')
const selectedCity = ref('All Cities')
const dojos = ref(dojoService.getDojos())

onMounted(async () => {
  const fetched = await dojoService.fetchDojos()
  if (fetched && fetched.length > 0) {
    dojos.value = fetched
  }
})

const cityTabs = computed(() => {
  const cities = Array.from(new Set(dojos.value.map(d => d.city).filter(Boolean)))
  return [
    { label: 'All Cities', value: 'All Cities', count: dojos.value.length },
    ...cities.map(c => ({
      label: c,
      value: c,
      count: dojos.value.filter(d => d.city === c).length
    }))
  ]
})

const filteredDojos = computed(() => {
  return dojos.value.filter(d => {
    const matchesCity = selectedCity.value === 'All Cities' || d.city === selectedCity.value
    if (!matchesCity) return false

    if (!searchQuery.value.trim()) return true
    const q = searchQuery.value.toLowerCase()
    return (
      d.branch_name?.toLowerCase().includes(q) ||
      d.city?.toLowerCase().includes(q) ||
      d.head_sensei?.toLowerCase().includes(q) ||
      d.address?.toLowerCase().includes(q)
    )
  })
})

function resetFilters() {
  selectedCity.value = 'All Cities'
  searchQuery.value = ''
}
</script>
