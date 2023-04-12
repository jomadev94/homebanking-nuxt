<script setup lang="ts">
import { NoSymbolIcon } from "@heroicons/vue/24/solid";

defineProps(["error"]);
</script>

<template>
  <NuxtLayout name="public">
    <Alert :title="`${error.statusCode} Error`" :icon="NoSymbolIcon">
      <p class="mt-2">
        {{ error.message }}, please return to
        <NuxtLink class="font-bold hover:underline" to="/home">Home</NuxtLink>
      </p>
    </Alert>
  </NuxtLayout>
</template>
