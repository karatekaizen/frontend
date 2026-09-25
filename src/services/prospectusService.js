import { PROSPECTUS_DOCS, PROSPECTUS_ROUTES } from '../data/prospectusData.js'
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
            `${ERP_API_BASE}/Wiki%20Document?fields=["name","title","route","is_group","parent_wiki_document","sort_order","content"]&limit_page_length=100`,
            {
              headers: { 'Accept': 'application/json' },
              signal: AbortSignal.timeout(5000)
            }
          )

          if (res.ok) {
            const json = await res.json()
            if (json.data && json.data.length >= 35) {
              cachedDocuments = json.data
              return cachedDocuments
            }
          }
        } catch (err) {
          captureError(err, 'prospectusService:getDocuments', false)
        }

        // 100% full-fidelity fallback
        cachedDocuments = PROSPECTUS_DOCS
        return cachedDocuments
      })()
    }

    return fetchPromise
  },

  /**
   * Fetch document detail by route or name
   */
  async getDocumentDetail(routeOrName) {
    const route = routeOrName ? routeOrName.replace(/^\/+/, '') : 'prospectus'
    
    // First check local/bundled data (instant response)
    const local = PROSPECTUS_ROUTES[route]

    // If online cache has content, prefer that or merge
    try {
      const docs = await this.getDocuments()
      const match = docs.find(d => d.route === route || d.name === routeOrName)
      if (match && match.content) {
        return {
          ...local,
          ...match,
          content: match.content || local?.content || ''
        }
      }
    } catch {
      // Fallback below
    }

    return local || PROSPECTUS_DOCS[0]
  },

  /**
   * Build complete nested documentation tree
   */
  async getCategoryTree() {
    const docs = await this.getDocuments()
    const docMap = Object.fromEntries(docs.map(d => [d.route, d]))

    // The canonical syllabus category order from HKDOfficial _meta.json
    const categoryDefs = [
      { id: 'overview', title: 'সংক্ষিপ্ত বিবরণ (Overview)', route: 'prospectus', icon: 'book' },
      { id: 'stances', title: 'স্ট্যান্স (Dachi-Kata)', route: 'prospectus/stances', icon: 'zap' },
      { id: 'movement', title: 'মুভমেন্ট (Tenshin)', route: 'prospectus/movement', icon: 'compass' },
      { id: 'defense', title: 'ডিফেন্স (Uke No Gogensoku)', route: 'prospectus/defense', icon: 'shield' },
      { id: 'blocks', title: 'ব্লক (Uke-Waza)', route: 'prospectus/blocks', icon: 'lock' },
      { id: 'punches', title: 'পাঞ্চ (Tsuki-Waza)', route: 'prospectus/punches', icon: 'crosshair' },
      { id: 'strikes', title: 'স্ট্রাইক (Uchi-Waza)', route: 'prospectus/strikes', icon: 'target' },
      { id: 'kicks', title: 'কিক (Keri-Waza)', route: 'prospectus/kicks', icon: 'arrow-up' },
      { id: 'kata', title: 'কাতা (Kata)', route: 'prospectus/kata', icon: 'award' },
      { id: 'kumite-footwork', title: 'কুমিতে ফুটওয়ার্ক', route: 'prospectus/kumite-footwork', icon: 'activity' },
      { id: 'in-the-dojo', title: 'ডোজো নিয়মাবলী (In the Dojo)', route: 'prospectus/in-the-dojo', icon: 'info' },
      { id: 'grading', title: 'গ্রেডিং (Grading)', route: 'prospectus/grading', icon: 'check-circle' }
    ]

    return categoryDefs.map(cat => {
      const isOverview = cat.id === 'overview'
      const catDoc = docMap[cat.route] || PROSPECTUS_ROUTES[cat.route]

      if (isOverview) {
        return {
          id: cat.id,
          title: cat.title,
          route: cat.route,
          icon: cat.icon,
          isGroup: false,
          hasChildren: false,
          items: []
        }
      }

      // Find direct children
      const children = docs.filter(d => 
        d.route && 
        d.route.startsWith(cat.route + '/') && 
        d.route !== cat.route
      ).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))

      const hasChildren = children.length > 0

      return {
        id: cat.id,
        title: cat.title,
        route: cat.route,
        icon: cat.icon,
        isGroup: hasChildren,
        hasChildren,
        doc: catDoc,
        items: children.map(c => ({
          title: c.meta_label || c.title,
          route: c.route,
          slug: c.slug
        }))
      }
    })
  },

  /**
   * Extract Headings from markdown content for right-side docked TOC
   */
  extractToc(markdown) {
    if (!markdown) return []
    const lines = markdown.split('\n')
    const toc = []
    
    for (const line of lines) {
      const match = line.match(/^(#{2,3})\s+(.+)$/)
      if (match) {
        const level = match[1].length // 2 or 3
        const rawTitle = match[2].trim()
        // Strip markdown links or formatting from heading text
        const title = rawTitle.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '')
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
        
        toc.push({ level, title, id, rawTitle })
      }
    }
    return toc
  },

  /**
   * Get previous and next documents for pagination docking
   */
  getPrevNext(currentRoute) {
    const list = PROSPECTUS_DOCS
    const idx = list.findIndex(d => d.route === currentRoute)
    if (idx === -1) return { prev: null, next: null }

    const prev = idx > 0 ? { title: list[idx - 1].meta_label || list[idx - 1].title, route: list[idx - 1].route } : null
    const next = idx < list.length - 1 ? { title: list[idx + 1].meta_label || list[idx + 1].title, route: list[idx + 1].route } : null

    return { prev, next }
  }
}

