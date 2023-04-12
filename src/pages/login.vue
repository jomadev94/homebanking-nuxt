<script setup lang="ts">
import { watch,reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import StoreService from "../services/StorageService";
import { globalRules } from "../utils/globals";
import { ButtonColor } from "../utils/types";
import RequestResponse from "../models/RequestResponse";

definePageMeta({
  layout: "public",
});

const form =reactive({
  email:"",
  password:""
});

const rules = {
  email: {
    required: globalRules.required,
  },
  password: {
    required: globalRules.required,
  },
};

const v$ = useVuelidate(rules, form);
const load = ref(false);
const error = ref(false);

watch(form, (newFormValue) => {
  error.value= false;
});

async function login() {
    v$.value.$touch();
    if (!v$.value.$invalid) {
      try {
        load.value = true;
        const options=requestOptions();
        const {data:response}=await useFetch('/clients/login',{...options,method:"POST",body:form});
        currentClient().value=((response.value as RequestResponse).data);
        StoreService.saveClient(currentClient().value!);
        navigateTo("/home");
      } catch (err) {
        error.value = true;
      } finally {
        load.value = false;
      }
    } else {
      error.value = true;
    }
}
</script>

<template>
  <Title>Login</Title>
  <TitleBlock
    text="Welcome to Liberbank Portal"
    class="text-center"
  ></TitleBlock>
  <Card card-title="Enter your access data" class="max-w-lg h-auto">
    <form class="flex flex-col gap-3" @submit.prevent="login()">
      <Input
        input-id="email"
        input-label="Email"
        input-placeholder="User@Domain.com"
        v-model:data="v$.email.$model"
        :input-errors="v$.email.$errors"
      ></Input>
      <Input
        input-id="password"
        input-label="Password"
        input-placeholder="*********"
        v-model:data="v$.password.$model"
        input-type="password"
        :input-errors="v$.password.$errors"
      ></Input>
      <Message
        v-if="error"
        text="Email or password incorrect!"
        :type="MessageTypes.error"
      ></Message>
      <Button :is-loading="load" type-btn="submit" :color="ButtonColor.alter"> Sign In </Button>
    </form>
  </Card>
  <div class="mt-3 max-w-lg w-full flex justify-end items-center gap-2 text-lg">
    <span>Don't have an account?</span>
    <nuxt-link
      class="transition-transform text-white hover:scale-105 hover:font-bold"
      to="/register"
    >
      Register
    </nuxt-link>
  </div>
</template>
