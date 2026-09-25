<template>
  <div class="flex items-center gap-1.5 overflow-x-auto p-1 bg-gray-100 dark:bg-gray-850 rounded-xl border border-gray-200/80 dark:border-gray-800 shrink-0 max-w-fit scrollbar-none">
    <button
      v-for="item in normalizedOptions"
      :key="item.value"
      type="button"
      @click="handleClick(item.value)"
      class="px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 flex items-center gap-1.5 cursor-pointer select-none"
      :class="activeVal === item.value
        ? 'bg-white dark:bg-gray-800 text-gray-950 dark:text-white shadow-xs border border-gray-200/80 dark:border-gray-700 font-bold'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800'"
    >
      <span>{{ item.label }}</span>
      <span
        v-if="item.count !== undefined"
        class="px-1.5 py-0.2 rounded-full text-[10px]"
        :class="activeVal === item.value
          ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold'
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
    default: undefined
  },
  activeItem: {
    type: [String, Number],
    default: undefined
  },
  options: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

const activeVal = computed(() => props.modelValue !== undefined ? props.modelValue : props.activeItem)

const normalizedOptions = computed(() => {
  const list = props.options?.length ? props.options : (props.items || [])
  return list.map(opt => {
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

function handleClick(val) {
  emit('update:modelValue', val)
  emit('select', val)
}
</script>
