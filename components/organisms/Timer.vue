<template>
  <v-row align="center">
    <v-col cols="12" md="6" class="pa-9">
      <HexagonalSpinner width="100%" height="100%" :animate="props.animate"/>
    </v-col>

    <v-col cols="12" md="6">
      <Counter :time="time" :title="title"/>

      <v-col cols="12">
        <TransitionGroup name="fade">
          <v-btn v-if="isCounterOn" key="pause" rounded="xl" block @click="emit('on-pause')">Pause</v-btn>
          <v-btn v-else rounded="xl" key="start" color="success" block @click="emit('on-start')">Start</v-btn>
          <v-btn rounded="xl" key="stop" color="error" block @click="emit('on-stop')" class="mt-5">Finish task</v-btn>
        </TransitionGroup>
      </v-col>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import HexagonalSpinner from '~/components/atoms/HexagonalSpinner.vue'
import Counter from '~/components/molecules/Counter.vue'

const props = defineProps({
  animate: {
    type: Boolean,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  isCounterOn: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['on-start', 'on-stop', 'on-pause'])
</script>

<style scoped lang="scss"></style>
