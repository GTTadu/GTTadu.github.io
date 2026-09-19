/**
 * Supabase接続テスト
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('API Key:', supabaseKey ? '設定済み' : '未設定')

if (!supabaseUrl || !supabaseKey) {
  console.error('エラー: 環境変数が設定されていません')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('\n接続テスト中...')
    
    // シンプルなクエリでテスト
    const { data, error } = await supabase
      .from('categories')
      .select('count')
      .single()

    if (error) {
      console.error('接続エラー:', error)
      console.error('エラーメッセージ:', error.message)
      console.error('エラーヒント:', error.hint)
    } else {
      console.log('✓ 接続成功！')
      console.log('カテゴリ数:', data)
    }
  } catch (error) {
    console.error('予期しないエラー:', error)
  }
}

testConnection()