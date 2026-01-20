<template>
  <section class="py-6 md:py-12">
    <div class="max-w-app mx-auto px-4">
      <Profile />
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  requiresAuth: true,
  name: 'profile',
  title: 'Profile',
});
import Profile from '@/components/profile/Profile.vue';
</script>

<style scoped></style>
