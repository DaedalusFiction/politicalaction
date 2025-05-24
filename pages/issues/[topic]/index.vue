<template>
  <div>
    <LayoutPageHeader :header="route.params.topic + ' issues'" />
    <div class="max-w-screen-lg mx-auto px-3 flex flex-col gap-6">
      <div v-for="(issue, index) in issues" :key="index">
        <LayoutIssue :issue="issue" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "~/firebase.config";

const route = useRoute();
const issues = ref([]);

onMounted(async () => {
  const topic = route.params.topic;
  const issuesRef = collection(db, "templates");
  const items = await getDocs(
    query(
      issuesRef,
      limit(100),
      orderBy("dateUploaded", "desc"),
      where("topic", "==", topic)
    )
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
