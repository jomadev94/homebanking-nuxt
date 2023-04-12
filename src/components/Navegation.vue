<script setup lang="ts">
import { MenuItem, MenuItems } from "@headlessui/vue";
import {
ArrowRightOnRectangleIcon,
BanknotesIcon, CreditCardIcon,
HomeIcon
} from "@heroicons/vue/24/solid";
import StorageService from "../services/StorageService";

const router = useRouter();
const links = [
  {
    title: "Home",
    href: "/home",
    icon: HomeIcon,
  },
  {
    title: "Cards",
    href: "/cards",
    icon: CreditCardIcon,
  },
  {
    title: "Transfer",
    href: "/transfer",
    icon: BanknotesIcon,
  },
];

function goTo(nav: Function, close: Function) {
  close();
  nav();
}

function logout() {
  StorageService.clear();
  router.push("/login");
}
</script>

<template>
  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-300 ease-out"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <MenuItems
      class="flex flex-col absolute top-12 right-0 z-50 bg-gradient-to-br from-gray-900 to-blue-500 rounded-md text-right shadow-lg w-60 text-white overflow-hidden border-2 border-opacity-50 border-black"
    >
      <MenuItem v-for="(link, index) in links" :key="index" v-slot="{ close }">
        <NuxtLink
          :to="link.href"
          v-slot="{ href, navigate }"
          active-class="bg-black font-bold"
        >
          <a :href="href" @click.prevent="goTo(navigate, close)" role="link">
            <div class="flex gap-3 items-center justify-end py-2 px-4">
              <span>{{ link.title }}</span>
              <component :is="link.icon" class="h-5 w-5"></component>
            </div>
          </a>
        </NuxtLink>
      </MenuItem>
      <MenuItem @click="logout()" class="py-2 px-4">
        <button>
          <div class="flex gap-3 items-center justify-end">
            <span>Logout</span>
            <ArrowRightOnRectangleIcon
              class="h-5 w-5"
            ></ArrowRightOnRectangleIcon>
          </div>
        </button>
      </MenuItem>
    </MenuItems>
  </transition>
</template>
