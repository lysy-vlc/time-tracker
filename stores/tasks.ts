import { Database } from '~/types/supabase'
import { Ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const currentTask: Ref<null | Database['public']['Tables']['tasks']['Row']> =
    ref(null)

  const currentTaskIntervals: Ref<
    [] | Database['public']['Tables']['intervals']['Row'][]
  > = ref([])

  const setCurrentTask = (
    task: Database['public']['Tables']['tasks']['Row']
  ) => {
    currentTask.value = task
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
        if (currentInterval.finished_at) {
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

  return {
    currentTask,
    setCurrentTask,
    currentTaskIntervals,
    addCurrentTaskInterval,
    setCurrentTaskIntervals,
    getIntervalsSummedUp,
    updateLastInterval,
  }
})
