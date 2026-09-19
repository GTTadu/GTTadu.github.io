import { supabase } from './supabase'

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false
  
  // ユーザーメタデータで管理者権限をチェック
  const { data: userData, error } = await supabase
    .from('auth.users')
    .select('raw_user_meta_data')
    .eq('id', user.id)
    .single()
  
  if (error || !userData) return false
  
  return userData.raw_user_meta_data?.role === 'admin'
}