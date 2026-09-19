import { supabase } from './supabase'
import { Article, ArticleWithRelations, Category, Tag } from '@/types'

// 公開記事の一覧取得
export async function getPublishedArticles(): Promise<ArticleWithRelations[]> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      tags:tags(*)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) throw error
  return data
}

// スラッグによる記事取得
export async function getArticleBySlug(slug: string): Promise<ArticleWithRelations | null> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      tags:tags(*)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // 記事が見つからない
    throw error
  }
  return data
}

// カテゴリ別記事取得
export async function getArticlesByCategory(categorySlug: string): Promise<ArticleWithRelations[]> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      tags:tags(*)
    `)
    .eq('status', 'published')
    .eq('category.slug', categorySlug)
    .order('published_at', { ascending: false })

  if (error) throw error
  return data
}

// カテゴリ一覧取得
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

// タグ一覧取得
export async function getTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

// 検索機能
export async function searchArticles(query: string): Promise<ArticleWithRelations[]> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      tags:tags(*)
    `)
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,summary.ilike.%${query}%`)
    .order('published_at', { ascending: false })

  if (error) throw error
  return data
}

// 閲覧数カウントアップ
export async function incrementViewCount(articleId: string): Promise<void> {
  // 現在の閲覧数を取得
  const { data: article } = await supabase
    .from('articles')
    .select('view_count')
    .eq('id', articleId)
    .single()

  if (article) {
    // 閲覧数をインクリメント
    await supabase
      .from('articles')
      .update({ view_count: (article.view_count || 0) + 1 })
      .eq('id', articleId)
  }
}