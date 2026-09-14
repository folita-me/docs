import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import { docsOrigin, siteName } from '@/lib/site';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(docsOrigin),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: 'folita（folita.me）の使い方。エディタ・ブロック・デザイン・カスタム CSS・独自ドメイン・データ連携。',
  icons: { icon: '/favicon.svg' },
};

// folita 本体（ロゴメニューの表示モード）とテーマを共有する。
// cookie folita_theme（.folita.me 全体。lib/colormode.php）を next-themes のスクリプトより先に localStorage へ写し、
// docs 側のテーマ切り替えで値が変わっていたら、ページを離れる・隠れるときに cookie へ書き戻す
const themeSync = `(() => {
  try {
    const m = document.cookie.match(/(?:^|; )folita_theme=(light|dark|system)/);
    if (m) localStorage.setItem('theme', m[1]);
    let last = localStorage.getItem('theme');
    const domain = /(^|\\.)folita\\.me$/.test(location.hostname) ? '; domain=.folita.me' : '';
    const save = () => {
      const t = localStorage.getItem('theme');
      if (t === last || !['light', 'dark', 'system'].includes(t)) return;
      last = t;
      document.cookie = 'folita_theme=' + t + '; path=/; max-age=34560000; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '') + domain;
    };
    addEventListener('pagehide', save);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') save(); });
  } catch (e) {}
})();`;

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeSync }} />
      </head>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
