<template>
  <v-container>
    <v-row class="justify-center text-center">
      <v-col cols="8">
        Hi, {{ user.email }}
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col cols="8">
        <v-btn block @click="navigateTo('tasks/create-task')">Start a new task</v-btn>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
</script>

<style scoped lang="scss"></style>
