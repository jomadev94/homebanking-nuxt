<script setup lang="ts">
import { format } from "../../utils/dateFormatter";
import { Account } from "~~/src/models/Account";
import RequestResponse from "~~/src/models/RequestResponse";

const accountId = useRoute().params.id;
const account: Ref<Account | null> = ref(null);
const { data: response, error } = await useFetch<RequestResponse>(
  `/accounts/${accountId}`,
  requestOptions()
);
if (!error.value) {
  account.value = response.value?.data as Account;
  account.value.creationDate = format(account.value.creationDate);
  account.value.transactions = account.value.transactions
    .map((t) => {
      t.date = format(t.date);
      return t;
    })
    .sort((t1, t2) => t2.id - t1.id);
}
</script>

<template>
  <Title>Account Details</Title>
  <TitleBlock :text="'Account: ' + account?.number"></TitleBlock>
  <div class="flex flex-col gap-4 md:flex-row">
    <Card card-title="Account information" class="md:w-1/4">
      <p>Creation date: {{ account?.creationDate }}</p>
      <p>Balance: {{ "$" + account?.balance }}</p>
    </Card>
    <Card card-title="Transactions">
      <table v-if="account!.transactions.length > 0" class="table-fixed w-full">
        <thead>
          <tr>
            <th class="text-start">Id</th>
            <th class="text-start">Description</th>
            <th class="text-start">Type</th>
            <th class="text-start">Date</th>
            <th class="text-start">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in account!.transactions">
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.description }}</td>
            <td
              :class="
                transaction.type === 'CREDIT'
                  ? 'text-green-600 opacity-90'
                  : 'text-red-600 opacity-90'
              "
            >
              {{ transaction.type }}
            </td>
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.amount }}</td>
          </tr>
        </tbody>
      </table>
      <Message v-else text="You dont have any transaction!"></Message>
    </Card>
  </div>
</template>
