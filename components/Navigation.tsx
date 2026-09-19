import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-purple-900/50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white hover:text-purple-200">
            Kazakiri
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/articles" 
              className="text-purple-200 hover:text-white transition-colors"
            >
              記事一覧
            </Link>
            <Link 
              href="/search" 
              className="text-purple-200 hover:text-white transition-colors"
            >
              検索
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}