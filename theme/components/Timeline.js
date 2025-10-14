import { TimelineItem } from './TimelineItem.js';

export function Timeline(list, base = '') {
  const li = (list || []).map(it => TimelineItem(it, base)).join('');
  return `
  <main>
    <div class="relative">
      <div class="timeline-line"></div>
      <ul>${li}</ul>
    </div>
  </main>`;
}


