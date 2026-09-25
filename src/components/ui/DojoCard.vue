<template>
  <div class="flex flex-col bg-white dark:bg-gray-850 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-rose-500/50 dark:hover:border-rose-500/50 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
    <!-- Header banner strip -->
    <div class="h-2 w-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500" />

    <div class="p-6 flex-1 flex flex-col justify-between">
      <div>
        <!-- City badge & Status -->
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40">
            <svg class="size-3 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ dojo.city }}
          </span>
          <span class="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <span class="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Active Dojo
          </span>
        </div>

        <!-- Dojo Title -->
        <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors tracking-tight">
          {{ dojo.branch_name }}
        </h3>

        <!-- Tagline -->
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
          {{ dojo.hero_tagline || dojo.address }}
        </p>

        <!-- Instructor Info -->
        <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <div class="size-9 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/50 dark:border-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
            <svg class="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="min-w-0">
            <p class="text-xs font-semibold text-gray-900 dark:text-white truncate">
              {{ dojo.head_sensei }}
            </p>
            <p class="text-[10px] text-gray-500 dark:text-gray-400 truncate">
              {{ dojo.head_sensei_title }}
            </p>
          </div>
        </div>

        <!-- Schedule snippet -->
        <div class="mt-3.5 flex items-start gap-2 bg-gray-50 dark:bg-gray-800/60 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
          <svg class="size-4 text-gray-400 dark:text-gray-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xs text-gray-600 dark:text-gray-300 leading-snug line-clamp-2">
            {{ dojo.schedule_summary }}
          </p>
        </div>
      </div>

      <!-- Footer: Fee + CTA -->
      <div class="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div>
          <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Monthly Tuition</span>
          <span class="text-sm font-black text-gray-950 dark:text-white">
            {{ dojo.monthly_fee ? `BDT ${dojo.monthly_fee}` : 'BDT 1,200' }}
          </span>
        </div>

        <router-link
          :to="`/dojo/${dojo.slug}`"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold hover:bg-rose-600 dark:hover:bg-rose-500 dark:hover:text-white transition-colors text-decoration-none shadow-sm cursor-pointer"
        >
          <span>Explore Dojo</span>
          <svg class="size-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  dojo: {
    type: Object,
    required: true
  }
})
</script>
