import { TimelineItem } from './TimelineItem';
import type { RouteMeta } from '../../types';

export function Timeline(list: RouteMeta[], base = ''): string {
  const li = (list || []).map(it => TimelineItem(it, base)).join('');
  return `
  <main>
    <div class="relative">
      <div class="timeline-line"></div>
      <ul>${li}</ul>
    </div>
  </main>`;
}


