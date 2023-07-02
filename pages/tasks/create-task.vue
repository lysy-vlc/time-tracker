<template>
  <v-row>
    <v-col cols="6">
      <HexagonalSpinner width="100%" height="100%" :animate="false"/>
    </v-col>

    <v-col cols="6">
      <CreateTaskForm @on-create-task="createTask"/>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import HexagonalSpinner from '~/components/atoms/HexagonalSpinner.vue'
import CreateTaskForm from '~/components/molecules/CreateTaskForm.vue'
import { useTasksStore } from '~/stores/tasks'
import { createInterval } from '~/services/intervals'

const client = useSupabaseClient()

const user = useSupabaseUser()

const tasksStore = useTasksStore()

const createTask = async (task) => {

  task = {
    ...task,
    user_id: user.value.id
  }

  const { data, error } = await client
    .from('tasks')
    .insert(task)
    .select()

  if (data[0]) {
    tasksStore.setCurrentTask(data[0])

    const createIntervalResponse = await createInterval(data[0].id, user.value.id, client)

    if (createIntervalResponse.data[0]) {

      tasksStore.addCurrentTaskInterval(createIntervalResponse.data[0])
      return await navigateTo(`/tasks/current-task/${data[0].id}`)
    }

    showSnackbar('Something went wrong with task start. Try again!', 'error')
    console.error(createIntervalResponse.error)

    return
  }

  showSnackbar('Something went wrong with task creation. Try again!', 'error')
  console.error(error)

  return
}

</script>

<style scoped lang="scss"></style>
