<template>
  <div class="bg-gray-950 text-gray-200 text-xs py-1.5 px-4 border-b border-gray-900">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
      <div class="flex items-center gap-2.5 min-w-0 overflow-hidden">
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600/20 text-rose-300 border border-rose-500/40 shrink-0">
          <span class="size-1.5 rounded-full bg-rose-500 animate-pulse"></span>
          LIVE
        </span>
        <router-link to="/events" class="font-medium text-white truncate hover:underline text-decoration-none text-xs">
          {{ banner.title }}
        </router-link>
        <span class="hidden md:inline text-gray-600 shrink-0">|</span>
        <span class="hidden md:inline text-gray-400 text-xs truncate">{{ banner.subtitle }}</span>
      </div>

      <div class="flex items-center gap-3 shrink-0 text-xs text-gray-400">
        <span class="text-rose-400 font-semibold hidden sm:inline-flex items-center gap-1.5">
          <span class="size-1.5 rounded-full bg-rose-400 animate-ping"></span>
          {{ banner.viewersCount }}
        </span>
        <div class="flex items-center gap-2.5">
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
</template>

<script setup>
defineProps({
  banner: {
    type: Object,
    required: true
  }
})
</script>
