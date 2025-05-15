<template>
  <div class="">
    <div class="mb-4 flex flex-col gap-2">
      <label for="title"> Title</label>
      <input type="text" v-model="formData.title" />
    </div>
    <div class="mb-4 flex flex-col gap-2">
      <label for="topic" class="dark:text-white"> Topic</label>
      <select
        id="topic"
        v-model="formData.topic"
        required
        class="dark:text-white dark:bg-backgroundDarkMode"
      >
        <option
          class="dark:text-white"
          v-for="(topic, index) in topics"
          :key="index"
          :value="topic"
        >
          {{ topic }}
        </option>
      </select>
    </div>
    <div class="mb-4 flex flex-col gap-2">
      <label for="impact"> impact</label>
      <input
        type="text"
        v-model="formData.impact"
        placeholder="e.g. city, state"
      />
    </div>
    <div class="mb-4 flex flex-col gap-2">
      <label for="recommendedAudience"> Recommended Audience</label>
      <input type="text" v-model="formData.recommendedAudience" />
    </div>
    <div class="mb-4 flex flex-col gap-2">
      <label for="timeForAction"> Time for Action</label>
      <input type="text" v-model="formData.timeForAction" />
    </div>
    <div class="mb-4 flex flex-col gap-2">
      <label for="googleDocLink"> Google Doc Link</label>
      <input
        type="text"
        v-model="formData.googleDocLink"
        placeholder="https://..."
      />
    </div>
    <div class="border rounded p-3 mb-4">
      <p>External Links</p>
      <div class="mb-4 flex flex-col gap-2">
        <label for="externalLinkTitle">Title</label>
        <input type="text" v-model="externalLinkTitle" />
      </div>
      <div class="mb-4 flex flex-col gap-2">
        <label for="externalLinkHref">URL</label>
        <input
          type="text"
          v-model="externalLinkHref"
          placeholder="https://..."
        />
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
    <div class="mb-4 flex flex-col gap-2">
      <label for="contributors"> Contributors</label>
      <input type="text" v-model="formData.contributors" />
    </div>
    <!-- <AdminPDFSelector v-model:model-value="documentFile" /> -->
    <div class="mb-4 flex flex-col gap-2">
      <label for="description"> Description</label>
      <textarea v-model="formData.description" />
    </div>

    <div class="flex gap-2">
      <button class="btn" @click="submitForm">
        {{ issue ? "Update" : "Submit" }}
      </button>
      <button v-if="issue" class="btn" @click="handleDeleteDocument">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { deleteDoc, doc } from "firebase/firestore";
const emit = defineEmits(["update"]);
import useUploadDocument from "~/composables/admin/uploadDocument";
import useUpdateDocument from "~/composables/admin/updateDocument";
import useSnackbar from "~/composables/showSnackbar";
import { db } from "~/firebase.config";
import { topics } from "~/data";
const { issue } = defineProps(["issue"]);
const emptyForm = {
  topic: "",
  title: "",
  description: "",
  impact: "",
  timeForAction: "",
  googleDocLink: "",
  recommendedAudience: "",
  contributors: [],
  externalLinks: [],
};
const externalLinkTitle = ref("");
const externalLinkHref = ref("");
const formData = ref(emptyForm);
const documentFile = ref(null);

const handleAddExternalLink = () => {
  formData.externalLinks.push({
    title: externalLinkTitle.value,
    href: externalLinkHref.value,
  });
  externalLinkTitle.value = "";
  externalLinkHref.value = "";
};

const handleRemoveExternalLink = (index) => {
  formData.value.externalLinks = [
    ...formData.value.externalLinks.slice(0, index),
    ...formData.value.externalLinks.slice(index + 1),
  ];
};

onMounted(() => {
  if (issue) {
    formData.value = {
      topic: issue.data().topic,
      description: issue.data().description,
      title: issue.data().title,
      impact: issue.data().impact,
      timeForAction: issue.data().timeForAction,
      googleDocLink: issue.data().googleDocLink,
      recommendedAudience: issue.data().recommendedAudience,
      contributors: issue.data().contributors,
      externalLinks: issue.data().externalLinks,
    };
  }
});

const submitForm = async () => {
  if (issue) {
    await useUpdateDocument(
      `issues/topics/${issue.data().topic}`,
      formData.value,
      documentFile.value,
      issue.id
    );
    emit("update");
  } else {
    console.log(formData.value.topic);
    await useUploadDocument(
      `issues/topics/${formData.value.topic}`,
      formData.value,
      documentFile.value
    );

    emit("update");
  }
};
const handleDeleteDocument = async () => {
  try {
    await deleteDoc(doc(db, `issues/topics/${issue.data().topic}`, issue.id));
    useSnackbar("Document successfully deleted");
    emit("update");
  } catch {
    useSnackbar("Error deleting document");
  }
};
</script>

<style scoped></style>
