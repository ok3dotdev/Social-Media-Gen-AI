import { getAllArticles } from '@/lib/articles';

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Sample Science Articles</h2>
      <p className="mb-6 text-slate-600">Use POST /api/ai/process-article with one of the IDs below.</p>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="rounded-lg border bg-white p-4">
            <p className="text-xs text-slate-500">{article.id}</p>
            <h3 className="font-semibold">{article.title}</h3>
            <p className="text-sm text-slate-600">{article.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
