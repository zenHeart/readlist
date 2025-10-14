import { Layout } from '../components/Layout.js';
import { Article } from '../components/Article.js';

export function renderPage(site, page) {
  const body = Article(page);
  return Layout(site, page.meta.title, body);
}


