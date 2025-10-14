import { Layout } from '../components/Layout.js';
import { Timeline } from '../components/Timeline.js';

export function renderList(site, title, list) {
  const header = `<section class="text-center bg-white p-6 md:p-10 rounded-xl shadow-sm mb-12"><h2 class="text-xl md:text-2xl font-semibold mb-0">${title}</h2></section>`;
  const body = `${header}${Timeline(list, site.base || '')}`;
  return Layout(site, title, body);
}


