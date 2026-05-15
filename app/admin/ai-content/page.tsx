import { ContentCard } from '@/components/admin/content-card';
import { prisma } from '@/lib/prisma';

export default async function AiContentAdminPage() {
  const content = await prisma.generatedContent.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Generated AI Content</h2>
      {content.length === 0 ? (
        <p className="rounded border bg-white p-5 text-sm text-slate-600">No generated content yet. Queue an article via the API route.</p>
      ) : (
        content.map((item) => <ContentCard key={item.id} item={item} />)
      )}
    </section>
  );
}
