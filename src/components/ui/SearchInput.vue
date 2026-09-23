<template>
  <div class="relative shrink-0" :class="widthClass">
    <svg
      class="size-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>

    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      class="w-full pl-9 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-850 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-xs"
      :class="[
        shortcut ? 'pr-12' : (modelValue ? 'pr-8' : 'pr-3.5'),
        size === 'sm' ? 'py-1.5' : 'py-2'
      ]"
    />

    <button
      v-if="modelValue"
      type="button"
      @click="$emit('update:modelValue', '')"
      aria-label="Clear search"
      class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors cursor-pointer"
    >
      <svg class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <kbd
      v-else-if="shortcut"
      class="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded select-none pointer-events-none"
    >
      ⌘K
    </kbd>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  ariaLabel: {
    type: String,
    default: 'Search'
  },
  widthClass: {
    type: String,
    default: 'w-full sm:w-64'
  },
  size: {
    type: String,
    default: 'sm',
    validator: v => ['sm', 'md'].includes(v)
  },
  shortcut: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>
