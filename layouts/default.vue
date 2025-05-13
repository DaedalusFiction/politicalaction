<template>
  <div class="relative flex flex-col bg-background justify-between">
    <div @click="handleCloseMenus">
      <LayoutNavigation />
      <div class="max-w-screen-2xl mx-auto">
        <slot />
      </div>
    </div>
    <LayoutFooter />
    <FeedbackSnackBar />
  </div>
</template>

<script setup>
const navigationExpanded = useState("navigationExpanded");
const profileOptionsExpanded = useState("profileOptionsExpanded");
const searchExpanded = useState("searchExpanded");
const handleCloseMenus = (e) => {
  if (!e.target.classList.contains("profileOptions")) {
    profileOptionsExpanded.value = false;
  }
  if (!e.target.classList.contains("navigationOptions")) {
    navigationExpanded.value = false;
  }
  if (!e.target.classList.contains("searchBar")) {
    searchExpanded.value = false;
  }
};
</script>

<style scoped></style>
