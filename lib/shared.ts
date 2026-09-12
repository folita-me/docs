// ページごとの Markdown 版の URL（/llms.mdx/<slug>/content.md。静的書き出しで実ファイルになる）
import { createGetUrl } from 'fumadocs-core/source';

export const docsContentRoute = '/llms.mdx';

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}
