<template>
  <div class="max-w-screen-2xl mx-auto">
    <div class="py-12 md:mt-24 px-3 flex flex-col md:grid grid-cols-12 gap-3">
      <div class="col-span-6 flex flex-col gap-3 relative">
        <div class="sticky top-36">
          <p class="text-xl md:text-3xl mb-12 mt-24 md:mt-0">
            The
            <span class="font-extrabold font-header uppercase"
              >Virginia Association for Online Activism</span
            >
            is an online repository for letter templates and information on
            becoming politically active in Virginia
          </p>
          <p class="mb-24">
            Not sure where to start? Check out our
            <NuxtLink class="underline link" href="/opportunities"
              >opportunities</NuxtLink
            >
            page!
          </p>
        </div>
      </div>
      <div class="col-span-6 flex flex-col gap-3">
        <p class="text-xl">
          There is often low community involvement in and education on local and
          state advocacy due to the nationalization of politics, high political
          polarization, low morale and lack of sense of community, and community
          understandings of advocacy as being a major commitment. Moreover,
          there is a misconception that engaging in politics can only involve
          voting and protesting. Additionally, many local organizations face
          redundancy of efforts, either due to other local organizations
          attempting to address similar issues or because a local organization
          in another locality has already created messaging and undertaken
          research around an issue.
        </p>
        <p class="text-xl">
          The purpose of <span class="font-bold">VAOA</span> is to offer the
          public a way to direct the public to solutions of their choice.
          Solutions are community-focused and community-generated, either from
          local organizations or local individuals. Solutions could be letters
          to local officials, email templates to city managers, public safety
          announcements to be used included in neighborhood newsletters, or call
          scripts to local businesses. Not all changes necessarily need to be
          legislated or need to be legislated immediately. Displaying messaging
          behind these types of changes reduces the barriers for getting
          involved in politics and local advocacy, as local politicians and
          leaders deserve to hear from community members of many different
          perspectives and backgrounds. Additionally, the public may also view
          who generated solutions and become more familiar with local advocates
          or organizations. <span class="font-bold">VAOA</span> is currently
          focused on highlighting opportunities for local advocacy in
          Charlottesville, VA and Richmond, VA.
        </p>
        <p class="text-xl">
          Please let us know of any opportunities to further make this website
          more useful by reaching us at
          <NuxtLink class="underline link" :href="`mailto:${email}`">{{
            email
          }}</NuxtLink>
        </p>
        <p class="text-2xl font-bold mb-3 mt-12">HOW TO USE THIS WEBSITE:</p>
        <ol class="list-decimal ml-8 mb-8">
          <li>
            Navigate to
            <NuxtLink class="underline link" href="/issues"
              >vaoa.org/issues</NuxtLink
            >
          </li>
          <li>Filter by category. What’s most important to you?</li>
          <li>Find a specific issue that speaks to you.</li>
          <li>
            Edit the document, replace all highlighted text and maybe add why
            the issue matters most to you.
          </li>
          <li>Print it out and mail or send through other means.</li>
          <li>Come back and do the same thing again when you have time!</li>
        </ol>
        <p class="text-xl">
          Bonus:
          <NuxtLink
            class="underline link"
            href="https://whosmy.virginiageneralassembly.gov"
            >Look up your politicians</NuxtLink
          >. You can check out whether they’ve been taking money from
          <NuxtLink
            class="underline link"
            href="https://www.vpap.org/money/top-donors/"
            >monopolies</NuxtLink
          >
          by searching for their name in the “Search vpap.org” window on the
          upper left. Click on the “Donor” button that appears under their name.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { email } from "~/data";
</script>

<style scoped></style>
