<template>
  <button
    @click="expanded = !expanded"
    class="flex gap-3 text-start items-center justify-between md:justify-start w-full"
  >
    <p class="text-2xl my-3 uppercase font-bold">{{ issue.title }}</p>
    <p class="text-2xl transition" :class="expanded && 'rotate-90'">
      &RightArrow;
    </p>
  </button>
  <div v-if="expanded" class="mb-6">
    <p class="mb-3">{{ issue.description }}</p>
    <div
      class="flex flex-col md:grid grid-cols-12 justify-between gap-3 md:items-end"
    >
      <div class="fields col-span-6">
        <p>
          <span class="font-bold">Time:</span> <span>{{ issue.time }}</span>
        </p>
        <p>
          <span class="font-bold">Impact:</span> <span>{{ issue.impact }}</span>
        </p>
        <p>
          <span class="font-bold">Recommended Audience:</span>
          <span>{{ issue.recommendedAudience }}</span>
        </p>
        <p>
          <span class="font-bold">Contributors:</span>
          <span>{{ issue.contributors.join(", ") }}</span>
        </p>
        <div
          v-if="issue.externalLinks.length > 0"
          class="flex gap-3 justify-between mt-3"
        >
          <p class="font-bold w-fit">External Links:</p>
          <div class="flex flex-col gap-1">
            <NuxtLink
              target="_blank"
              rel="noreferrer"
              class="link underline"
              v-for="(externalLink, index) in issue.externalLinks"
              :key="index"
              :href="externalLink.href"
              >{{ externalLink.title }}</NuxtLink
            >
          </div>
        </div>
      </div>
      <div class="col-span-6 flex justify-end items-end">
        <button class="btn" @click="handleDownloadTemplate">
          Download Letter Template
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { issue } = defineProps(["issue"]);
const expanded = ref(false);
</script>

<style scoped>
.fields > p {
  @apply flex gap-3 justify-between border-b;
}
</style>
