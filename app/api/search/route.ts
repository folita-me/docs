// 検索索引。静的書き出しでは out/api/search/ に JSON として書き出される（既定の言語は multilingual で日本語も分割できる）
import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

export const { staticGET: GET } = createFromSource(source);
