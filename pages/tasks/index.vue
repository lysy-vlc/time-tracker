<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="smAndDown ? mobileHeaders : desktopHeaders"
          :items="tasksStore.allTasks"
          class="elevation-1"
        >
          <template v-slot:item.is_finished="{ item }">
            <template v-if="item.raw.is_finished">Yes</template>
            <template v-else>
              <div class="py-2">
                <HexagonalSpinner :animate="true" height="50px" width="50px"/>
              </div>
            </template>
          </template>

          <template v-slot:item.created_at="{ item }">
            {{ new Date(item.raw.created_at).toLocaleString() }}
          </template>

          <template v-slot:item.duration="{ item }">
            {{ getTaskDurationInHoursMinutesSecondsFormat(item.raw.id) }}
          </template>

          <template v-slot:item.go_to_task="{ item }">
            <v-btn @click="navigateTo('/tasks/current-task/' + item.raw.id)">Go to task</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

import { useTasksStore } from '~/stores/tasks'
import { fetchAllTasks } from '~/services/tasks'
import { Database } from '~/types/supabase'
import { sumUpIntervalsDuration } from '~/helpers/intervals'
import { getCurrentTimeHoursMinutesSecondsFormat } from '~/helpers/time'
import { useDisplay } from 'vuetify'
import HexagonalSpinner from '~/components/atoms/HexagonalSpinner.vue'

definePageMeta({
  middleware: 'auth'
})

const tasksStore = useTasksStore()
const user = useSupabaseUser()
const client = useSupabaseClient<Database>()

const { smAndDown } = useDisplay()

const mobileHeaders = [
  { title: 'Name', key: 'name' },
  { title: 'Go to task', key: 'go_to_task' },
]

const desktopHeaders = [
  { title: 'Name', key: 'name' },
  { title: 'Task type', key: 'type' },
  { title: 'Is finished', key: 'is_finished' },
  { title: 'Created at', key: 'created_at' },
  { title: 'Duration', key: 'duration' },
  { title: 'Go to task', key: 'go_to_task' },
]

const getTaskDurationInHoursMinutesSecondsFormat = (taskId: string): string => {
  const intervals = tasksStore.allIntervals.filter(interval => interval.task_id === taskId)

  const summedUpIntervalsDurationInMilliseconds = sumUpIntervalsDuration(intervals)
  return getCurrentTimeHoursMinutesSecondsFormat(summedUpIntervalsDurationInMilliseconds)
}

// @ts-ignore
onMounted(async () => {
  if (user.value) {
    const { tasks, error } = await fetchAllTasks(user.value.id, client)
    tasksStore.setTasks(tasks)

    await tasksStore.getIntervals(client)
  }
})
</script>

<style scoped lang="scss"></style>
