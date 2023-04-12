<script setup lang="ts">
defineProps({
  icon: {
    type: Function,
  },
  title: {
    type: String,
  },
});
</script>

<template>
  <Card class="max-w-3xl">
    <div class="flex gap-4 items-center">
      <component :is="icon" class="h-28 w-28"></component>
      <section>
        <h2 class="font-bold text-6xl">{{ title }}</h2>
        <slot></slot>
      </section>
    </div>
  </Card>
</template>
