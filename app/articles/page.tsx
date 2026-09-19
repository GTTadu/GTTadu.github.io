import { getPublishedArticles, getCategories } from '@/lib/articles'
import Link from 'next/link'

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([
    getPublishedArticles(),
    getCategories()
  ])

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">記事一覧</h1>
          <Link href="/" className="text-purple-300 hover:text-purple-200">
            ← トップに戻る
          </Link>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* サイドバー: カテゴリ */}
            <aside className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20 sticky top-4">
                <h2 className="text-lg font-semibold text-white mb-4">カテゴリ</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/articles" className="text-purple-200 hover:text-white block py-1">
                      すべて
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link 
                        href={`/articles/category/${category.slug}`}
                        className="text-purple-200 hover:text-white block py-1"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* 記事リスト */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {articles.length === 0 ? (
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20 text-center">
                    <p className="text-purple-200">まだ記事がありません</p>
                  </div>
                ) : (
                  articles.map((article) => (
                    <Link 
                      key={article.id} 
                      href={`/articles/${article.slug}`}
                      className="block bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h2 className="text-xl font-semibold text-white">{article.title}</h2>
                        {article.is_featured && (
                          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">注目</span>
                        )}
                      </div>
                      
                      {article.summary && (
                        <p className="text-purple-200 mb-3 line-clamp-2">{article.summary}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-purple-300">
                        {article.category && (
                          <span className="bg-purple-600/30 px-2 py-1 rounded">
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
                              className="bg-blue-600/30 text-blue-200 text-xs px-2 py-1 rounded"
                            >
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}