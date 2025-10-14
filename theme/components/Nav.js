import { escapeHtml } from '../utils.js';

export function Nav(items, base = '') {
  const links = Array.isArray(items)
    ? items.map(n => `<a href="${base}${n.link}" class="hover:text-blue-600 transition-colors duration-300">${escapeHtml(n.text)}</a>`).join(' ')
    : '';
  return `<nav class="flex space-x-4 md:space-x-6 text-gray-600">${links}</nav>`;
}


