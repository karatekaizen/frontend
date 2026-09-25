import { PROSPECTUS_DATA } from '../data/prospectusData.js'
import { captureError } from '../store/errorStore.js'

const ERP_API_BASE = 'https://erp.kaizen.paradox-bd.com/api/resource'

let cachedDocuments = null
let fetchPromise = null

export const prospectusService = {
  /**
   * Fetch all wiki documents from live ERP or fallback to bundled syllabus
   */
  async getDocuments() {
    if (cachedDocuments) return cachedDocuments

    if (!fetchPromise) {
      fetchPromise = (async () => {
        try {
          const res = await fetch(
            `${ERP_API_BASE}/Wiki%20Document?fields=["name","title","route","is_group","parent_wiki_document","sort_order"]&limit_page_length=100`,
            {
              headers: { 'Accept': 'application/json' },
              signal: AbortSignal.timeout(6000)
            }
          )

          if (res.ok) {
            const json = await res.json()
            if (json.data && json.data.length > 0) {
              cachedDocuments = json.data
              return cachedDocuments
            }
          }
        } catch (err) {
          captureError(err, 'prospectusService:getDocuments', false)
        }

        // Fallback to local data
        cachedDocuments = this.getLocalFallbackTree()
        return cachedDocuments
      })()
    }

    return fetchPromise
  },

  /**
   * Fetch full content of a single document
   */
  async getDocumentDetail(nameOrRoute) {
    try {
      // If it's a route, lookup document by route first
      const docs = await this.getDocuments()
      const match = docs.find(d => d.name === nameOrRoute || d.route === nameOrRoute)
      
      const docName = match ? match.name : nameOrRoute

      const res = await fetch(`${ERP_API_BASE}/Wiki%20Document/${docName}`, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(6000)
      })

      if (res.ok) {
        const json = await res.json()
        if (json.data) return json.data
      }
    } catch (err) {
      captureError(err, 'prospectusService:getDocumentDetail', false)
    }

    // Fallback from local data
    return this.getLocalDetailByRoute(nameOrRoute)
  },

  /**
   * Build category-wise hierarchy from documents
   */
  async getCategoryTree() {
    const docs = await this.getDocuments()
    const categories = [
      { id: 'stances', name: 'স্ট্যান্স (Dachi-Kata)', route: 'prospectus/stances', icon: 'zap' },
      { id: 'punches', name: 'পাঞ্চ (Tsuki-Waza)', route: 'prospectus/punches', icon: 'crosshair' },
      { id: 'blocks', name: 'ব্লক (Uke-Waza)', route: 'prospectus/blocks', icon: 'shield' },
      { id: 'kicks', name: 'কিক (Keri-Waza)', route: 'prospectus/kicks', icon: 'arrow-up' },
      { id: 'strikes', name: 'স্ট্রাইক (Uchi-Waza)', route: 'prospectus/strikes', icon: 'target' },
      { id: 'defense', name: 'ডিফেন্স (Uke No Gogensoku)', route: 'prospectus/defense', icon: 'lock' },
      { id: 'kata', name: 'কাতা (Kata Catalog)', route: 'prospectus/kata', icon: 'book-open' },
      { id: 'grading', name: 'বেল্ট ও গ্রেডিং (Grading)', route: 'prospectus/grading', icon: 'award' },
      { id: 'movement', name: 'মুভমেন্ট (Tenshin)', route: 'prospectus/movement', icon: 'compass' },
      { id: 'in-the-dojo', name: 'ডোজো নিয়মাবলী (In the Dojo)', route: 'prospectus/in-the-dojo', icon: 'info' },
      { id: 'kumite-footwork', name: 'কুমিতে ফুটওয়ার্ক', route: 'prospectus/kumite-footwork', icon: 'activity' }
    ]

    return categories.map(cat => {
      const items = docs.filter(d => 
        d.route && 
        d.route.startsWith(cat.route) && 
        d.route !== cat.route && 
        !d.is_group
      )
      return {
        ...cat,
        items,
        count: items.length
      }
    })
  },

  /**
   * Local bundled fallback tree
   */
  getLocalFallbackTree() {
    const list = []
    for (const [catKey, items] of Object.entries(PROSPECTUS_DATA)) {
      if (Array.isArray(items)) {
        items.forEach((item, idx) => {
          list.push({
            name: `${catKey}-${item.slug || idx}`,
            title: item.title || item.englishName || `${catKey} ${idx + 1}`,
            route: `prospectus/${catKey}/${item.slug || idx}`,
            is_group: 0,
            sort_order: idx
          })
        })
      }
    }
    return list
  },

  /**
   * Local detail fallback
   */
  getLocalDetailByRoute(nameOrRoute) {
    for (const [catKey, items] of Object.entries(PROSPECTUS_DATA)) {
      if (Array.isArray(items)) {
        const found = items.find(i => 
          nameOrRoute.includes(i.slug) || 
          i.title?.toLowerCase() === nameOrRoute.toLowerCase()
        )
        if (found) {
          return {
            title: found.title,
            route: `prospectus/${catKey}/${found.slug}`,
            content: found.description || found.summary || '',
            localItem: found
          }
        }
      }
    }
    return null
  }
}
