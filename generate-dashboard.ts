import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();

const SKIP = new Set(['.agents', '.claude', 'node_modules']);

function prettify(name: string): string {
  return name
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function extractH1(html: string): string {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : 'Untitled';
}

interface Lesson {
  title: string;
  path: string;
  num: string;
}

interface Subject {
  displayName: string;
  lessons: Lesson[];
}

const subjects: Subject[] = [];

for (const entry of readdirSync(ROOT).sort()) {
  if (SKIP.has(entry) || entry.startsWith('.')) continue;
  const fullPath = join(ROOT, entry);
  if (!statSync(fullPath).isDirectory()) continue;

  const lessonsPath = join(fullPath, 'lessons');
  try { statSync(lessonsPath); } catch { continue; }

  const files = readdirSync(lessonsPath).filter(f => f.endsWith('.html')).sort();
  if (files.length === 0) continue;

  const lessons: Lesson[] = files.map((filename, i) => {
    const html = readFileSync(join(lessonsPath, filename), 'utf-8');
    return {
      title: extractH1(html),
      path: `./${entry}/lessons/${filename}`,
      num: String(i + 1).padStart(2, '0'),
    };
  });

  subjects.push({ displayName: prettify(entry), lessons });
}

const totalLessons = subjects.reduce((acc, s) => acc + s.lessons.length, 0);
const now = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Study Dashboard</title>
  <style>
    body {
      font-family: "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;
      max-width: 680px;
      margin: 0 auto;
      padding: 4rem 2rem 6rem;
      color: #111;
      background: #fffff8;
      line-height: 1.65;
    }
    h1 {
      font-size: 2rem;
      font-weight: normal;
      letter-spacing: -0.02em;
      margin-bottom: 0.2rem;
    }
    .meta {
      color: #888;
      font-size: 0.85rem;
      margin: 0 0 3.5rem;
    }
    .subject {
      margin-bottom: 2.75rem;
    }
    h2 {
      font-size: 1.1rem;
      font-weight: normal;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #555;
      border-bottom: 1px solid #e0e0d8;
      padding-bottom: 0.4rem;
      margin-bottom: 0.9rem;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      display: flex;
      align-items: baseline;
      gap: 0.6rem;
      padding: 0.3rem 0;
      border-bottom: 1px dotted #e8e8e0;
    }
    li:last-child { border-bottom: none; }
    .num {
      font-family: "Courier New", monospace;
      font-size: 0.75rem;
      color: #bbb;
      flex-shrink: 0;
      width: 1.5rem;
    }
    a {
      color: #222;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color 0.15s;
    }
    a:hover {
      border-bottom-color: #555;
    }
    footer {
      margin-top: 4rem;
      color: #aaa;
      font-size: 0.78rem;
      font-family: "Courier New", monospace;
    }
  </style>
</head>
<body>
  <h1>Study Dashboard</h1>
  <p class="meta">Generated ${now} &middot; ${totalLessons} lesson${totalLessons !== 1 ? 's' : ''} across ${subjects.length} subject${subjects.length !== 1 ? 's' : ''}</p>

${subjects.map(s => `  <section class="subject">
    <h2>${s.displayName}</h2>
    <ul>
${s.lessons.map(l => `      <li><span class="num">${l.num}</span><a href="${l.path}" target="_blank">${l.title}</a></li>`).join('\n')}
    </ul>
  </section>`).join('\n\n')}

  <footer>npm run dashboard &mdash; regenerate after adding lessons</footer>
</body>
</html>`;

writeFileSync(join(ROOT, 'dashboard.html'), html, 'utf-8');
console.log(`Generated: ${subjects.length} subjects, ${totalLessons} lessons`);
