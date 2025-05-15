<template>
  <div>
    <LayoutPageHeader header="Issues" />
    <div class="max-w-screen-xl mx-auto p-3">
      <div v-for="(issue, index) in topics" :key="index">
        <NuxtLink class="link" :href="`/issues` + issue.href">{{
          issue.title
        }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { topics } from "~/data";
</script>

<style scoped></style>
