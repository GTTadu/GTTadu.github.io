# Supabase設定ガイド

## 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com) にアクセスしてアカウントを作成
2. 「New Project」をクリック
3. プロジェクト情報を入力:
   - Name: `kazakiri`
   - Database Password: (安全なパスワードを設定)
   - Region: 東京 (Asia Northeast) または近いリージョンを選択

## 2. 環境変数の設定

1. プロジェクトダッシュボードから「Settings」→「API」に移動
2. 以下の情報をコピーして `.env.local` に設定:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## 3. データベーススキーマの適用

1. Supabaseダッシュボードで「SQL Editor」を開く
2. `supabase/schema.sql` の内容をコピーして実行

## 4. 認証設定

1. 「Authentication」→「Providers」で「Email」を有効化
2. 必要に応じて「GitHub」や「Google」なども有効化

## 5. 管理者ユーザーの作成

管理者権限を持つユーザーを作成するには:

1. Supabaseダッシュボードで「Authentication」→「Users」を開く
2. ユーザーを手動で作成
3. 「Authentication」→「Users」→ユーザーを選択→「Metadata」を編集
4. 以下のJSONを追加:
   ```json
   {
     "role": "admin"
   }
   ```

## 6. ストレージ設定 (画像用)

1. 「Storage」→「New bucket」で「images」バケットを作成
2. バケットの設定:
   - Public: チェック (公開アクセスを許可)
   - File size limit: 適切なサイズを設定 (例: 5MB)

## 7. APIポリシーの確認

「Authentication」→「Policies」で各テーブルのRLSポリシーが正しく設定されていることを確認