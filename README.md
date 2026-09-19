# Kazakiri

世界観管理システム - 小説や物語の世界観を管理するためのWikiシステム

## 技術スタック

- **フロントエンド**: Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **バックエンド**: Supabase (データベース、認証、ストレージ)
- **ホスティング**: GitHub Pages
- **CDN**: Cloudflare

## 機能

- 📚 記事の閲覧（一般ユーザー）
- 🔍 記事検索
- 🗂️ カテゴリ別整理
- 🏷️ タグ付け
- 👤 管理者による記事作成・編集
- 📊 閲覧数カウント

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <your-repo-url>
cd world-wiki
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. Supabaseの設定

1. [Supabase](https://supabase.com) でアカウントを作成し、プロジェクトを作成
2. `supabase/schema.sql` の内容を Supabase SQL Editor で実行
3. SupabaseダッシュボードからAPI URLとanon keyを取得:
   - Settings → API → Project URL
   - Settings → API → anon public key
4. `.env.local` ファイルを作成:

```bash
cp .env.example .env.local
```

5. `.env.local` にSupabaseの情報を設定:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

6. データベースの初期化:

```bash
npm run setup:supabase
```

7. サンプルデータの作成:

```bash
npm run seed:data
```

詳細な設定手順は `supabase/setup-guide.md` を参照してください。

### 4. ローカル開発

```bash
npm run dev
```

http://localhost:3000 でアクセスできます。

### 5. ビルド

```bash
npm run build
```

### 6. GitHub Pagesへのデプロイ

1. GitHubリポジトリを作成
2. GitHubのSettings > Secrets and variables > Actions で以下のシークレットを設定:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Settings > Pages でGitHub Pagesを有効化
4. mainブランチにプッシュすると自動デプロイされます

## プロジェクト構成

```
world-wiki/
├── app/              # Next.js App Router
│   ├── articles/     # 記事関連ページ
│   ├── search/       # 検索ページ
│   └── layout.tsx    # レイアウト
├── components/       # Reactコンポーネント
├── lib/             # ユーティリティ関数
├── supabase/        # Supabase設定
├── types/           # TypeScript型定義
└── public/          # 静的ファイル
```

## 管理者設定

管理者権限を持つユーザーを作成するには:

1. Supabaseダッシュボードでユーザーを作成
2. ユーザーのメタデータに `{"role": "admin"}` を追加

詳細は `supabase/setup-guide.md` を参照してください。

## ライセンス

ISC