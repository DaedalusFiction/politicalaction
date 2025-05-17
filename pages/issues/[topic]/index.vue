<template>
  <div>
    <LayoutPageHeader :header="route.params.topic + ' issues'" />
    <div class="max-w-screen-lg mx-auto px-3 flex flex-col gap-12">
      <div v-for="(issue, index) in issues" :key="index">
        <LayoutIssue :issue="issue" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "~/firebase.config";

const route = useRoute();
const issues = ref([]);

onMounted(async () => {
  const topic = route.params.topic;
  const issuesRef = collection(db, "issues", "topics", topic);
  const items = await getDocs(
    query(issuesRef, limit(100), orderBy("dateUploaded", "desc"))
  );
  issues.value = items.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
});
</script>

<style scoped></style>
