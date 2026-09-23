<template>
  <div
    class="flex flex-col md:flex-row md:items-end justify-between gap-4"
    :class="underlined ? 'pb-6 border-b border-gray-200 dark:border-gray-800' : ''"
  >
    <div>
      <div
        v-if="eyebrow || $slots['eyebrow-icon']"
        class="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-1.5"
      >
        <slot name="eyebrow-icon"></slot>
        <span>{{ eyebrow }}</span>
      </div>

      <h2
        v-if="level === 2"
        class="text-2xl sm:text-3xl font-black text-gray-950 dark:text-white tracking-tight font-sans"
      >
        <slot name="title">{{ title }}</slot>
      </h2>
      <h1
        v-else
        class="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white tracking-tight font-sans"
      >
        <slot name="title">{{ title }}</slot>
      </h1>

      <p
        v-if="description"
        class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1.5 max-w-3xl leading-relaxed"
      >
        {{ description }}
      </p>
    </div>

    <!-- Actions / CTA slot -->
    <div v-if="actionText || $slots.action" class="shrink-0 flex items-center gap-3">
      <slot name="action">
        <router-link
          v-if="actionTo"
          :to="actionTo"
          class="text-xs font-semibold text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1.5 transition-colors group cursor-pointer"
        >
          <span>{{ actionText }}</span>
          <span class="group-hover:translate-x-0.5 transition-transform">→</span>
        </router-link>
        <a
          v-else-if="actionHref"
          :href="actionHref"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-semibold text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1.5 transition-colors group cursor-pointer"
        >
          <span>{{ actionText }}</span>
          <span class="group-hover:translate-x-0.5 transition-transform">→</span>
        </a>
      </slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  actionText: {
    type: String,
    default: ''
  },
  actionTo: {
    type: String,
    default: ''
  },
  actionHref: {
    type: String,
    default: ''
  },
  level: {
    type: Number,
    default: 2,
    validator: v => [1, 2].includes(v)
  },
  underlined: {
    type: Boolean,
    default: true
  }
})
</script>
