import type { Plugin } from 'vite';
import path from 'node:path';
import crypto from 'node:crypto';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

type ItemType = 'book' | 'movie' | 'tv';

type FrontMatter = {
  type: ItemType;
  title: string;
  date: string;
  slug?: string;
  tags?: string[];
  rating?: number;
  [k: string]: any;
};

type RouteMeta = {
  path: string;
  type: ItemType;
  title: string;
  date: string;
  slug: string;
  tags?: string[];
};

type PageData = {
  meta: RouteMeta;
  html: string;
};

export default function readlist(opts: {
  contentDir: string;
  siteConfigPath: string; // JS module exporting default
  typePaths: Record<ItemType, string>;
  recentCount?: number;
}): Plugin {
  const recentCount = opts.recentCount ?? 20;

  return {
    name: 'readlist',
    apply: 'build',

    async generateBundle() {
      const cwd = process.cwd();
      const contentAbs = path.resolve(cwd, opts.contentDir);
      const files = await fg(['**/*.md'], { cwd: contentAbs, absolute: true });

      // 读取站点配置（JS）
      const siteConfigModule = await import(path.resolve(cwd, opts.siteConfigPath));
      const site = siteConfigModule.default ?? siteConfigModule;
      const base = (process.env.VITE_BASE_URL || '/').replace(/\/+$/, '');

      // 读取主题渲染器（JS）
      const theme = await import(path.resolve(cwd, 'theme/index.js'));

      const items: Array<PageData> = [];

      for (const abs of files) {
        const raw = await fsp.readFile(abs, 'utf8');
        const { data, content } = matter(raw);
        const fm = data as Partial<FrontMatter>;

        if (!fm?.type) continue; // 仅要求 type，title/date 从文件名推导

        const base = path.basename(abs, path.extname(abs));
        const { titleFromName, dateFromName } = parseFromFilename(base);

        const slug = (fm.slug ?? slugify(titleFromName || base));
        const html = await renderMarkdown(content);
        const date = normalizeDate((fm.date as any) ?? dateFromName);
        const title = (fm.title as any) ?? titleFromName ?? base;
        const routePath = `/${opts.typePaths[fm.type]}/${slug}/`;
        const tags = Array.isArray(fm.tags)
          ? fm.tags
          : (typeof (fm as any).tags === 'string' && (fm as any).tags.trim() ? [(fm as any).tags] : []);

        const meta: RouteMeta = {
          path: routePath,
          type: fm.type,
          title,
          date,
          slug,
          tags
        };
        items.push({ meta, html });
      }

      // 排序（新到旧）
      items.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

      // 输出单页（使用 posix 路径并避免前导斜杠）
      for (const it of items) {
        const fileName = path.posix.join(opts.typePaths[it.meta.type], it.meta.slug, 'index.html');
        const html = theme.renderPage({ ...site, base }, it);
        this.emitFile({ type: 'asset', fileName, source: html });
      }

      // 输出列表页
      const byType: Record<ItemType, Array<RouteMeta>> = { book: [], movie: [], tv: [] };
      for (const it of items) byType[it.meta.type].push(it.meta);
      (Object.keys(byType) as ItemType[]).forEach((t) => {
        const html = theme.renderList({ ...site, base }, typeTitle(t), byType[t]);
        const fileName = path.posix.join(opts.typePaths[t], 'index.html');
        this.emitFile({ type: 'asset', fileName, source: html });
      });

      // 输出首页
      const recent = items.slice(0, recentCount).map((i) => i.meta);
      const homeHtml = theme.renderHome({ ...site, base }, recent);
      this.emitFile({ type: 'asset', fileName: 'index.html', source: homeHtml });
    },
  };
}

function typeTitle(t: ItemType) {
  return t === 'book' ? '书评' : t === 'movie' ? '电影' : '剧集';
}

async function renderMarkdown(md: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return String(file);
}

function slugify(s: string) {
  const withoutDate = s.replace(/^(\d{4}-\d{2}-\d{2})[_\s-]?/, '');
  const ascii = withoutDate
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  if (ascii) return ascii;
  const hash = crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);
  return `s-${hash}`;
}

function normalizeDate(input: string | Date): string {
  if (!input) return '';
  try {
    if (typeof input === 'string') {
      // 支持 YYYY-MM-DD 或 ISO
      const d = new Date(input);
      if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
      // 尝试匹配 YYYY-MM-DD
      const m = input.match(/^(\d{4}-\d{2}-\d{2})/);
      return m ? m[1] : String(input);
    }
    if (input instanceof Date) {
      return input.toISOString().slice(0, 10);
    }
  } catch {}
  return String(input);
}

function parseFromFilename(base: string): { titleFromName: string; dateFromName: string } {
  // 形如 YYYY-MM-DD_标题 或 YYYY-MM-DD-标题
  const m = base.match(/^(\d{4}-\d{2}-\d{2})[\-_](.+)$/);
  if (m) {
    const date = m[1];
    const rawTitle = m[2];
    // 恢复原始中文标题（保留大小写与空格/下划线转空格）
    const title = rawTitle.replace(/[\-_]+/g, ' ').trim();
    return { titleFromName: title, dateFromName: date };
  }
  // Fallback：无法解析日期
  return { titleFromName: base, dateFromName: '' };
}


