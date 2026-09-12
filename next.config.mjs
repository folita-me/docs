// docs.folita.me — Next.js の静的書き出し（docs/out/）。Apache がそのまま配信する（Node のサーバーは動かさない）
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default withMDX(config);
