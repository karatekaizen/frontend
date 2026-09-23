<template>
  <div class="space-y-16 sm:space-y-24">
    <!-- Immersive Cinematic Hero Banner with Live Match Spotlight & Carousel -->
    <ErrorBoundary :compact="true" title="Hero Spotlight Unavailable">
      <HeroBanner
        :stories="featuredStories"
        :stats="statistics"
      />
    </ErrorBoundary>

    <!-- Upcoming Events Preview (Information on Surfaces, Clean Dividers) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Official Competitions"
        title="Championships & Circuits"
        actionText="View All 2026/2027 Events"
        actionTo="/events"
        :level="2"
      />

      <ErrorBoundary :compact="true" title="Events Preview Unavailable">
        <div class="mt-8 divide-y divide-gray-200 dark:divide-gray-800">
          <EventRow
            v-for="event in upcomingEvents"
            :key="event.id"
            :event="event"
            :compact="true"
            @click="selectEvent(event)"
          />
        </div>
      </ErrorBoundary>
    </section>

    <!-- World Ranking Standings Preview -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Global Standings"
        title="WKF World Ranking Leaders"
        actionText="Complete Rankings & Categories"
        actionTo="/ranking"
        :level="2"
      />

      <ErrorBoundary :compact="true" title="Rankings Preview Unavailable">
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AthleteCard
            v-for="athlete in topAthletes"
            :key="athlete.name"
            :athlete="athlete"
            @click="selectAthlete(athlete)"
          />
        </div>
      </ErrorBoundary>
    </section>

    <!-- Latest News Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <SectionHeader
        eyebrow="Media & Communications"
        title="Latest News Dispatches"
        actionText="All News Articles"
        actionTo="/news"
        :level="2"
      />

      <ErrorBoundary :compact="true" title="News Dispatches Unavailable">
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <ArticleCard
            v-for="article in latestNews"
            :key="article.id"
            :article="article"
          />
        </div>
      </ErrorBoundary>
    </section>

    <!-- Modals -->
    <EventModal :event="activeEvent" @close="activeEvent = null" />
    <AthleteModal :athlete="activeAthlete" @close="activeAthlete = null" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { wkfService } from '../services/wkfService.js'
import HeroBanner from '../components/HeroBanner.vue'
import SectionHeader from '../components/ui/SectionHeader.vue'
import EventRow from '../components/ui/EventRow.vue'
import AthleteCard from '../components/ui/AthleteCard.vue'
import ArticleCard from '../components/ui/ArticleCard.vue'
import EventModal from '../components/EventModal.vue'
import AthleteModal from '../components/AthleteModal.vue'
import ErrorBoundary from '../components/ui/ErrorBoundary.vue'

const featuredStories = wkfService.getFeaturedStories()
const statistics = wkfService.getStatistics()
const allEvents = wkfService.getEvents()
const topAthletes = wkfService.getTopAthletes()
const latestNews = wkfService.getNewsArticles(3)

const upcomingEvents = computed(() => allEvents.slice(0, 4))

const activeEvent = ref(null)
const activeAthlete = ref(null)

function selectEvent(ev) {
  activeEvent.value = ev
}

function selectAthlete(ath) {
  activeAthlete.value = ath
}
</script>
