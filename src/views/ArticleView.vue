<template>
  <div v-if="article" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
    <!-- Back to News -->
    <div>
      <router-link
        to="/news"
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
      >
        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        <span>Back to News Center</span>
      </router-link>
    </div>

    <!-- Editorial Header -->
    <header class="space-y-4">
      <div class="flex items-center gap-2">
        <WkfBadge variant="category" size="md">
          {{ article.category }}
        </WkfBadge>
        <span class="text-xs text-gray-400 dark:text-gray-500">•</span>
        <span class="text-xs text-gray-500">{{ article.date }}</span>
        <span class="text-xs text-gray-400 dark:text-gray-500">•</span>
        <span class="text-xs text-gray-500">{{ article.readTime }}</span>
      </div>

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 dark:text-white tracking-tight leading-tight font-sans">
        {{ article.title }}
      </h1>

      <div class="flex items-center gap-3 pt-2 text-xs text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div class="size-7 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
          K
        </div>
        <div>
          <span class="font-bold text-gray-900 dark:text-white">By {{ article.author || 'Kaizen Media Desk' }}</span>
          <div class="text-[11px] text-gray-400">Kaizen Karate Academy Media Directorate</div>
        </div>
      </div>
    </header>

    <!-- Main Visual -->
    <div class="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-850 shadow-sm">
      <img
        :src="article.image"
        :alt="article.title"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Lead / Summary Box -->
    <div class="p-5 rounded-xl bg-gray-50 dark:bg-gray-850 border-l-4 border-rose-600 text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
      {{ article.summary }}
    </div>

    <!-- Article Content (Clean Typography, 16px font, high contrast) -->
    <div class="prose prose-gray dark:prose-invert max-w-none text-base text-gray-800 dark:text-gray-200 leading-relaxed space-y-4">
      <p v-if="article.content">
        {{ article.content }}
      </p>
      <p v-else>
        The official competition delegates from the World Karate Federation have praised the athletic execution and sportsmanship showcased throughout this tournament. Karate continues to set the benchmark for global martial arts through precision scoring, video reviews, and youth inclusivity.
      </p>

      <p>
        Referees and jury members utilized the revised 2026 video review criteria, ensuring transparent decision-making across all tatamis. Spectators witnessed intense matches that exemplified the core values of Karate-do: respect, integrity, and uncompromising dedication.
      </p>

      <p>
        For full draw sheets, match replays, and photo galleries, fans can visit the official WKF website and follow the live streams on the WKF YouTube channel.
      </p>
    </div>

    <!-- Related Articles via ArticleCard -->
    <div class="pt-12 border-t border-gray-200 dark:border-gray-800 space-y-6">
      <h3 class="text-xl font-bold text-gray-950 dark:text-white font-sans">
        More from Kaizen Karate Academy
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ArticleCard
          v-for="rel in relatedArticles"
          :key="rel.id"
          :article="rel"
          :compact="true"
        />
      </div>
    </div>
  </div>

  <div v-else class="text-center py-24">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white">Article not found</h2>
    <router-link to="/news" class="mt-4 inline-block text-sm text-rose-600 font-semibold hover:underline">
      Return to News Center
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { wkfService } from '../services/wkfService.js'
import WkfBadge from '../components/ui/WkfBadge.vue'
import ArticleCard from '../components/ui/ArticleCard.vue'

const route = useRoute()

const article = computed(() => {
  return wkfService.getArticleById(route.params.id)
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  return wkfService.getRelatedArticles(article.value.id, 3)
})
</script>
