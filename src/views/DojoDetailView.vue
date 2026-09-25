<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Back Navigation -->
    <div class="mb-6">
      <router-link
        to="/dojos"
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400 transition-colors text-decoration-none group"
      >
        <svg class="size-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Dojo Directory</span>
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="py-20 text-center">
      <div class="size-8 border-2 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p class="text-xs text-gray-500">Loading branch details…</p>
    </div>

    <!-- Dojo Content -->
    <div v-else-if="dojo" class="space-y-10">
      <!-- 1. Hero Card -->
      <div class="relative bg-white dark:bg-gray-850 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10 shadow-sm overflow-hidden">
        <!-- Top accent gradient -->
        <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500" />

        <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 pt-2">
          <div class="max-w-2xl">
            <div class="flex items-center gap-2 mb-3">
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40">
                <svg class="size-3 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {{ dojo.city }} Dojo
              </span>
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
                WKF Standard Dojo
              </span>
            </div>

            <h1 class="text-2xl sm:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
              {{ dojo.branch_name }}
            </h1>

            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
              {{ dojo.hero_tagline || dojo.address }}
            </p>

            <!-- Quick features list -->
            <div class="mt-6 flex flex-wrap items-center gap-3">
              <div
                v-for="feat in dojo.features || []"
                :key="feat.title"
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800/70 border border-gray-100 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                <span class="size-1.5 rounded-full bg-rose-500"></span>
                <span>{{ feat.title }}: {{ feat.desc }}</span>
              </div>
            </div>
          </div>

          <!-- Join CTA Box -->
          <div class="shrink-0 w-full md:w-64 bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
            <div>
              <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Monthly Membership</span>
              <div class="text-2xl font-black text-gray-950 dark:text-white mt-0.5">
                {{ dojo.monthly_fee ? `BDT ${dojo.monthly_fee}` : 'BDT 1,200' }}
              </div>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                Admission / Gi: {{ dojo.admission_fee ? `BDT ${dojo.admission_fee}` : 'BDT 2,500' }}
              </p>
            </div>

            <button
              @click="openEnrollment"
              class="mt-4 w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-sm cursor-pointer text-center"
            >
              Enroll at This Dojo
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Grid: Instructor Spotlight + Schedule -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Sensei Spotlight -->
        <div class="lg:col-span-1 bg-white dark:bg-gray-850 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400 block mb-2">
              Dojo Leadership
            </span>
            <div class="flex items-center gap-3 mb-4">
              <div class="size-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-gray-900 dark:text-white">
                  {{ dojo.head_sensei }}
                </h3>
                <p class="text-xs text-rose-600 dark:text-rose-400 font-medium">
                  {{ dojo.head_sensei_title }}
                </p>
              </div>
            </div>

            <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ dojo.head_sensei_bio }}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2 text-xs">
            <div class="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <span>Contact:</span>
              <span class="font-medium text-gray-800 dark:text-gray-200">{{ dojo.contact_phone || 'Available' }}</span>
            </div>
            <div class="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <span>Email:</span>
              <span class="font-medium text-gray-800 dark:text-gray-200 truncate ml-2">{{ dojo.contact_email || 'karate@kaizen.org' }}</span>
            </div>
          </div>
        </div>

        <!-- Weekly Schedule & Training Programs -->
        <div class="lg:col-span-2 bg-white dark:bg-gray-850 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
          <div class="flex items-center justify-between gap-4 mb-5">
            <div>
              <span class="text-[10px] font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400 block mb-1">
                Timetable
              </span>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                Weekly Training Programs
              </h2>
            </div>
            <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              Weekly Sessions
            </span>
          </div>

          <!-- Programs list -->
          <div class="space-y-3">
            <div
              v-for="prog in dojo.programs || []"
              :key="prog.name"
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-rose-200 dark:hover:border-rose-900/60 transition-colors"
            >
              <div>
                <h4 class="text-xs font-bold text-gray-900 dark:text-white">
                  {{ prog.name }}
                </h4>
                <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                  Target: {{ prog.level }}
                </p>
              </div>

              <div class="flex items-center gap-3 shrink-0">
                <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/40">
                  {{ prog.days }}
                </span>
                <span class="text-xs font-bold text-gray-700 dark:text-gray-300">
                  {{ prog.time }}
                </span>
              </div>
            </div>
          </div>

          <!-- Location details footer -->
          <div class="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-start gap-2.5">
              <svg class="size-4 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <p class="text-xs text-gray-600 dark:text-gray-300">
                {{ dojo.address }}
              </p>
            </div>

            <a
              :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dojo.branch_name + ' ' + dojo.address)}`"
              target="_blank"
              rel="noopener"
              class="shrink-0 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Get Directions</span>
              <svg class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Not found state -->
    <div v-else class="py-20 text-center">
      <h3 class="text-base font-bold text-gray-900 dark:text-white">Dojo Branch Not Found</h3>
      <p class="text-xs text-gray-500 mt-1">The requested branch location could not be located.</p>
      <router-link to="/dojos" class="mt-4 inline-block px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold text-decoration-none">
        Return to Directory
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { dojoService } from '../services/dojoService.js'

const route = useRoute()
const dojo = ref(null)
const loading = ref(true)

async function loadDojo() {
  const slug = route.params.slug
  loading.value = true
  dojo.value = dojoService.getDojoBySlug(slug)
  const fetched = await dojoService.fetchDojoBySlug(slug)
  if (fetched) dojo.value = fetched
  loading.value = false
}

onMounted(() => loadDojo())
watch(() => route.params.slug, () => loadDojo())

function openEnrollment() {
  window.dispatchEvent(new CustomEvent('open-auth-modal', {
    detail: { mode: 'signup', dojo: dojo.value?.branch_name }
  }))
}
</script>
