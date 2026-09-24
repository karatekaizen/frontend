<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
    <!-- Header -->
    <SectionHeader
      eyebrow="Official Dispatches"
      title="News Center & Media"
      description="The official newsroom for academy announcements, tournament dispatches, belt examinations, and masterclasses from Kaizen Karate Academy."
      :level="1"
    >
      <template #eyebrow-icon>
        <svg class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
        </svg>
      </template>

      <template #action>
        <SearchInput
          v-model="searchQuery"
          placeholder="Search news..."
          ariaLabel="Search news articles"
          widthClass="w-48 sm:w-60"
        />
      </template>
    </SectionHeader>

    <!-- Category Filter Tabs -->
    <SegmentedControl
      v-model="activeCategory"
      :options="categoryOptions"
    />

    <!-- News Grid (Clean Surfaces, Clear Typography via ArticleCard) -->
    <div v-if="filteredItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ArticleCard
        v-for="article in filteredItems"
        :key="article.id"
        :article="article"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <h3 class="text-base font-semibold text-gray-700 dark:text-gray-300">No articles matched</h3>
      <p class="text-xs text-gray-500 mt-1">Try another search keyword or select All.</p>
      <button
        type="button"
        @click="resetFilters"
        class="mt-4 px-3.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      >
        Clear Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { wkfService } from '../services/wkfService.js'
import { useFilterableList } from '../composables/useFilterableList.js'
import SectionHeader from '../components/ui/SectionHeader.vue'
import SegmentedControl from '../components/ui/SegmentedControl.vue'
import SearchInput from '../components/ui/SearchInput.vue'
import ArticleCard from '../components/ui/ArticleCard.vue'

const articles = wkfService.getNewsArticles()

const categories = [
  'All',
  'Championship',
  'Leadership',
  'Academy',
  'Technique'
]

const {
  activeCategory,
  searchQuery,
  filteredItems,
  resetFilters,
  getCategoryCount
} = useFilterableList(articles, {
  defaultCategory: 'All',
  categoryField: 'category',
  searchFields: ['title', 'summary', 'category']
})

const categoryOptions = computed(() => {
  return categories.map(cat => ({
    label: cat,
    value: cat,
    count: getCategoryCount(cat)
  }))
})
</script>
