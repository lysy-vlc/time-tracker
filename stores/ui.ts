export const useUIStore = defineStore('ui', () => {
  const overlay = ref(false)

  const snackbar = ref(false)
  const snackbarText = ref('')
  const snackbarColor = ref('info')
  const snackbarTime = ref()

  const showOverlay = () => {
    overlay.value = true
  }

  const hideOverlay = () => {
    overlay.value = false
  }

  const showSnackbar = (text = '', color = 'info', time = 4000) => {
    snackbarText.value = text
    snackbar.value = true
    snackbarColor.value = color
    snackbarTime.value = time
  }

  return {
    overlay,
    showOverlay,
    hideOverlay,
    snackbar,
    snackbarText,
    showSnackbar,
    snackbarColor,
    snackbarTime,
  }
})
