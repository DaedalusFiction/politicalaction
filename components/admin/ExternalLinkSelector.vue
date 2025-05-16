<template>
  <div class="border rounded p-3 mb-4">
    <p>External Links</p>
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
      v-for="(link, index) in formData.externalLinks"
      :key="index"
      class="flex justify-between gap-2"
    >
      <div
        class="rounded bg-backgroundAccent dark:bg-backgroundAccentDarkMode p-2 w-full"
      >
        <p>Title: {{ link.title }}</p>
        <p>URL: {{ link.href }}</p>
      </div>

      <button @click="handleRemoveExternalLink(index)">
        <IconsCancelCircle color="red" />
      </button>
    </div>
  </div>
</template>

<script setup>
const externalLinkTitle = ref("");
const externalLinkHref = ref("");
const { formData } = defineProps(["formData"]);
const { formData: formDataEmit } = defineEmits(["formData"]);

const handleAddExternalLink = () => {
  formData.externalLinks.push({
    title: externalLinkTitle.value,
    href: externalLinkHref.value,
  });
  externalLinkTitle.value = "";
  externalLinkHref.value = "";
};

const handleRemoveExternalLink = (index) => {
  formData.externalLinks = [
    ...formData.externalLinks.slice(0, index),
    ...formData.externalLinks.slice(index + 1),
  ];
};
</script>

<style scoped></style>
