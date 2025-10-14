import { escapeHtml, toDateString } from '../utils.js';
import { Tags } from './Tags.js';

export function TimelineItem(it, base = '') {
  const date = toDateString(it.date);
  const tags = Tags(it.tags);
  const iconBg = it.type === 'book' ? 'bg-blue-500' : it.type === 'movie' ? 'bg-red-500' : 'bg-emerald-500';
  const icon = it.type === 'book'
    ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>`;
  return `
  <li class="timeline-item mb-10 ml-4 md:ml-10 pl-8 md:pl-12 relative group">
    <div class="absolute -left-4 top-1 w-8 h-8 rounded-full ${iconBg} flex items-center justify-center ring-8 ring-white">${icon}</div>
    <div class="bg-white p-6 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
      <p class="text-sm text-gray-500 mb-1">${escapeHtml(date)}</p>
      <h3 class="text-xl font-bold mb-2"><a class="hover:text-blue-600" href="${base}${it.path}">${escapeHtml(it.title)}</a></h3>
      <div class="meta">${tags}</div>
    </div>
  </li>`;
}


