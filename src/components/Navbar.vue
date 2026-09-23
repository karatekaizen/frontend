<template>
  <header class="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
    <!-- Top Live Ticker (Clean High Contrast) -->
    <div class="bg-gray-950 text-gray-200 text-xs py-2 px-4 border-b border-gray-900">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div class="flex items-center gap-2.5 overflow-hidden">
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-600/20 text-rose-300 border border-rose-500/40 shrink-0">
            <span class="size-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            LIVE NOW
          </span>
          <router-link to="/events" class="font-medium text-white truncate hover:underline text-decoration-none">
            {{ liveBanner.title }}
          </router-link>
          <span class="hidden md:inline text-gray-600">|</span>
          <span class="hidden md:inline text-gray-400 text-xs truncate">{{ liveBanner.subtitle }}</span>
        </div>

        <div class="flex items-center gap-4 shrink-0 text-xs text-gray-400">
          <span class="text-rose-400 font-semibold hidden sm:inline-flex items-center gap-1.5">
            <span class="size-1.5 rounded-full bg-rose-400 animate-ping"></span>
            {{ liveBanner.viewersCount }}
          </span>
          <div class="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors" title="Facebook">
              <svg class="size-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://youtube.com/@WKFKarateWorldChamps" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors" title="YouTube">
              <svg class="size-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 gap-3 sm:gap-6">
        
        <!-- Logo (Clean Inline Layout) -->
        <router-link to="/" class="flex items-center gap-3 shrink-0 text-decoration-none group">
          <div class="size-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-[2px] shadow-xs shrink-0">
            <div class="w-full h-full bg-white dark:bg-gray-900 rounded-[10px] flex items-center justify-center p-1">
              <svg viewBox="0 0 100 100" class="w-full h-full text-rose-600">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#E11D48" stroke-width="4"/>
                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
                <path d="M50 20 A 7 7 0 1 0 50 34 A 7 7 0 1 0 50 20 Z" fill="#E11D48" />
                <path d="M36 44 Q 50 36 64 42 L 72 54 L 66 57 L 58 48 L 52 64 L 62 82 L 54 84 L 46 68 L 38 84 L 30 82 L 42 60 L 36 49 L 28 54 L 24 50 Z" fill="currentColor"/>
                <circle cx="68" cy="38" r="4" fill="#D97706" />
              </svg>
            </div>
          </div>

          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="text-xl font-black tracking-tight text-gray-950 dark:text-white font-sans leading-none">
                WKF<span class="text-rose-600">.</span>
              </span>
              <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Official
              </span>
            </div>
            <span class="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider leading-tight">
              World Karate Federation
            </span>
          </div>
        </router-link>

        <!-- Desktop Navigation Items (Single-line whitespace-nowrap, No Two-line Breaks) -->
        <nav class="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[13px] font-medium text-gray-600 dark:text-gray-300">
          <template v-for="item in navLinks" :key="item.label">
            <a
              v-if="item.isExternal"
              :href="item.href"
              target="_blank"
              rel="noopener"
              class="px-2.5 py-1.5 rounded-lg whitespace-nowrap hover:text-gray-950 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-gray-800 transition-colors inline-flex items-center gap-1 text-decoration-none text-rose-600 dark:text-rose-400 font-semibold"
            >
              <span>{{ item.label }}</span>
              <svg class="size-2.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <router-link
              v-else
              :to="item.path"
              class="px-2.5 py-1.5 rounded-lg whitespace-nowrap hover:text-gray-950 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-gray-800 transition-colors"
              active-class="text-rose-600 dark:text-rose-400 font-bold bg-rose-50/70 dark:bg-rose-950/40"
            >
              {{ item.label }}
            </router-link>
          </template>
        </nav>

        <!-- Right Quick Actions -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <!-- ERP & Member Portal Button -->
          <a
            href="https://erp.kaizen.paradox-bd.com"
            target="_blank"
            rel="noopener"
            class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-gray-200 border border-gray-700 dark:border-gray-600 transition-all text-decoration-none whitespace-nowrap shadow-xs"
            title="Kaizen ERP & Member Portal"
          >
            <svg class="size-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>ERP Portal</span>
          </a>

          <!-- Command Palette Search Button -->
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
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-500 text-white shadow-xs transition-all text-decoration-none whitespace-nowrap"
          >
            <span class="size-1.5 rounded-full bg-white animate-ping"></span>
            <span>Watch Live</span>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
      class="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-3 pb-6 space-y-1 text-sm font-medium"
    >
      <template v-for="item in navLinks" :key="item.label">
        <a
          v-if="item.isExternal"
          :href="item.href"
          target="_blank"
          rel="noopener"
          class="flex items-center justify-between px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 text-decoration-none"
        >
          <span>{{ item.label }}</span>
          <svg class="size-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <router-link
          v-else
          :to="item.path"
          @click="isMobileMenuOpen = false"
          class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-decoration-none"
          active-class="bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold"
        >
          {{ item.label }}
        </router-link>
      </template>
      <div class="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
        <a
          href="https://erp.kaizen.paradox-bd.com"
          target="_blank"
          rel="noopener"
          class="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gray-900 dark:bg-gray-800 border border-gray-700 text-white font-semibold text-xs text-decoration-none"
        >
          <span>Kaizen ERP Portal</span>
        </a>
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
import { ref } from 'vue'

defineProps({
  liveBanner: {
    type: Object,
    required: true
  }
})

defineEmits(['open-search'])

const isMobileMenuOpen = ref(false)

const navLinks = [
  { path: '/events', label: 'Events & Calendar' },
  { path: '/ranking', label: 'World Ranking' },
  { path: '/news', label: 'News Center' },
  { href: 'https://lms.kaizen.paradox-bd.com', label: 'Academy (LMS)', isExternal: true },
  { path: '/approved', label: 'Equipment' },
  { path: '/about', label: 'About WKF' },
  { path: '/olympics', label: 'Olympics' },
  { path: '/documents', label: 'Rules & Docs' },
  { path: '/social-legacy', label: 'Social Legacy' }
]
</script>
