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
    >
      <v-list nav>
        <template v-for="(navItem, index) in navItems">
          <v-list-item
            @click="navigateTo(navItem.path)"
            :title="navItem.name"
            :value="navItem.name"
          />
        </template>
      </v-list>
    </v-navigation-drawer>

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

    <v-dialog
      v-model="uiStore.overlay"
    >
      <component :is="dialogComponent"/>
    </v-dialog>
  </v-layout>
</template>

<script setup>
import { useUIStore } from '~/stores/ui'
import Login from '~/components/organisms/LoginForm.vue'

const uiStore = useUIStore()

const drawer = ref(false)

const user = useSupabaseUser()

const client = useSupabaseClient()

const route = useRoute()

client.auth.onAuthStateChange((event, session) => {
  if (session?.user?.aud !== 'authenticated' && route.name !== 'auth-create-account' && route.name !== 'auth-login') uiStore.showOverlay('login-form')
})

const dynamicComponents = {
  'login-form': Login
}

const dialogComponent =  computed(() => defineComponent(dynamicComponents[uiStore.overlayContent]))

const navItems = [
  {
    name: 'Tasks',
    path: '/tasks'
  },
  {
    name: 'Create task',
    path: '/tasks/create-task'
  },
  {
    name: 'Login',
    path: '/auth/login'
  },
  {
    name: 'Create account',
    path: '/auth/create-account'
  }
]

const logout = async () => {
  const client = useSupabaseAuthClient()

  navigateTo('/auth')

  await client.auth.signOut()
}
</script>

<style scoped lang="scss">
.main-container {
  min-height: 100vh;
}
</style>
