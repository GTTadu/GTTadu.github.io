import { supabase } from './supabase'
import { Article, ArticleWithRelations, Category, Tag } from '@/types'

// すべての記事取得（下書き含む）
export async function getAllArticles(): Promise<ArticleWithRelations[]> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      tags:tags(*)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// 記事作成
export async function createArticle(article: {
  title: string
  slug: string
  content: string
  summary: string | null
  category_id: string | null
  status: 'draft' | 'published'
  is_featured: boolean
}): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .insert({
      ...article,
      published_at: article.status === 'published' ? new Date().toISOString() : null,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// 記事更新
export async function updateArticle(
  id: string,
  article: {
    title?: string
    slug?: string
    content?: string
    summary?: string | null
    category_id?: string | null
    status?: 'draft' | 'published'
    is_featured?: boolean
    published_at?: string | null
  }
): Promise<Article> {
  const updateData: any = { ...article }
  
  if (article.status === 'published' && !article.published_at) {
    updateData.published_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('articles')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// 記事削除
export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// タグを記事に紐付け
export async function addTagToArticle(articleId: string, tagId: string): Promise<void> {
  const { error } = await supabase
    .from('article_tags')
    .insert({ article_id: articleId, tag_id: tagId })

  if (error) throw error
}

// タグを記事から削除
export async function removeTagFromArticle(articleId: string, tagId: string): Promise<void> {
  const { error } = await supabase
    .from('article_tags')
    .delete()
    .eq('article_id', articleId)
    .eq('tag_id', tagId)

  if (error) throw error
}