<template>
  <div class="max-w-screen-2xl mx-auto">
    <div class="flex flex-col p-2 pt-12 md:grid grid-cols-5 gap-12">
      <div
        :class="{
          'row-span-2 col-span-3': category.image.orientation === 'landscape',
          'row-span-3 col-span-2': category.image.orientation === 'portrait',
        }"
        v-for="(category, index) in projects"
        :key="index"
      >
        <LayoutCategoryPreview
          :backgroundColor="category.backgroundColor"
          :href="category.href"
          :title="category.title"
          :image="category.image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { projects } from "~/data";
</script>

<style scoped></style>
