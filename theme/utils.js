export function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function toDateString(input) {
  if (!input) return '';
  if (typeof input === 'string') return input.slice(0, 10);
  try {
    return new Date(input).toISOString().slice(0, 10);
  } catch {
    return String(input);
  }
}


