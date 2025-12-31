<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog @close="onClose">

      <!-- Backdrop -->
      <TransitionChild as="template" enter="ease-out duration-100" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-150" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/80 z-40"></div>
      </TransitionChild>

      <!-- Modal Container -->
      <div class="fixed inset-0 flex z-50 items-center justify-center p-4">

        <!-- Modal Panel -->
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95">

          <DialogPanel class="bg-white rounded-lg p-6 max-w-md w-full">

            <DialogTitle class="text-xl font-bold mb-4">
              Anmeldung erforderlich
            </DialogTitle>

            <DialogDescription class="text-gray-600 mb-6">
              Melde dich an, um alle Funktionen zu nutzen.
            </DialogDescription>

            <div class="flex gap-4">
              <button @click="goToLogin" class="btn btn-primary flex-1">
                Jetzt anmelden
              </button>

              <button @click="onClose" class="btn btn-secondary">
                Abbrechen
              </button>
            </div>

          </DialogPanel>
        </TransitionChild>
      </div>

    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription
} from '@headlessui/vue';

export default {
  name: 'AuthRequiredModal',
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription
  },

  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },

  emits: ['close'],

  methods: {
    onClose() {
      this.$emit('close');
    },

    goToLogin() {
      this.$emit('close');
      this.$router.push('/login');
    }
  }
};
</script>