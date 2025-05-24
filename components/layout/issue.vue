<template>
  <div class="border-b">
    <button
      @click="expanded = !expanded"
      class="flex gap-3 text-start items-center justify-between md:justify-start w-full"
    >
      <p class="text-xl md:text-3xl link my-3 uppercase font-bold">
        {{ issue.title || "Title Unavailable" }}
      </p>
      <p class="text-2xl transition" :class="expanded && 'rotate-90'">
        &RightArrow;
      </p>
    </button>
    <div v-if="expanded" class="mb-3 whitespace-pre-wrap">
      <p class="mb-3 ml-8">{{ issue.description }}</p>
      <div class="flex flex-col md:grid grid-cols-12 gap-12">
        <div class="fields col-span-6">
          <p>
            <span class="font-bold">Time for Action:</span>
            <span>{{ issue.timeForAction }}</span>
          </p>
          <p>
            <span class="font-bold">Impact:</span>
            <span>{{ issue.impact }}</span>
          </p>
          <div
            v-if="
              issue.recommendedAudience && issue.recommendedAudience.length > 0
            "
            class="flex gap-3 justify-between mt-3"
          >
            <p class="font-bold w-fit">Recommended Audience:</p>
            <div class="flex flex-col gap-1">
              <NuxtLink
                target="_blank"
                rel="noreferrer"
                class="link underline text-end"
                v-for="(externalLink, index) in issue.recommendedAudience"
                :key="index"
                :href="externalLink.href"
                >{{ externalLink.title }}</NuxtLink
              >
            </div>
          </div>
        </div>
        <div class="col-span-6 flex-col flex">
          <div
            v-if="issue.contributors && issue.contributors.length > 0"
            class="flex gap-3 justify-between"
          >
            <p class="font-bold w-fit">Contributors:</p>
            <div class="flex flex-col gap-1">
              <NuxtLink
                target="_blank"
                rel="noreferrer"
                class="link underline text-end"
                v-for="(externalLink, index) in issue.contributors"
                :key="index"
                :href="externalLink.href"
                >{{ externalLink.title }}</NuxtLink
              >
            </div>
          </div>
          <div
            v-if="issue.externalLinks && issue.externalLinks.length > 0"
            class="flex gap-3 justify-between"
          >
            <p class="font-bold w-fit">External Links:</p>
            <div class="flex flex-col gap-1">
              <NuxtLink
                target="_blank"
                rel="noreferrer"
                class="link underline text-end"
                v-for="(externalLink, index) in issue.externalLinks"
                :key="index"
                :href="externalLink.href"
                >{{ externalLink.title }}</NuxtLink
              >
            </div>
          </div>
          <div class="flex justify-end mt-3">
            <NuxtLink
              class="btn"
              :href="issue.googleDocLink"
              target="_blank"
              rel="noreferrer"
            >
              View Letter Template
            </NuxtLink>
          </div>
        </div>
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
