import { escapeHtml, toDateString } from '../utils.js';
import { Tags } from './Tags.js';

export function Article(page) {
  const date = toDateString(page.meta?.date);
  const tags = Tags(page.meta?.tags);
  const rating = page.meta?.rating ? `<span class="tag">评分 ${page.meta.rating}</span>` : '';
  return `
  <article class="bg-white p-6 md:p-10 rounded-xl shadow-lg">
    <h1 class="text-3xl md:text-4xl font-bold mb-3">${escapeHtml(page.meta?.title)}</h1>
    <div class="meta mb-4">${escapeHtml(date)} ${tags} ${rating}</div>
    <div class="prose max-w-none">${page.html}</div>
  </article>`;
}


