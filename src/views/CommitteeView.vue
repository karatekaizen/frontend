<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Header -->
    <SectionHeader
      eyebrow="Academy Governance & Leadership"
      title="Executive Board & Sensei Council"
      :description="`Current term ${committeeData.currentTerm} governing body overseeing syllabus standardization, Dan grading examinations, and collegiate martial arts development.`"
    />

    <!-- Council Tabs -->
    <div class="mt-8 flex items-center justify-between">
      <SegmentedControl
        v-model="activeCouncilId"
        :options="councilOptions"
      />
    </div>

    <!-- Active Council Info -->
    <div class="mt-6">
      <p class="text-xs text-gray-500 dark:text-gray-400">
        {{ activeCouncil?.description }}
      </p>
    </div>

    <!-- Member Grid -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="member in activeCouncil?.members || []"
        :key="member.id"
        class="bg-white dark:bg-gray-850 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between shadow-xs hover:border-rose-500/40 dark:hover:border-rose-500/40 transition-all duration-200 group"
      >
        <div>
          <!-- Header: Role badge & Rank -->
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40">
              {{ member.role }}
            </span>
            <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {{ member.rank }}
            </span>
          </div>

          <!-- Profile Info -->
          <div class="flex items-start gap-3 mb-3">
            <div class="size-11 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700 flex items-center justify-center text-rose-600 dark:text-rose-400 font-black text-sm shrink-0">
              <svg class="size-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="min-w-0">
              <h3 class="text-base font-bold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                {{ member.name }}
              </h3>
              <p class="text-xs text-rose-600 dark:text-rose-400 font-medium">
                {{ member.title }}
              </p>
            </div>
          </div>

          <!-- Bio -->
          <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-2 line-clamp-3">
            {{ member.bio }}
          </p>
        </div>

        <!-- Institutional affiliation footer -->
        <div class="mt-5 pt-3.5 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400 space-y-0.5">
          <div class="truncate">
            <span class="font-medium text-gray-700 dark:text-gray-300">Institution:</span> {{ member.institution }}
          </div>
          <div class="truncate">
            <span class="font-medium text-gray-700 dark:text-gray-300">Dept:</span> {{ member.department }}
          </div>
        </div>
      </div>
    </div>

    <!-- Apply / Join Leadership Banner -->
    <div class="mt-16 bg-gray-50 dark:bg-gray-850 rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="max-w-xl">
        <span class="text-[10px] font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400 block mb-1">
          Leadership Pathways
        </span>
        <h3 class="text-xl sm:text-2xl font-black text-gray-950 dark:text-white tracking-tight">
          Interested in Contributing to Academy Governance?
        </h3>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
          Senior Dan grades, collegiate competitors, and community organizers are invited to join sub-committees, event juries, and university dojo branches.
        </p>
      </div>

      <div class="shrink-0 flex flex-col sm:flex-row gap-3">
        <a
          href="mailto:committee@kaizenkarate.org"
          class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-sm text-decoration-none text-center cursor-pointer"
        >
          Submit Expression of Interest
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionHeader from '../components/ui/SectionHeader.vue'
import SegmentedControl from '../components/ui/SegmentedControl.vue'
import { committeeService } from '../services/committeeService.js'

const committeeData = committeeService.getCommitteeData()
const activeCouncilId = ref('executive')

const councilOptions = computed(() => {
  return committeeService.getCouncils().map(c => ({
    label: c.name,
    value: c.id,
    count: c.members.length
  }))
})

const activeCouncil = computed(() => {
  return committeeService.getCouncilById(activeCouncilId.value)
})
</script>
