<template>
  <div v-if="items && items.length > 0" class="space-y-3">
    <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
      <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
      <span>On this page</span>
    </div>

    <nav class="space-y-1 text-xs border-l border-gray-200 dark:border-gray-800 pl-3">
      <a
        v-for="item in items"
        :key="item.id"
        :href="`#${item.id}`"
        @click.prevent="scrollToHeading(item.id)"
        class="block py-1 transition-colors hover:text-rose-600 dark:hover:text-rose-400 text-gray-500 dark:text-gray-400 truncate"
        :class="[
          item.level === 3 ? 'pl-3 text-[11px]' : 'font-medium',
          activeId === item.id ? 'text-rose-600 dark:text-rose-400 font-semibold' : ''
        ]"
      >
        {{ item.title }}
      </a>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const activeId = ref('')

function scrollToHeading(id) {
  activeId.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
