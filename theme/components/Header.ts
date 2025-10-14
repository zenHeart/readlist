import type { SiteData } from '../../types/index';
import { escapeHtml } from '../utils';
import { Nav } from './Nav';

export function Header(site: SiteData): string {
  return `
  <header class="flex justify-between items-center mb-8 md:mb-12">
    <h1 class="text-2xl md:text-3xl font-bold text-gray-900 tracking-wider">${escapeHtml(site.title)}</h1>
    ${Nav(site.nav, site.base || '')}
  </header>`;
}


