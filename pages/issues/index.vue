<template>
  <div>
    <LayoutPageHeader header="Issues" />
    <div class="max-w-screen-xl mx-auto p-3">
      <div v-for="(issue, index) in totals" :key="index">
        <NuxtLink class="link text-xl" :href="`/issues/` + issue.topic"
          >{{ issue.topic }} [{{ issue.total }}]</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getCountFromServer, getDocs } from "firebase/firestore";
import { topics } from "~/data";
import { db } from "~/firebase.config";
const totals = ref(
  [...topics].map((topic) => {
    return {
      topic: topic,
      total: null,
    };
  })
);

onMounted(async () => {
  const issuesRef = collection(db, "templates");
  const docs = await getDocs(issuesRef);
});
</script>

<style scoped></style>
