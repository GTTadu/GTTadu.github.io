-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Published articles are viewable by everyone" ON articles;
DROP POLICY IF EXISTS "Draft articles are viewable for testing" ON articles;
DROP POLICY IF EXISTS "Anyone can create articles for testing" ON articles;
DROP POLICY IF EXISTS "Anyone can update articles for testing" ON articles;
DROP POLICY IF EXISTS "Anyone can delete articles for testing" ON articles;
DROP POLICY IF EXISTS "Anyone can manage categories for testing" ON categories;
DROP POLICY IF EXISTS "Anyone can manage tags for testing" ON tags;
DROP POLICY IF EXISTS "Anyone can manage article tags for testing" ON article_tags;

-- 既存のテーブルを削除（再作成用）
DROP TABLE IF EXISTS article_tags CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- カテゴリテーブル
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- タグテーブル
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 記事テーブル
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  summary TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- 記事-タグ紐付けテーブル
CREATE TABLE article_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- インデックス
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published ON articles(published_at DESC);
CREATE INDEX idx_article_tags_tag ON article_tags(tag_id);

-- RLS (Row Level Security) ポリシー
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;

-- 公開記事は誰でも閲覧可能
CREATE POLICY "Published articles are viewable by everyone"
  ON articles FOR SELECT
  USING (status = 'published');

-- 下書き記事も一時的に閲覧可能（テスト用）
CREATE POLICY "Draft articles are viewable for testing"
  ON articles FOR SELECT
  USING (status = 'draft');

-- 誰でも記事を作成可能（テスト用）
CREATE POLICY "Anyone can create articles for testing"
  ON articles FOR INSERT
  WITH CHECK (true);

-- 誰でも記事を更新可能（テスト用）
CREATE POLICY "Anyone can update articles for testing"
  ON articles FOR UPDATE
  USING (true);

-- 誰でも記事を削除可能（テスト用）
CREATE POLICY "Anyone can delete articles for testing"
  ON articles FOR DELETE
  USING (true);

-- カテゴリとタグは誰でも閲覧・編集可能（テスト用）
CREATE POLICY "Anyone can manage categories for testing"
  ON categories FOR ALL
  USING (true);

CREATE POLICY "Anyone can manage tags for testing"
  ON tags FOR ALL
  USING (true);

-- article_tagsのポリシー（テスト用）
CREATE POLICY "Anyone can manage article tags for testing"
  ON article_tags FOR ALL
  USING (true);

-- サンプルデータ
INSERT INTO categories (name, slug, description) VALUES
  ('キャラクター', 'characters', '作品に登場するキャラクター'),
  ('世界設定', 'world-setting', '世界の地理、歴史、文化など'),
  ('ストーリー', 'story', '物語の展開や重要な出来事'),
  ('用語集', 'glossary', '作品固有の用語や概念');

INSERT INTO tags (name, slug) VALUES
  ('主人公', 'protagonist'),
  ('敵役', 'antagonist'),
  ('魔法', 'magic'),
  ('歴史', 'history'),
  ('重要', 'important');