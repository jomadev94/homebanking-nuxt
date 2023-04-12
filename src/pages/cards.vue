<script setup lang="ts">
import { formatMonthYear } from "../utils/dateFormatter";
import { Option } from "../models/Option";
import RequestResponse from "../models/RequestResponse";
import { Card as CardModel } from "../models/Card";

const createModal = ref(false);
const cardTypes: Option[] = [
  { id: 1, name: "DEBIT", enable: true },
  { id: 2, name: "CREDIT", enable: true },
];
const cardColors: Option[] = [
  { id: 1, name: "GOLD" },
  { id: 2, name: "SILVER" },
  { id: 3, name: "TITANIUM" },
];
const selectedType = ref(cardTypes[0]);
const selectedColor = ref(cardColors[0]);
const load = ref(false);
const debits: Ref<CardModel[]> = ref([]);
const credits: Ref<CardModel[]> = ref([]);

function checkDisable() {
  if (debits.value.length === 3) {
    cardTypes[0].enable = false;
    selectedType.value = cardTypes[1];
    return;
  }
  if (credits.value.length === 3) {
    cardTypes[1].enable = false;
    selectedType.value = cardTypes[0];
  }
}

function updateCards(card: CardModel) {
  card.number = card.number.match(/.{1,4}/g);
  card.truDate = formatMonthYear(card.truDate);
  card.fromDate = formatMonthYear(card.fromDate);
  card.type === "CREDIT" ? credits.value.push(card) : debits.value.push(card);
}

const { data: result } = await useFetch<RequestResponse>(
  "/clients/current",
  requestOptions()
);
(result.value?.data.cards as CardModel[]).forEach((card) => {
  updateCards(card);
});
checkDisable();

async function createCard() {
  try {
    if (
      (selectedType.value.name === "CREDIT" && credits.value.length < 3) ||
      (selectedType.value.name === "DEBIT" && debits.value.length < 3)
    ) {
      load.value=true;
      const { data: result } = await useFetch("/clients/current/cards", {
        ...requestOptions(),
        method: "POST",
        body: {
          color: selectedColor.value.name,
          type: selectedType.value.name,
        },
      });
      const card = (result.value as RequestResponse).data;
      updateCards(card);
      checkDisable();
      createModal.value = false;
    }
  } catch (error) {
    console.log(error);
  }
  finally{
    load.value=false;
  }
}
</script>

<template>
  <Title>Cards</Title>
  <TitleBlock text="Cards">
    <Button
      :color="ButtonColor.alter"
      @click="createModal = true"
      color-button="alter"
      class="mb-4"
      v-if="debits.length + credits.length < 6"
    >
      Add new card</Button
    >
  </TitleBlock>
  <div class="flex flex-col gap-4">
    <Card card-title="Debit Cards">
      <Carousel
        v-if="debits.length > 0"
        :items="debits"
        carousel-id="debits-box"
      ></Carousel>
      <Message v-else text="You don't have a debit card"></Message>
    </Card>
    <Card card-title="Credit Cards">
      <Carousel
        v-if="credits.length > 0"
        :items="credits"
        carousel-id="credits-box"
      ></Carousel>
      <Message v-else text="You don't have a credit card"></Message>
    </Card>
  </div>
  <Modal :open="createModal" @closed="createModal = false">
    <template v-slot:header> Add new Card </template>
    <template v-slot:content>
      <div class="flex flex-col gap-4 mt-2 mb-5">
        <Select
          label="Select card type"
          :options="cardTypes"
          v-model:selected-option="selectedType"
        ></Select>
        <Radio
          :options="cardColors"
          label="Pick one class"
          v-model:selected="selectedColor"
        ></Radio>
      </div>
    </template>
    <template v-slot:options>
      <Button :is-loading="load" @click="createCard()">New Card</Button>
    </template>
  </Modal>
</template>
