<template>
  <section>
    <div class="max-w-app mx-auto px-4">

      <div class="mb-8">
        <h1 class="text-2xl font-bold text-foreground mb-2">
          {{ $t('profile.title') }}
        </h1>
        <p>{{ $t('profile.subtitle') }}</p>
      </div>

      <div v-if="loading" class="text-center py-20">
        <p class="text-muted-foreground">{{ $t('general.loading') }}</p>
      </div>

      <div v-else class="bg-background rounded-lg shadow p-6">
        <div class="flex items-center gap-4 mb-6">
          <div>
            <h1 class="text-2xl font-bold">{{ displayName }}</h1>
            <p v-if="profile.jobTitle" class="text-muted-foreground">{{ profile.jobTitle }}</p>
          </div>
        </div>
        <div v-if="!isEditing">
          <div class="space-y-3">
            <ProfileField label="E-Mail" :value="profile.email" />
            <ProfileField label="Name" :value="displayName" />
            <ProfileField label="Job-Titel" :value="profile.jobTitle" />
            <ProfileField label="Standort" :value="profile.location" />
          </div>
          <div class="mt-6">
            <button class="btn btn-primary" @click="startEdit">{{ $t('general.btn.edit') }}</button>
          </div>
        </div>

        <div v-else class="bg-background rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-6">{{ $t('profile.editProfile') }}</h2>
          <div class="space-y-4">

            <!-- Vorname -->
            <div>
              <label for="firstName" class="block text-sm font-medium text-muted-foreground mb-1">
                Vorname
              </label>
              <input id="firstName" v-model="editData.firstName" type="text"
                class="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Max" />
            </div>

            <!-- Nachname -->
            <div>
              <label for="lastName" class="block text-sm font-medium text-muted-foreground mb-1">
                Nachname
              </label>
              <input id="lastName" v-model="editData.lastName" type="text"
                class="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mustermann" />
            </div>

            <!-- Job-Titel -->
            <div>
              <label for="jobTitle" class="block text-sm font-medium text-muted-foreground mb-1">
                Job-Titel
              </label>
              <input id="jobTitle" v-model="editData.jobTitle" type="text"
                class="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="z.B. Senior Developer" />
            </div>

            <!-- Standort -->
            <div>
              <label for="location" class="block text-sm font-medium text-muted-foreground mb-1">
                Standort
              </label>
              <input id="location" v-model="editData.location" type="text"
                class="w-full px-3 py-2 border border-border rounded-md focus: outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="z.B. München" />
            </div>

          </div>

          <div class="flex gap-3 mt-6">
            <button @click="save" :disabled="isSaving" class="btn btn-primary">
              <span v-if="isSaving"
                class="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
              <span>{{ isSavingLabel }}</span>
            </button>
            <button @click="cancel" class="btn btn-secondary">
              {{ $t('general.btn.cancel') }}
            </button>
          </div>

        </div>


      </div>

    </div>
  </section>
</template>

<script>
import { useProfileStore } from '@/stores/user/profile';
import { useAuthStore } from '@/stores/auth/auth';
import { useToastStore } from '@/stores/toast/toast';
import ProfileField from './ProfileField.vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'Profile',
  components: {
    ProfileField
  },
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },
  data() {
    return {
      isEditing: false,
      isSaving: false,
      editData: {}
    }
  },
  computed: {
    profileStore() {
      return useProfileStore();
    },
    authStore() {
      return useAuthStore();
    },
    toast() {
      return useToastStore();
    },
    loading() {
      return this.profileStore.loading;
    },
    profile() {
      return this.profileStore.profile || {};
    },
    isSavingLabel() {
      return this.isSaving ? this.$t('general.btn.ui.saving') : this.$t('general.btn.ui.save');
    },
    displayName() {
      const first = this.profile.firstName || '';
      const last = this.profile.lastName || '';
      const name = `${first} ${last}`.trim();
      return name || 'Unbekannt';
    },
  },
  methods: {
    startEdit() {
      this.editData = {
        firstName: this.profile.firstName || '',
        lastName: this.profile.lastName || '',
        jobTitle: this.profile.jobTitle || '',
        location: this.profile.location || ''
      };
      this.isEditing = true;
    },
    cancel() {
      this.isEditing = false;
      this.isSaving = false;
      this.editData = {};
    },
    async save() {
      this.isSaving = true;
      const result = await this.profileStore.updateProfile(
        this.authStore.user.uid,
        this.editData
      );

      this.isSaving = false;

      if (result.success) {
        this.isEditing = false;
        this.toast.success(this.t('toast.profileSuccess'));
        this.editData = {};
        console.log('Profil erfolgreich gespeichert!');
      } else {
        // Error handling
        this.toast.error(this.t('toast.profileError'));
        console.log('Fehler beim Speichern.  Bitte versuche es erneut.');
      }
    }
  },

  mounted() {
    if (this.authStore.user) {
      this.profileStore.loadProfile(this.authStore.user.uid);
    }
  }
};
</script>