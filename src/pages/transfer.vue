<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { reactive, watch } from "vue";
import { HomeInfo } from "../models/Client";
import RequestResponse from "../models/RequestResponse";
import { Option } from "../models/Option";
import { globalRules } from "../utils/globals";

const transferForm = reactive({
  from:{id: 1, name: "" as String} as Option,
  to: "",
  amount: "100",
  description: "",
});

const responseMessage = reactive({
  show: false,
  type: MessageTypes.default,
  text: "",
});

const rules = {
  from: {
    required: globalRules.required,
  },
  to: {
    required: globalRules.required,
    toFormat: globalRules.toFormat,
  },
  amount: {
    required: globalRules.required,
    numeric: globalRules.numeric,
    minValue: globalRules.minValue(100),
  },
  description: {
    required: globalRules.required,
    maxLength: globalRules.maxLength(200),
  },
};

const v$ = useVuelidate(rules, transferForm);
const myAccounts:Ref<Option[]>= ref([]);
const openModal = ref(false);
const load = ref(false);
const {data:response}= await useFetch<RequestResponse>("/clients/current", requestOptions());
myAccounts.value=(response.value?.data as HomeInfo).accounts.map(account=>({id: account.id, name: `${account.number} - $${account.balance}`, enable:true, value:account.number}));
transferForm.from=myAccounts.value.at(0) as Option;

function isNumeric(event:any) {
  event = event ? event : window.event;
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode < 48 || charCode > 57) event.preventDefault();
}

watch(transferForm, (newValue) => {
  responseMessage.show = false;
});

async function makeTransaction(event:Event) {
  event.preventDefault();
  responseMessage.text =
    "Failed Transaction: remember to select an account with sufficient balance and that destination account must exists";
  responseMessage.type = MessageTypes.error;
  try {
    v$.value.$touch();
    if (!v$.value.$invalid) {
      load.value = true;
      await useFetch("/transaction", {...requestOptions() ,method:"POST", body:{ to:transferForm.to,from:transferForm.from.value, amount:transferForm.amount,description:transferForm.description }})
      responseMessage.text =
        "Successful Transaction: you can check the result in the account details";
      responseMessage.type = MessageTypes.success;
    }
  } finally {
    load.value = false;
    responseMessage.show = true;
    openModal.value = false;
  }
}

function open() {
  openModal.value = true;
}
</script>

<template>
  <Title>Transfer</Title>
  <TitleBlock text="Transfer"></TitleBlock>
  <Card card-title="Make transfer">
    <form class="flex flex-col gap-2" @submit.prevent="open()">
      <Select
        label="Account from"
        :options="myAccounts"
        v-model:selected-option="v$.from.$model"
      ></Select>
      <Input
        input-label="Account to"
        input-id="accountTo"
        input-placeholder="VIN9542034"
        v-model:data="v$.to.$model"
        :input-errors="v$.to.$errors"
      ></Input>
      <Input
        @keypress="isNumeric($event)"
        input-label="Amount"
        input-id="amount"
        input-placeholder="min $100"
        v-model:data="v$.amount.$model"
        :input-errors="v$.amount.$errors"
      ></Input>
      <TextArea
        area-label="Description"
        area-id="description"
        area-placeholder="Write a description"
        v-model:data="v$.description.$model"
        :area-errors="v$.description.$errors"
      >
      </TextArea>
      <Message
        v-if="responseMessage.show"
        :type="responseMessage.type"
        :text="responseMessage.text"
        class="mt-2"
      ></Message>
      <Button class="w-28 mt-2 self-end" @click="openModal = true">
        Transfer
      </Button>
    </form>
    <Modal :open="openModal" @closed="openModal = false">
      <template v-slot:header>
        <p>Make transaction</p>
      </template>
      <template v-slot:content>
        <p>Are you sure you want to make the transaction?</p>
      </template>
      <template v-slot:options>
        <Button :is-loading="load" @click="makeTransaction($event)">
          Yes
        </Button>
      </template>
    </Modal>
  </Card>
</template>
