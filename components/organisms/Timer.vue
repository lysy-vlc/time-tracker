<template>
  <v-row align="center">
    <v-col cols="12" md="6" class="pa-9 d-flex justify-center">
      <HexagonalSpinner width="400px" height="400px" :animate="props.animate"/>
    </v-col>

    <v-col cols="12" md="6">
      <Counter :time="time" :title="title"/>

      <v-col cols="12" v-if="!tasksStore?.currentTask?.is_finished">
        <TransitionGroup name="fade">
          <v-btn
            v-if="isCounterOn"
            :loading="isLoading"
            :disabled="isLoading"
            key="pause"
            rounded="xl"
            block
            @click="emit('on-pause')"
          >Pause</v-btn>
          <v-btn
            v-else
            :loading="isLoading"
            :disabled="isLoading"
            rounded="xl"
            key="start"
            color="success"
            block
            @click="emit('on-start')"
          >Start</v-btn>
          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            rounded="xl"
            key="stop"
            color="error"
            block
            @click="emit('on-stop')"
            class="mt-5"
          >Finish task</v-btn>
        </TransitionGroup>
      </v-col>

      <v-col cols="12" v-else>
        <v-btn @click="navigateTo('/tasks')" block>Go to tasks</v-btn>
      </v-col>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import HexagonalSpinner from '~/components/atoms/HexagonalSpinner.vue'
import Counter from '~/components/molecules/Counter.vue'
import { useTasksStore } from '~/stores/tasks'

const tasksStore = useTasksStore()

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
  },

  isLoading: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['on-start', 'on-stop', 'on-pause'])
</script>

<style scoped lang="scss"></style>
