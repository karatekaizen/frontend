<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
    <!-- Header -->
    <SectionHeader
      eyebrow="Official Curriculum"
      title="Shito-Ryu Karate Prospectus"
      description="The official technical catalog, stances (Dachi), blocking (Uke), punches (Tsuki), kicks (Keri), and belt requirements."
    >
      <template #action>
        <div class="flex items-center gap-2">
          <span 
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border"
            :class="isLive ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800' : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'"
          >
            <span class="size-1.5 rounded-full" :class="isLive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'"></span>
            {{ isLive ? 'Live Wiki Synced' : 'Bundled Syllabus' }}
          </span>
        </div>
      </template>
    </SectionHeader>

    <!-- Main Content Area: Sidebar + Detail -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Sidebar (Tree Navigator) -->
      <div class="lg:col-span-4 xl:col-span-4 h-[700px] sticky top-20">
        <ProspectusSidebar
          :categories="categories"
          :selected-route="selectedRoute"
          @select-item="handleSelectItem"
        />
      </div>

      <!-- Right Detail View -->
      <div class="lg:col-span-8 xl:col-span-8 min-h-[500px]">
        <div v-if="isLoading" class="flex flex-col items-center justify-center p-16 text-center space-y-3 bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl">
          <div class="size-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-xs text-gray-500 font-mono">Loading technical details...</p>
        </div>

        <ProspectusDetail
          v-else-if="currentDetail"
          :detail="currentDetail"
        />

        <div v-else class="p-16 text-center bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-2">
          <p class="text-sm font-semibold text-gray-800 dark:text-gray-200">No technique selected</p>
          <p class="text-xs text-gray-500">Choose a technique from the sidebar to view detailed form, points, and demonstration photos.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SectionHeader from '../components/ui/SectionHeader.vue'
import ProspectusSidebar from '../components/prospectus/ProspectusSidebar.vue'
import ProspectusDetail from '../components/prospectus/ProspectusDetail.vue'
import { prospectusService } from '../services/prospectusService.js'

const route = useRoute()
const router = useRouter()

const categories = ref([])
const currentDetail = ref(null)
const selectedRoute = ref('')
const isLoading = ref(false)
const isLive = ref(false)

async function loadTree() {
  try {
    categories.value = await prospectusService.getCategoryTree()
    
    // Check if live data was fetched
    const docs = await prospectusService.getDocuments()
    isLive.value = docs.some(d => d.name && !d.name.includes('-'))

    // Initial selection from route or default
    const routeCategory = route.params.category
    const routeSlug = route.params.slug

    let targetRoute = 'prospectus/stances/kokutsu'
    if (routeCategory && routeSlug) {
      targetRoute = `prospectus/${routeCategory}/${routeSlug}`
    } else if (routeCategory) {
      targetRoute = `prospectus/${routeCategory}`
    }

    await selectRoute(targetRoute)
  } catch (err) {
    console.error('Failed to load prospectus tree:', err)
  }
}

async function selectRoute(targetRoute) {
  selectedRoute.value = targetRoute
  isLoading.value = true
  try {
    currentDetail.value = await prospectusService.getDocumentDetail(targetRoute)
  } finally {
    isLoading.value = false
  }
}

function handleSelectItem(item) {
  if (!item?.route) return
  const parts = item.route.split('/')
  if (parts.length >= 3) {
    router.push({ name: 'ProspectusItem', params: { category: parts[1], slug: parts[2] } })
  } else if (parts.length === 2) {
    router.push({ name: 'ProspectusItem', params: { category: parts[1] } })
  }
  selectRoute(item.route)
}

watch(
  () => [route.params.category, route.params.slug],
  ([cat, slug]) => {
    if (cat && slug) {
      selectRoute(`prospectus/${cat}/${slug}`)
    } else if (cat) {
      selectRoute(`prospectus/${cat}`)
    }
  }
)

onMounted(() => {
  loadTree()
})
</script>
