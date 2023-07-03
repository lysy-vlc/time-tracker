import { createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = serverSupabaseClient<Database>(event)

  if (!user) throw createError({ statusMessage: 'user not found' })

  const { data, error } = await client
    .from('tasks')
    .select('id, title, completed')
    .eq('user', user.id)
    .order('created_at')
  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
