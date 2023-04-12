<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/solid";
import { Account } from "../models/Account";
import { HomeInfo } from "../models/Client";
import RequestResponse from "../models/RequestResponse";
import { format } from "../utils/dateFormatter";

const client: Ref<HomeInfo | null> = ref(null);
const load=ref(false);
const { data: info } = await useFetch<RequestResponse>("/clients/current",requestOptions());
client.value = info.value?.data as HomeInfo;
client.value.accounts=client.value.accounts.map(a=>{
  a.creationDate=format(a.creationDate);
  return a;
});


async function addAccount() {
  try {
    load.value=true;
    const { data: response } = await useFetch(`/clients/current/accounts`, {
      ...requestOptions(),
      method: "POST",
    });
    const account = (response.value as RequestResponse).data as Account;
    account.creationDate = format(account.creationDate);
    client.value?.accounts.push(account);
  } catch (err) {
    console.log(err);
  }
  finally{
    load.value=false;
  }
}
</script>

<template>
  <Title>Home</Title>
  <TitleBlock text="Home"></TitleBlock>
  <div class="grid grid-cols-1 gap-x-0 gap-y-4 sm:grid-cols-3 sm:gap-4">
    <Card card-title="Client information">
      <p>Name: {{ client?.firstName }}</p>
      <p>Lastname: {{ client?.lastName }}</p>
      <p>Email: {{ client?.email }}</p>
    </Card>

    <Card card-title="Loans" class="col-span-2 row-span-2">
      <Table
        v-if="client?.loans.length"
        :titles="['id', 'loanId', 'name', 'amount', 'payments']"
      >
        <tr v-for="loan in client.loans">
          <td>
            {{ loan.id }}
          </td>
          <td>{{ loan.loanId }}</td>
          <td>{{ loan.name }}</td>
          <td>{{ "$ " + loan.amount }}</td>
          <td>{{ loan.payments }}</td>
        </tr>
      </Table>
      <Message v-else text="You dont have loans!"></Message>
    </Card>

    <Card :card-title="client?.firstName + '\'s Accounts'">
      <template v-slot:options>
        <Button :is-loading="load" v-if="client?.accounts.length! < 3" @click="addAccount()">
          <PlusIcon class="w-5 h-5 text-white"></PlusIcon>
        </Button>
      </template>
      <Table :titles="['Account Number', 'Created Date', 'Balance']">
        <tr v-for="account in client?.accounts">
          <td>
            <NuxtLink
              :to="'/account/' + account.id"
              class="text-blue-900 hover:font-bold hover:underline underline-offset-4"
            >
              {{ account.number }}
            </NuxtLink>
          </td>
          <td>{{ account.creationDate }}</td>
          <td>{{ "$ " + account.balance }}</td>
        </tr>
      </Table>
    </Card>
  </div>
</template>
