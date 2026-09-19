'use client'

import { useState } from 'react'
import { searchArticles } from '@/lib/articles'
import Link from 'next/link'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)
    
    try {
      const articles = await searchArticles(query)
      setResults(articles)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">記事検索</h1>
          <Link href="/" className="text-purple-300 hover:text-purple-200">
            ← トップに戻る
          </Link>
        </header>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="キーワードを入力..."
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {loading ? '検索中...' : '検索'}
              </button>
            </div>
          </form>

          {searched && (
            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-purple-200">検索中...</div>
              ) : results.length === 0 ? (
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20 text-center">
                  <p className="text-purple-200">該当する記事が見つかりませんでした</p>
                </div>
              ) : (
                <>
                  <p className="text-purple-200">{results.length}件の結果</p>
                  {results.map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="block bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors"
                    >
                      <h2 className="text-xl font-semibold text-white mb-2">{article.title}</h2>
                      
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
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}