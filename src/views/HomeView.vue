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

    <!-- Kaizen Digital Dojo & Academy (LMS & ERP Integration) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Kaizen Digital Infrastructure"
        title="Dojo ERP & Martial Arts Academy"
        :level="2"
      />

      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Card 1: Kaizen Academy / LMS -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-850 to-gray-950 p-6 sm:p-8 border border-gray-800 text-white shadow-xl flex flex-col justify-between group">
          <div class="space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <span class="size-2 rounded-full bg-amber-400"></span>
              <span>KAIZEN LMS</span>
            </div>
            <h3 class="text-2xl font-bold tracking-tight text-white font-sans">
              Kaizen Martial Arts Academy
            </h3>
            <p class="text-sm text-gray-300 leading-relaxed">
              Official video curriculum for Kata bunkai, Kumite tactical drills, WKF referee qualification pathways, and Dan grading syllabus.
            </p>
            <ul class="text-xs text-gray-400 space-y-1.5 pt-1">
              <li class="flex items-center gap-2">
                <svg class="size-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Interactive Quiz & Belt Progression</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="size-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Certified Video Masterclasses</span>
              </li>
            </ul>
          </div>
          <div class="pt-6">
            <a
              href="https://lms.kaizen.paradox-bd.com"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-all text-decoration-none shadow-sm cursor-pointer"
            >
              <span>Access Academy Courses</span>
              <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>

        <!-- Card 2: Kaizen ERP Portal -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-850 to-gray-950 p-6 sm:p-8 border border-gray-800 text-white shadow-xl flex flex-col justify-between group">
          <div class="space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">
              <span class="size-2 rounded-full bg-rose-500"></span>
              <span>ERPNEXT INTEGRATION</span>
            </div>
            <h3 class="text-2xl font-bold tracking-tight text-white font-sans">
              Dojo ERP & Student Desk
            </h3>
            <p class="text-sm text-gray-300 leading-relaxed">
              Complete student enrollment, athlete digital passport, tournament registration, Dan grading records, and dojo operations.
            </p>
            <ul class="text-xs text-gray-400 space-y-1.5 pt-1">
              <li class="flex items-center gap-2">
                <svg class="size-3.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Athlete & Sensei Profiles</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="size-3.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Tournament Brackets & Weigh-ins</span>
              </li>
            </ul>
          </div>
          <div class="pt-6">
            <a
              href="https://erp.kaizen.paradox-bd.com"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all text-decoration-none shadow-sm cursor-pointer"
            >
              <span>Open Student Desk</span>
              <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Training Branches Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Our Network"
        title="Dojo Training Branches"
        actionText="Explore All Dojo Branches"
        actionTo="/dojos"
        :level="2"
      />

      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <DojoCard
          v-for="dojo in activeDojos"
          :key="dojo.slug"
          :dojo="dojo"
        />
      </div>
    </section>

    <!-- Dojo Standings Preview -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Dojo Standings"
        title="Kaizen Dojo Standings & Athletes"
        actionText="Complete Rankings & Divisions"
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
import { ref, computed, onMounted } from 'vue'
import { wkfService } from '../services/wkfService.js'
import { dojoService } from '../services/dojoService.js'
import HeroBanner from '../components/HeroBanner.vue'
import SectionHeader from '../components/ui/SectionHeader.vue'
import EventRow from '../components/ui/EventRow.vue'
import AthleteCard from '../components/ui/AthleteCard.vue'
import ArticleCard from '../components/ui/ArticleCard.vue'
import DojoCard from '../components/ui/DojoCard.vue'
import EventModal from '../components/EventModal.vue'
import AthleteModal from '../components/AthleteModal.vue'
import ErrorBoundary from '../components/ui/ErrorBoundary.vue'

const featuredStories = wkfService.getFeaturedStories()
const statistics = wkfService.getStatistics()
const allEvents = wkfService.getEvents()
const topAthletes = wkfService.getTopAthletes()
const latestNews = wkfService.getNewsArticles(3)
const activeDojos = ref(dojoService.getDojos())

onMounted(async () => {
  const fetched = await dojoService.fetchDojos()
  if (fetched && fetched.length > 0) activeDojos.value = fetched
})

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
