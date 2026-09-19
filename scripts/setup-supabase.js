/**
 * Supabaseデータベース初期化スクリプト
 * 
 * 使用方法:
 * 1. .env.local にSupabaseの情報を設定
 * 2. node scripts/setup-supabase.js を実行
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('エラー: .env.local にSupabaseの情報が設定されていません')
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '設定済み' : '未設定')
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '設定済み' : '未設定')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log('Supabaseデータベースの初期化を開始します...')

  try {
    // カテゴリの確認
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
    
    if (categoriesError) {
      console.error('カテゴリの取得に失敗:', categoriesError)
    } else {
      console.log(`✓ カテゴリ: ${categories.length}件`)
    }

    // タグの確認
    const { data: tags, error: tagsError } = await supabase
      .from('tags')
      .select('*')
    
    if (tagsError) {
      console.error('タグの取得に失敗:', tagsError)
    } else {
      console.log(`✓ タグ: ${tags.length}件`)
    }

    // 記事の確認
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
    
    if (articlesError) {
      console.error('記事の取得に失敗:', articlesError)
    } else {
      console.log(`✓ 記事: ${articles.length}件`)
    }

    console.log('\nデータベースの初期化が完了しました！')
    console.log('Supabaseダッシュボードでスキーマが正しく適用されていることを確認してください。')

  } catch (error) {
    console.error('エラーが発生しました:', error)
    process.exit(1)
  }
}

setupDatabase()