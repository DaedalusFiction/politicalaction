<template>
  <div>
    <LayoutPageHeader header="Issues" />
    <div class="max-w-screen-xl mx-auto p-3">
      <div v-for="(issue, index) in issues" :key="index">
        <NuxtLink class="link" :href="`/issues` + issue.href">{{
          issue.name
        }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const issues = [
  { name: "animals", href: "/animals" },
  { name: "education", href: "/education" },
  { name: "health", href: "/health" },
  { name: "labor", href: "/labor" },
  { name: "criminal justice", href: "/criminal-justice" },
  { name: "technology", href: "/technology" },
  { name: "environment", href: "/environment" },
  {
    name: "governance and voting rights",
    href: "/governance-and-voting-rights",
  },
];
</script>

<style scoped></style>
