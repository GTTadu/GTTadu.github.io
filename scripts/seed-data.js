/**
 * サンプルデータ作成スクリプト
 * 
 * 使用方法:
 * 1. .env.local にSupabaseの情報を設定
 * 2. node scripts/seed-data.js を実行
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('エラー: .env.local にSupabaseの情報が設定されていません')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedData() {
  console.log('サンプルデータの作成を開始します...')

  try {
    // サンプルカテゴリ
    const categories = [
      { name: 'キャラクター', slug: 'characters', description: '作品に登場するキャラクター' },
      { name: '世界設定', slug: 'world-setting', description: '世界の地理、歴史、文化など' },
      { name: 'ストーリー', slug: 'story', description: '物語の展開や重要な出来事' },
      { name: '用語集', slug: 'glossary', description: '作品固有の用語や概念' }
    ]

    for (const category of categories) {
      const { error } = await supabase
        .from('categories')
        .upsert(category, { onConflict: 'slug' })
      
      if (error) {
        console.error(`カテゴリ "${category.name}" の作成に失敗:`, error)
      } else {
        console.log(`✓ カテゴリ "${category.name}" を作成`)
      }
    }

    // サンプルタグ
    const tags = [
      { name: '主人公', slug: 'protagonist' },
      { name: '敵役', slug: 'antagonist' },
      { name: '魔法', slug: 'magic' },
      { name: '歴史', slug: 'history' },
      { name: '重要', slug: 'important' }
    ]

    for (const tag of tags) {
      const { error } = await supabase
        .from('tags')
        .upsert(tag, { onConflict: 'slug' })
      
      if (error) {
        console.error(`タグ "${tag.name}" の作成に失敗:`, error)
      } else {
        console.log(`✓ タグ "${tag.name}" を作成`)
      }
    }

    // カテゴリIDを取得
    const { data: categoryData } = await supabase
      .from('categories')
      .select('*')

    const categoryMap = {}
    categoryData?.forEach(cat => {
      categoryMap[cat.slug] = cat.id
    })

    // タグIDを取得
    const { data: tagData } = await supabase
      .from('tags')
      .select('*')

    const tagMap = {}
    tagData?.forEach(tag => {
      categoryMap[tag.slug] = tag.id
    })

    // サンプル記事
    const articles = [
      {
        title: 'エルフ王国の歴史',
        slug: 'elf-kingdom-history',
        content: `エルフ王国は千年以上前に建国されました。初代国王は光のエルフとして知られるアリアンです。

## 建国の経緯
エルフ王国は暗黒の戦争後に建国されました。多くの種族が戦争で滅びましたが、エルフたちは魔法の森に隠れ、生き残ることができました。

## 文化と伝統
エルフ王国は自然との調和を重視する文化を持っています。魔法の森の木々はエルフたちと精神的に繋がっており、森林の破壊は重大な犯罪と見なされます。

## 現在の状況
現在、エルフ王国は平和を享受していますが、外部からの脅威に備えて魔法による防衛システムを維持しています。`,
        summary: 'エルフ王国の建国から現在に至るまでの歴史と文化について',
        category_id: categoryMap['world-setting'],
        status: 'published',
        is_featured: true,
        published_at: new Date().toISOString()
      },
      {
        title: '炎の魔法',
        slug: 'fire-magic',
        content: `炎の魔法は四大元素魔法の一つで、最も攻撃的な魔法として知られています。

## 基本的な性質
炎の魔法は高温の炎を操り、敵を攻撃したり物体を燃やしたりすることができます。習得は難しく、制御には高度な集中力が必要です。

## 使用条件
炎の魔法を使用するには以下の条件が必要です:
- 魔力の素質
- 炎の属性との親和性
- 基本的な魔法制御能力

## 有名な使い手
歴史上、多くの炎の魔法使いが存在しましたが、特に有名なのは「炎の賢者」と呼ばれるマーリンです。`,
        summary: '炎の魔法の基本的な性質と使用条件について',
        category_id: categoryMap['glossary'],
        status: 'published',
        is_featured: false,
        published_at: new Date().toISOString()
      },
      {
        title: '主人公アレックス',
        slug: 'protagonist-alex',
        content: `アレックスはこの物語の主人公です。小さな村で育ち、運命的な出来事によって冒険の旅に出ることになります。

## 性格
アレックスは好奇心旺盛で、正義感が強い性格です。困っている人を見過ごせないタイプで、時には自分を危険に晒すこともあります。

## 能力
- 剣術: 基本的な剣術を習得
- 魔法: 潜在的な魔法の素質を持つ
- 人間関係: 誰とでも仲良くなれる

## 成長の物語
物語を通じて、アレックスは多くの試練を乗り越え、立派な英雄へと成長していきます。`,
        summary: '物語の主人公アレックスの性格と能力について',
        category_id: categoryMap['characters'],
        status: 'published',
        is_featured: true,
        published_at: new Date().toISOString()
      }
    ]

    for (const article of articles) {
      const { data: articleData, error: articleError } = await supabase
        .from('articles')
        .upsert(article, { onConflict: 'slug' })
        .select()
        .single()

      if (articleError) {
        console.error(`記事 "${article.title}" の作成に失敗:`, articleError)
      } else {
        console.log(`✓ 記事 "${article.title}" を作成`)
        
        // タグを関連付け（ランダムに選択）
        const randomTags = tagData?.sort(() => 0.5 - Math.random()).slice(0, 2) || []
        
        for (const tag of randomTags) {
          await supabase
            .from('article_tags')
            .upsert({
              article_id: articleData.id,
              tag_id: tag.id
            }, { onConflict: 'article_id,tag_id' })
        }
      }
    }

    console.log('\nサンプルデータの作成が完了しました！')
    console.log('http://localhost:3000 で確認できます。')

  } catch (error) {
    console.error('エラーが発生しました:', error)
    process.exit(1)
  }
}

seedData()