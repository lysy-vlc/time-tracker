import { Database } from '~/types/supabase'

export const sumUpIntervalsDuration = (
  intervals: Database['public']['Tables']['intervals']['Row'][]
) => {
  return intervals.reduce(
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
