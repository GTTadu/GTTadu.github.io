import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Kazakiri</h1>
          <p className="text-xl text-purple-200">世界観管理システム</p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">ようこそ</h2>
            <p className="text-purple-100 mb-6">
              これは小説や物語の世界観を管理するためのWikiシステムです。
              管理者のみが編集でき、一般ユーザーは閲覧のみ可能です。
            </p>
            
            <div className="mb-6">
              <Link 
                href="/articles"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                記事一覧を見る →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-medium text-white mb-2">📚 記事閲覧</h3>
                <p className="text-purple-200 text-sm">世界観に関する記事を閲覧できます</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-medium text-white mb-2">🔍 検索機能</h3>
                <p className="text-purple-200 text-sm">キーワードで記事を検索できます</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-medium text-white mb-2">📝 管理者編集</h3>
                <p className="text-purple-200 text-sm">管理者は記事の作成・編集が可能です</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-medium text-white mb-2">🗂️ カテゴリ</h3>
                <p className="text-purple-200 text-sm">カテゴリ別に記事を整理できます</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}