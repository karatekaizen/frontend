<template>
  <router-link
    :to="'/news/' + article.id"
    class="group space-y-3 text-decoration-none block cursor-pointer"
  >
    <!-- Thumbnail Image -->
    <div
      class="aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative"
      :class="compact ? 'rounded-lg' : 'rounded-xl'"
    >
      <img
        v-if="!hasImageError && article.image"
        :src="article.image"
        :alt="article.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        @error="hasImageError = true"
      />
      <div
        v-else
        class="w-full h-full bg-gradient-to-br from-gray-900 via-rose-950/40 to-gray-900 flex items-center justify-center p-4 text-center"
      >
        <span class="text-rose-500/60 font-black text-2xl tracking-widest uppercase">WKF NEWS</span>
      </div>
      <span
        v-if="!compact"
        class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-gray-950/80 text-white backdrop-blur-sm"
      >
        {{ article.category }}
      </span>
    </div>

    <!-- Metadata & Text -->
    <div class="space-y-1.5">
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <span v-if="compact" class="font-semibold text-rose-600 dark:text-rose-400">{{ article.category }}</span>
        <span v-if="compact">•</span>
        <span>{{ article.date }}</span>
        <span v-if="article.readTime">•</span>
        <span v-if="article.readTime">{{ article.readTime }}</span>
      </div>

      <h3
        class="font-bold text-gray-950 dark:text-white group-hover:text-rose-600 transition-colors leading-snug"
        :class="compact ? 'text-xs line-clamp-2' : 'text-base line-clamp-2'"
      >
        {{ article.title }}
      </h3>

      <p
        v-if="!compact && article.summary"
        class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed"
      >
        {{ article.summary }}
      </p>
    </div>

    <!-- CTA footer for full cards -->
    <div
      v-if="!compact"
      class="pt-1 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1"
    >
      <span>Read story</span>
      <span class="group-hover:translate-x-1 transition-transform">→</span>
    </div>
  </router-link>
</template>

<script setup>
import { ref } from 'vue'

const hasImageError = ref(false)

defineProps({
  article: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})
</script>
