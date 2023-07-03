<template>
  <v-container>
    <v-row>
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>

              <th class="text-left">
                Task type
              </th>

              <th class="text-left">
                  Is finished
              </th>

              <th class="text-left">
                Created at
              </th>

              <th class="text-left">
                Go to task
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(task, index) in tasksStore.allTasks"
              :key="task.name"
            >
              <td>{{ task.name }}</td>

              <td>{{ task.type }}</td>

              <td>{{ task.is_finished ? 'Yes' : 'No' }}</td>

              <td>{{ new Date(task.created_at).toLocaleString() }}</td>

              <td>
                <v-btn v-if="!task.is_finished" @click="navigateTo('/tasks/current-task/' + task.id)">Go to task</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks'
import { fetchAllTasks } from '~/services/tasks'
import { Database } from '~/types/supabase'

definePageMeta({
  middleware: 'auth'
})

const tasksStore = useTasksStore()
const user = useSupabaseUser()
const client = useSupabaseClient<Database>()

// @ts-ignore
onMounted(async () => {
  if (user.value && !tasksStore.allTasks.length) {
    const { tasks, error } = await fetchAllTasks(user.value.id, client)
    tasksStore.setTasks(tasks)
  }
})
</script>

<style scoped lang="scss"></style>
