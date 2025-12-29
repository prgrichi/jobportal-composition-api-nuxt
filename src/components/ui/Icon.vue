<template>
  <component :is="iconComponent" :class="iconClass" />
</template>

<script>
// Outline Icons
import {
  UserIcon,
  AdjustmentsVerticalIcon,
  StarIcon,
} from '@heroicons/vue/24/outline';

// Solid Icons
import {
  StarIcon as StarIconSolid,
} from '@heroicons/vue/24/solid';

const ICONS = {
  outline: {
    User: UserIcon,
    AdjustmentsVertical: AdjustmentsVerticalIcon,
    Star: StarIcon,
  },
  solid: {
    Star: StarIconSolid,
  }
}

export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'outline',
      validator: (value) => ['outline', 'solid'].includes(value)
    },
    iconClass: {
      type: String,
      default: 'h-6 w-6'
    }
  },
  computed: {
    iconComponent() {
      return ICONS[this.type]?.[this.name];
    }
  }
}
</script>