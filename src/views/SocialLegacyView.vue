<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
    <!-- Header -->
    <SectionHeader
      eyebrow="Community & Dojo Welfare"
      title="Kaizen Social Legacy"
      description="Kaizen Karate Academy harnesses the core ethical principles of Karate-Do to champion community outreach, youth character building, women's self-defense, and inclusive martial arts."
      :level="1"
    >
      <template #eyebrow-icon>
        <svg class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </template>
    </SectionHeader>

    <!-- Social Legacy Initiatives Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="program in programs"
        :key="program.id"
        class="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 overflow-hidden bg-white dark:bg-gray-850 flex flex-col justify-between"
      >
        <div>
          <div class="aspect-[16/9] w-full bg-gray-100 dark:bg-gray-800 relative">
            <img
              :src="program.image"
              :alt="program.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-950/80 text-white backdrop-blur-sm">
              {{ program.badge }}
            </span>
          </div>

          <div class="p-6 space-y-3">
            <h2 class="text-xl font-bold text-gray-950 dark:text-white font-sans">
              {{ program.title }}
            </h2>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ program.description }}
            </p>
          </div>
        </div>

        <div class="p-6 pt-0">
          <div class="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
            <strong>Impact & Reach:</strong> {{ program.reach }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { wkfService } from '../services/wkfService.js'
import SectionHeader from '../components/ui/SectionHeader.vue'

const programs = wkfService.getSocialLegacyData()
</script>
