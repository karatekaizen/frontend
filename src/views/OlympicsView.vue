<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
    <!-- Header -->
    <SectionHeader
      eyebrow="Olympic Movement"
      title="Karate in the Olympic Games"
      description="From the historic Olympic debut at Tokyo 2020 inside the legendary Nippon Budokan to the Youth Olympic Games in Buenos Aires and Dakar 2026."
      :level="1"
    >
      <template #eyebrow-icon>
        <svg class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </template>
    </SectionHeader>

    <!-- Tokyo 2020 Historic Showcase -->
    <div class="space-y-6">
      <SectionHeader
        eyebrow="Olympic Games"
        :title="olympics.tokyo2020.title"
        :description="`${olympics.tokyo2020.venue} • ${olympics.tokyo2020.dates}`"
        :level="2"
        :underlined="false"
      />

      <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
        {{ olympics.tokyo2020.description }} Eighty of the world's most accomplished athletes representing 36 nations qualified through a rigorous two-year world ranking points race and continental qualification tournament.
      </p>

      <!-- Tokyo 2020 Gold Medalists Grid -->
      <div>
        <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
          Tokyo 2020 Olympic Champions
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="med in olympics.tokyo2020.goldMedalists"
            :key="med.category"
            class="p-4 rounded-xl bg-white dark:bg-gray-850 border border-gray-200/80 dark:border-gray-700/80 space-y-1.5"
          >
            <div class="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <svg class="size-3.5 fill-amber-500 shrink-0" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="6"/>
                <path d="M8 14L6 22l6-3 6 3-2-8"/>
              </svg>
              <span>Olympic Gold</span>
              <span>•</span>
              <span>{{ med.category }}</span>
            </div>
            <div class="text-sm font-bold text-gray-950 dark:text-white">
              {{ med.winner }}
            </div>
            <div v-if="med.kata" class="text-xs text-gray-500">
              Kata: <em>{{ med.kata }}</em>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dakar 2026 & Buenos Aires 2018 Youth Olympic Games -->
    <div class="pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-850 border border-gray-200/80 dark:border-gray-700/80 space-y-3">
        <span class="text-xs font-bold text-rose-600 uppercase tracking-wider">Upcoming Showcase</span>
        <h3 class="text-xl font-bold text-gray-950 dark:text-white">
          {{ olympics.dakar2026.title }}
        </h3>
        <div class="text-xs text-gray-500">
          {{ olympics.dakar2026.location }} • {{ olympics.dakar2026.dates }}
        </div>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ olympics.dakar2026.description }}
        </p>
      </div>

      <div class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-850 border border-gray-200/80 dark:border-gray-700/80 space-y-3">
        <span class="text-xs font-bold text-rose-600 uppercase tracking-wider">Historic Milestone</span>
        <h3 class="text-xl font-bold text-gray-950 dark:text-white">
          {{ olympics.buenosAires2018.title }}
        </h3>
        <div class="text-xs text-gray-500">
          Buenos Aires, Argentina • Youth Olympic Games
        </div>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ olympics.buenosAires2018.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { wkfService } from '../services/wkfService.js'
import SectionHeader from '../components/ui/SectionHeader.vue'

const olympics = wkfService.getOlympicsData()
</script>
