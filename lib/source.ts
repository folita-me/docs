// コンテンツの読み込み口。content/docs/*.mdx を Fumadocs のページツリーにする
import { llms, loader } from 'fumadocs-core/source';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// docs.folita.me はドキュメント専用ホストなので、ページはルート（/）直下に置く
export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
});

// /llms.txt と /llms-full.txt（AI 向けのプレーンテキスト版）
export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (https://docs.folita.me${page.url})

${await page.data.getText('processed')}`,
});
