<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Unauthenticated Fallback -->
    <div v-if="!state.isLoggedIn" class="text-center py-16 bg-white dark:bg-gray-850 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-xs">
      <div class="size-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
        <svg class="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h2 class="text-2xl font-black text-gray-950 dark:text-white">Student Portal Access</h2>
      <p class="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto mt-2 mb-6">
        Sign in with your Kaizen account to manage tournament registrations, track belt curriculum on LMS, and view your student record.
      </p>
      <div class="flex items-center justify-center gap-3">
        <button
          @click="authStore.openAuthModal('login')"
          class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
        >
          Sign In
        </button>
        <button
          @click="authStore.openAuthModal('signup')"
          class="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold text-sm transition-colors cursor-pointer"
        >
          Create Student Account
        </button>
      </div>
    </div>

    <!-- Authenticated Student Dashboard -->
    <div v-else class="space-y-8">
      <!-- Profile Header Banner -->
      <div class="bg-white dark:bg-gray-850 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="size-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
              {{ initials }}
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h1 class="text-xl sm:text-2xl font-black text-gray-950 dark:text-white">
                  {{ state.user?.fullName }}
                </h1>
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                  {{ state.user?.isSystemUser ? 'Official / Admin' : 'Active Student' }}
                </span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {{ state.user?.email }} • Kaizen Karate Academy (BSKF / WKF affiliated)
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2.5 shrink-0 flex-wrap">
            <a
              href="https://lms.kaizen.paradox-bd.com"
              target="_blank"
              rel="noopener"
              class="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 font-semibold text-xs transition-colors inline-flex items-center gap-1.5 text-decoration-none"
            >
              <span>Academy LMS</span>
              <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <button
              @click="authStore.logout()"
              class="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="p-5 rounded-2xl bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 shadow-xs">
          <div class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Registered Events</div>
          <div class="text-2xl font-black text-gray-950 dark:text-white mt-1">{{ state.registeredEvents.length }}</div>
          <div class="text-[11px] text-gray-500 mt-0.5">Active tournament registrations</div>
        </div>
        <div class="p-5 rounded-2xl bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 shadow-xs">
          <div class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">LMS Courses</div>
          <div class="text-2xl font-black text-gray-950 dark:text-white mt-1">Available</div>
          <div class="text-[11px] text-gray-500 mt-0.5">Kata, Kumite & Belt Curriculum</div>
        </div>
        <div class="p-5 rounded-2xl bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 shadow-xs">
          <div class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Membership Status</div>
          <div class="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">Verified</div>
          <div class="text-[11px] text-gray-500 mt-0.5">WKF / Kaizen Athlete ID active</div>
        </div>
      </div>

      <!-- My Registered Events Section -->
      <div class="bg-white dark:bg-gray-850 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs space-y-4">
        <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <h2 class="text-lg font-bold text-gray-950 dark:text-white">My Tournament Registrations</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Events and competitions you are confirmed to attend</p>
          </div>
          <router-link
            to="/events"
            class="px-3.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-decoration-none"
          >
            Browse Events
          </router-link>
        </div>

        <!-- Empty State -->
        <div v-if="state.registeredEvents.length === 0" class="text-center py-10">
          <p class="text-sm text-gray-500 dark:text-gray-400">You haven't registered for any events yet.</p>
          <router-link
            to="/events"
            class="inline-block mt-3 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold text-decoration-none shadow-xs"
          >
            Explore 2026 Calendar
          </router-link>
        </div>

        <!-- Events List -->
        <div v-else class="space-y-3">
          <div
            v-for="reg in state.registeredEvents"
            :key="reg.id"
            class="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400">
                  Confirmed
                </span>
                <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ reg.category }}</span>
              </div>
              <h3 class="text-sm font-bold text-gray-950 dark:text-white">{{ reg.title }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <span>{{ reg.dates }}</span>
                <span>•</span>
                <span>{{ reg.location }}</span>
              </p>
            </div>
            <button
              @click="authStore.unregisterFromEvent(reg.id)"
              class="self-start sm:self-center px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { authStore, authState } from '../store/authStore.js'

const state = authState

const initials = computed(() => {
  if (!state.user?.fullName) return 'KZ'
  const parts = state.user.fullName.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0].slice(0, 2).toUpperCase()
})
</script>
