<template>
  <div v-if="items && items.length > 0" class="space-y-3">
    <div class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
      <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
      <span>On this page</span>
    </div>

    <nav class="space-y-1 text-xs border-l-2 border-gray-200 dark:border-gray-800 relative">
      <a
        v-for="item in items"
        :key="item.id"
        :href="`#${item.id}`"
        @click.prevent="scrollToHeading(item.id)"
        class="block py-1.5 transition-all text-xs truncate relative group cursor-pointer"
        :class="[
          item.level === 3 ? 'pl-5 text-[11px]' : 'pl-3 font-medium',
          activeId === item.id 
            ? 'text-rose-600 dark:text-rose-400 font-semibold' 
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        ]"
      >
        <span 
          v-if="activeId === item.id" 
          class="absolute -left-[2px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-rose-600 dark:bg-rose-500 rounded-full"
        ></span>
        {{ item.title }}
      </a>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const activeId = ref('')
let observer = null

function scrollToHeading(id) {
  activeId.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function initObserver() {
  if (observer) {
    observer.disconnect()
  }

  if (typeof window === 'undefined' || !props.items.length) return

  observer = new IntersectionObserver(
    (entries) => {
      // Find the first visible heading from top
      const visible = entries.find(e => e.isIntersecting)
      if (visible && visible.target.id) {
        activeId.value = visible.target.id
      }
    },
    {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0
    }
  )

  props.items.forEach(item => {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  })
}

watch(
  () => props.items,
  () => {
    // Re-observe when document changes
    setTimeout(initObserver, 150)
  },
  { deep: true }
)

onMounted(() => {
  setTimeout(initObserver, 200)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>
