<template>
  <div class="md:grid grid-cols-12 gap-3 mb-8 pb-3 border-b">
    <div class="col-span-10">
      <div class="md:grid grid-cols-12 gap-3 h-full">
        <div class="col-span-9 flex flex-col gap-4 justify-between h-full">
          <div>
            <NuxtLink :to="`/issues/` + result.objectID">
              <h4 class="link">{{ result.title }}</h4>
            </NuxtLink>
            <p class="text-xs">
              {{ result._tags?.slice(0, 3).join(", ") }}
            </p>
          </div>
          <p class="text-sm line-clamp-3">
            {{ result.description || "No description available." }}
          </p>
        </div>
        <div class="col-span-3 flex justify-end">
          <NuxtLink
            class="link underline"
            :to="`/issues/${result.topic}/` + result.objectID"
            >Visit Page</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { result } = defineProps(["result"]);
</script>

<style scoped></style>
