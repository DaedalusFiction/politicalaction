<template>
  <div>
    <LayoutPageHeader header="Projects" />
    <div class="flex flex-col md:grid grid-cols-12 gap-3 px-3 mx-auto">
      <div class="col-span-6">
        <div v-for="(project, index) in projects" :key="index" class="border-t">
          <NuxtLink
            @mouseenter="hoveredProject = project"
            class="transition-all duration-300"
            :href="`/portfolio/${project.title}`"
          >
            <div
              class="flex justify-between gap-2 px-2 py-1 transition-all duration-100 hover:px-5"
            >
              <span>{{ index }}</span>
              <span>{{ project.title }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div v-if="hoveredProject" class="col-span-6">
        <LayoutCategoryPreview
          :backgroundColor="hoveredProject.backgroundColor"
          :href="hoveredProject.href"
          :title="hoveredProject.title"
          :image="hoveredProject.image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { projects } from "~/data";
import { ref } from "vue";

// Your projects data

// For tracking the hovered project
const hoveredProject = ref(null);

// Methods as functions
</script>

<style scoped></style>
