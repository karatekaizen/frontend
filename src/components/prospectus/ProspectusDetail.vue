<template>
  <div class="bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs overflow-hidden">
    <!-- Header Section -->
    <div class="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30 dark:from-gray-900/40 dark:via-gray-850 dark:to-gray-900/20">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
            {{ categoryName }}
          </span>
          <span v-if="detail?.localItem?.pronunciation" class="px-2.5 py-1 text-[11px] font-medium rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50">
            উচ্চারণ: {{ detail.localItem.pronunciation }}
          </span>
        </div>

        <span class="text-[11px] font-mono text-gray-400">
          {{ detail?.route }}
        </span>
      </div>

      <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        {{ cleanTitle }}
      </h1>

      <p v-if="detail?.localItem?.summary" class="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
        {{ detail.localItem.summary }}
      </p>
    </div>

    <!-- Demonstration Media Section (if photos available) -->
    <div v-if="hasImages" class="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-900/20">
      <h3 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
        <svg class="size-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Technical Form & Demonstration
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <!-- Front View -->
        <div v-if="detail.localItem?.frontImage" class="group relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
          <div class="aspect-4/3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <img 
              :src="detail.localItem.frontImage" 
              alt="Front View Demonstration"
              class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <span class="block text-center text-[11px] font-semibold text-gray-600 dark:text-gray-300 mt-2">
            Front Stance View (সামনের ভিউ)
          </span>
        </div>

        <!-- Side View -->
        <div v-if="detail.localItem?.sideImage" class="group relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
          <div class="aspect-4/3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <img 
              :src="detail.localItem.sideImage" 
              alt="Side View Demonstration"
              class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <span class="block text-center text-[11px] font-semibold text-gray-600 dark:text-gray-300 mt-2">
            Side Profile View (পার্শ্ব ভিউ)
          </span>
        </div>

        <!-- Additional Demonstration Images -->
        <template v-if="detail.localItem?.demoImages">
          <div 
            v-for="(img, idx) in detail.localItem.demoImages" 
            :key="idx" 
            class="group relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
          >
            <div class="aspect-4/3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
              <img 
                :src="img.url || img" 
                :alt="img.caption || 'Technique View'"
                class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <span class="block text-center text-[11px] font-semibold text-gray-600 dark:text-gray-300 mt-2">
              {{ img.caption || `Phase ${idx + 1}` }}
            </span>
          </div>
        </template>
      </div>
    </div>

    <!-- Execution Checkpoints (Points to Remember) -->
    <div v-if="detail?.localItem?.points && detail.localItem.points.length > 0" class="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-800">
      <h3 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
        <svg class="size-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Key Technical Checkpoints (মনে রাখার বিষয়)
      </h3>

      <ul class="space-y-2.5">
        <li 
          v-for="(point, idx) in detail.localItem.points" 
          :key="idx"
          class="flex items-start gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-200"
        >
          <span class="size-5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200 dark:border-emerald-800">
            {{ idx + 1 }}
          </span>
          <span class="leading-relaxed">{{ point }}</span>
        </li>
      </ul>
    </div>

    <!-- Full Content / Description -->
    <div class="p-6 sm:p-8 prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed">
      <div v-if="detail?.content" class="whitespace-pre-line text-gray-700 dark:text-gray-200 space-y-4">
        {{ cleanContent(detail.content) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  detail: {
    type: Object,
    default: null
  }
})

const cleanTitle = computed(() => {
  if (!props.detail?.title) return 'Technique Details'
  return props.detail.title.replace(/^[#\s]+/, '').trim()
})

const categoryName = computed(() => {
  const route = props.detail?.route || ''
  const parts = route.split('/')
  if (parts.length > 1) {
    return parts[1].toUpperCase()
  }
  return 'SHITO-RYU'
})

const hasImages = computed(() => {
  const item = props.detail?.localItem
  return !!(item?.frontImage || item?.sideImage || (item?.demoImages && item.demoImages.length > 0))
})

function cleanContent(content) {
  if (!content) return ''
  // Strip Markdown H1 and frontmatter if present
  return content
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/^#\s+.+$/m, '')
    .trim()
}
</script>
