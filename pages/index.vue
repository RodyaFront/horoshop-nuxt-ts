<script setup lang="ts">
import { useDesignsStore } from '@/stores/designs'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

definePageMeta({
  pageTransition: { name: 'page', mode: 'out-in' }
})

const designsStore = useDesignsStore()
const { all: designs } = storeToRefs(designsStore)
const router = useRouter()

const addDesign = () => {
  router.push('/designs/new')
}
</script>

<template>
  <div class="design-list">
    <div class="design-list__header">
      <h1 class="design-list__title">Всі дизайни</h1>
      <AppButton class="design-list__add" @click="addDesign">
        Додати дизайн
      </AppButton>
    </div>
    <div v-if="designs.length > 0" class="design-list__grid">
      <NuxtLink v-for="design in designs" :key="design.id" :to="`/designs/${design.id}`" class="design-card">
        <img
          :src="design.img[0]"
          :alt="design.title"
          class="design-card__preview"
        />
        <div class="design-card__info">
          <span class="design-card__id">{{ design.id }}</span>
          <span class="design-card__name">{{ design.title }}</span>
        </div>
      </NuxtLink>
    </div>
    <div v-else class="design-list__empty">
      Список порожній...
    </div>
  </div>
</template>
