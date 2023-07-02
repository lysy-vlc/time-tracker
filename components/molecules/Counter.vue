<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <span class="text-h6 ">{{ props.title }}</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center">
        <span class="text-h2">{{ props.time }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps({
  time: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss"></style>
