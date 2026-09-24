import { createRouter, createWebHistory } from 'vue-router'
import { captureError } from '../store/errorStore.js'

import HomeView from '../views/HomeView.vue'
import EventsView from '../views/EventsView.vue'
import RankingView from '../views/RankingView.vue'
import NewsView from '../views/NewsView.vue'
import ArticleView from '../views/ArticleView.vue'
import ApprovedBrandsView from '../views/ApprovedBrandsView.vue'
import AboutView from '../views/AboutView.vue'
import OlympicsView from '../views/OlympicsView.vue'
import DocumentsView from '../views/DocumentsView.vue'
import SocialLegacyView from '../views/SocialLegacyView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/events', name: 'Events', component: EventsView },
  { path: '/ranking', name: 'Ranking', component: RankingView },
  { path: '/news', name: 'News', component: NewsView },
  { path: '/news/:id', name: 'Article', component: ArticleView },
  { path: '/approved', name: 'ApprovedBrands', component: ApprovedBrandsView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/olympics', name: 'Olympics', component: OlympicsView },
  { path: '/documents', name: 'Documents', component: DocumentsView },
  { path: '/social-legacy', name: 'SocialLegacy', component: SocialLegacyView },
  { path: '/profile', name: 'Profile', component: ProfileView },
  { path: '/login', redirect: '/profile' },
  { path: '/signup', redirect: '/profile' },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Route transition & navigation error handler
router.onError((error, to) => {
  captureError(error, `Navigation:${to?.path || 'unknown'}`, true)
})

export default router
