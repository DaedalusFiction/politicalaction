<template>
  <div class="max-w-screen-xl mx-auto px-4 py-8">
    <h2 class="page-header">Search</h2>
    <div class="md:flex gap-3 justify-between items-center">
      <p>Explore issues</p>
      <div class="flex gap-2 mb-2 items-center">
        <label for="hitsPerPage"><p>Results Per Page:</p></label>
        <select name="Results Per Page" id="hitsPerPage" v-model="hitsPerPage">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-3 mb-3">
      <input
        type="text"
        class="grow"
        id="query"
        v-model="searchQuery"
        placeholder="Search Publications..."
        @keyup.enter="getSearchResults(searchQuery)"
      />
      <button
        class="btn w-full md:w-fit"
        @click="getSearchResults(searchQuery)"
      >
        Search
      </button>
    </div>
    <label class="hidden" for="query">Search Query</label>
    <p v-if="searchResults && searchResults.length > 0" class="text-sm mb-3">
      Showing 1-{{ searchResults.length }} of {{ totalHits }} total results
    </p>
    <p v-else>No documents found.</p>
    <div v-if="searchResults && searchResults.length > 0" class="mt-8">
      <div v-for="(result, index) in searchResults" :key="index">
        <LayoutSearchResult :result="result" />
      </div>
      <button
        class="btn"
        v-if="searchResults.length < totalHits"
        @click="handleLoadMorePublications"
      >
        Load More Results
      </button>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

import { filters } from "~/data";
import useSearch from "~/composables/search";

const tagQuery = ref(route.query.tag);
const searchFilters = ref({ ...filters, excludedTags: [] });

if (tagQuery?.value && !searchFilters.value._tags.includes(tagQuery.value)) {
  searchFilters.value._tags = [tagQuery.value];
} else {
  searchFilters.value._tags = [];
}
const filtersExpanded = ref(false);
const searchResults = ref([]);
const totalHits = ref(0);
const query = ref(route.query.q);
const hitsPerPage = ref(10);
const totalRequestedHits = ref(hitsPerPage.value);
const searchQuery = ref("");

const getSearchResults = async (query) => {
  if (searchQuery.value == "") {
    return;
  }
  let platformsFilters = "";
  let platformsArray = [];
  let filters = [];
  let excludedTags = searchFilters.value.excludedTags?.map(
    (excludedTag) => `-${excludedTag}`
  );
  const propertyFilters = searchFilters.value.properties?.map(
    (property) => `properties:"${property}"`
  );

  platformsArray = searchFilters.value.platforms?.map(
    (platform) => `platforms:"${platform}"`
  );

  if (platformsArray.length > 0) {
    platformsFilters = `(${platformsArray.join(" OR ")})`;
    filters = [platformsFilters];
  }

  filters = [...filters, ...propertyFilters];

  const formattedFilters = filters ? filters.join(" AND ") : "";

  const allTagFilters = [...searchFilters.value._tags, ...excludedTags];
  const formattedTagFilters = searchFilters.value
    ? allTagFilters.join(", ")
    : "";
  const { hits, nbHits } = await useSearch(
    query,
    totalRequestedHits.value,
    formattedFilters,
    formattedTagFilters
  );
  console.log(hits);
  totalHits.value = nbHits;
  searchResults.value = hits;
};

const handleLoadMorePublications = () => {
  totalRequestedHits.value += hitsPerPage.value;
};

watch(
  () => route.query.q,
  async () => {
    query.value = route.query.q;
    getSearchResults(route.query.q);
  }
);

watch(
  () => totalRequestedHits.value,
  async () => {
    getSearchResults(searchQuery.value);
  }
);
watch(
  () => hitsPerPage.value,
  async () => {
    totalRequestedHits.value = hitsPerPage.value;
    getSearchResults(searchQuery.value);
  }
);
</script>

<style scoped>
input,
select,
textarea {
  @apply shadow md:w-fit appearance-none border rounded py-2 px-3 text-gray-700 leading-tight;
}

input,
textarea {
  @apply w-full;
}
</style>
