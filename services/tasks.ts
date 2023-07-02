import { SupabaseClient } from '@supabase/supabase-js'

export const getCurrentTask = async (id: string, client: SupabaseClient) => {
  const { data: tasks, error } = await client
    .from('tasks')
    .select('*')
    .eq('id', id)

  return {
    tasks,
    error,
  }
}

export const finishTask = async (taskId: string, client: SupabaseClient) => {
  const { data, error } = await client
    .from('tasks')
    .update({ is_finished: true })
    .eq('id', taskId)
    .select()

  return {
    data,
    error,
  }
}
