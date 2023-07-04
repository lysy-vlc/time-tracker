import { Database } from '~/types/supabase'
import { Ref } from 'vue'
import { fetchAllIntervals, rateIntervalRequest } from '~/services/intervals'
import { SupabaseClient } from '@supabase/supabase-js'

export const useTasksStore = defineStore('tasks', () => {
  const allTasks: Ref<[] | Database['public']['Tables']['tasks']['Row'][]> =
    ref([])

  const currentTask: Ref<null | Database['public']['Tables']['tasks']['Row']> =
    ref(null)

  const currentTaskIntervals: Ref<
    [] | Database['public']['Tables']['intervals']['Row'][]
  > = ref([])

  const allIntervals: Ref<
    [] | Database['public']['Tables']['intervals']['Row'][]
  > = ref([])

  const setCurrentTask = (
    task: Database['public']['Tables']['tasks']['Row']
  ) => {
    currentTask.value = task
  }

  const setTasks = (tasks: Database['public']['Tables']['tasks']['Row'][]) => {
    allTasks.value = tasks
  }

  const getIntervals = async (client: SupabaseClient) => {
    const intervalsResponse = await fetchAllIntervals(client)

    if (intervalsResponse.intervals)
      allIntervals.value = intervalsResponse.intervals
  }

  const addCurrentTaskInterval = (
    interval: Database['public']['Tables']['intervals']['Row']
  ) => {
    currentTaskIntervals.value = [...currentTaskIntervals.value, interval]
  }

  const setCurrentTaskIntervals = (
    intervals: Database['public']['Tables']['intervals']['Row'][]
  ) => (currentTaskIntervals.value = intervals)

  const getIntervalsSummedUp = () => {
    return currentTaskIntervals.value.reduce(
      (
        summedUpIntervals: number,
        currentInterval: Database['public']['Tables']['intervals']['Row']
      ) => {
        if (currentInterval.finished_at && currentInterval.created_at) {
          return (
            summedUpIntervals +
            (new Date(currentInterval.finished_at).getTime() -
              new Date(currentInterval.created_at).getTime())
          )
        }

        return summedUpIntervals
      },
      0
    )
  }

  const updateLastInterval = (
    updatedInterval: Database['public']['Tables']['intervals']['Row']
  ) => {
    currentTaskIntervals.value.pop()
    currentTaskIntervals.value = [
      ...currentTaskIntervals.value,
      updatedInterval,
    ]
  }

  const rateInterval = async (
    intervalId: string,
    rating: number,
    client: SupabaseClient
  ) => {
    const rateIntervalResponse = await rateIntervalRequest(
      intervalId,
      rating,
      client
    )

    if (rateIntervalResponse.data && rateIntervalResponse.data[0]) {
      currentTaskIntervals.value = currentTaskIntervals.value.map(
        (interval) => {
          if (rateIntervalResponse.data && interval.id === intervalId)
            return rateIntervalResponse.data[0]

          return interval
        }
      )

      return true
    }

    return false
  }

  return {
    currentTask,
    setCurrentTask,
    currentTaskIntervals,
    addCurrentTaskInterval,
    setCurrentTaskIntervals,
    getIntervalsSummedUp,
    updateLastInterval,
    allTasks,
    setTasks,
    rateInterval,
    allIntervals,
    getIntervals,
  }
})
