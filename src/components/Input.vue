<script setup lang="ts">
import { PropType } from "vue";
const emit = defineEmits(["update:data"]);
defineProps({
  inputLabel: { type: String, required: true },
  inputId: { type: String, required: true },
  inputType: { default: "text" },
  data: { default: "" },
  inputPlaceholder: { type: String, required: true },
  inputErrors: { type: Array as PropType<any>, required: true },
});

function updateData(event: Event) {
  emit("update:data", (event.target! as HTMLInputElement).value);
}
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <label class="font-bold" :for="inputId">{{ inputLabel + ":" }}</label>
    <div class="flex gap-2">
      <input autocomplete="off"
        class="border-2 rounded-md p-2 focus:outline-none focus:outline-offset-0 w-full"
        :class="
          inputErrors.length > 0
            ? 'border-red-700 focus:outline-red-700'
            : 'border-slate-900 focus:outline-blue-900'
        "
        :id="inputId"
        :type="inputType"
        :value="data"
        @input="updateData($event)"
        :placeholder="inputPlaceholder"
        required
      />
      <slot></slot>
    </div>
    <span class="text-red-700 text-sm mt-1" v-for="error in inputErrors">
      {{ error.$message }}
    </span>
  </div>
</template>
