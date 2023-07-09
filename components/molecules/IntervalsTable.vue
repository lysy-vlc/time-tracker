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
      <v-col cols="12">
        <div class="table-container">
          <v-data-table
            :headers="headers"
            :items="tasksStore.currentTaskIntervals"
            :loading="loading"
            class="elevation-1"
          >
            <template v-slot:item.created_at="{ item }">
              {{ new Date(item.raw.created_at).toLocaleString() }}
            </template>

            <template v-slot:item.finished_at="{ item }">
              {{ item.raw.finished_at ? new Date(item.raw.finished_at).toLocaleString() : '' }}
            </template>

            <template v-slot:item.duration="{ item }">
              {{ getDuration(item.raw) }}
            </template>

            <template v-slot:item.rating="{ item }">
              <v-rating :model-value="item.raw.rating" @update:model-value="rateInterval($event, item.raw.id)"></v-rating>
            </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useTasksStore } from '~/stores/tasks'
import { useUIStore } from '~/stores/ui'
import { Database } from '~/types/supabase'
import { getCurrentTimeHoursMinutesSecondsFormat } from '~/helpers/time'
import { useDisplay } from 'vuetify'

const uiStore = useUIStore()

const client = useSupabaseClient<Database>()
const tasksStore = useTasksStore()

const { mobile } = useDisplay()

const headers = computed(() => {
  return mobile ?
    [
      { title: 'Duration', key: 'duration' },
      { title: 'Rate interval', key: 'rating' },
    ]
    : [
      { title: 'Started at', key: 'created_at' },
      { title: 'Paused/finished at', key: 'finished_at' },
      { title: 'Duration', key: 'duration' },
      { title: 'Rate interval', key: 'rating' },
    ]
})

const loading = ref(false)

const rateInterval = async (rating: number, intervalId: string, index: number) => {
  loading.value = true

  const response = await tasksStore.rateInterval(intervalId, rating, client)

  loading.value = false

  if (response) return uiStore.showSnackbar('Interval has been rated', 'success')

  return uiStore.showSnackbar('Couldn\'t rate interval. Please, reload this page!', 'error')
}

const getDuration = (interval: Database['public']['Tables']['intervals']['Row']): string => {
  if (interval.created_at && interval.finished_at) {
    const differenceInMiliseconds = new Date(interval.finished_at).getTime() - new Date(interval.created_at).getTime()
    return getCurrentTimeHoursMinutesSecondsFormat(differenceInMiliseconds)
  }

  return ''
}
</script>

<style scoped lang="scss">
.table-container {
  max-width: 374px;
}
.table {
  max-width: 100%;

  tr {
    max-width: 100%
  }
}
</style>
