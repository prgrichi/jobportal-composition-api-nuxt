<template>
  <BaseModal :isOpen="isOpen" size="3xl" @close="onClose">
    <template #title>
      {{ $t('jobs.application.general.title', { jobTitle: jobTitle }) }}
    </template>

    <template #description>
      <p> {{ $t('jobs.application.general.copy') }}</p>
    </template>

    <template #content>

      <Form novalidate :initial-values="initialValues" @submit="onSubmit" :validation-schema="schema"
        class="max-w-md mx-auto rounded-lg">

        <!-- first name field -->
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium text-muted-foreground mb-1">
            {{ $t('jobs.application.general.firstName') }}
            <span class="text-red-500" aria-hidden="true">* </span>
          </label>
          <Field as="input" required name="firstName" type="text" id="firstName" autocomplete="given-name"
            class="w-full border bg-background border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="$t('jobs.application.general.placeholder.firstName')" />
          <ErrorMessage name="firstName" v-slot="{ message }">
            <small class="text-red-500">{{ message }}</small>
          </ErrorMessage>
        </div>

        <!-- last name field -->
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium text-muted-foreground mb-1">
            {{ $t('jobs.application.general.lastName') }}
            <span class="text-red-500" aria-hidden="true">* </span>
          </label>
          <Field as="input" required name="lastName" type="text" id="lastName" autocomplete="family-name"
            class="w-full border bg-background border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="$t('jobs.application.general.placeholder.lastName')" />
          <ErrorMessage name="lastName" v-slot="{ message }">
            <small class="text-red-500">{{ message }}</small>
          </ErrorMessage>
        </div>

        <!-- E-Mail field -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-muted-foreground mb-1">
            {{ $t('jobs.application.general.email') }}
            <span class="text-red-500" aria-hidden="true">* </span>
          </label>
          <Field as="input" readonly required name="email" type="text" id="email" autocomplete="email"
            class="bg-muted cursor-not-allowed w-full border border-border rounded-md p-2 focus:outline-none focus:ring-0" />
          <p class="text-xs text-muted-foreground mt-1">
            {{ $t('jobs.application.general.emailFromAccount') }}
          </p>
          <ErrorMessage name="email" v-slot="{ message }">
            <small class="text-red-500">{{ message }}</small>
          </ErrorMessage>
        </div>

        <!-- salary Field -->
        <div class="mb-4">
          <label for="salary" class="block text-sm font-medium text-muted-foreground mb-1">
            {{ $t('jobs.application.general.salary') }}
          </label>
          <Field as="input" name="salary" type="text" id="salary" autocomplete="off"
            class="w-full border bg-background border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="$t('jobs.application.general.placeholder.salary')" />
          <ErrorMessage name="salary" v-slot="{ message }">
            <small class="text-red-500">{{ message }}</small>
          </ErrorMessage>
        </div>

        <!-- file upload Field -->
        <div class="mb-4">
          <label for="cv" class="block text-sm font-medium text-muted-foreground mb-1">
            {{ $t('jobs.application.general.fileUpload') }}
            <span class="text-red-500" aria-hidden="true">* </span>
          </label>
          <Field name="cv" v-slot="{ handleChange, handleBlur }">
            <input id="cv" required type="file" accept=".pdf" @change="handleChange" @blur="handleBlur"
              class="w-full border bg-background border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </Field>
          <ErrorMessage name="cv" v-slot="{ message }">
            <small class="text-red-500">{{ message }}</small>
          </ErrorMessage>
        </div>

        <!-- Submit Button -->
        <button type="submit" disabled class="btn btn-primary w-full">
          <span>Absenden</span>
        </button>

      </Form>

    </template>
    <template #footer>

    </template>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { createJobApplicationSchema } from '@/schemas';
import { useAuthStore } from '@/stores/auth/auth';

export default {
  name: 'JobApplicationModal',
  components: {
    BaseModal,
    Form,
    Field,
    ErrorMessage
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    jobTitle: {
      type: String,
      required: false
    }
  },

  emits: ['close'],

  computed: {
    schema() {
      return createJobApplicationSchema();
    },
    authStore() {
      return useAuthStore();
    },
    initialValues() {
      return {
        email: this.authStore.user?.email || '',
      };
    },
  },
  methods: {
    // Close modal
    onClose() {
      this.$emit('close');
    },
    onSubmit(values) {
      console.log('Form submitted with values:', values);
    },
  }
};
</script>