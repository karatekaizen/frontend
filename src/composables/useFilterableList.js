import { ref, computed } from 'vue'

/**
 * Clean, reusable Composable for filtering lists by category, search text, and optional predicates.
 * 
 * @param {import('vue').Ref<Array> | Array} items - Source items
 * @param {Object} options
 * @param {string} [options.defaultCategory='all'] - Initial category
 * @param {string} [options.categoryField='category'] - Key to match category against
 * @param {string[]} [options.searchFields=['title', 'name']] - Keys to search within
 * @param {Function} [options.customFilter] - Optional additional predicate (e.g. year filter)
 */
export function useFilterableList(items, options = {}) {
  const {
    defaultCategory = 'all',
    categoryField = 'category',
    searchFields = ['title', 'name', 'location', 'venue', 'description'],
    customFilter = null
  } = options

  const activeCategory = ref(defaultCategory)
  const searchQuery = ref('')

  const rawList = computed(() => (Array.isArray(items) ? items : items.value || []))

  function isAllCategory(val) {
    if (!val) return true
    const norm = String(val).trim().toLowerCase()
    return norm === 'all' || norm === 'all documents' || norm === 'all equipment' || norm === 'all championships'
  }

  const filteredItems = computed(() => {
    let result = rawList.value

    // 1. Filter by category
    if (!isAllCategory(activeCategory.value)) {
      const targetCat = String(activeCategory.value).toLowerCase()
      result = result.filter(item => {
        const val = item[categoryField]
        if (!val) return false
        return String(val).toLowerCase().includes(targetCat) || targetCat.includes(String(val).toLowerCase())
      })
    }

    // 2. Filter by search query
    const q = searchQuery.value.trim().toLowerCase()
    if (q) {
      result = result.filter(item => {
        return searchFields.some(field => {
          const val = item[field]
          return val && String(val).toLowerCase().includes(q)
        })
      })
    }

    // 3. Custom filter predicate if provided
    if (customFilter && typeof customFilter === 'function') {
      result = result.filter(customFilter)
    }

    return result
  })

  function resetFilters() {
    activeCategory.value = defaultCategory
    searchQuery.value = ''
  }

  function getCategoryCount(cat) {
    if (isAllCategory(cat)) {
      return rawList.value.length
    }
    const target = String(cat).toLowerCase()
    return rawList.value.filter(item => {
      const val = item[categoryField]
      if (!val) return false
      return String(val).toLowerCase().includes(target) || target.includes(String(val).toLowerCase())
    }).length
  }

  return {
    activeCategory,
    searchQuery,
    filteredItems,
    resetFilters,
    getCategoryCount
  }
}
