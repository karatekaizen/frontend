<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
    <!-- Header -->
    <SectionHeader
      eyebrow="Official Gear Standards"
      title="Approved Dojo Equipment & Brands"
      description="To guarantee student safety and standardized training performance, only equipment homologated to international standards is authorized for dojo sparring, examinations, and official competitions."
      :level="1"
    >
      <template #eyebrow-icon>
        <svg class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      </template>
    </SectionHeader>

    <!-- Category Filter Tabs -->
    <SegmentedControl
      v-model="activeCategory"
      :options="categoryOptions"
    />

    <!-- Brands Grid (Surfaces, Clean Typography) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="brand in filteredItems"
        :key="brand.name"
        class="p-6 rounded-2xl bg-white dark:bg-gray-850 border border-gray-200/80 dark:border-gray-700/80 flex flex-col justify-between hover:border-rose-300 dark:hover:border-rose-700 transition-all group"
      >
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-2xl font-black text-gray-950 dark:text-white font-mono tracking-wider">
              {{ brand.logo }}
            </span>
            <WkfBadge variant="homologated" size="xs">
              <template #icon>
                <svg class="size-3 fill-current" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </template>
              HOMOLOGATED
            </WkfBadge>
          </div>

          <div class="text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1.5">
            {{ brand.category }}
          </div>

          <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            {{ brand.description }}
          </p>
        </div>

        <div class="pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs text-gray-500">
          <span>Headquarters: <strong class="text-gray-800 dark:text-gray-200">{{ brand.country }}</strong></span>
          <span class="text-rose-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 cursor-pointer">
            <span>View Homologation</span>
            <span>→</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Certification Standards Section -->
    <div class="p-8 rounded-2xl bg-gray-50 dark:bg-gray-850 border border-gray-200/80 dark:border-gray-700/80 space-y-4">
      <h2 class="text-lg font-bold text-gray-950 dark:text-white font-sans">
        Kaizen Dojo Equipment Safety & Standards
      </h2>
      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
        All certified protections (gloves, shin-guards, foot guards, body protectors, and headgear) used at Kaizen Karate Academy undergo stringent biomechanical impact absorption testing. Uniforms (Karate-Gi) and belts are certified for traditional durability and freedom of movement.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { wkfService } from '../services/wkfService.js'
import { useFilterableList } from '../composables/useFilterableList.js'
import SectionHeader from '../components/ui/SectionHeader.vue'
import SegmentedControl from '../components/ui/SegmentedControl.vue'
import WkfBadge from '../components/ui/WkfBadge.vue'

const brands = wkfService.getApprovedBrands()

const categories = ['All Equipment', 'Protections', 'Karate-Gi', 'Tatami']

const {
  activeCategory,
  filteredItems,
  getCategoryCount
} = useFilterableList(brands, {
  defaultCategory: 'All Equipment',
  categoryField: 'category',
  searchFields: ['name', 'category', 'description']
})

const categoryOptions = computed(() => {
  return categories.map(cat => ({
    label: cat,
    value: cat,
    count: getCategoryCount(cat)
  }))
})
</script>
