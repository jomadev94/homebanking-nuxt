<script setup lang="ts">
import { Menu, MenuButton } from "@headlessui/vue";
import {
BellIcon,
ChevronDownIcon,
ChevronUpIcon
} from "@heroicons/vue/24/solid";
const client = currentClient().value;
</script>

<template>
  <header class="h-16">
    <nav class="flex bg-slate-100 justify-between items-center h-16 px-8">
      <div class="flex gap-4 items-center">
        <NuxtLink to="/">
          <img
            class="w-20 h-14 md:h-16 md:w-auto"
            src="~/assets/img/logo.png"
            alt="Bank logo"
          />
        </NuxtLink>
      </div>
      <div v-if="client" class="flex gap-6 items-center">
        <button class="bg-slate-800 rounded-full text-gray-50 p-2">
          <BellIcon class="w-5 h-5"></BellIcon>
        </button>
        <Menu as="div" class="relative z-10" v-slot="{ open }">
          <MenuButton
            class="bg-gradient-to-br from-gray-900 to-blue-900 p-2 text-white rounded-md"
          >
            <div class="flex gap-2 items-center">
              <span>{{ client.firstName }}</span>
              <ChevronUpIcon v-if="open" class="w-5 h-5"></ChevronUpIcon>
              <ChevronDownIcon v-else class="w-5 h-5"></ChevronDownIcon>
            </div>
          </MenuButton>
          <Navegation></Navegation>
        </Menu>
      </div>
    </nav>
  </header>
</template>
