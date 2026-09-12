'use client';
// Fumadocs の RootProvider（検索ダイアログ・テーマ・日本語の UI 文言）
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { type ReactNode } from 'react';

// 文言のキーは「英語の原文(用途)」。一覧は node_modules/fumadocs-ui/dist/.translations/keys.js
const translations = {
  'Search(search trigger)': '検索',
  'Open Search(search trigger)(aria-label)': '検索を開く',
  'Search(search dialog)': '検索',
  'Close Search(search dialog)(aria-label)': '検索を閉じる',
  'No results found(search dialog)': '見つかりませんでした',
  'On this page(table of contents)': 'このページの内容',
  'No Headings(table of contents)': '見出しはありません',
  'Table of Contents(inline table of contents)': '目次',
  'Next Page(pagination)': '次のページ',
  'Previous Page(pagination)': '前のページ',
  'Last updated on(page footer)': '最終更新',
  'Edit on GitHub(edit page)': 'GitHub で編集',
  'Toggle Theme(theme switcher)(aria-label)': 'テーマを切り替え',
  'Light(theme switcher)(aria-label)': 'ライト',
  'Dark(theme switcher)(aria-label)': 'ダーク',
  'System(theme switcher)(aria-label)': 'システム',
  'Toggle Menu(mobile menu)(aria-label)': 'メニュー',
  'Show Sidebar(sidebar)': 'サイドバーを表示',
  'Hide Sidebar(sidebar)': 'サイドバーを隠す',
  'Open Sidebar(sidebar)(aria-label)': 'サイドバーを開く',
  'Close Sidebar(sidebar)(aria-label)': 'サイドバーを閉じる',
  'Close Sidebar(aria-label)': 'サイドバーを閉じる',
  'Collapse Sidebar(sidebar)(aria-label)': 'サイドバーをたたむ',
  'Copy Text(code block)(aria-label)': 'コピー',
  'Copied Text(code block)(aria-label)': 'コピーしました',
  'Copy Anchor Link(heading anchor)(aria-label)': 'リンクをコピー',
  'Copy Link(accordion)(aria-label)': 'リンクをコピー',
  'Close Banner(banner)(aria-label)': '閉じる',
  'Choose a language(language switcher)': '言語を選択',
  'Choose a language(language switcher)(aria-label)': '言語を選択',
  'Page Not Found(404 page)': 'ページが見つかりません',
  'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)':
    'お探しのページは削除されたか、名前が変わったか、一時的に利用できません。',
  'Back to Home(404 page)': 'トップへ戻る',
  'Copy Markdown(page actions)': 'Markdown をコピー',
  'Open(page actions)': '開く',
  'View as Markdown(page actions)': 'Markdown で表示',
  'Open in GitHub(page actions)': 'GitHub で開く',
  'Open in ChatGPT(page actions)': 'ChatGPT で開く',
  'Open in Claude(page actions)': 'Claude で開く',
  'Open in Cursor(page actions)': 'Cursor で開く',
  'Open in Scira AI(page actions)': 'Scira AI で開く',
  'Read {url}, I want to ask questions about it.(page actions)': '{url} を読んでください。この内容について質問したいです。',
};

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider search={{ SearchDialog }} i18n={{ locale: 'ja', translations }}>
      {children}
    </RootProvider>
  );
}
