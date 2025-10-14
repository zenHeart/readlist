import { escapeHtml } from '../utils';

export function Nav(
  items: Array<{ text: string; link: string }> | undefined,
  base = '',
  activeLink = ''
): string {
  const links = Array.isArray(items)
    ? items
        .map(n => {
          const isActive = n.link === activeLink;
          const cls = isActive
            ? 'text-blue-600 font-semibold'
            : 'text-gray-600';
          return `<a href="${base}${n.link}" class="${cls} hover:text-blue-600 transition-colors duration-300">${escapeHtml(
            n.text
          )}</a>`;
        })
        .join(' ')
    : '';
  return `<nav class="flex space-x-4 md:space-x-6">${links}</nav>`;
}


