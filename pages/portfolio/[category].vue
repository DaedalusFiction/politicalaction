<template>
  <div>
    <div :class="selectedImage && 'blur-sm'">
      <LayoutPageHeader :header="category" />
      <div
        class="flex flex-col md:grid grid-cols-12 gap-2 max-w-screen-2xl px-3 mx-auto"
      >
        <div
          v-for="(photograph, index) in photographs"
          :key="index"
          class="col-span-4"
        >
          <img
            class="cursor-pointer"
            @click="handleSelectImage(photograph.data())"
            :src="photograph.data().image.src"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="selectedImage"
    class="fixed z-40 top-0 left-0 h-screen w-screen flex justify-center items-center blur-0"
  >
    <div @click="selectedImage = null" class="relative cursor-pointer">
      <img :src="selectedImage.image.src" alt="" class="z-40" />
      <IconsCancelCircle class="absolute top-3 right-3 invert z-50" />
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebase.config";

const router = useRoute();
const category = router.params.category;
const photographs = ref([]);
const selectedImage = useState("selectedImage");

onMounted(async () => {
  const collectionRef = collection(db, `photographs/categories/` + category);
  const photographsSnapshot = await getDocs(collectionRef);
  console.log(photographsSnapshot.docs);
  photographs.value = photographsSnapshot.docs;
});

const handleSelectImage = (image) => {
  if (selectedImage.value) {
    selectedImage.value = null;
  } else {
    selectedImage.value = image;
  }
};
</script>

<style scoped></style>
