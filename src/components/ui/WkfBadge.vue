<template>
  <span
    class="inline-flex items-center gap-1 font-semibold rounded-full border transition-colors shrink-0"
    :class="[sizeClasses, variantClasses]"
  >
    <slot name="icon">
      <span v-if="variant === 'live'" class="size-1.5 rounded-full bg-rose-500 animate-ping"></span>
    </slot>
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'live', 'reg-open', 'completed', 'homologated', 'category', 'iso'].includes(v)
  },
  size: {
    type: String,
    default: 'sm',
    validator: s => ['xs', 'sm', 'md'].includes(s)
  },
  label: {
    type: String,
    default: ''
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'px-1.5 py-0.2 text-[10px] leading-tight'
    case 'md':
      return 'px-3 py-1 text-xs leading-normal'
    case 'sm':
    default:
      return 'px-2 py-0.5 text-[11px] leading-snug'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'live':
      return 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
    case 'reg-open':
      return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    case 'completed':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
    case 'homologated':
      return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 uppercase tracking-wider font-bold'
    case 'category':
      return 'bg-rose-50/70 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900 font-bold'
    case 'iso':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 font-mono'
    case 'default':
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
  }
})
</script>
