import { escapeHtml } from '../utils';

export function Tags(tags: string[] | undefined): string {
  return (tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
}


