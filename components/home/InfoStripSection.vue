<template>
  <!-- Info/Disclaimer Strip -->
  <section class="bg-primary-50 border-y border-neutral-200 mb-10 lg:mb-16 py-10 px-4">
    <div class="max-w-app mx-auto text-center">
      <!-- Disclaimer Text -->
      <div class="mx-auto max-w-3xl">
        <div class="text-balance info-strip-balance" v-html="safeTextArea"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import DOMPurify from 'dompurify';

defineOptions({
  name: 'InfoStripSection',
});
const props = defineProps({
  textarea: {
    type: Object,
    default: () => ({ text: '' }),
  },
});

const safeTextArea = computed(() => {
  if (import.meta.server) return props.textarea?.html || '';
  return DOMPurify.sanitize(props.textarea?.html || '');
});
</script>

<style scoped>
.info-strip-balance > p {
  text-wrap: balance;
}
</style>
