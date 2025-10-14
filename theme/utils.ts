export function escapeHtml(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function toDateString(input: unknown): string {
  if (!input) return '';
  if (typeof input === 'string') return input.slice(0, 10);
  try {
    return new Date(input as any).toISOString().slice(0, 10);
  } catch {
    return String(input);
  }
}


