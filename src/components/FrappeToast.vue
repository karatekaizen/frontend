<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
    <transition-group
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform translate-y-4 opacity-0 scale-95"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 scale-100"
      leave-to-class="transform translate-y-2 opacity-0 scale-95"
    >
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-900/95 dark:bg-white/95 text-white dark:text-gray-900 shadow-xl border border-gray-800 dark:border-gray-200 backdrop-blur-md max-w-md text-xs"
      >
        <!-- Icon -->
        <div class="size-5 rounded-full bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 flex items-center justify-center shrink-0">
          <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
        </div>

        <!-- Content -->
        <div class="flex flex-col min-w-0 pr-2">
          <div class="font-bold truncate text-white dark:text-gray-950">{{ toast.title }}</div>
          <div v-if="toast.message" class="text-[11px] text-gray-400 dark:text-gray-600 truncate">{{ toast.message }}</div>
        </div>

        <!-- Dismiss button -->
        <button
          @click="dismissToast(toast.id)"
          class="size-5 rounded-md text-gray-400 hover:text-white dark:hover:text-gray-900 transition-colors flex items-center justify-center ml-auto"
        >
          <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { toastStore, dismissToast } from '../store/toastStore.js'
</script>
