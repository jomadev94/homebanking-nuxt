<script lang="ts" setup>
defineProps(['color', 'cvv'])
</script>

<template>
  <div
    id="back"
    :class="`${color} flex flex-col gap-2 h-full w-full rounded-3xl shadow shadow-black`"
  >
    <div class="h-16 w-full bg-black mt-9"></div>
    <div class="flex flex-col px-8 gap-2 font-sans">
      <p class="text-right">CVV</p>
      <div class="bg-white text-black p-1 md:p-2 w-full text-end rounded-md">
        <span class="text-sm md:text-lg">{{ cvv }}</span>
      </div>
      <div class="text-xs text-justify mt-1 md:mt-2">
        <p>
          This card is property of Monzo Bank, Wonderland. Misuse is criminal
          offence. If found, please return to Monzo Bank or to the nearest bank
          with MasterCard logo.
        </p>
        <p class="mt-1 md:mt-2">
          Use of this card is subject to the credit card agreement.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#back {
  transform: rotateY(180deg);
  position: absolute;
  backface-visibility: hidden;
  overflow: hidden;
}
</style>
