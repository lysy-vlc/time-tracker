<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h4">
          Task intervals
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Started at
              </th>

              <th class="text-left">
                Paused/finished at
              </th>

              <th class="text-left">
                Rate interval
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(interval, index) in tasksStore.currentTaskIntervals"
              :key="interval.id"
            >
              <td>{{ new Date(interval.created_at).toLocaleString() }}</td>

              <td>{{ new Date(interval.finished_at).toLocaleString() }}</td>

              <td class="py-2">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <template #title>
                      Rate interval quality
                    </template>
                    <v-expansion-panel-text @click="$emit('update:modelValue')">
                      <v-rating :model-value="interval.rating" @update:model-value="rateInterval($event, interval.id)"></v-rating>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
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
import { useUIStore } from '~/stores/ui'
import { Database } from '~/types/supabase'

const uiStore = useUIStore()

const client = useSupabaseClient<Database>()
const tasksStore = useTasksStore()

const rateInterval = async (rating: number, intervalId: string, index: number) => {
  const response = await tasksStore.rateInterval(intervalId, rating, client)

  if (response) return uiStore.showSnackbar('Interval has been rated', 'success')

  return uiStore.showSnackbar('Couldn\'t rate interval. Try again!', 'error')
}
</script>

<style scoped lang="scss"></style>
