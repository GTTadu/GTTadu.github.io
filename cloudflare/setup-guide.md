# Cloudflare設定ガイド

## 1. Cloudflareアカウントの作成

1. [Cloudflare](https://www.cloudflare.com) にアクセスしてアカウントを作成
2. ドメインを所有している場合は追加、所有していない場合はCloudflareの無料ドメインを使用可能

## 2. ドメインの設定

### 独自ドメインを使用する場合

1. Cloudflareダッシュボードで「Add a Site」をクリック
2. ドメイン名を入力
3. プランを選択（Freeプランで十分）
4. DNSレコードを設定:
   - Type: CNAME
   - Name: www (またはサブドメイン)
   - Target: `<your-username>.github.io`
   - Proxy status: Proxied (オレンジ色の雲アイコン)

### Cloudflare Pagesを使用する場合

1. Cloudflareダッシュボードで「Pages」をクリック
2. 「Create a project」をクリック
3. 「Connect to Git」を選択
4. GitHubリポジトリを選択
5. ビルド設定:
   - Build command: `npm run build`
   - Build output directory: `out`
   - 環境変数:
     - `NEXT_PUBLIC_SUPABASE_URL`: Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key

## 3. CDN設定

### キャッシュ設定

1. 「Caching」→「Configuration」でキャッシュレベルを設定
2 - Standard: 一般的なコンテンツ
   - No Query String: クエリ文字列を無視
   - Ignore Query String: クエリ文字列をキャッシュキーに含めない

### ページルール

1. 「Rules」→「Page Rules」でキャッシュルールを設定
2. 静的アセットの長期キャッシュ:
   - URL: `*world-wiki.yourdomain.com/*`
   - Setting: Cache Level
   - Value: Cache Everything

## 4. セキュリティ設定

### WAF (Web Application Firewall)

1. 「Security」→「WAF」でWAFルールを設定
2. 一般的な攻撃パターンをブロックするルールを有効化

### Rate Limiting

1. 「Security」→「Rate Limiting」でレート制限を設定
2 - APIエンドポイントへの過剰なアクセスを制限

### Bot Fight Mode

1. 「Security」→「Bot Fight Mode」を有効化
2. 悪意のあるボットを自動的にブロック

## 5. SSL/TLS設定

1. 「SSL/TLS」→「Overview」でSSLモードを設定
   - Full: Cloudflareとオリジンサーバー間も暗号化
   - Full (strict): オリジンサーバーの証明書を検証

## 6. パフォーマンス最適化

### Auto Minify

1. 「Speed」→「Optimization」で「Auto Minify」を有効化
2. CSS、JavaScript、HTMLを自動的に圧縮

### Brotli圧縮

1. 「Network」→「Compression」でBrotliを有効化
2. より効率的な圧縮で転送量を削減

### HTTP/3

1. 「Network」→「HTTP/3」を有効化
2. より高速なプロトコルを使用

## 7. Edge Functions (オプション)

高度な機能が必要な場合はEdge Functionsを使用:

```javascript
// 例: APIリクエストのレート制限
export default {
  async fetch(request) {
    const url = new URL(request.url)
    
    // APIエンドポイントへのアクセス制限
    if (url.pathname.startsWith('/api/')) {
      // レート制限ロジック
      const clientIP = request.headers.get('CF-Connecting-IP')
      // ...レート制限チェック
    }
    
    return fetch(request)
  }
}
```

## 8. 分析とモニタリング

1. 「Analytics」→「Traffic」でトラフィックを分析
2. 「Security」→「Events」でセキュリティイベントを確認
3. 「Speed」→「Performance」でパフォーマンスを監視

## 9. GitHub PagesとCloudflareの連携

### 方法1: CNAME経由

1. GitHubリポジトリのSettings > Pages でカスタムドメインを設定
2. CloudflareでCNAMEレコードを設定
3. GitHub PagesでSSLを有効化

### 方法2: Cloudflare Pages経由

1. Cloudflare PagesでGitHubリポジトリと連携
2. 自動デプロイを設定
3. カスタムドメインを設定

## トラブルシューティング

### SSL証明書エラー

- CloudflareのSSLモードを「Flexible」に変更してテスト
- オリジンサーバーの証明書を確認

### キャッシュの問題

- Cloudflareダッシュボードでキャッシュをパージ
- 開発中は「Development Mode」を有効化

### DNS伝播

- DNS変更が反映されるまで最大48時間かかる場合があります
- `dig`や`nslookup`でDNS確認

## 設定チェックリスト

- [ ] ドメインがCloudflareに追加されている
- [ ] DNSレコードが正しく設定されている
- [ ] SSL/TLSが有効化されている
- [ ] キャッシュ設定が最適化されている
- [ ] セキュリティルールが設定されている
- [ ] パフォーマンス最適化が有効化されている
- [ ] 分析が有効化されている