<template>
  <aside aria-label="Design Tweak Panel" class="fixed bottom-4 right-4 z-50">
    <!-- Collapsed Toggle Button -->
    <button
      v-if="!isOpen"
      @click="isOpen = true"
      class="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all text-xs font-semibold active:scale-95 group"
      title="Open Design Tweak Panel"
    >
      <span class="size-2 rounded-full bg-rose-500 animate-pulse"></span>
      <span class="font-medium">Tweaks</span>
      <svg class="size-4 text-gray-500 group-hover:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    </button>

    <!-- Expanded Tweak Card -->
    <div
      v-else
      class="w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-4 text-xs space-y-4 animate-in fade-in slide-in-from-bottom-3"
    >
      <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
        <div class="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
          <svg class="size-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
          </svg>
          <span>Design Tweaks</span>
        </div>
        <button
          @click="isOpen = false"
          class="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close"
        >
          <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Surface / Presentation Style -->
      <div class="space-y-1.5">
        <label class="font-semibold text-gray-700 dark:text-gray-300 block">
          Presentation Style
        </label>
        <div class="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            @click="tweakStore.surface = 'clean'"
            class="py-1 px-2 rounded-md font-medium text-center transition-all"
            :class="tweakStore.surface === 'clean' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs font-semibold' : 'text-gray-600 dark:text-gray-400'"
          >
            Clean Surface
          </button>
          <button
            @click="tweakStore.surface = 'cards'"
            class="py-1 px-2 rounded-md font-medium text-center transition-all"
            :class="tweakStore.surface === 'cards' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs font-semibold' : 'text-gray-600 dark:text-gray-400'"
          >
            Card Boxes
          </button>
        </div>
        <p class="text-[11px] text-gray-600 dark:text-gray-300 leading-tight">
          {{ tweakStore.surface === 'clean' ? 'Information on surfaces, fewer boxes (Frappe principle)' : 'Contained card boxes with borders' }}
        </p>
      </div>

      <!-- Spacing Axis -->
      <div class="space-y-1.5">
        <label class="font-semibold text-gray-700 dark:text-gray-300 block">
          Layout Spacing
        </label>
        <div class="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            @click="tweakStore.spacing = 'relaxed'"
            class="py-1 px-2 rounded-md font-medium text-center transition-all"
            :class="tweakStore.spacing === 'relaxed' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs font-semibold' : 'text-gray-600 dark:text-gray-400'"
          >
            Relaxed
          </button>
          <button
            @click="tweakStore.spacing = 'compact'"
            class="py-1 px-2 rounded-md font-medium text-center transition-all"
            :class="tweakStore.spacing === 'compact' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs font-semibold' : 'text-gray-600 dark:text-gray-400'"
          >
            Compact
          </button>
        </div>
      </div>

      <!-- Theme Mode -->
      <div class="space-y-1.5">
        <label class="font-semibold text-gray-700 dark:text-gray-300 block">
          Theme Mode
        </label>
        <div class="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            @click="tweakStore.theme = 'light'"
            class="py-1 px-2 rounded-md font-medium text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            :class="tweakStore.theme === 'light' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs font-semibold' : 'text-gray-600 dark:text-gray-400'"
          >
            <svg class="size-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <span>Light</span>
          </button>
          <button
            @click="tweakStore.theme = 'dark'"
            class="py-1 px-2 rounded-md font-medium text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            :class="tweakStore.theme === 'dark' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs font-semibold' : 'text-gray-600 dark:text-gray-400'"
          >
            <svg class="size-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
            <span>Dark</span>
          </button>
        </div>
      </div>

      <div class="pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-600 dark:text-gray-300 flex items-center justify-between">
        <span>Frappe UI Design System</span>
        <button
          @click="resetDefaults"
          class="text-rose-600 dark:text-rose-400 font-semibold hover:underline"
        >
          Reset
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { tweakStore } from '../store/tweakStore.js'

const isOpen = ref(false)

function resetDefaults() {
  tweakStore.spacing = 'relaxed'
  tweakStore.surface = 'clean'
  tweakStore.theme = 'light'
}
</script>
