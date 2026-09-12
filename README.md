# docs.folita.me — folita のドキュメント

[Fumadocs](https://fumadocs.dev)（Next.js + fumadocs-mdx）で作ったドキュメントサイト。
`next build` で `out/` に **静的書き出し** し、Apache の仮想ホスト `docs.folita.me` がそのまま配信する（Node のサーバーは動かさない）。

## 構成

```text
docs/
├── content/docs/            # 本文（MDX）。guide / integrations / reference の 3 フォルダ（meta.json の root: true）がサイドバー上部のタブになる
│                            # タブの中のフォルダ = サイドバーのグループ。並び順は各 meta.json。タブのアイコンは lib/layout.shared.tsx
├── app/
│   ├── (docs)/[[...slug]]/  # すべてのページ（ドキュメントはルート直下: docs.folita.me/editor/blocks/）
│   ├── api/search/          # 検索索引（ビルド時に out/api/search に JSON を書き出す）
│   ├── llms.txt/ llms-full.txt/   # AI 向けのプレーンテキスト版
│   ├── llms.mdx/[[...slug]]/      # ページごとの Markdown（/llms.mdx/<slug>/content.md。「Markdown をコピー」「開く ▾」ボタンが使う）
│   └── not-found.tsx        # 404（Apache の ErrorDocument が out/404.html を使う）
├── components/              # MDX で使うコンポーネント、検索ダイアログ、日本語の UI 文言（provider.tsx）
├── lib/source.ts            # content/docs の読み込み口
├── lib/layout.shared.tsx    # ヘッダー（ロゴ・右上のリンク）
└── out/                     # ビルド成果物（gitignore。サーバー上で作る）
```

## 書き方

- `content/docs/**.mdx`。frontmatter は `title` と `description`（`:` を含むときは引用符で囲む）
- 見出しは `##` から。`<Callout>` `<Steps>/<Step>` `<Tabs>/<Tab>` `<Cards>/<Card>` `<Accordions>/<Accordion>` が使える
- ページ間のリンクは `/editor/blocks/` のように末尾スラッシュ付きの絶対パスで書く（`trailingSlash: true`）
- サイドバーの並びとグループ名は各フォルダの `meta.json`（`"---見出し---"` は区切り）。タブを増やすには `content/docs/<name>/meta.json` に `"root": true` と `title` `description` を書き、`content/docs/meta.json` の `pages` と `lib/layout.shared.tsx` の `tabIcons` に足す
- ルート `/` は Apache が `/guide/` へ 302 する（ルートにページは無い）

## ビルドとデプロイ

```bash
cd /var/www/folita/docs
npm ci            # 初回だけ（esbuild の postinstall はポリシーでブロックされるが、バイナリは入るので問題ない）
npm run build     # → out/ が更新され、そのまま公開される
```

`npm run dev`（http://localhost:3070）で執筆中のプレビューができる。
Apache 側は `/etc/apache2/sites-available/folita.conf` の 2 つ目の `<VirtualHost>`（`ServerName docs.folita.me`、`DocumentRoot /var/www/folita/docs/out`）。
本体側の `.htaccess` は `folita.me/docs/...` を `docs.folita.me` へ 302 して、このディレクトリのソースや `node_modules` が folita.me から見えないようにしている。

## 確認

```bash
curl -s -o /dev/null -w "%{http_code}\n" -H 'Host: docs.folita.me' http://localhost:8070/
curl -s -H 'Host: docs.folita.me' http://localhost:8070/api/search | head -c 100
```
