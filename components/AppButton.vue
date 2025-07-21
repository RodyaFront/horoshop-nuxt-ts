<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<'primary' | 'outline' | 'icon'>,
    default: 'primary',
  },
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonType = computed(() => props.type)
const isDisabled = computed(() => props.disabled)
const variant = computed(() => props.variant)

const classes = computed(() => [
  'app-button',
  `app-button--${variant.value}`,
  { 'app-button--disabled': isDisabled.value }
])
</script>

<template>
  <button
    :type="buttonType"
    :class="classes"
    :disabled="isDisabled"
    @click="event => !isDisabled && emit('click', event)"
    :aria-disabled="isDisabled ? 'true' : undefined"
  >
    <slot />
  </button>
</template>
