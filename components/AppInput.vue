<script setup lang="ts">
defineProps<{
  modelValue: string | number;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="app-input-wrapper">
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="app-input"
      @input="updateValue"
    />
    <p v-if="error" class="app-input__error">{{ error }}</p>
  </div>
</template> 