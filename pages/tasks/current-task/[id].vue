<template>
  <Timer
    v-if="tasksStore.currentTask"
    :animate="isCounterOn"
    :time="displayTime"
    :title="tasksStore.currentTask?.name"
    :isCounterOn="isCounterOn"
    @on-start="startCounter"
    @on-pause="pauseCounter"
    @on-stop="finishCounter"
  />

  <IntervalsTable/>
</template>

<script setup lang="ts">
import Timer from '~/components/organisms/Timer.vue'

import { useTasksStore } from '~/stores/tasks'
import { finishTask, getCurrentTask } from '~/services/tasks'
import { createInterval, fetchCurrentTaskIntervals, finishInterval } from '~/services/intervals'
import { useUIStore } from '~/stores/ui'
import IntervalsTable from '~/components/molecules/IntervalsTable.vue'
import { Database } from '~/types/supabase'
import { getCurrentTimeHoursMinutesSecondsFormat } from '~/helpers/time'

definePageMeta({
  middleware: 'auth'
})

const tasksStore = useTasksStore()
const route = useRoute()
const client = useSupabaseClient<Database>()
const user = useSupabaseUser()
const uiStore = useUIStore()

const displayTime = ref('')
const isCounterOn = ref(false)
let counter: undefined | number = undefined

const fetchCurrentTask = async () => {
  const { tasks, error } = await getCurrentTask(route.params.id, client)

  if (tasks) {
    tasksStore.setCurrentTask(tasks[0])

    return
  }

  uiStore.showSnackbar('Couldn\'t fetch current task. Please, reload this page!', 'error')
  return
}

const getCurrentIntervals = async () => {
  const { intervals, error } = await fetchCurrentTaskIntervals(route.params.id as string, client)

  if (intervals) {
    tasksStore.setCurrentTaskIntervals(intervals)

    return
  }

  uiStore.showSnackbar('Couldn\'t fetch current intervals. Please, reload this page!', 'error')
  return
}

const count = () => {
  counter = setInterval(() => {
    if (tasksStore.currentTaskIntervals) {
      const intervalsSummedUp = tasksStore.getIntervalsSummedUp()
      const nowMilliseconds = new Date().getTime()

      const lastInterval = tasksStore.currentTaskIntervals[tasksStore.currentTaskIntervals.length - 1]
      const startTimeMilliseconds = new Date(lastInterval.created_at || '').getTime()

      displayTime.value = getCurrentTimeHoursMinutesSecondsFormat(nowMilliseconds - startTimeMilliseconds + intervalsSummedUp)
    }
  }, 1000)
}

const finishCounter = async () => {
  if (tasksStore.currentTask && !tasksStore.currentTask) {
    const lastInterval = [ ...tasksStore.currentTaskIntervals ].pop()
    const finishedInterval = await finishInterval(lastInterval?.id as string, client)
    const { data, error } = await finishTask(tasksStore.currentTask.id, client)

    if (data) {
      tasksStore.updateLastInterval(data[0])
      isCounterOn.value = false
      clearInterval(counter)
    }

    return
  }

  uiStore.showSnackbar('Task has been finished', 'success')
  return navigateTo('/tasks/create-task')
}

const startCounter = async () => {
  if (tasksStore.currentTask && user.value) {
    const { data, error } = await createInterval(tasksStore.currentTask.id, user.value.id, client)

    if (data && data[0]) {
      tasksStore.addCurrentTaskInterval(data[0])
      isCounterOn.value = true
      count()
    }
  }
}

const pauseCounter = async () => {
  const lastInterval = [ ...tasksStore.currentTaskIntervals ].pop()

  if (lastInterval) {
    const currentFinishedInterval = await finishInterval(lastInterval.id, client)

    if (currentFinishedInterval.data) {
      tasksStore.updateLastInterval(currentFinishedInterval.data[0])

      isCounterOn.value = false
      clearInterval(counter)
    }
  }
}

const showCurrentTimeSpent = () => {
  const intervalsSummedUp = tasksStore.getIntervalsSummedUp()

  displayTime.value = getCurrentTimeHoursMinutesSecondsFormat(intervalsSummedUp)
}

// @ts-ignore
onMounted(async () => {
  if (!tasksStore.currentTask) {
    await Promise.all([fetchCurrentTask(), getCurrentIntervals()])
  }

  const lastInterval = [ ...tasksStore.currentTaskIntervals ].pop()

  if (!lastInterval?.finished_at) {
    count()
    isCounterOn.value = true

    return
  }

  showCurrentTimeSpent()
})
</script>

<style scoped lang="scss"></style>
