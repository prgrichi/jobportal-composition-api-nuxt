<template>
  <div class="bg-background rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-6">
      {{ title }}
    </h2>

    <div class="space-y-4">

      <!-- Vorname -->
      <ProfileFormField id="firstName" v-model="localData.firstName" label="Vorname" placeholder="Max" />

      <!-- Nachname -->
      <ProfileFormField id="lastName" v-model="localData.lastName" label="Nachname" placeholder="Mustermann" />

      <!-- Job-Titel -->
      <ProfileFormField id="jobTitle" v-model="localData.jobTitle" label="Job-Titel"
        placeholder="z.B. Senior Developer" />

      <!-- Standort -->
      <ProfileFormField id="location" v-model="localData.location" label="Standort" placeholder="z.B. München" />

    </div>

    <!-- Actions -->
    <ProfileFormActions :is-saving="isSaving" :save-button-text="saveButtonText" :cancel-button-text="cancelButtonText"
      @save="handleSave" @cancel="$emit('cancel')" />

  </div>
</template>

<script>
import ProfileFormField from './form/ProfileFormField.vue';
import ProfileFormActions from './form/ProfileFormActions.vue';

export default {
  name: 'ProfileEdit',

  components: {
    ProfileFormField,
    ProfileFormActions
  },

  props: {
    profile: {
      type: Object,
      required: true
    },
    isSaving: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Profil bearbeiten'
    },
    saveButtonText: {
      type: String,
      default: 'Speichern'
    },
    cancelButtonText: {
      type: String,
      default: 'Abbrechen'
    }
  },

  emits: ['save', 'cancel'],

  data() {
    return {
      localData: {
        firstName: '',
        lastName: '',
        jobTitle: '',
        location: ''
      }
    };
  },

  watch: {
    profile: {
      immediate: true,
      handler(newProfile) {
        if (newProfile) {
          this.localData = {
            firstName: newProfile.firstName || '',
            lastName: newProfile.lastName || '',
            jobTitle: newProfile.jobTitle || '',
            location: newProfile.location || ''
          };
        }
      }
    }
  },

  methods: {
    handleSave() {
      this.$emit('save', { ...this.localData });
    }
  }
}
</script>