export type ItemType = 'book' | 'movie' | 'tv';

export type FrontMatter = {
  type: ItemType;
  slug?: string;
  tags?: string[];
  rating?: number;
  [k: string]: unknown;
};

export type SiteData = {
  title: string;
  description?: string;
  base?: string;
  hero?: { title?: string; description?: string };
  nav?: Array<{ text: string; link: string }>;
  typePaths?: Record<ItemType, string>;
};

export type RouteMeta = {
  path: string; // relative path without base prefix
  type: ItemType;
  title: string;
  date: string; // YYYY-MM-DD
  slug: string;
  tags?: string[];
};

export type PageData = {
  meta: RouteMeta;
  html: string;
};


