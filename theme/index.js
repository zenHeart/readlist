export function renderPage(site, page) {
  return layout(site, page.meta.title, article(site, page));
}

export function renderList(site, title, list) {
  return layout(site, title, ul(list));
}

export function renderHome(site, recent) {
  const hero = heroSection(site);
  // 首页：展示可配置的 Hero + 时间线（不显示标题）
  return layout(site, site.title, `${hero}${ul(recent)}`);
}

function layout(site, title, body) {
  const nav = Array.isArray(site.nav) ? site.nav.map(n => `<a href="${n.link}" class="hover:text-blue-600 transition-colors duration-300">${escapeHtml(n.text)}</a>`).join(' ') : '';
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
      <header class="flex justify-between items-center mb-8 md:mb-12">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 tracking-wider">${escapeHtml(site.title)}</h1>
        <nav class="flex space-x-4 md:space-x-6 text-gray-600">${nav}</nav>
      </header>
      ${body}
    </div>
  </body>
</html>`;
}

function heroSection(site){
  const title = site?.hero?.title ?? '记录每一次思想的旅行';
  const desc = site?.hero?.description ?? (site?.description || '');
  return `<section class="text-center bg-white p-6 md:p-10 rounded-xl shadow-sm mb-12">
    <h2 class="text-xl md:text-2xl font-semibold mb-3">${escapeHtml(title)}</h2>
    <p class="text-gray-500 max-w-2xl mx-auto">${escapeHtml(desc)}</p>
  </section>`;
}

function ul(list, title){
  // 列表页仅保留类型标题，移除“最新记录”副文案
  const header = title ? `<section class="text-center bg-white p-6 md:p-10 rounded-xl shadow-sm mb-12"><h2 class="text-xl md:text-2xl font-semibold mb-0">${escapeHtml(title)}</h2></section>` : '';
  const li = list.map(it => {
    const date = toDateString(it.date);
    const tags = (it.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
    const iconBg = it.type === 'book' ? 'bg-blue-500' : it.type === 'movie' ? 'bg-red-500' : 'bg-emerald-500';
    const icon = it.type === 'book'
      ? `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6 text-white\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253\" /></svg>`
      : `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6 text-white\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z\" /></svg>`;
    return `<li class="timeline-item mb-10 ml-4 md:ml-10 pl-8 md:pl-12 relative group">
      <div class="absolute -left-4 top-1 w-8 h-8 rounded-full ${iconBg} flex items-center justify-center ring-8 ring-white">${icon}</div>
      <div class="bg-white p-6 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <p class="text-sm text-gray-500 mb-1">${escapeHtml(date)}</p>
        <h3 class="text-xl font-bold mb-2"><a class="hover:text-blue-600" href="${it.path}">${escapeHtml(it.title)}</a></h3>
        <div class="meta">${tags}</div>
      </div>
    </li>`;
  }).join('');
  return `<main>${header}<div class="relative"><div class="timeline-line"></div><ul>${li}</ul></div></main>`;
}

function article(site, page){
  const date = toDateString(page.meta.date);
  const tags = (page.meta.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
  const rating = page.meta.rating ? `<span class="tag">评分 ${page.meta.rating}</span>` : '';
  return `<article class="bg-white p-6 md:p-10 rounded-xl shadow-lg">
    <h1 class="text-3xl md:text-4xl font-bold mb-3">${escapeHtml(page.meta.title)}</h1>
    <div class="meta mb-4">${escapeHtml(date)} ${tags} ${rating}</div>
    <div class="prose max-w-none">${page.html}</div>
  </article>`;
}

function escapeHtml(s){
  return String(s ?? '')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

function toDateString(input){
  if (!input) return '';
  if (typeof input === 'string') return input.slice(0,10);
  try { return new Date(input).toISOString().slice(0,10); } catch { return String(input); }
}


