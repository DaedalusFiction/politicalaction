<template>
  <div>
    <LayoutPageHeader :header="route.params.topic" />
    <div class="max-w-screen-lg mx-auto px-3 flex flex-col">
      <div v-for="(issue, index) in issues" :key="index">
        <LayoutIssue :issue="issue" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const issues = [
  {
    title: "Pet neutering funds",
    time: "summer",
    contributors: ["VAOA", "Site Admin"],
    impact: "state",
    recommendedAudience: "city",
    documentLink: "/",
    externalLinks: [],
    description:
      "Ranked choice voting allows voters to get out of the lesser-of-two-evils mindset. In this system, voters may vote for multiple candidates at a time, assigning each candidate a ranked number. As a result, voters may feel more autonomy in their selections and may be more incentivized to vote. The Virginia General Assembly has already enabled voters to use ranked choice voting for city councils and board of supervisors elections, but not for mayoral elections.",
  },
  {
    title: "Digital Infrastructure for Localities",
    time: "summer",
    contributors: ["VAOA", "Site Admin"],
    impact: "state",
    recommendedAudience: "city",
    documentLink: "/",
    externalLinks: [{ title: "Related page two", href: "https://google.com" }],
    description:
      "Ranked choice voting allows voters to get out of the lesser-of-two-evils mindset. In this system, voters may vote for multiple candidates at a time, assigning each candidate a ranked number. As a result, voters may feel more autonomy in their selections and may be more incentivized to vote. The Virginia General Assembly has already enabled voters to use ranked choice voting for city councils and board of supervisors elections, but not for mayoral elections.",
  },
  {
    title: "School Discipline Procedures",
    time: "summer",
    contributors: ["VAOA", "Site Admin"],
    impact: "state",
    recommendedAudience: "city",
    documentLink: "/",
    externalLinks: [
      { title: "Related page one", href: "https://google.com" },
      { title: "Related page two", href: "https://google.com" },
    ],
    description:
      "Ranked choice voting allows voters to get out of the lesser-of-two-evils mindset. In this system, voters may vote for multiple candidates at a time, assigning each candidate a ranked number. As a result, voters may feel more autonomy in their selections and may be more incentivized to vote. The Virginia General Assembly has already enabled voters to use ranked choice voting for city councils and board of supervisors elections, but not for mayoral elections.",
  },
];

const handleDownloadTemplate = () => {
  console.log("Downloading....");
};
</script>

<style scoped></style>
