<script setup lang="ts">
const props = defineProps({
  class: String
})
</script>

<template>
  <svg
    :class="props.class"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
  >
    <path
      d="M480-349.56q-10.26 0-20.09-3.92-9.82-3.91-17.52-11.61L258.96-548.52Q244-563.48 244-585.57q0-22.08 14.96-37.04 14.95-14.96 37.04-14.96t37.04 14.96L480-475.65l146.96-146.96q14.95-14.96 37.04-14.96t37.04 14.96Q716-607.65 716-585.57q0 22.09-14.96 37.05L517.61-365.09q-7.7 7.7-17.52 11.61-9.83 3.92-20.09 3.92Z"
      fill="currentColor"
    />
  </svg>
</template>
