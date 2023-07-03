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
                  Is finished
              </th>

              <th class="text-left">
                Created at
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(task, index) in tasksStore.allTasks"
              :key="task.name"
            >
              <td>{{ task.name }}</td>
              <td>{{ task.is_finished }}</td>
              <td>{{ task.created_at }}</td>
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

definePageMeta({
  middleware: 'auth'
})

const tasksStore = useTasksStore()
const user = useSupabaseUser()
const client = useSupabaseClient()

// @ts-ignore
onMounted(async () => {
  if (user.value && !tasksStore.allTasks.length) {
    const { tasks, error } = await fetchAllTasks(user.value.id, client)
    tasksStore.setTasks(tasks)
  }
})
</script>

<style scoped lang="scss"></style>
