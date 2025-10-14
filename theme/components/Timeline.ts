import { TimelineItem } from './TimelineItem';
import type { RouteMeta } from '../../types';

export function Timeline(list: RouteMeta[], base = ''): string {
  const li = (list || []).map(it => TimelineItem(it, base)).join('');
  return `
  <main class="pb-6 md:pb-0">
    <div class="relative pl-6 md:pl-0">
      <div class="timeline-line"></div>
      <ul>${li}</ul>
    </div>
  </main>`;
}


