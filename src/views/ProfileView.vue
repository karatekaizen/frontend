<template>
  <div class="py-10 sm:py-16 px-4">
    <div class="max-w-2xl mx-auto">

      <!-- Not logged in -->
      <div v-if="!isLoggedIn" class="flex flex-col items-center gap-5 py-16 text-center">
        <div class="size-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <svg class="size-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-black text-gray-900 dark:text-white">My Profile</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Sign in to view your profile and registrations</p>
        </div>
        <button
          @click="openLogin"
          class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold transition-all shadow-sm cursor-pointer"
        >Sign In</button>
      </div>

      <!-- Logged in -->
      <div v-else class="flex flex-col gap-6">

        <!-- Profile card -->
        <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
          <!-- Cover -->
          <div class="h-24 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500" />

          <div class="px-6 pb-6">
            <!-- Avatar -->
            <div class="relative -mt-10 mb-4 flex items-end justify-between">
              <div class="size-20 rounded-xl border-4 border-white dark:border-gray-900 overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md">
                <img
                  v-if="userProfile?.user_image"
                  :src="`https://lms.kaizen.paradox-bd.com${userProfile.user_image}`"
                  :alt="displayName"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <span class="text-2xl font-black text-rose-600 dark:text-rose-400">{{ initials }}</span>
                </div>
              </div>
              <div class="flex gap-2 pb-1">
                <a
                  href="https://lms.kaizen.paradox-bd.com/edit-profile"
                  target="_blank"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-decoration-none"
                >
                  <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit Profile
                </a>
                <button
                  @click="handleLogout"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                >
                  <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>

            <h1 class="text-xl font-black text-gray-900 dark:text-white">{{ displayName }}</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentUser }}</p>
            <p v-if="userProfile?.bio" class="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ userProfile.bio }}
            </p>

            <!-- Role badge -->
            <div class="mt-3">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                <svg class="size-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Kaizen Student
              </span>
            </div>
          </div>
        </div>

        <!-- Quick links card -->
        <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
          <div class="px-5 py-3.5 border-b border-gray-100 dark:border-gray-800">
            <h2 class="text-sm font-bold text-gray-900 dark:text-white">My Academy</h2>
          </div>
          <div class="divide-y divide-gray-100 dark:divide-gray-800">
            <a
              v-for="link in academyLinks"
              :key="link.href"
              :href="link.href"
              target="_blank"
              class="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-decoration-none group"
            >
              <div class="flex items-center gap-3">
                <div class="size-8 rounded-lg bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="link.icon"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">{{ link.label }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ link.desc }}</p>
                </div>
              </div>
              <svg class="size-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Events registration section -->
        <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
          <div class="px-5 py-3.5 border-b border-gray-100 dark:border-gray-800">
            <h2 class="text-sm font-bold text-gray-900 dark:text-white">Event Registrations</h2>
          </div>
          <div class="px-5 py-8 flex flex-col items-center gap-3 text-center">
            <div class="size-10 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center">
              <svg class="size-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">No upcoming registrations</p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Browse events and register to compete</p>
            </div>
            <router-link
              to="/events"
              class="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline text-decoration-none"
            >Browse Events →</router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { isLoggedIn, currentUser, userProfile, logout } from '../store/authStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const openAuthModal = inject('openAuthModal')

const displayName = computed(() =>
  userProfile.value?.full_name ||
  userProfile.value?.first_name ||
  currentUser.value?.split('@')[0] ||
  'Student'
)

const initials = computed(() => {
  const name = displayName.value
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  return name.slice(0, 2).toUpperCase()
})

const academyLinks = [
  {
    label: 'My Courses',
    desc: 'Continue your training',
    href: 'https://lms.kaizen.paradox-bd.com/courses',
    icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
  },
  {
    label: 'My Batches',
    desc: 'Scheduled training sessions',
    href: 'https://lms.kaizen.paradox-bd.com/batches',
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
  },
  {
    label: 'Certificates',
    desc: 'Your earned certifications',
    href: 'https://lms.kaizen.paradox-bd.com/certifications',
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
  },
  {
    label: 'Discussion Forum',
    desc: 'Connect with fellow students',
    href: 'https://lms.kaizen.paradox-bd.com/discussions',
    icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
  }
]

function openLogin() {
  if (openAuthModal) openAuthModal('login')
}

async function handleLogout() {
  await logout()
  router.push('/')
}
</script>
