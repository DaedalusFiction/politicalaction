<template>
  <div class="">
    <div class="mb-4">
      <label for="category"> Category </label>
      <select id="category" v-model="formData.category" required>
        <option
          v-for="(project, index) in projects"
          :key="index"
          :value="project.title"
        >
          {{ project.title }}
        </option>
      </select>
    </div>

    <AdminImageSelector v-model:model-value="imageFile" />
    <div class="mb-4">
      <label for="alt"> Alternate Text </label>
      <input type="text" v-model="formData.alt" />
    </div>

    <div class="flex gap-2">
      <button class="btn" @click="submitForm">
        {{ photograph ? "Update" : "Submit" }}
      </button>
      <button v-if="photograph" class="btn" @click="handleDeleteDocument">
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
import { projects } from "~/data";
const { photograph } = defineProps(["photograph"]);
const emptyForm = {
  category: "",
  alt: "",
};
const formData = ref(emptyForm);
const imageFile = ref(null);

onMounted(() => {
  if (photograph) {
    formData.value = {
      category: photograph.data().category,
      alt: photograph.data().alt,
    };
  }
});

const submitForm = async () => {
  if (photograph) {
    await useUpdateDocument(
      `photographs/categories/${photograph.data().category}`,
      formData.value,
      imageFile.value,
      photograph.id
    );
    emit("update");
  } else {
    await useUploadDocument(
      `photographs/categories/${formData.value.category}`,
      formData.value,
      imageFile.value
    );

    emit("update");
  }
};
const handleDeleteDocument = async () => {
  try {
    await deleteDoc(
      doc(
        db,
        `photographs/categories/${photograph.data().category}`,
        photograph.id
      )
    );
    useSnackbar("Document successfully deleted");
    emit("update");
  } catch {
    useSnackbar("Error deleting document");
  }
};
</script>

<style scoped>
input[type="text"],
textarea {
  @apply block p-2.5 shadow w-full text-sm bg-gray-50 rounded-lg border;
}

label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
