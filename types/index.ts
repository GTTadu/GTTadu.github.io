export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  summary: string | null
  category_id: string | null
  author_id: string | null
  status: 'draft' | 'published'
  is_featured: boolean
  view_count: number
  created_at: string
  updated_at: string
  published_at: string | null
  category?: Category
  tags?: Tag[]
}

export interface ArticleWithRelations extends Article {
  category: Category | null
  tags: Tag[]
}