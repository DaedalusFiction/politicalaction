<template>
  <div class="mb-12">
    <div class="mb-3 whitespace-pre-wrap">
      <p class="text-2xl my-3 font-extrabold">
        {{ issue.title || "Title Unavailable" }}
      </p>
      <p class="mb-3 ml-8">{{ issue.description }}</p>
      <div class="flex flex-col grid-cols-12 gap-3">
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
              >
                {{ externalLink.title }}</NuxtLink
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
            class=""
          >
            <p class="font-bold w-fit">Additional Information:</p>
            <ol class="list-decimal ml-8">
              <li v-for="(externalLink, index) in issue.externalLinks">
                <NuxtLink
                  target="_blank"
                  rel="noreferrer"
                  class="link underline"
                  :key="index"
                  :href="externalLink.href"
                  >{{ externalLink.title }}</NuxtLink
                >
              </li>
            </ol>
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
</script>

<style scoped>
.fields > p {
  @apply flex gap-3 justify-between border-b;
}
</style>
