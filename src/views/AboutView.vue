<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
    <!-- Header -->
    <SectionHeader
      eyebrow="Premier Martial Arts Dojo"
      title="About Kaizen Karate Academy"
      description="Founded on the enduring martial philosophy of Kaizen (continuous, lifelong improvement). Our dojo cultivates traditional Karate-Do virtue, technical mastery, and elite competitive athletic excellence."
      :level="1"
    >
      <template #eyebrow-icon>
        <svg class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </template>
    </SectionHeader>

    <!-- History & Mission Surface -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div class="lg:col-span-8 space-y-4">
        <h2 class="text-xl font-bold text-gray-950 dark:text-white font-sans">
          Dojo Heritage & Philosophy
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {{ about.history }}
        </p>
        <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          At Kaizen Karate Academy, we preserve the classical roots of Shotokan and Shito-Ryu while empowering students with cutting-edge athletic conditioning, transparent Dan grading milestones, and Olympic-standard electronic scoring systems.
        </p>
      </div>

      <!-- President Quote Card -->
      <div class="lg:col-span-4 p-6 rounded-2xl bg-gray-50 dark:bg-gray-850 border border-gray-200/80 dark:border-gray-700/80 space-y-3">
        <div class="text-xs font-bold text-rose-600 uppercase tracking-wider">Leadership</div>
        <div class="text-sm font-bold text-gray-950 dark:text-white">
          {{ about.president.name }}
        </div>
        <div class="text-xs text-gray-500">
          {{ about.president.role }} (Since {{ about.president.since }})
        </div>
        <blockquote class="text-xs italic text-gray-600 dark:text-gray-300 border-l-2 border-rose-500 pl-3 pt-1">
          "{{ about.president.quote }}"
        </blockquote>
      </div>
    </div>

    <!-- Continental Federations Section -->
    <div class="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-800">
      <div>
        <h2 class="text-2xl font-black text-gray-950 dark:text-white font-sans">
          Dojo Affiliations & Global Recognition
        </h2>
        <p class="text-xs text-gray-500 mt-1">
          Accredited and partnered with continental federations and international Olympic karate bodies.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          v-for="fed in federations"
          :key="fed.code"
          class="p-5 rounded-2xl bg-white dark:bg-gray-850 border border-gray-200/80 dark:border-gray-700/80 space-y-2"
        >
          <div class="flex items-center justify-between">
            <span class="text-lg font-black text-rose-600 font-mono">{{ fed.code }}</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{{ fed.members }} NF</span>
          </div>
          <div class="text-xs font-bold text-gray-950 dark:text-white leading-snug">
            {{ fed.name }}
          </div>
          <div class="text-[11px] text-gray-500">
            <div>HQ: {{ fed.hq }}</div>
            <div>President: {{ fed.president }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Commissions Grid -->
    <div class="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-800">
      <div>
        <h2 class="text-2xl font-black text-gray-950 dark:text-white font-sans">
          Academy Technical Boards & Commissions
        </h2>
        <p class="text-xs text-gray-500 mt-1">
          Specialized panels governing Dan examinations, tournament coaching, youth pedagogy, and student welfare.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="com in about.commissions"
          :key="com.name"
          class="p-5 rounded-2xl bg-white dark:bg-gray-850 border border-gray-200/80 dark:border-gray-700/80 space-y-2"
        >
          <div class="text-xs font-bold text-rose-600 dark:text-rose-400">
            Chair: {{ com.chair }}
          </div>
          <h3 class="text-base font-bold text-gray-950 dark:text-white">
            {{ com.name }}
          </h3>
          <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ com.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { wkfService } from '../services/wkfService.js'
import SectionHeader from '../components/ui/SectionHeader.vue'

const about = wkfService.getAboutData()
const federations = wkfService.getFederations()
</script>
