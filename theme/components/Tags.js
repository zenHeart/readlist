import { escapeHtml } from '../utils.js';

export function Tags(tags) {
  return (tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
}


