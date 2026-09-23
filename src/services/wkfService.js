import { WKF_DATA } from '../data/wkfData.js'
import { captureError } from '../store/errorStore.js'

/**
 * Helper to safely execute data retrieval operations with fallbacks
 */
function safeQuery(fn, fallback, operationName) {
  try {
    const result = fn()
    return result !== undefined && result !== null ? result : fallback
  } catch (error) {
    captureError(error, `wkfService:${operationName}`, false)
    return fallback
  }
}

/**
 * WKF Domain Data Service
 * Provides clean, encapsulated, typed, and fault-tolerant access to all Karate Federation datasets.
 */
export const wkfService = {
  getLiveBanner() {
    return safeQuery(() => WKF_DATA.liveBanner, null, 'getLiveBanner')
  },

  getStatistics() {
    return safeQuery(() => WKF_DATA.stats, [], 'getStatistics')
  },

  getFeaturedStories() {
    return safeQuery(() => WKF_DATA.featuredStories, [], 'getFeaturedStories')
  },

  getEvents(year = 'all') {
    return safeQuery(() => {
      const list = WKF_DATA.events || []
      if (!year || year === 'all') return list
      return list.filter(e => e.dates && e.dates.includes(year))
    }, [], 'getEvents')
  },

  getEventById(id) {
    return safeQuery(() => {
      const list = WKF_DATA.events || []
      return list.find(e => e.id === id) || null
    }, null, 'getEventById')
  },

  getNewsArticles(limit) {
    return safeQuery(() => {
      const list = WKF_DATA.newsArticles || []
      if (limit && typeof limit === 'number') return list.slice(0, limit)
      return list
    }, [], 'getNewsArticles')
  },

  getArticleById(id) {
    return safeQuery(() => {
      const news = WKF_DATA.newsArticles || []
      const found = news.find(a => a.id === id)
      if (found) return found
      const stories = WKF_DATA.featuredStories || []
      return stories.find(s => s.id === id) || null
    }, null, 'getArticleById')
  },

  getRelatedArticles(currentId, limit = 3) {
    return safeQuery(() => {
      const list = WKF_DATA.newsArticles || []
      return list.filter(a => a.id !== currentId).slice(0, limit)
    }, [], 'getRelatedArticles')
  },

  getRankings(categoryId = 'male-kata') {
    return safeQuery(() => {
      const map = WKF_DATA.rankings || {}
      return map[categoryId] || []
    }, [], 'getRankings')
  },

  getTopAthletes() {
    return safeQuery(() => {
      const r = WKF_DATA.rankings || {}
      const athletes = []
      if (r['male-kata']?.[0]) athletes.push({ ...r['male-kata'][0], category: 'Male Kata' })
      if (r['female-kata']?.[0]) athletes.push({ ...r['female-kata'][0], category: 'Female Kata' })
      if (r['male-kumite-75']?.[0]) athletes.push({ ...r['male-kumite-75'][0], category: 'Male Kumite -75kg' })
      if (r['female-kumite-68']?.[0]) athletes.push({ ...r['female-kumite-68'][0], category: 'Female Kumite -68kg' })
      return athletes
    }, [], 'getTopAthletes')
  },

  getApprovedBrands(category) {
    return safeQuery(() => {
      const list = WKF_DATA.approvedBrands || []
      if (!category || category === 'All Equipment') return list
      const q = category.toLowerCase()
      return list.filter(b => b.category && b.category.toLowerCase().includes(q))
    }, [], 'getApprovedBrands')
  },

  getOfficialDocuments(category) {
    return safeQuery(() => {
      const list = WKF_DATA.officialDocuments || []
      if (!category || category === 'All Documents') return list
      const q = category.toLowerCase()
      return list.filter(d => d.category && d.category.toLowerCase().includes(q))
    }, [], 'getOfficialDocuments')
  },

  getOlympicsData() {
    return safeQuery(() => WKF_DATA.olympics, null, 'getOlympicsData')
  },

  getAboutData() {
    return safeQuery(() => WKF_DATA.aboutWKF, null, 'getAboutData')
  },

  getFederations() {
    return safeQuery(() => WKF_DATA.federations, [], 'getFederations')
  },

  getSocialLegacyData() {
    return safeQuery(() => WKF_DATA.socialLegacy, [], 'getSocialLegacyData')
  },

  getVideos() {
    return safeQuery(() => WKF_DATA.videos, [], 'getVideos')
  }
}
