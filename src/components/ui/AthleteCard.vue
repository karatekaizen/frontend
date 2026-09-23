<template>
  <div
    class="p-5 rounded-2xl bg-white dark:bg-gray-850 border border-gray-200/80 dark:border-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
    @click="$emit('click', athlete)"
    role="button"
    tabindex="0"
    @keydown.enter="$emit('click', athlete)"
    @keydown.space.prevent="$emit('click', athlete)"
  >
    <div>
      <div class="flex items-start justify-between mb-4">
        <img
          :src="athlete.avatar"
          :alt="athlete.name"
          class="size-14 rounded-xl object-cover border border-gray-200 dark:border-gray-700 shrink-0"
          loading="lazy"
        />
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <svg class="size-3.5 fill-amber-500" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="6"/>
            <path d="M8 14L6 22l6-3 6 3-2-8"/>
          </svg>
          <span>World #{{ athlete.rank || 1 }}</span>
        </span>
      </div>

      <div class="text-xs font-semibold text-rose-600 dark:text-rose-400">
        {{ athlete.category }}
      </div>
      <h3 class="text-base font-bold text-gray-950 dark:text-white group-hover:text-rose-600 transition-colors mt-0.5 truncate">
        {{ athlete.name }}
      </h3>
      <div class="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
        <span class="font-medium text-gray-700 dark:text-gray-300">{{ athlete.country }}</span>
        <span class="text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded border border-gray-200 dark:border-gray-700">
          {{ athlete.code }}
        </span>
      </div>
    </div>

    <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-750 flex items-center justify-between text-xs">
      <span class="text-gray-500 dark:text-gray-400">Points</span>
      <span class="font-mono font-bold text-gray-900 dark:text-white">{{ athlete.points?.toLocaleString() }} pts</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  athlete: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>
