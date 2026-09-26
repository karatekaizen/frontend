<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Header -->
    <SectionHeader
      eyebrow="Visual Archive & Do Experience"
      title="Academy Photo Gallery"
      description="Capturing tournament triumphs, Dan grading examinations, international seminars, and daily training across our dojo branches."
    />

    <!-- Filter Tabs -->
    <div class="mt-8 flex items-center justify-between">
      <SegmentedControl
        v-model="activeCategory"
        :options="categoryOptions"
      />
    </div>

    <!-- Photo Cards Grid -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in filteredPhotos"
        :key="item.id"
        @click="activePhoto = item"
        class="bg-white dark:bg-gray-850 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xs hover:shadow-lg hover:border-rose-500/50 dark:hover:border-rose-500/50 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <!-- Image with zoom on hover -->
          <div class="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-black/70 backdrop-blur-xs text-white border border-white/20">
              {{ item.categoryLabel }}
            </span>
          </div>

          <div class="p-5">
            <div class="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mb-1.5">
              <span>{{ item.date }}</span>
              <span class="truncate ml-2 max-w-[180px]">{{ item.location }}</span>
            </div>
            <h3 class="text-base font-bold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
              {{ item.caption }}
            </p>
          </div>
        </div>

        <div class="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-semibold text-rose-600 dark:text-rose-400">
          <span>View High-Res Photo</span>
          <svg class="size-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="activePhoto"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="activePhoto = null"
      >
        <div class="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
          <!-- Close button -->
          <button
            type="button"
            @click="activePhoto = null"
            class="absolute top-4 right-4 z-10 size-8 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Large image -->
          <div class="w-full max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
            <img :src="activePhoto.image" :alt="activePhoto.title" class="w-full h-full object-contain" />
          </div>

          <!-- Caption & Details -->
          <div class="p-6">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40">
                {{ activePhoto.categoryLabel }}
              </span>
              <span class="text-xs text-gray-500">{{ activePhoto.date }} • {{ activePhoto.location }}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ activePhoto.title }}
            </h3>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
              {{ activePhoto.caption }}
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionHeader from '../components/ui/SectionHeader.vue'
import SegmentedControl from '../components/ui/SegmentedControl.vue'
import { galleryService } from '../services/galleryService.js'

const activeCategory = ref('all')
const activePhoto = ref(null)

const categoryOptions = galleryService.getCategories()

const filteredPhotos = computed(() => {
  return galleryService.getItems(activeCategory.value)
})
</script>
