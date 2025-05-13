<template>
  <div class="flex flex-col md:grid grid-cols-12 gap-3">
    <div class="col-span-6">
      <h4 class="mb-2">Publish a photograph listing</h4>
      <button
        class="btn"
        v-if="!newDocumentPanelExpanded"
        @click="toggleExpandNewDocument"
      >
        Create
      </button>
      <div v-else class="p-2">
        <AdminPhotographForm @update="handleRefreshList" />
      </div>
    </div>
    <div class="col-span-6">
      <h4 class="mb-2">Manage existing photographs</h4>
      <div class="" v-for="(category, index) in categories" :key="index">
        <h5>{{ category.title }}</h5>
        <div v-for="(photograph, index) in category.photographs" :key="index">
          <div
            v-if="photograph.data().category === category.title"
            class="rounded transition my-1 border"
          >
            <div
              @click="toggleExpand(photograph.id)"
              class="flex p-2 justify-between rounded cursor-pointer hover:bg-backgroundAccent dark:hover:bg-backgroundAccentDarkMode"
              :class="
                expandedItems[photograph.id] &&
                'bg-backgroundAccent dark:bg-backgroundAccentDarkMode'
              "
            >
              <p>{{ photograph.data().alt || "No Title" }}</p>
              <p>
                {{
                  new Date(photograph.data().dateUploaded).toLocaleDateString()
                }}
              </p>
            </div>
            <div v-if="expandedItems[photograph.id]">
              <div class="p-3">
                <AdminPhotographForm
                  :photograph="photograph"
                  @update="handleRefreshList(photograph.id)"
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
import { AdminPhotographForm } from "#components";
import { projects } from "~/data";

const categories = reactive(
  projects.map((project) => {
    return { title: project.title, photographs: [] };
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
  console.log(categories);
  categories.forEach(async (category, index) => {
    console.log(category.title, index);
    const photographsRef = collection(
      db,
      "photographs",
      "categories",
      category.title
    );
    const items = await getDocs(
      query(photographsRef, limit(total), orderBy("dateUploaded", "desc"))
    );
    categories[index].photographs = items.docs;
  });
};

onMounted(() => {
  getDocuments(numberOfShownDocuments.value);
});

const handleShowMoreDocuments = () => {
  numberOfShownDocuments.value += pageSize;
  getDocuments(numberOfShownDocuments.value);
};

const toggleExpand = (photographId) => {
  expandedItems[photographId] = !expandedItems[photographId];
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
