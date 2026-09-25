<template>
  <div
    class="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-rose-500 selection:text-white transition-colors duration-200"
  >
    <!-- Navbar with Live Alert Ticker and Router Links -->
    <Navbar
      :live-banner="WKF_DATA.liveBanner"
      @open-search="isSearchOpen = true"
      @open-auth="openAuthModal"
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

    <!-- Auth Modal (Login / Sign Up) — shared across all pages -->
    <AuthModal
      :is-open="isAuthOpen"
      :initial-mode="authMode"
      :initial-branch="authBranch"
      @close="isAuthOpen = false"
      @logged-in="isAuthOpen = false"
    />

    <!-- Floating Tweak Panel (Frappe UI Design Skill Requirement) -->
    <TweakPanel />

    <!-- Global Toast Notifications -->
    <FrappeToast />
  </div>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { WKF_DATA } from './data/wkfData.js'
import { tweakStore, initTheme } from './store/tweakStore.js'
import { checkSession } from './store/authStore.js'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CommandPaletteModal from './components/CommandPaletteModal.vue'
import AuthModal from './components/AuthModal.vue'
import TweakPanel from './components/TweakPanel.vue'
import FrappeToast from './components/FrappeToast.vue'
import ErrorBoundary from './components/ui/ErrorBoundary.vue'

const isSearchOpen = ref(false)
const isAuthOpen   = ref(false)
const authMode     = ref('login')
const authBranch   = ref('')

// Initialize theme from tweakStore
initTheme()

// Restore existing Frappe session on app load (SSO with LMS)
onMounted(() => {
  checkSession()
})

// Provide openAuthModal so any descendant can open the modal
function openAuthModal(mode = 'login', branch = '') {
  authMode.value = mode
  authBranch.value = branch
  isAuthOpen.value = true
}
provide('openAuthModal', openAuthModal)

function handleGlobalKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    isSearchOpen.value = !isSearchOpen.value
  }
  if (e.key === 'Escape') {
    isSearchOpen.value = false
    isAuthOpen.value = false
  }
}

function handleOpenAuthEvent(e) {
  openAuthModal(e.detail?.mode || 'login', e.detail?.dojo || '')
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
  window.addEventListener('open-auth-modal', handleOpenAuthEvent)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
  window.removeEventListener('open-auth-modal', handleOpenAuthEvent)
})
</script>
