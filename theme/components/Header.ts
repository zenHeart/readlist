import type { SiteData } from '../../types/index';
import { escapeHtml } from '../utils';
import { Nav } from './Nav';

export function Header(site: SiteData & { activeLink?: string }): string {
  const homeHref = (site.base || '/') + '';
  return `
  <header class="flex justify-between items-center mb-8 md:mb-12">
    <a href="${homeHref}" class="text-2xl md:text-3xl font-bold text-gray-900 tracking-wider hover:text-blue-600">${escapeHtml(site.title)}</a>
    ${Nav(site.nav, site.base || '', site.activeLink || '')}
  </header>`;
}


