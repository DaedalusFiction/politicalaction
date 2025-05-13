<template>
  <div>
    <LayoutPageHeader header="Get in Touch" />
    <div
      class="flex flex-col md:grid grid-cols-12 px-3 gap-6 mx-auto max-w-screen-2xl"
    >
      <div class="col-span-6">
        <div class="flex flex-col md:grid grid-cols-12 gap-6">
          <div class="col-span-6">
            <h6 class="text-darkMuted dark:text-lightMuted">Call me</h6>
            <a :href="`tel:` + telephone">{{
              useFormatTelephone(telephone)
            }}</a>
          </div>
          <div class="col-span-6">
            <h6 class="text-darkMuted dark:text-lightMuted">Email me</h6>
            <a href="mailto:hello@fictionalweb.com">hello@fictionalweb.com</a>
          </div>
          <div class="col-span-6">
            <h6 class="text-darkMuted dark:text-lightMuted">Follow me</h6>
            <div>
              <a href="https://instagram.com">instagram</a>
            </div>
          </div>
          <div class="col-span-6">
            <h6 class="text-darkMuted dark:text-lightMuted">Fax me</h6>
            <a href="/">please don't</a>
          </div>
        </div>
      </div>
      <div class="col-span-6">
        <h3>Contact Form</h3>
        <div v-if="!isContactFormSubmitted" class="flex flex-col gap-2">
          <label class="hidden" for="name">Name</label>
          <input
            v-model="name"
            placeholder="Name"
            id="name"
            required
            type="text"
            class="placeholder-dark dark:placeholder-light bg-inherit"
          />
          <label class="hidden" for="email">Email</label>
          <input
            v-model="email"
            type="text"
            placeholder="Email"
            id="email"
            required
            class="placeholder-dark dark:placeholder-light bg-inherit"
          />
          <label class="hidden" for="email">Email</label>
          <textarea
            placeholder="What's on your mind?"
            v-model="comment"
            class="placeholder-dark border px-3 my-3"
            id="comment"
          />
          <button
            @click="handleSubmitContactForm"
            :disabled="isButtonDisabled"
            class="btn"
          >
            Submit
          </button>
        </div>
        <p v-else>Thank you! We'll be in touch soon</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const isContactFormSubmitted = ref(false);
const isButtonDisabled = ref(false);
const name = ref("");
const email = ref("");
const comment = ref("");
import emailjs from "@emailjs/browser";
import useFormatTelephone from "~/composables/formatting/formatTelephone";
import { siteName, telephone } from "~/data";

const handleSubmitContactForm = () => {
  isButtonDisabled.value = true;
  const templateParams = {
    website: siteName,
    name: name.value,
    email: email.value,
    comment: comment.value,
  };
  email.value = "";
  try {
    emailjs
      .send(
        "service_t1yo7dn",
        "template_pfang7n",
        templateParams,
        "aMDOy4kUud9rd0Yg9"
      )
      .then(function () {
        isContactFormSubmitted.value = true;
      });
  } catch (error) {
    console.log(error.message);
  }
};
</script>

<style scoped></style>
