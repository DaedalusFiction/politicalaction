<template>
  <div class="flex flex-col md:grid grid-cols-12 gap-3">
    <div class="col-span-6">
      <h4 class="mb-2">Create an issue</h4>
      <button
        class="btn"
        v-if="!newDocumentPanelExpanded"
        @click="toggleExpandNewDocument"
      >
        Create
      </button>
      <div v-else class="p-2">
        <AdminIssueForm @update="handleRefreshList" />
      </div>
    </div>
    <div class="col-span-6">
      <h4 class="mb-2">Manage existing issues</h4>
      <div class="" v-for="(category, index) in categories" :key="index">
        <h5>{{ category.title }}</h5>
        <div v-for="(issue, index) in category.issues" :key="index">
          <div class="rounded transition my-1 border">
            <div
              @click="toggleExpand(issue.id)"
              class="flex p-2 justify-between rounded cursor-pointer hover:bg-backgroundAccent dark:hover:bg-backgroundAccentDarkMode"
              :class="
                expandedItems[issue.id] &&
                'bg-backgroundAccent dark:bg-backgroundAccentDarkMode'
              "
            >
              <p>{{ issue.data().title || "No Title" }}</p>
              <p>
                {{ new Date(issue.data().dateUploaded).toLocaleDateString() }}
              </p>
            </div>
            <div v-if="expandedItems[issue.id]">
              <div class="p-3">
                <AdminIssueForm
                  :issue="issue"
                  @update="handleRefreshList(issue.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button class="btn" @click="handleShowMoreDocuments">More</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "~/firebase.config";
import { ref, reactive } from "vue";
import { AdminIssueForm } from "#components";
import { topics } from "~/data";

const categories = reactive(
  topics.map((topic) => {
    return { title: topic, issues: [] };
  })
);
const expandedItems = reactive({});
const pageSize = 10;
const numberOfShownDocuments = ref(pageSize);
const newDocumentPanelExpanded = ref(false);
const toggleExpandNewDocument = () => {
  newDocumentPanelExpanded.value = !newDocumentPanelExpanded.value;
};

const getDocuments = async (total) => {
  categories.forEach(async (category, index) => {
    const issuesRef = collection(db, "issues", "topics", category.title);
    const items = await getDocs(
      query(issuesRef, limit(total), orderBy("dateUploaded", "desc"))
    );
    console.log(items.docs);
    categories[index].issues = items.docs;
  });
};

onMounted(() => {
  getDocuments(numberOfShownDocuments.value);
});

const handleShowMoreDocuments = () => {
  numberOfShownDocuments.value += pageSize;
  getDocuments(numberOfShownDocuments.value);
};

const toggleExpand = (issueId) => {
  expandedItems[issueId] = !expandedItems[issueId];
};

const handleRefreshList = (articleId) => {
  if (articleId) {
    getDocuments(numberOfShownDocuments.value);
    toggleExpand(articleId);
  } else {
    toggleExpandNewDocument();
  }
};
</script>

<style scoped></style>
