# WKF Portal Engineering & Architecture Guidelines

This document outlines the coding standards, architectural patterns, design principles, and error handling conventions for the World Karate Federation (WKF) portal codebase. All agents and developers working on this repository must adhere to these guidelines.

---

## 1. Core Architectural Principles

- **Framework**: Vue 3 with Composition API (`<script setup>`) and Vite.
- **Styling**: Tailwind CSS with curated high-contrast surfaces (`bg-white dark:bg-gray-850`, `border-gray-200 dark:border-gray-800`).
- **File Length Limit**: Strictly keep all files under **250–300 lines**. If a component exceeds 200 lines, extract sub-components or domain utilities.
- **Code Reuse First**: Never rewrite duplicate markup for common UI elements (tabs, search inputs, headers, badges, list rows). Check `src/components/ui/` first.
- **Workspace Mirroring**: Primary development happens in `/home/hs32/Desktop/medchain/wkf-portal`. Any changes must be mirrored to `/home/hs32/Desktop/kaizen-karate-ecosystem/wkf-site` via `rsync`.

---

## 2. Component Hierarchy & Reusable Primitives

All shared primitives live in [`src/components/ui/`](file:///home/hs32/Desktop/medchain/wkf-portal/src/components/ui) and have single, focused responsibilities:

| Component | Path | Purpose |
| :--- | :--- | :--- |
| `SearchInput.vue` | `src/components/ui/SearchInput.vue` | Search box with SVG icon, clear button (`✕`), and optional shortcut badge (`⌘K`). |
| `SectionHeader.vue` | `src/components/ui/SectionHeader.vue` | Standardized header with eyebrow, title, description, and link CTA slots. |
| `SegmentedControl.vue` | `src/components/ui/SegmentedControl.vue` | Frappe-style segmented filter tabs with count badges. |
| `EventRow.vue` | `src/components/ui/EventRow.vue` | Standardized event row with strict vertical lanes (`w-32` date, fluid title, `w-48` metrics, `w-36` CTA). |
| `AthleteRow.vue` | `src/components/ui/AthleteRow.vue` | Ranking table row with medal badges, trend indicators, and point progress bars. |
| `AthleteCard.vue` | `src/components/ui/AthleteCard.vue` | Clean card component for top athlete grid displays. |
| `ArticleCard.vue` | `src/components/ui/ArticleCard.vue` | News card supporting both full grid and compact sidebar modes. |
| `MedalBadge.vue` | `src/components/ui/MedalBadge.vue` | Olympic ribbon medal SVGs for gold (1), silver (2), bronze (3), and numbered ranks. |
| `WkfBadge.vue` | `src/components/ui/WkfBadge.vue` | Status & category badge (`live`, `reg-open`, `completed`, `homologated`, `iso`). |
| `ErrorBoundary.vue` | `src/components/ui/ErrorBoundary.vue` | Component & page error boundary with `onErrorCaptured` and fallback recovery UI. |

---

## 3. Domain Service & State Management

### Domain Service ([`src/services/wkfService.js`](file:///home/hs32/Desktop/medchain/wkf-portal/src/services/wkfService.js))
- **Never import `WKF_DATA` directly into view templates.**
- Always access data via `wkfService`:
  ```javascript
  import { wkfService } from '../services/wkfService.js'

  const events = wkfService.getEvents()
  const rankings = wkfService.getRankings('male-kata')
  const articles = wkfService.getNewsArticles(3)
  ```
- All methods in `wkfService` use the `safeQuery(fn, fallback)` wrapper to prevent undefined or corrupted properties from crashing the UI.

### Filtering Composable ([`src/composables/useFilterableList.js`](file:///home/hs32/Desktop/medchain/wkf-portal/src/composables/useFilterableList.js))
- Use `useFilterableList` whenever implementing category or search query filtering:
  ```javascript
  const {
    activeCategory,
    searchQuery,
    filteredItems,
    resetFilters,
    getCategoryCount
  } = useFilterableList(items, {
    defaultCategory: 'All',
    categoryField: 'category',
    searchFields: ['title', 'summary', 'location']
  })
  ```

---

## 4. Multi-Tiered Error Handling Architecture

### Tier 1: Global Error Handlers ([`src/main.js`](file:///home/hs32/Desktop/medchain/wkf-portal/src/main.js))
- `app.config.errorHandler`: Intercepts Vue lifecycle and rendering exceptions.
- `window.addEventListener('unhandledrejection')`: Intercepts unhandled asynchronous Promise rejections.
- `window.addEventListener('error')`: Intercepts global uncaught runtime errors.
- `router.onError()` ([`src/router/index.js`](file:///home/hs32/Desktop/medchain/wkf-portal/src/router/index.js)): Intercepts route transition and chunk loading failures.
- All global errors are captured by [`src/store/errorStore.js`](file:///home/hs32/Desktop/medchain/wkf-portal/src/store/errorStore.js).

### Tier 2: Per-Page Error Boundary ([`src/App.vue`](file:///home/hs32/Desktop/medchain/wkf-portal/src/App.vue))
- Every routed view is isolated within an `<ErrorBoundary>`:
  ```html
  <main class="flex-1 min-h-[70vh]">
    <router-view v-slot="{ Component, route }">
      <ErrorBoundary :key="route.fullPath" :title="`Unable to load ${route.name || 'page'}`">
        <component :is="Component" />
      </ErrorBoundary>
    </router-view>
  </main>
  ```
- If a route fails, the top navigation bar, command palette, and footer remain 100% operational. The user is offered a **"Try Again"** button, a **"Back to Home"** link, and a collapsible diagnostic drawer.

### Tier 3: Component-Level Error Boundaries
- Wrap major interactive or data-heavy widgets in `<ErrorBoundary :compact="true">`:
  - `HeroBanner` in `HomeView.vue`
  - Body of `AthleteModal.vue`, `EventModal.vue`, and `CommandPaletteModal.vue`
  - High-traffic preview sections in `HomeView.vue`

### Tier 4: Fault-Tolerant Data Access
- Wrap all domain methods in `safeQuery` with typed fallbacks (`[]`, `null`, `""`).

---

## 5. Visual Design & Layout Standards (Frappe UI Inspired)

1. **Strict Vertical Lane Alignment**:
   - Tabular and list rows (events, rankings, documents) must maintain fixed column widths (`w-32` date pill, fluid title, `w-48` metrics, `w-36` CTA).
2. **Zero Functional Emojis**:
   - Never use emojis as functional UI icons (e.g. 🥇, 🔍, ❌, 📄). Always use inline SVGs or components like `MedalBadge.vue` and `WkfBadge.vue`. Emojis are reserved only for national flags.
3. **Flush Navbar Layout**:
   - Never place `space-y-*` on the root container in `App.vue`. Views that include a Hero Banner must sit flush against the Navbar's bottom border without unwanted gaps. Individual views must manage their own top padding (`py-8 sm:py-12`).
4. **Theme Support**:
   - Support dark mode using Tailwind classes (`dark:bg-gray-850`, `dark:border-gray-800`, `dark:text-white`).
   - Theme toggle is managed in `src/store/tweakStore.js` and toggles `.dark` on `document.documentElement`.

---

## 6. Known Gotchas & Critical Rules

1. **DO NOT import `{ FrappeUI } from 'frappe-ui'` in `src/main.js`**:
   - `frappe-ui` re-exports `FeatherIcon.vue`, which imports `feather-icons/dist/feather.js` (a CommonJS bundle).
   - In Vite dev mode, this causes a fatal syntax error on page refresh: `SyntaxError: Does not provide an export named 'default'`.
   - Keep `src/main.js` clean with standard Vue app mounting.
2. **`feather-icons` Pre-bundling**:
   - Maintain `optimizeDeps: { include: ['feather-icons'] }` in `vite.config.js` to prevent CJS resolution failures if any sub-package references it.
3. **Mirror Sync Command**:
   - Always run the following sync command after making changes:
     ```bash
     rsync -av --delete --exclude 'node_modules' --exclude '.git' --exclude 'dist' /home/hs32/Desktop/medchain/wkf-portal/ /home/hs32/Desktop/kaizen-karate-ecosystem/wkf-site/
     ```
