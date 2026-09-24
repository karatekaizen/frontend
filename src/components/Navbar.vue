<template>
  <header class="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
    <!-- Top Live Ticker (Modular Sub-Component) -->
    <LiveTicker :banner="liveBanner" />

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 gap-3 lg:gap-4">
        
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2.5 shrink-0 text-decoration-none group">
          <div class="size-9 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-[1.5px] shadow-xs shrink-0 overflow-hidden">
            <img src="/logo.jpg" alt="Kaizen Karate Academy" class="w-full h-full object-cover rounded-[9px]" />
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5 leading-none">
              <span class="text-base sm:text-lg font-black tracking-tight text-gray-950 dark:text-white font-sans">
                KAIZEN<span class="text-rose-600">.</span>
              </span>
              <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                Academy
              </span>
            </div>
            <span class="text-[9px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider leading-tight">
              Academy of Martial Arts
            </span>
          </div>
        </router-link>

        <!-- Desktop Navigation Items -->
        <nav class="hidden lg:flex items-center gap-1 text-[13px] font-medium text-gray-600 dark:text-gray-300">
          <router-link
            v-for="item in primaryLinks"
            :key="item.path"
            :to="item.path"
            class="px-2.5 py-1.5 rounded-lg whitespace-nowrap hover:text-gray-950 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-gray-800 transition-colors text-decoration-none"
            active-class="text-rose-600 dark:text-rose-400 font-bold bg-rose-50/70 dark:bg-rose-950/40"
          >
            {{ item.label }}
          </router-link>

          <!-- Academy Link with Badge -->
          <a
            href="https://lms.kaizen.paradox-bd.com"
            target="_blank"
            rel="noopener"
            class="px-2.5 py-1.5 rounded-lg whitespace-nowrap text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors inline-flex items-center gap-1 text-decoration-none font-semibold"
          >
            <span>Academy</span>
            <span class="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">LMS</span>
          </a>

          <!-- More Dropdown -->
          <div class="relative" @mouseenter="isMoreOpen = true" @mouseleave="isMoreOpen = false">
            <button
              type="button"
              @click="isMoreOpen = !isMoreOpen"
              class="px-2.5 py-1.5 rounded-lg whitespace-nowrap hover:text-gray-950 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-gray-800 transition-colors inline-flex items-center gap-1 cursor-pointer select-none"
              :class="isMoreActive ? 'text-rose-600 dark:text-rose-400 font-bold' : ''"
            >
              <span>More</span>
              <svg class="size-3.5 transition-transform duration-200" :class="isMoreOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Popover -->
            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="transform scale-95 opacity-0 -translate-y-1"
              enter-to-class="transform scale-100 opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="transform scale-100 opacity-100 translate-y-0"
              leave-to-class="transform scale-95 opacity-0 -translate-y-1"
            >
              <div
                v-if="isMoreOpen"
                class="absolute left-0 mt-1 w-56 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl py-1.5 z-50 focus:outline-none"
              >
                <router-link
                  v-for="item in moreNavLinks"
                  :key="item.path"
                  :to="item.path"
                  @click="isMoreOpen = false"
                  class="flex flex-col px-3.5 py-2 text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-decoration-none group"
                  active-class="bg-rose-50/70 dark:bg-rose-950/40"
                >
                  <span class="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                    {{ item.label }}
                  </span>
                  <span class="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1">
                    {{ item.desc }}
                  </span>
                </router-link>
              </div>
            </transition>
          </div>
        </nav>

        <!-- Right Quick Actions -->
        <div class="flex items-center gap-2 shrink-0">

          <!-- Command Palette Button -->
          <button
            @click="$emit('open-search')"
            class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750 transition-all text-xs font-medium shadow-xs cursor-pointer"
            title="Search (⌘K)"
          >
            <svg class="size-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span class="hidden xl:inline">Search...</span>
            <kbd class="hidden sm:inline-block px-1 py-0.2 text-[10px] font-semibold text-gray-500 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded">
              ⌘K
            </kbd>
          </button>

          <!-- Auth: Logged Out → Login + Sign Up buttons -->
          <template v-if="!isLoggedIn && !authLoading">
            <button
              @click="$emit('open-auth', 'login')"
              class="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
            >
              Log In
            </button>
            <button
              @click="$emit('open-auth', 'signup')"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-500 text-white shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
              <span>Join Free</span>
            </button>
          </template>

          <!-- Auth: Logged In → Avatar + dropdown -->
          <div v-else-if="isLoggedIn" class="relative" @mouseenter="isProfileOpen = true" @mouseleave="isProfileOpen = false">
            <button
              class="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-all cursor-pointer"
              @click="isProfileOpen = !isProfileOpen"
            >
              <!-- Avatar -->
              <div class="size-6 rounded-lg overflow-hidden bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shrink-0">
                <img
                  v-if="userProfile?.user_image"
                  :src="`https://lms.kaizen.paradox-bd.com${userProfile.user_image}`"
                  :alt="displayName"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-[9px] font-black text-white">{{ initials }}</span>
              </div>
              <span class="text-xs font-semibold text-gray-700 dark:text-gray-300 max-w-[80px] truncate">{{ displayName }}</span>
              <svg class="size-3 text-gray-400 transition-transform" :class="isProfileOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Profile dropdown -->
            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="transform scale-95 opacity-0 -translate-y-1"
              enter-to-class="transform scale-100 opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="transform scale-100 opacity-100 translate-y-0"
              leave-to-class="transform scale-95 opacity-0 -translate-y-1"
            >
              <div v-if="isProfileOpen" class="absolute right-0 mt-1 w-44 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl py-1.5 z-50">
                <div class="px-3.5 py-2 border-b border-gray-100 dark:border-gray-800">
                  <p class="text-xs font-bold text-gray-900 dark:text-white truncate">{{ displayName }}</p>
                  <p class="text-[10px] text-gray-500 dark:text-gray-400 truncate">{{ currentUser }}</p>
                </div>
                <router-link
                  to="/profile"
                  @click="isProfileOpen = false"
                  class="flex items-center gap-2 px-3.5 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-decoration-none"
                >
                  <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0"/>
                  </svg>
                  My Profile
                </router-link>
                <a
                  href="https://lms.kaizen.paradox-bd.com"
                  target="_blank"
                  @click="isProfileOpen = false"
                  class="flex items-center gap-2 px-3.5 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-decoration-none"
                >
                  <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25"/>
                  </svg>
                  Academy (LMS)
                </a>
                <button
                  @click="handleLogout"
                  class="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 transition-colors cursor-pointer border-t border-gray-100 dark:border-gray-800 mt-1"
                >
                  <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            </transition>
          </div>

          <!-- Loading skeleton for auth -->
          <div v-else class="size-8 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />

          <!-- Mobile Hamburger Toggle -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <svg v-if="!isMobileMenuOpen" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <div
      v-show="isMobileMenuOpen"
      class="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-3 pb-6 space-y-3 text-sm font-medium"
    >
      <!-- Auth section for mobile -->
      <div v-if="!isLoggedIn && !authLoading" class="flex gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
        <button
          @click="$emit('open-auth', 'login'); isMobileMenuOpen = false"
          class="flex-1 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 cursor-pointer text-center"
        >Log In</button>
        <button
          @click="$emit('open-auth', 'signup'); isMobileMenuOpen = false"
          class="flex-1 py-2 text-xs font-bold rounded-lg bg-rose-600 text-white cursor-pointer text-center"
        >Join Free</button>
      </div>
      <div v-else-if="isLoggedIn" class="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
        <div class="size-8 rounded-lg overflow-hidden bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center">
          <span class="text-xs font-black text-white">{{ initials }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold text-gray-900 dark:text-white truncate">{{ displayName }}</p>
          <router-link to="/profile" @click="isMobileMenuOpen = false" class="text-[10px] text-rose-600 dark:text-rose-400 text-decoration-none">View Profile →</router-link>
        </div>
      </div>

      <div class="space-y-1">
        <div class="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1">Competition</div>
        <router-link
          v-for="item in primaryLinks"
          :key="item.path"
          :to="item.path"
          @click="isMobileMenuOpen = false"
          class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-decoration-none"
          active-class="bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold"
        >
          {{ item.label }}
        </router-link>
      </div>

      <div class="space-y-1 pt-2 border-t border-gray-100 dark:border-gray-800">
        <div class="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1">Kaizen Ecosystem</div>
        <a
          href="https://lms.kaizen.paradox-bd.com"
          target="_blank"
          rel="noopener"
          class="flex items-center justify-between px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 text-decoration-none"
        >
          <span>Kaizen Academy (LMS)</span>
          <span class="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">Live</span>
        </a>
      </div>

      <div class="space-y-1 pt-2 border-t border-gray-100 dark:border-gray-800">
        <div class="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1">Federation & Governance</div>
        <router-link
          v-for="item in moreNavLinks"
          :key="item.path"
          :to="item.path"
          @click="isMobileMenuOpen = false"
          class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-decoration-none"
          active-class="bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold"
        >
          {{ item.label }}
        </router-link>
      </div>

      <div v-if="isLoggedIn" class="pt-3 border-t border-gray-100 dark:border-gray-800">
        <button
          @click="handleLogout(); isMobileMenuOpen = false"
          class="w-full flex items-center justify-center gap-2 py-2 text-xs text-red-600 font-semibold cursor-pointer"
        >Sign Out</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LiveTicker from './LiveTicker.vue'
import { isLoggedIn, currentUser, userProfile, authLoading, logout } from '../store/authStore.js'

defineProps({
  liveBanner: {
    type: Object,
    required: true
  }
})

defineEmits(['open-search', 'open-auth'])

const route = useRoute()
const router = useRouter()
const isMobileMenuOpen = ref(false)
const isMoreOpen = ref(false)
const isProfileOpen = ref(false)

const primaryLinks = [
  { path: '/events', label: 'Events' },
  { path: '/ranking', label: 'Rankings' },
  { path: '/news', label: 'News' }
]

const moreNavLinks = [
  { path: '/approved', label: 'Dojo Equipment', desc: 'Approved Gi, belts & training gear' },
  { path: '/about', label: 'About Academy', desc: 'Dojo lineage, senseis & philosophy' },
  { path: '/olympics', label: 'Olympic Standards', desc: 'WKF competition syllabus & pathways' },
  { path: '/documents', label: 'Curriculum & Rules', desc: 'Dan syllabus, kata guide & handbooks' },
  { path: '/social-legacy', label: 'Dojo Community', desc: 'Youth empowerment & Guardian Girls' }
]

const isMoreActive = computed(() => {
  return moreNavLinks.some(link => route.path.startsWith(link.path))
})

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

async function handleLogout() {
  await logout()
  isProfileOpen.value = false
  if (route.path === '/profile') router.push('/')
}

watch(() => route.fullPath, () => {
  isMobileMenuOpen.value = false
  isMoreOpen.value = false
  isProfileOpen.value = false
})
</script>
