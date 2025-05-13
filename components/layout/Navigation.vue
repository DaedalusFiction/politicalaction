<template>
  <header :class="selectedImage && 'blur-md'" class="fixed w-full top-0 z-20">
    <div>
      <div class="hidden lg:grid grid-cols-12 gap-3 px-4 py-2 mx-auto">
        <div class="col-span-6 flex gap-3 items-center">
          <NuxtLink
            class="whitespace-nowrap text-2xl font-bold transition-all"
            to="/"
          >
            <span class="text-primary dark:text-primaryDarkMode">X</span>
            <span class="text-secondary dark:text-secondaryDarkMode">HMNZ</span>
          </NuxtLink>
          <p>the street photography of David J. Sorensen</p>
        </div>
        <div class="col-span-6 flex justify-between items-center">
          <NuxtLink
            v-for="item in pages"
            :key="item"
            class="link mix-blend-difference font-bold"
            :href="item.href"
            >{{ item.title }}</NuxtLink
          >
        </div>
      </div>
      <div class="p-2 mx-auto flex xl:hidden justify-between items-center">
        <button
          class="navigationOptions text-2xl font-extrabold text-white"
          @click="handleExpandNavigation"
        >
          <IconsHamburger class="navigationOptions" />
        </button>
        <h1 class="text-secondary dark:text-secondaryDarkMode">
          <NuxtLink to="/" class="link">XHMNZ</NuxtLink>
        </h1>
      </div>
    </div>
  </header>

  <Transition>
    <nav
      v-if="navigationExpanded"
      class="fixed top-0 left-0 w-screen h-screen bg-background dark:bg-backgroundDarkMode transition-colors duration-50 flex items-center py-4 z-50"
      :class="navigationExpanded && 'navigationExpanded'"
    >
      <ul class="">
        <li class="my-2" v-for="item in pages" :key="item.href">
          <NuxtLink
            :to="item.href"
            class="text-3xl font-bo"
            @click="handleExpandNavigation"
            >{{ item.title }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { pages } from "~/data";
const selectedImage = useState("selectedImage");
const navigationExpanded = useState("navigationExpanded");

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80;
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
const handleExpandNavigation = () => {
  navigationExpanded.value = !navigationExpanded.value;
};
</script>

<style scoped>
.scrolled {
  @apply bg-background dark:bg-backgroundAccent;
}

.navigationExpanded {
  @apply dark:bg-backgroundAccentDarkMode;
}

.v-enter-active,
.v-leave-active {
  transition: height 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
