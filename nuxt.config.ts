// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify', 'ts-invariant/process'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  modules: ['@pinia/nuxt', '@nuxtjs/supabase'],

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
})
