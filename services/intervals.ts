import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '~/types/supabase'

export const createInterval = async (
  taskId: string,
  userId: string,
  client: SupabaseClient
) => {
  const { data, error } = await client
    .from('intervals')
    .insert({
      created_at: new Date(),
      task_id: taskId,
      user_id: userId,
    })
    .select()

  return {
    data,
    error,
  }
}

export const fetchCurrentTaskIntervals = async (
  taskId: string,
  client: SupabaseClient
) => {
  const { data: intervals, error } = await client
    .from('intervals')
    .select('*')
    .eq('task_id', taskId)
    .order('created_at', { ascending: true })

  return {
    intervals,
    error,
  }
}

export const finishInterval = async (
  intervalId: string,
  client: SupabaseClient
) => {
  const { data, error } = await client
    .from('intervals')
    .update({ finished_at: new Date() })
    .eq('id', intervalId)
    .select()

  return {
    data,
    error,
  }
}
