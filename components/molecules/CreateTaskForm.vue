<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="Type focus task" v-model="task.name"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-select
          v-model="task.duration"
          label="Task duration (minutes)"
          :items="durationOptions"
          item-value="duration_sec"
          item-title="duration_sec"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-select
          v-model="task.brake_interval"
          label="Brake interval"
          :items="intervalOptions"
          item-value="duration"
          item-title="duration"
        ></v-select>
      </v-col>

      <v-col cols="6">
        <v-select
          v-model="task.type"
          label="Task type"
          :items="typeOptions"
          item-value="name"
          item-title="name"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn block color="success" @click="createTask">Start</v-btn>
        <v-btn block class="mt-4" color="grey">Pause</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Database } from '~/types/supabase'

const client = useSupabaseClient<Database>()

const emit = defineEmits(['on-create-task'])

const task = reactive({
  name: '',
  duration: 0,
  brake_interval: 0,
  type: ''
})

const durationOptions = ref([])

const intervalOptions = ref([])

const typeOptions = ref([])

const createTask = () => {
  emit('on-create-task', task)
}

const getDurationOptions = async () => {

  const { data: duration_options, error } = await client
    .from('duration_options')
    .select('*')

  if (duration_options) {
    durationOptions.value = duration_options.map(option => ({ ...option, duration_sec: option.duration_sec / 60 }))

    return duration_options
  }

  console.error(error)
  return
}

const getIntervalOptions = async () => {

  const { data: interval_options, error } = await client
    .from('interval_options')
    .select('*')


  if (interval_options) {
    intervalOptions.value = interval_options.map(option => ({ ...option, duration: option.duration / 60 }))

    return interval_options
  }

  console.error(error)
  return
}

const getTypeOptions = async () => {

  const { data: task_types, error } = await client
    .from('task_types')
    .select('*')



  if (task_types) {
    typeOptions.value = task_types

    return task_types
  }

  console.error(error)
  return
}



onMounted(async () => {
  await getDurationOptions()
  await getIntervalOptions()
  await getTypeOptions()
})
</script>

<style scoped lang="scss"></style>
