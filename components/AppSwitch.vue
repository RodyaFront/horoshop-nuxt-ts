<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: String as PropType<'published' | 'unpublished'>,
    required: true
  },
  labelLeft: {
    type: String,
    default: 'Published'
  },
  labelRight: {
    type: String,
    default: 'Unpublished'
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'published' | 'unpublished'): void
}>()

const isPublished = computed(() => props.modelValue === 'published')

const toggle = () => {
  emit('update:modelValue', isPublished.value ? 'unpublished' : 'published')
}
</script>

<template>
  <div class="app-switch" @click="toggle">
    <div :class="['app-switch__toggle', { 'app-switch__toggle--active': isPublished }]">
      <div class="app-switch__indicator" />
    </div>
    <span class="app-switch__label">
      {{ isPublished ? labelLeft : labelRight }}
    </span>
  </div>
</template> 