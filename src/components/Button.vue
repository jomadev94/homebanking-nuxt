<script setup lang="ts">
import { PropType } from "vue";
import { BtnType, ButtonColor } from "../utils/types";

defineProps({
  color: {
    type: String,
    default: ButtonColor.default,
  },
  disableButton: { default: false },
  typeBtn: { type: String as PropType<BtnType>, default: "button" },
  isLoading: { default: false },
  position: { default: "relative" },
});
</script>

<template>
  <button
    :class="`${color} ${position} text-slate-200 p-2 rounded-md disabled:bg-gray-500`"
    :type="typeBtn"
    :disabled="disableButton"
  >
    <span :class="{ invisible: isLoading }">
      <slot></slot>
    </span>
    <div
      v-show="isLoading"
      class="w-6 h-6 rounded-full border-4 animate-spin border-l-transparent absolute top-1/2 -mt-3 left-1/2 -ml-3"
    ></div>
  </button>
</template>
