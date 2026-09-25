<template>
  <div class="bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs overflow-hidden">
    <!-- Breadcrumb Dock -->
    <div class="px-6 py-3.5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400">
      <button 
        type="button" 
        @click="$emit('navigate', 'prospectus')" 
        class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
      >
        Prospectus
      </button>
      <span class="text-gray-300 dark:text-gray-600">/</span>
      <span v-if="categoryLabel" class="text-gray-700 dark:text-gray-300 font-medium">
        {{ categoryLabel }}
      </span>
      <template v-if="isSubPage">
        <span class="text-gray-300 dark:text-gray-600">/</span>
        <span class="text-rose-600 dark:text-rose-400 font-semibold truncate max-w-[200px]">
          {{ cleanTitle }}
        </span>
      </template>
    </div>

    <!-- Header Section -->
    <div class="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50/40 via-white to-gray-50/20 dark:from-gray-900/30 dark:via-gray-850 dark:to-gray-900/10">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
            {{ categoryName }}
          </span>
          <span v-if="detail?.is_group" class="px-2 py-0.5 text-[10px] font-mono rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            Overview Guide
          </span>
        </div>

        <span class="text-[11px] font-mono text-gray-400">
          {{ detail?.route }}
        </span>
      </div>

      <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        {{ cleanTitle }}
      </h1>

      <p v-if="detail?.description" class="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
        {{ detail.description }}
      </p>
    </div>

    <!-- Rendered Markdown Body with Full Typography & Responsive Tables -->
    <div 
      class="p-6 sm:p-8 prose prose-rose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-h1:hidden prose-h2:text-lg sm:prose-h2:text-xl prose-h2:border-b prose-h2:border-gray-100 dark:prose-h2:border-gray-800 prose-h2:pb-2 prose-h3:text-sm sm:prose-h3:text-base prose-table:w-full prose-table:border-collapse prose-th:bg-gray-50 dark:prose-th:bg-gray-800/80 prose-th:p-2.5 prose-th:text-xs prose-th:border prose-th:border-gray-200 dark:prose-th:border-gray-700 prose-td:p-2.5 prose-td:text-xs prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-800 prose-img:rounded-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700 prose-img:bg-gray-50 dark:prose-img:bg-gray-900 prose-img:p-1.5 prose-img:mx-auto prose-img:max-h-[360px] prose-img:object-contain prose-blockquote:border-rose-500 prose-blockquote:bg-rose-50/30 dark:prose-blockquote:bg-rose-950/20 prose-blockquote:p-4 prose-blockquote:rounded-r-xl"
      v-html="renderedMarkdown"
      @click="handleContentClick"
    ></div>

    <!-- Bottom Pagination Navigation Dock -->
    <div v-if="pagination.prev || pagination.next" class="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Previous Document -->
      <button
        v-if="pagination.prev"
        type="button"
        @click="$emit('navigate', pagination.prev.route)"
        class="flex flex-col items-start p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-rose-300 dark:hover:border-rose-700 transition-all text-left group cursor-pointer shadow-xs"
      >
        <span class="text-[11px] font-mono text-gray-400 group-hover:text-rose-500 transition-colors flex items-center gap-1">
          <svg class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </span>
        <span class="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 truncate w-full mt-1">
          {{ pagination.prev.title }}
        </span>
      </button>
      <div v-else></div>

      <!-- Next Document -->
      <button
        v-if="pagination.next"
        type="button"
        @click="$emit('navigate', pagination.next.route)"
        class="flex flex-col items-end p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-rose-300 dark:hover:border-rose-700 transition-all text-right group cursor-pointer shadow-xs sm:col-start-2"
      >
        <span class="text-[11px] font-mono text-gray-400 group-hover:text-rose-500 transition-colors flex items-center gap-1">
          Next
          <svg class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
        <span class="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 truncate w-full mt-1">
          {{ pagination.next.title }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import { prospectusService } from '../../services/prospectusService.js'

const props = defineProps({
  detail: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['navigate'])

const cleanTitle = computed(() => {
  if (!props.detail?.title) return 'Technique Details'
  return props.detail.title.replace(/^[#\s]+/, '').trim()
})

const categoryName = computed(() => {
  const cat = props.detail?.category || ''
  if (!cat || cat === 'overview') return 'SHITO-RYU'
  return cat.toUpperCase()
})

const categoryLabel = computed(() => {
  return props.detail?.category_label || props.detail?.category || ''
})

const isSubPage = computed(() => {
  const route = props.detail?.route || ''
  return route.split('/').length > 2
})

const pagination = computed(() => {
  return prospectusService.getPrevNext(props.detail?.route || '')
})

// Configure marked with custom heading IDs for TOC jumping
const renderer = new marked.Renderer()
renderer.heading = ({ tokens, depth }) => {
  const text = tokens.map(t => t.raw).join('')
  const clean = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').trim()
  const id = clean.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')
  return `<h${depth} id="${id}" class="scroll-mt-24 group flex items-center justify-between">${text}<a href="#${id}" class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-rose-500 ml-2 text-sm transition-opacity">#</a></h${depth}>`
}

marked.setOptions({
  renderer,
  gfm: true,
  breaks: false
})

const renderedMarkdown = computed(() => {
  let content = props.detail?.content || ''
  if (!content) return '<p class="text-gray-400 italic">No content available for this technique.</p>'

  // Strip frontmatter if still present
  content = content.replace(/^---[\s\S]*?---\s*/, '')

  try {
    return marked.parse(content)
  } catch (err) {
    console.error('Failed to parse markdown:', err)
    return `<div class="whitespace-pre-line">${content}</div>`
  }
})

function handleContentClick(event) {
  // Delegate internal markdown links e.g. /prospectus/punches/oi
  const target = event.target.closest('a')
  if (!target) return

  const href = target.getAttribute('href')
  if (href && (href.startsWith('/prospectus') || href.startsWith('prospectus'))) {
    event.preventDefault()
    const route = href.replace(/^\/+/, '')
    emit('navigate', route)
  }
}
</script>

