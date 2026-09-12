// ヘッダー（ロゴ・右上のリンク）の共通設定
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { dashboardOrigin, siteOrigin } from './site';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 font-semibold">
          <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="currentColor" />
            <path d="M10 9h12v3.5h-8v3h7V19h-7v5H10z" fill="var(--color-fd-background)" />
          </svg>
          folita ドキュメント
        </span>
      ),
      url: '/',
    },
    links: [
      { text: 'folita.me', url: siteOrigin, external: true },
      { text: 'エディタを開く', url: dashboardOrigin, external: true },
    ],
  };
}
