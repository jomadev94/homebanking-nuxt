<script setup lang="ts">
const emit = defineEmits(["update:data"]);
defineProps({
  areaLabel: { type: String, required: true },
  areaId: { type: String, required: true },
  data: { type: String, default: "" },
  areaPlaceholder: { type: String, required: true },
  areaErrors: { type: Array as PropType<any>, required: true },
});

function updateData(event:any) {
  emit("update:data", event.target.value);
}
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <label class="font-bold" :for="areaId">{{ areaLabel + ":" }}</label>
    <textarea
      class="border-2 rounded-md p-2  focus:outline-none focus:outline-offset-0"
      :class="
        areaErrors.length > 0 ? 'border-red-700 focus:outline-red-700' : 'border-slate-900 focus:outline-blue-900'
      "
      :id="areaId"
      :value="data"
      @input="updateData($event)"
      :placeholder="areaPlaceholder"
      required
      rows="3"
    />
    <span class="text-red-700 text-sm mt-1" v-for="error in areaErrors">
      {{ error.$message }}
    </span>
  </div>
</template>
