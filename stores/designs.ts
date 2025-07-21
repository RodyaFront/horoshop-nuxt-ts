import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Design } from '@/types/design'

export const useDesignsStore = defineStore('designs', () => {
  const items = ref<Design[]>([])

  const all = computed(() => items.value)
  const getById = (id: string) => items.value.find(d => d.id === id)

  function add(design: Design) {
    items.value.push(design)
  }

  function update(id: string, patch: Partial<Omit<Design, 'id'>>) {
    const idx = items.value.findIndex(d => d.id === id)
    if (idx !== -1) {
      items.value[idx] = { ...items.value[idx], ...patch }
    }
  }

  function remove(id: string) {
    items.value = items.value.filter(d => d.id !== id)
  }

  return { items, all, getById, add, update, remove }
}) 