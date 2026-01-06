<template>
  <div class="">

    <!-- Auth Form (Login/Register) -->
    <Form @submit="onSubmit" novalidate :validation-schema="schema" class="max-w-md mx-auto rounded-lg">

      <!-- Email Field -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-muted-foreground mb-1">
          {{ $t('auth.general.email') }}
        </label>
        <Field as="input" name="email" type="email" id="email" autocomplete="email"
          class="w-full border bg-background border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :placeholder="$t('auth.general.placeholder.email')" />
        <ErrorMessage name="email" v-slot="{ message }">
          <small class="text-red-500">{{ message }}</small>
        </ErrorMessage>
      </div>

      <!-- Password Field -->
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-muted-foreground mb-1">
          {{ $t('auth.general.password') }}
        </label>
        <div class="relative">
          <Field as="input" :type="toggleInputType" name="password" id="password" :autocomplete="passwordAutocomplete"
            class="w-full border bg-background border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="$t('auth.general.placeholder.password')" />
          <button type="button" @click="togglePassword" class="h-full cursor-pointer absolute p-2 right-1 top-0"
            :aria-label="$t('auth.general.showPassword')">
            <Icon :name="showPassword ? 'EyeSlash' : 'Eye'" icon-class="h-5 w-5" />
          </button>
        </div>
        <ErrorMessage name="password" v-slot="{ message }">
          <small class="text-red-500">{{ message }}</small>
        </ErrorMessage>
      </div>

      <!-- Confirm Password Field (nur bei Register) -->
      <div v-if="mode === 'register'" class="mb-6">
        <label for="confirmPassword" class="block text-sm font-medium text-muted-foreground mb-1">
          {{ $t('auth.general.confirmPassword') }}
        </label>
        <div class="relative">
          <Field as="input" name="confirmPassword" :type="toggleConfirmInputType" id="confirmPassword"
            autocomplete="new-password"
            class="w-full border bg-background border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="$t('auth.general.placeholder.confirmPassword')" />
          <button type="button" @click="toggleConfirmPassword" class="h-full cursor-pointer absolute p-2 right-1 top-0"
            :aria-label="$t('auth.general.showPassword')">
            <Icon :name="showConfirmPassword ? 'EyeSlash' : 'Eye'" icon-class="h-5 w-5" />
          </button>
        </div>
        <ErrorMessage name="confirmPassword" v-slot="{ message }">
          <small class="text-red-500">{{ message }}</small>
        </ErrorMessage>
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="isLoading" class="btn btn-primary w-full">
        <!-- Loading Spinner -->
        <span v-if="isLoading"
          class="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
        <span>{{ submitLabel }}</span>
      </button>

    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useToastStore } from '@/stores/toast/toast';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuthStore } from '@/stores/auth/auth';
import { useI18n } from 'vue-i18n';
import { createLoginSchema, createRegisterSchema } from '@/schemas';

export default {
  name: 'AuthForm',

  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },

  components: {
    Form,
    Field,
    ErrorMessage
  },

  props: {
    mode: {
      type: String,
      required: true,
      validator: (value) => ['login', 'register'].includes(value)
    }
  },

  data() {
    return {
      isLoading: false,
      showPassword: false,
      showConfirmPassword: false
    };
  },

  computed: {
    authStore() {
      return useAuthStore();
    },
    toast() {
      return useToastStore();
    },
    passwordAutocomplete() {
      return this.mode === 'register' ? 'new-password' : 'current-password';
    },
    schema() {
      return this.mode === 'login' ? createLoginSchema() : createRegisterSchema();
    },
    toggleInputType() {
      return this.showPassword ? 'text' : 'password';
    },
    toggleConfirmInputType() {
      return this.showConfirmPassword ? 'text' : 'password';
    },
    // Dynamic Submit Button Label
    submitLabel() {
      if (this.mode === 'register') {
        return this.isLoading
          ? this.t('general.btn.ui.creatingAccount')
          : this.t('general.btn.ui.createAccount');
      }
      return this.isLoading
        ? this.t('general.btn.ui.signingIn')
        : this.t('general.btn.ui.signIn');
    },
  },

  methods: {
    async onSubmit(values) {
      try {
        this.isLoading = true;

        // Register Mode
        if (this.mode === 'register') {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          await this.authStore.createUserDocument(userCredential.user);
          this.toast.success(this.t('toast.registerSuccess'));
          this.$router.push({ name: 'home' });
        }
        // Login Mode
        else {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          await this.authStore.createUserDocument(userCredential.user);
          this.toast.success(this.t('toast.loginSuccess'));

          // Redirect to previous page or home
          const redirectPath = this.$route.query.redirect || '/';
          this.$router.push(redirectPath);
        }

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        // Handle Firebase Auth Errors
        if (error.code === 'auth/invalid-credential') {
          this.toast.error(this.t('errors. invalidCredentials'));
        }
        else if (error.code === 'auth/email-already-in-use') {
          this.toast.error(this.t('errors.emailAlreadyInUse'));
        }
        else {
          this.toast.error(error.message);
        }
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  },
}
</script>