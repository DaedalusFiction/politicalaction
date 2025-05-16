<template>
  <div>
    <LayoutPageHeader header="Issues" />
    <div class="max-w-screen-xl mx-auto p-3">
      <div v-for="(issue, index) in totals" :key="index">
        <NuxtLink class="link" :href="`/issues/` + issue.topic"
          >{{ issue.topic }} [{{ issue.total }}]</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getCountFromServer } from "firebase/firestore";
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
  topics.forEach(async (topic) => {
    const issuesRef = collection(db, "issues", "topics", topic);
    try {
      const total = await getCountFromServer(issuesRef);
      console.log(topic, total.data().count);
      totals.value[totals.value.findIndex((item) => item.topic === topic)] = {
        topic: topic,
        total: total.data().count,
      };
    } catch {
      console.error("Error fetching total issues for topic: ", topic);
      totals.value[totals.value.findIndex((item) => item.topic === topic)] = {
        topic: topic,
        total: 0,
      };
    }
  });
});
</script>

<style scoped></style>
