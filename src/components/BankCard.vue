<script setup lang="ts">
import { CardColor } from "../models/Card";

const props = defineProps(['number','cardHolder','color', 'type', 'cvv', 'fromDate', 'truDate', 'idCard' ]);

const viewFront =ref(true);
let card: HTMLElement;
let background:String | undefined;
const indexColor = Object.keys(CardColor).findIndex(
  (key) => key == props.color
);
background = Object.values(CardColor).at(indexColor);

onMounted(() => {
  card = document.getElementById(`${props.idCard}`)!;
});

function rotate() {
  viewFront.value = !viewFront.value;
  card.style.transform = viewFront.value ? "rotateY(0deg)" : "rotateY(180deg)";
}
</script>

<template>
  <div
    id="card"
    class="h-72 max-w-lg w-full relative text-white card-font cursor-pointer"
    @click="rotate()"
  >
    <div class="flip" :id="idCard as unknown as string">
      <FrontCard
        :cardHolder="cardHolder"
        :type="type"
        :color="background"
        :fromDate="fromDate"
        :truDate="truDate"
        :number="number"
      ></FrontCard>
      <BackCard :color="background" :cvv="cvv"></BackCard>
    </div>
  </div>
</template>

<style scoped>
#card {
  perspective: 1000;
}

.flip {
  width: inherit;
  height: inherit;
  transition: 0.7s;
  transform-style: preserve-3d;
}

.card-font {
  font-family: "cc font";
}
</style>
