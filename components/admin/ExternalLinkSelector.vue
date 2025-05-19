<template>
  <div class="border rounded p-3 mb-4">
    <p>{{ title }}</p>
    <div class="mb-4 flex flex-col gap-2">
      <label for="externalLinkTitle">Title</label>
      <input type="text" v-model="externalLinkTitle" />
    </div>
    <div class="mb-4 flex flex-col gap-2">
      <label for="externalLinkHref">URL</label>
      <input type="text" v-model="externalLinkHref" placeholder="https://..." />
    </div>
    <button class="btn mb-3" @click="handleAddExternalLink">Add Link</button>
    <div
      v-for="(link, index) in links"
      :key="index"
      class="flex justify-between gap-2 max-w-[100%]"
    >
      <div
        class="rounded bg-backgroundAccent dark:bg-backgroundAccentDarkMode p-2 overflow-hidden"
      >
        <p>Title: {{ link.title }}</p>
        <p class="truncate">URL: {{ link.href }}</p>
      </div>

      <button @click="handleRemoveExternalLink(index)">
        <IconsCancelCircle color="red" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const externalLinkTitle = ref("");
const externalLinkHref = ref("");

const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:links"]);

const handleAddExternalLink = () => {
  const updatedLinks = [
    ...props.links,
    {
      title: externalLinkTitle.value,
      href: externalLinkHref.value,
    },
  ];

  emit("update:links", updatedLinks);
  externalLinkTitle.value = "";
  externalLinkHref.value = "";
};

const handleRemoveExternalLink = (index) => {
  const updatedLinks = [
    ...props.links.slice(0, index),
    ...props.links.slice(index + 1),
  ];

  emit("update:links", updatedLinks);
};
</script>

<style scoped></style>
