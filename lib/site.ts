// サイト共通の定数（本番のホスト名。lib/hosts.php と合わせる）
export const siteName = 'folita ドキュメント';
export const siteOrigin = 'https://folita.me';
export const accountsOrigin = 'https://accounts.folita.me';
export const dashboardOrigin = 'https://dashboard.folita.me';
export const docsOrigin = 'https://docs.folita.me';

// ドキュメントのソース（docs/ を git subtree で push したミラー。ヘッダーの GitHub アイコンのリンク先）
export const gitConfig = {
  user: 'folita-me',
  repo: 'docs',
  branch: 'main',
};
export const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
