export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()

  if (!user.value) return navigateTo('/auth')

  if (to.name !== 'account') return navigateTo('/account')
})
