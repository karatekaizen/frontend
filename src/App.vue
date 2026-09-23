<template>
  <div
    class="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-rose-500 selection:text-white transition-colors duration-200"
  >
    <!-- Navbar with Live Alert Ticker and Router Links -->
    <Navbar
      :live-banner="WKF_DATA.liveBanner"
      @open-search="isSearchOpen = true"
    />

    <!-- Routed Pages with Per-Page Error Boundary Protection -->
    <main class="flex-1 min-h-[70vh]">
      <router-view v-slot="{ Component, route }">
        <ErrorBoundary :key="route.fullPath" :title="`Unable to load ${route.name || 'page'}`">
          <component :is="Component" />
        </ErrorBoundary>
      </router-view>
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Unified Command Palette (⌘K) -->
    <CommandPaletteModal
      :is-open="isSearchOpen"
      @close="isSearchOpen = false"
    />

    <!-- Floating Tweak Panel (Frappe UI Design Skill Requirement) -->
    <TweakPanel />

    <!-- Global Toast Notifications -->
    <FrappeToast />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { WKF_DATA } from './data/wkfData.js'
import { tweakStore, initTheme } from './store/tweakStore.js'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CommandPaletteModal from './components/CommandPaletteModal.vue'
import TweakPanel from './components/TweakPanel.vue'
import FrappeToast from './components/FrappeToast.vue'
import ErrorBoundary from './components/ui/ErrorBoundary.vue'

const isSearchOpen = ref(false)

// Initialize theme from tweakStore
initTheme()

function handleGlobalKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    isSearchOpen.value = !isSearchOpen.value
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>
