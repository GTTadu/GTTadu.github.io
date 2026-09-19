import { getArticleBySlug, incrementViewCount, getPublishedArticles } from '@/lib/articles'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// 静的パラメータ生成
export async function generateStaticParams() {
  const articles = await getPublishedArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  // 静的エクスポートでは閲覧数カウントアップをスキップ
  // await incrementViewCount(article.id)

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link href="/articles" className="text-purple-300 hover:text-purple-200 mb-4 inline-block">
            ← 記事一覧に戻る
          </Link>
          <h1 className="text-4xl font-bold text-white mt-4">{article.title}</h1>
          
          <div className="flex items-center gap-4 mt-4 text-purple-300">
            {article.category && (
              <span className="bg-purple-600/30 px-3 py-1 rounded">
                {article.category.name}
              </span>
            )}
            <span>{new Date(article.published_at || article.created_at).toLocaleDateString('ja-JP')}</span>
            <span>{article.view_count} 回閲覧</span>
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex gap-2 mt-3">
              {article.tags.map((tag) => (
                <span 
                  key={tag.id} 
                  className="bg-blue-600/30 text-blue-200 px-3 py-1 rounded"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20">
            {article.summary && (
              <div className="mb-6 p-4 bg-purple-600/20 rounded-lg border border-purple-500/30">
                <h3 className="text-lg font-semibold text-purple-200 mb-2">概要</h3>
                <p className="text-purple-100">{article.summary}</p>
              </div>
            )}

            <div className="prose prose-invert max-w-none">
              <div className="text-purple-100 whitespace-pre-wrap">{article.content}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}