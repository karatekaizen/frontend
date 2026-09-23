<template>
  <!-- Rank 1: Gold Medal -->
  <span
    v-if="rank === 1"
    class="inline-flex items-center justify-center size-7 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-extrabold text-xs shadow-xs border border-amber-300 dark:border-amber-800 shrink-0"
    title="Rank #1 (Gold)"
  >
    <svg class="size-3.5 fill-amber-500 mr-0.5" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="6"/>
      <path d="M8 14L6 22l6-3 6 3-2-8"/>
    </svg>
    <span>1</span>
  </span>

  <!-- Rank 2: Silver Medal -->
  <span
    v-else-if="rank === 2"
    class="inline-flex items-center justify-center size-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 shrink-0"
    title="Rank #2 (Silver)"
  >
    <svg class="size-3.5 fill-slate-400 mr-0.5" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="6"/>
      <path d="M8 14L6 22l6-3 6 3-2-8"/>
    </svg>
    <span>2</span>
  </span>

  <!-- Rank 3: Bronze Medal -->
  <span
    v-else-if="rank === 3"
    class="inline-flex items-center justify-center size-7 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 font-bold text-xs border border-orange-300 dark:border-orange-800 shrink-0"
    title="Rank #3 (Bronze)"
  >
    <svg class="size-3.5 fill-orange-500 mr-0.5" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="6"/>
      <path d="M8 14L6 22l6-3 6 3-2-8"/>
    </svg>
    <span>3</span>
  </span>

  <!-- Rank 4+: Clean Numbered Rank -->
  <span
    v-else
    class="inline-flex items-center justify-center size-7 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs border border-transparent shrink-0"
  >
    {{ rank }}
  </span>
</template>

<script setup>
defineProps({
  rank: {
    type: Number,
    required: true
  }
})
</script>
