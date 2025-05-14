<template>
  <div class="pt-16 md:pt-32 mb-12 px-3 max-w-screen-lg mx-auto">
    <h1 class="text-3xl md:text-5xl">
      {{ header }}
    </h1>
  </div>
</template>

<script setup>
const { header } = defineProps(["header"]);
</script>

<style lang="scss" scoped></style>
