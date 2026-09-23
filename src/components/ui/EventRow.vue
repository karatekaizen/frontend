<template>
  <div
    class="py-4 px-3 -mx-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850/80 transition-colors cursor-pointer group flex items-center justify-between gap-4"
    @click="$emit('click', event)"
    role="button"
    tabindex="0"
    @keydown.enter="$emit('click', event)"
    @keydown.space.prevent="$emit('click', event)"
  >
    <!-- Col 1: Date Block (w-32 fixed lane) -->
    <div class="w-32 shrink-0">
      <div class="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-xs font-bold text-center border border-gray-200/80 dark:border-gray-700">
        {{ event.dates }}
      </div>
    </div>

    <!-- Col 2: Title, Status & Location (Fluid Lane) -->
    <div class="flex-1 min-w-0 pr-2">
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold text-rose-600 dark:text-rose-400">{{ event.categoryLabel }}</span>
        <WkfBadge v-if="badgeVariant" :variant="badgeVariant" size="xs">
          {{ badgeLabel }}
        </WkfBadge>
      </div>

      <h3 class="text-base font-bold text-gray-950 dark:text-white group-hover:text-rose-600 transition-colors mt-0.5 truncate">
        {{ event.title }}
      </h3>

      <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
        <span class="font-medium text-gray-700 dark:text-gray-300">{{ event.location }}</span>
        <span>•</span>
        <span class="truncate">{{ event.venue }}</span>
      </div>
    </div>

    <!-- Col 3: Athlete / Federation Metrics (w-48 fixed lane) -->
    <div v-if="!compact" class="w-48 shrink-0 text-right hidden lg:block">
      <span class="text-xs text-gray-500 dark:text-gray-400 font-mono font-medium">
        {{ event.athletesCount }} athletes • {{ event.nationsCount }} nations
      </span>
    </div>
    <div v-else class="text-right hidden sm:block">
      <span class="text-xs text-gray-500 font-mono">
        {{ event.athletesCount }} athletes
      </span>
    </div>

    <!-- Col 4: Action CTA (w-36 fixed lane) -->
    <div class="w-36 shrink-0 text-right">
      <span
        v-if="compact"
        class="text-xs font-semibold text-rose-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
      >
        <span>Bulletin & Draws</span>
        <span>→</span>
      </span>
      <button
        v-else
        type="button"
        class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 shadow-xs group-hover:border-gray-400 transition-all cursor-pointer"
      >
        Bulletin & Details →
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import WkfBadge from './WkfBadge.vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const badgeVariant = computed(() => {
  if (props.event.status === 'LIVE') return 'live'
  if (props.event.status === 'REGISTRATION OPEN') return 'reg-open'
  if (props.event.status === 'COMPLETED') return 'completed'
  return null
})

const badgeLabel = computed(() => {
  if (props.event.status === 'REGISTRATION OPEN') return 'REG OPEN'
  return props.event.status
})
</script>
