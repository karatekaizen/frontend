<template>
  <div class="flex items-center gap-1.5 overflow-x-auto p-1 bg-gray-100 dark:bg-gray-850 rounded-xl border border-gray-200/80 dark:border-gray-800 shrink-0 max-w-fit scrollbar-none">
    <button
      v-for="item in normalizedOptions"
      :key="item.value"
      type="button"
      @click="$emit('update:modelValue', item.value)"
      class="px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 flex items-center gap-1.5 cursor-pointer select-none"
      :class="modelValue === item.value
        ? 'bg-white dark:bg-gray-750 text-gray-950 dark:text-white shadow-xs border border-gray-200/60 dark:border-gray-700 font-bold'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-white/40 dark:hover:bg-gray-800'"
    >
      <span>{{ item.label }}</span>
      <span
        v-if="item.count !== undefined"
        class="px-1.5 py-0.2 rounded-full text-[10px]"
        :class="modelValue === item.value
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 font-bold'
          : 'bg-gray-200/80 dark:bg-gray-750 text-gray-600 dark:text-gray-400'"
      >
        {{ item.count }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})

defineEmits(['update:modelValue'])

const normalizedOptions = computed(() => {
  return props.options.map(opt => {
    if (typeof opt === 'string') {
      return { label: opt, value: opt }
    }
    return {
      label: opt.label || opt.name || opt.title,
      value: opt.id !== undefined ? opt.id : (opt.value || opt.label),
      count: opt.count
    }
  })
})
</script>
