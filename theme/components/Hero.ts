import { escapeHtml } from '../utils';

export function Hero(site: { hero?: { title?: string; description?: string }, description?: string }): string {
  const title = site?.hero?.title ?? '记录每一次思想的旅行';
  const desc = site?.hero?.description ?? (site?.description || '');
  return `
  <section class="text-center bg-white p-6 md:p-10 rounded-xl shadow-sm mb-12">
    <h2 class="text-xl md:text-2xl font-semibold mb-3">${escapeHtml(title)}</h2>
    <p class="text-gray-500 max-w-2xl mx-auto">${escapeHtml(desc)}</p>
  </section>`;
}


