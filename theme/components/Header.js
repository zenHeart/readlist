import { escapeHtml } from '../utils.js';
import { Nav } from './Nav.js';

export function Header(site) {
  return `
  <header class="flex justify-between items-center mb-8 md:mb-12">
    <h1 class="text-2xl md:text-3xl font-bold text-gray-900 tracking-wider">${escapeHtml(site.title)}</h1>
    ${Nav(site.nav)}
  </header>`;
}


