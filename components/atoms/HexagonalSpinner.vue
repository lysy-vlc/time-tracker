<template>
  <div
    class="spinner-container"
    :style="{ 'max-width': smAndDown ? '150px' : width, 'max-height': smAndDown ? '150px' : height }"
  >
    <img src="/images/hexagonal-spinner.svg" alt="" class="spinner" :class="{ 'animate': animate }">
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()

const props = defineProps({
  width: {
    type: String,
    default: '100px'
  },

  height: {
    type: String,
    default: '100px'
  },

  animate: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped lang="scss">
@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}

.spinner-container {
  min-width: 100px;
  min-height: 100px;

  .spinner {
    width: 100%;
    height: 100%;

    &.animate {
      animation-name: spin;
      animation-duration: 12000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
}
</style>
