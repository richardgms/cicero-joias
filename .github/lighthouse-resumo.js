// Monta a tabela (mediana das medições de cada página) que aparece no resumo
// da execução no GitHub. Lê os relatórios que o Lighthouse CI salva em .lighthouseci/.
const fs = require('fs');
const path = require('path');

const dir = '.lighthouseci';
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => /^lhr-.*\.json$/.test(f)) : [];
if (!files.length) {
  console.log('Nenhuma medição encontrada.');
  process.exit(0);
}

const median = (list) => {
  const sorted = [...list].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

const pages = {};
for (const file of files) {
  const r = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  const items = r.audits['resource-summary']?.details?.items ?? [];
  const kb = (type) => ((items.find((i) => i.resourceType === type) || {}).transferSize || 0) / 1024;
  const score = (cat) => Math.round((r.categories[cat]?.score ?? 0) * 100);
  const page = new URL(r.finalDisplayedUrl || r.requestedUrl).pathname;
  (pages[page] = pages[page] || []).push({
    perf: score('performance'),
    a11y: score('accessibility'),
    bp: score('best-practices'),
    seo: score('seo'),
    lcp: r.audits['largest-contentful-paint'].numericValue / 1000,
    cls: r.audits['cumulative-layout-shift'].numericValue,
    total: kb('total'),
    js: kb('script'),
    img: kb('image'),
  });
}

console.log('## Lighthouse (celular, mediana de 3 medições)\n');
console.log('| Página | Desempenho | Acess. | Boas práticas | SEO | LCP | CLS | Peso total | JS | Imagens |');
console.log('|---|---|---|---|---|---|---|---|---|---|');
for (const page of Object.keys(pages).sort()) {
  const runs = pages[page];
  const m = (key) => median(runs.map((x) => x[key]));
  console.log(
    `| ${page} | ${m('perf')} | ${m('a11y')} | ${m('bp')} | ${m('seo')} | ${m('lcp').toFixed(1)} s | ${m('cls').toFixed(3)} | ${Math.round(m('total'))} KB | ${Math.round(m('js'))} KB | ${Math.round(m('img'))} KB |`
  );
}
console.log('\nOrçamento: `lighthouserc.json`. Relatórios completos em "Artifacts" desta execução.');
