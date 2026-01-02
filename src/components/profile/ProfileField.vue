<template>
  <div class="flex">
    <span class="w-32 text-muted-foreground">{{ label }}:</span>
    <span v-if="value">{{ value }}</span>
    <span v-else class="italic text-neutral-400">{{ $t('profile.emptyField') }}</span>
  </div>
</template>

<script>
export default {
  name: 'ProfileField',
  props: {
    label: {
      type: String,
      required: true
    },
    value: [String, Number]
  }
}
</script>