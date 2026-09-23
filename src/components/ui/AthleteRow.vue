<template>
  <tr
    class="hover:bg-gray-50/80 dark:hover:bg-gray-850 transition-colors cursor-pointer group"
    @click="$emit('click', athlete)"
  >
    <!-- Rank Column (w-16 fixed lane) -->
    <td class="py-4 px-3 text-center w-16">
      <MedalBadge :rank="athlete.rank" />
    </td>

    <!-- Athlete Info -->
    <td class="py-4 px-3">
      <div class="flex items-center gap-3">
        <img
          :src="athlete.avatar"
          :alt="athlete.name"
          class="size-10 rounded-xl object-cover border border-gray-200 dark:border-gray-700 shrink-0"
          loading="lazy"
        />
        <div class="min-w-0">
          <div class="font-bold text-gray-950 dark:text-white group-hover:text-rose-600 transition-colors text-sm truncate">
            {{ athlete.name }}
          </div>
          <div class="text-[11px] text-gray-500 dark:text-gray-400 font-normal line-clamp-1 max-w-xs">
            {{ athlete.bio }}
          </div>
        </div>
      </div>
    </td>

    <!-- Country & Code -->
    <td class="py-4 px-3">
      <div class="flex items-center gap-2">
        <span class="text-lg leading-none">{{ athlete.flag }}</span>
        <span class="font-medium text-gray-800 dark:text-gray-200">{{ athlete.country }}</span>
        <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1 py-0.2 rounded border border-gray-200 dark:border-gray-700">
          {{ athlete.code }}
        </span>
      </div>
    </td>

    <!-- Key Title / Distinction -->
    <td class="py-4 px-3 hidden md:table-cell">
      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60">
        <span class="size-1 rounded-full bg-rose-500"></span>
        {{ athlete.title }}
      </span>
    </td>

    <!-- Points with Visual Progress Bar -->
    <td class="py-4 px-3 text-right">
      <div class="font-mono font-bold text-gray-900 dark:text-white text-sm">
        {{ athlete.points.toLocaleString() }} <span class="text-[10px] text-gray-400 font-normal">pts</span>
      </div>
      <div class="w-24 ml-auto h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-1 overflow-hidden">
        <div
          class="h-full bg-rose-600 rounded-full transition-all duration-500"
          :style="{ width: Math.min(100, (athlete.points / 10000) * 100) + '%' }"
        ></div>
      </div>
    </td>

    <!-- Trend -->
    <td class="py-4 px-3 text-center">
      <span v-if="athlete.trend === 'up'" class="text-emerald-600 font-bold text-xs">▲ +1</span>
      <span v-else-if="athlete.trend === 'down'" class="text-rose-600 font-bold text-xs">▼ -1</span>
      <span v-else class="text-gray-400 font-bold text-xs">▬</span>
    </td>

    <!-- Action Button -->
    <td class="py-4 px-3 text-right">
      <button
        type="button"
        class="px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 shadow-xs cursor-pointer transition-colors"
      >
        Profile
      </button>
    </td>
  </tr>
</template>

<script setup>
import MedalBadge from './MedalBadge.vue'

defineProps({
  athlete: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>
