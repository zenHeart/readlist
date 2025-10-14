import { TimelineItem } from './TimelineItem.js';

export function Timeline(list) {
  const li = (list || []).map(TimelineItem).join('');
  return `
  <main>
    <div class="relative">
      <div class="timeline-line"></div>
      <ul>${li}</ul>
    </div>
  </main>`;
}


