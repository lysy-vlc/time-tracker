<template>
  <v-col cols="12" lg="6">
    <v-card>
      <v-card-title>Create account</v-card-title>
      <v-card-text>
        <v-alert
          v-if="errorMessage"
          class="mb-4"
          color="error"
          icon="$success"
          title="Login error"
          :text="errorMessage"
        ></v-alert>
        <v-text-field label="Email" v-model="email" type="email"></v-text-field>
        <v-text-field label="Password" v-model="password" type="password"></v-text-field>
        <v-btn rounded="xl" block @click="signup">Sing up</v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import { useUIStore } from '~/stores/ui'

const client = useSupabaseAuthClient()

const email = ref('');
const password = ref('')

const errorMessage = ref('')

const { showSnackbar } = useUIStore()

const signup = async () => {
  errorMessage.value = ''

  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (data.user) {
    email.value = ''
    password.value = ''

    showSnackbar('Account already exists. Please, login.', 'warning')

    return await navigateTo('/auth/login')
  }

  if (error) errorMessage.value = 'Something went wrong. Please, try again'
}
</script>

<style scoped lang="scss"></style>
