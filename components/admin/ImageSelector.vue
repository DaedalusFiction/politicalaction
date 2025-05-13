<template>
  <div class="mb-4 flex gap-2 flex-wrap">
    <div class="w-32">
      <img
        v-if="imageFilePreview"
        :src="imageFilePreview"
        class="image-container"
        alt=""
      />
      <div v-else class="bg-gray-300 border flex items-center p-2">
        <p class="text-center dark:text-darkMuted">No Image Selected</p>
      </div>
    </div>
    <div>
      <label class="block font-bold mb-2" for="image"> Select Image </label>
      <input
        required
        id="image"
        accept=".jpg,.jpeg,.webp,.png"
        type="file"
        @change="handleSelectImage"
        :disabled="isProcessing"
      />
      <p v-if="isProcessing" class="text-xs mt-1">Processing image...</p>
      <p class="text-xs italic dark:text-dark">
        File name must end in .jpg, .jpeg, .webp, or .png. Maximum file size:
        1MB
      </p>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const imageFilePreview = ref(null);
const isProcessing = ref(false);

const handleSelectImage = async (event) => {
  if (!event.target.files || !event.target.files[0]) {
    imageFilePreview.value = null;
    emit("update:modelValue", null);
    return;
  }

  const file = event.target.files[0];

  // Read the original file for preview
  const reader = new FileReader();
  reader.onload = (e) => {
    imageFilePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);

  // Compress and convert the image
  try {
    isProcessing.value = true;
    const compressedFile = await compressImage(file, 800, 0.85);
    emit("update:modelValue", compressedFile);
  } catch (error) {
    console.error("Error compressing image:", error);
    emit("update:modelValue", file); // Fall back to original file if compression fails
  } finally {
    isProcessing.value = false;
  }
};

// Function to compress and convert images
const compressImage = (file, maxWidth, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // Calculate new dimensions
      const aspectRatio = img.height / img.width;
      const width = Math.min(maxWidth, img.width);
      const height = Math.round(width * aspectRatio);

      // Create canvas and draw image
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to WebP
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas to Blob conversion failed"));
            return;
          }

          // Create a new file with appropriate name
          const fileName =
            file.name.split(".").slice(0, -1).join(".") + ".webp";
          const compressedFile = new File([blob], fileName, {
            type: "image/webp",
            lastModified: new Date().getTime(),
          });

          URL.revokeObjectURL(img.src); // Clean up
          resolve(compressedFile);
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Error loading image"));
    };
  });
};
</script>

<style scoped></style>
