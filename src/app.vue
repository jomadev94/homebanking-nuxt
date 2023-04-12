<script setup lang="ts">
 useHead({link: [{ rel: 'icon', type: 'image/png', href: 'favicon.ico' }]}); 
</script>

<template>
  <div>
    <Loader></Loader>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

