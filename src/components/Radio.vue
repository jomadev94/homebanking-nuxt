<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import { Option } from "../models/Option";

const emits = defineEmits(["update:selected"]);

defineProps({
  label: { type: String, required: true },
  options: { type: Array as PropType<Option[]>, required: true },
  selected: { type:Object },
});
</script>

<template>
  <div class="mx-auto w-full max-w-md">
    <span class="font-bold text-md">{{ label+":" }}</span>
    <RadioGroup
      @update:model-value="emits('update:selected', $event)"
      :model-value="selected"
    >
      <RadioGroupLabel class="sr-only">{{label}}</RadioGroupLabel>
      <div class="space-y-2">
        <RadioGroupOption
          as="template"
          v-for="option in options"
          :key="option.id"
          :value="option"
          v-slot="{ checked }"
        >
          <div
            :class="[checked ? 'bg-sky-900 bg-opacity-90' : 'opacity-70', 'text-white relative cursor-pointer rounded-lg px-4 py-2 shadow-sm shadow-black focus:outline-none bg-black']"
          >
            <div class="flex w-full items-center justify-between">
              <div class="flex items-center">
                <div class="text-sm">
                  <RadioGroupLabel as="p" class="font-medium">
                    {{ option.name }}
                  </RadioGroupLabel>
                </div>
              </div>
              <div v-show="checked" class="shrink-0 text-white">
                <CheckCircleIcon class="w-6 h-6"></CheckCircleIcon>
              </div>
            </div>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>
