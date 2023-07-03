<template>
  <v-col cols="12" lg="6">
    <v-card>
      <v-card-title>Login</v-card-title>
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
        <v-btn rounded="xl" block @click="login">Login</v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
const client = useSupabaseAuthClient()

const email = ref('')
const password = ref('')

const errorMessage = ref('')

const login = async () => {
  errorMessage.value = ''

  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    console.log('logowanie udane', data, error)

    if (data.user) {
      console.log('logowanie udane')
      email.value = ''
      password.value = ''

      return await navigateTo('/account')
    }

    errorMessage.value = 'Wrong credentials. Try again'

    console.error(error)
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped lang="scss"></style>
