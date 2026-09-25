<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
    <!-- Header -->
    <SectionHeader
      eyebrow="Official Technical Curriculum"
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

    <!-- Main Content Area: Left Tree Dock + Center Detail + Right TOC Dock -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
      <!-- Left Sidebar (Tree Navigator Dock) -->
      <aside class="lg:col-span-4 xl:col-span-3 h-[750px] sticky top-20">
        <ProspectusSidebar
          :categories="categories"
          :selected-route="selectedRoute"
          @select-item="handleSelectItem"
        />
      </aside>

      <!-- Center Detail View -->
      <main class="lg:col-span-8 xl:col-span-7 min-h-[500px]">
        <div v-if="isLoading" class="flex flex-col items-center justify-center p-16 text-center space-y-3 bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl">
          <div class="size-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-xs text-gray-500 font-mono">Loading documentation...</p>
        </div>

        <ProspectusDetail
          v-else-if="currentDetail"
          :detail="currentDetail"
          @navigate="handleNavigate"
        />

        <div v-else class="p-16 text-center bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-2">
          <p class="text-sm font-semibold text-gray-800 dark:text-gray-200">No document selected</p>
          <p class="text-xs text-gray-500">Choose a technique from the tree navigator to view documentation.</p>
        </div>
      </main>

      <!-- Right Dock: "On this page" Table of Contents (xl screens) -->
      <aside class="hidden xl:block xl:col-span-2 sticky top-20 max-h-[750px] overflow-y-auto">
        <ProspectusToc :items="pageToc" />
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SectionHeader from '../components/ui/SectionHeader.vue'
import ProspectusSidebar from '../components/prospectus/ProspectusSidebar.vue'
import ProspectusDetail from '../components/prospectus/ProspectusDetail.vue'
import ProspectusToc from '../components/prospectus/ProspectusToc.vue'
import { prospectusService } from '../services/prospectusService.js'

const route = useRoute()
const router = useRouter()

const categories = ref([])
const currentDetail = ref(null)
const selectedRoute = ref('prospectus')
const isLoading = ref(false)
const isLive = ref(false)

const pageToc = computed(() => {
  if (!currentDetail.value?.content) return []
  return prospectusService.extractToc(currentDetail.value.content)
})

async function loadTree() {
  try {
    categories.value = await prospectusService.getCategoryTree()
    
    // Check if live ERP data is active
    const docs = await prospectusService.getDocuments()
    isLive.value = docs.some(d => d.name && !d.name.includes('-'))

    resolveRouteFromUrl()
  } catch (err) {
    console.error('Failed to load prospectus tree:', err)
  }
}

function resolveRouteFromUrl() {
  const cat = route.params.category
  const slug = route.params.slug

  let targetRoute = 'prospectus'
  if (cat && slug) {
    targetRoute = `prospectus/${cat}/${slug}`
  } else if (cat) {
    targetRoute = `prospectus/${cat}`
  }

  selectRoute(targetRoute)
}

async function selectRoute(targetRoute) {
  if (!targetRoute) targetRoute = 'prospectus'
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
  handleNavigate(item.route)
}

function handleNavigate(targetRoute) {
  const parts = targetRoute.split('/')
  if (parts.length >= 3) {
    router.push({ name: 'ProspectusItem', params: { category: parts[1], slug: parts[2] } })
  } else if (parts.length === 2) {
    router.push({ name: 'ProspectusItem', params: { category: parts[1] } })
  } else {
    router.push({ name: 'Prospectus' })
  }
  selectRoute(targetRoute)
}

watch(
  () => [route.params.category, route.params.slug],
  () => {
    resolveRouteFromUrl()
  }
)

onMounted(() => {
  loadTree()
})
</script>

