import type { SiteData, PageData } from '../../types';
import { Layout } from '../components/Layout';
import { Article } from '../components/Article';

export function renderPage(site: SiteData, page: PageData): string {
  const body = Article(page);
  return Layout(site, page.meta.title, body);
}


