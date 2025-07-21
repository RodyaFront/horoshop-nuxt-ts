<template>
  <NuxtLayout>
    <NuxtPage v-slot="{ Component }">
      <component :is="Component" />
    </NuxtPage>
  </NuxtLayout>
</template>