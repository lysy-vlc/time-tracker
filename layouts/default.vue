<template>
  <v-layout>
    <v-app-bar :elevation="2" prominent>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>TimeTracker</v-toolbar-title>

      <v-spacer/>

      <v-btn rounded="xl" v-if="user" variant="text" icon="mdi-logout" @click="logout"></v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
    ></v-navigation-drawer>

    <v-main>
      <v-container class="fill-height main-container">
        <v-row justify="center">
          <slot/>
        </v-row>
      </v-container>
      <v-snackbar
        v-model="uiStore.snackbar"
        class="mb-10"
        :color="uiStore.snackbarColor"
        :timeout="uiStore.snackbarTime"
      >
        {{ uiStore.snackbarText }}
      </v-snackbar>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { useUIStore } from '~/stores/ui'

const uiStore = useUIStore()

const drawer = ref(false)

const user = useSupabaseUser()

const logout = async () => {
  const client = useSupabaseAuthClient()

  await client.auth.signOut()

  navigateTo('/auth')
}
</script>

<style scoped lang="scss">
.main-container {
  min-height: 100vh;
}
</style>
