export const getCurrentTimeHoursMinutesSecondsFormat = (
  milliseconds: number
) => {
  let seconds = Math.floor((milliseconds / 1000) % 60)
  let minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
  let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)

  const displayHours = hours < 10 ? '0' + hours : hours
  const displayMinutes = minutes < 10 ? '0' + minutes : minutes
  const displaySeconds = seconds < 10 ? '0' + seconds : seconds

  return displayHours + ':' + displayMinutes + ':' + displaySeconds
}
