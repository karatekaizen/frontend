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
          <!-- Student Portal / Sign In Button -->
          <router-link
            v-if="authState.isLoggedIn"
            to="/profile"
            class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 transition-all text-decoration-none whitespace-nowrap shadow-xs"
            title="My Student Profile"
          >
            <div class="size-4 rounded-full bg-rose-600 text-white text-[9px] flex items-center justify-center font-bold">
              {{ (authState.user?.fullName || 'S')[0].toUpperCase() }}
            </div>
            <span class="max-w-[100px] truncate">{{ authState.user?.fullName?.split(' ')[0] }}</span>
          </router-link>
          <button
            v-else
            @click="authStore.openAuthModal('login')"
            class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 transition-all cursor-pointer whitespace-nowrap shadow-xs"
          >
            <svg class="size-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Sign In</span>
          </button>

          <!-- ERP Desk Button (for authorities/staff) -->
          <a
            href="https://erp.kaizen.paradox-bd.com"
            target="_blank"
            rel="noopener"
            class="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-gray-200 border border-gray-700 dark:border-gray-600 transition-all text-decoration-none whitespace-nowrap shadow-xs"
            title="Kaizen ERP & Member Desk"
          >
            <svg class="size-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>ERP Desk</span>
          </a>

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

          <!-- Watch Live Button -->
          <a
            href="https://www.youtube.com/@WKFKarateWorldChamps"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-500 text-white shadow-xs transition-all text-decoration-none whitespace-nowrap"
          >
            <span class="size-1.5 rounded-full bg-white animate-ping"></span>
            <span>Watch Live</span>
          </a>

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
        <router-link
          v-if="authState.isLoggedIn"
          to="/profile"
          @click="isMobileMenuOpen = false"
          class="flex items-center justify-between px-3 py-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-decoration-none"
        >
          <span>Student Portal ({{ authState.user?.fullName?.split(' ')[0] }})</span>
          <span class="text-xs text-rose-600 dark:text-rose-400">Profile</span>
        </router-link>
        <button
          v-else
          @click="isMobileMenuOpen = false; authStore.openAuthModal('login')"
          class="flex items-center justify-between w-full px-3 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold cursor-pointer"
        >
          <span>Sign In / Student Account</span>
          <span class="text-xs text-gray-400">Auth</span>
        </button>
        <a
          href="https://erp.kaizen.paradox-bd.com"
          target="_blank"
          rel="noopener"
          class="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-decoration-none"
        >
          <span>Kaizen ERP & Member Desk</span>
          <span class="text-xs text-gray-400">Desk</span>
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

      <div class="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
        <a
          href="https://www.youtube.com/@WKFKarateWorldChamps"
          target="_blank"
          rel="noopener"
          class="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-rose-600 text-white font-semibold text-xs text-decoration-none"
        >
          Watch Live Stream
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { authStore, authState } from '../store/authStore.js'
import LiveTicker from './LiveTicker.vue'

defineProps({
  liveBanner: {
    type: Object,
    required: true
  }
})

defineEmits(['open-search'])

const route = useRoute()
const isMobileMenuOpen = ref(false)
const isMoreOpen = ref(false)

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

watch(() => route.fullPath, () => {
  isMobileMenuOpen.value = false
  isMoreOpen.value = false
})
</script>
