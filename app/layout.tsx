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

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
