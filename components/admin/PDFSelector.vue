<template>
  <div class="mb-4 flex gap-2 flex-wrap">
    
    <div>
      <label class="block font-bold mb-2" for="document"> <p>Select PDF</p> </label>
      <input
        required
        id="document"
        accept=".pdf"
        class="dark:text-white mb-1"
        type="file"
        @change="handleSelectDocument"
        :disabled="isProcessing"
      />
      <p v-if="isProcessing" class="text-xs mt-1">Processing Document...</p>
      <p class="text-xs italic dark:text-white">
        File name must end in .pdf
      </p>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const isProcessing = ref(false);

const handleSelectDocument = async (event) => {
  if (!event.target.files || !event.target.files[0]) {
    emit("update:modelValue", null);
    return;
  }

  const file = event.target.files[0];

 

  // Compress and convert the document
  try {
    isProcessing.value = true;
    emit("update:modelValue", file);
  } catch (error) {
    emit("update:modelValue", file); // Fall back to original file if compression fails
  } finally {
    isProcessing.value = false;
  }
};

</script>

<style scoped></style>
