import { escapeHtml } from '../utils.js';
import { Header } from './Header.js';

export function Layout(site, title, body) {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)} · ${escapeHtml(site.title)}</title>
    <meta name="description" content="${escapeHtml(site.description || '')}" />
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
    <style>
      body{font-family:'Noto Sans SC',system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,'Noto Sans',sans-serif; background-color:#f9fafb}
      .meta{color:#666;font-size:12px}
      .tag{display:inline-block;background:#f2f2f2;padding:2px 6px;border-radius:6px;margin-right:6px;font-size:12px}
      .timeline-line{position:absolute;left:20px;top:20px;bottom:20px;width:2px;background-color:#e5e7eb;z-index:-1}
      @media (max-width:768px){.timeline-line{left:12px}}
    </style>
  </head>
  <body class="text-gray-800">
    <div class="container mx-auto max-w-5xl p-4 md:p-8">
      ${Header(site)}
      ${body}
    </div>
  </body>
</html>`;
}


