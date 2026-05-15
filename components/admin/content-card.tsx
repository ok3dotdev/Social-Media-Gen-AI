import { GeneratedContent } from '@prisma/client';

type Props = {
  item: GeneratedContent;
};

export function ContentCard({ item }: Props) {
  const slides = item.carouselSlides as Array<{ title: string; body: string }>;
  return (
    <article className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{item.articleTitle}</h3>
        <span className="rounded bg-cyan-100 px-2 py-1 text-xs font-medium text-cyan-900">{item.status}</span>
      </div>
      <p className="mb-2 text-sm text-slate-700">{item.caption}</p>
      <h4 className="mt-4 text-sm font-semibold">Carousel Slides</h4>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
        {slides.map((slide, index) => (
          <li key={`${item.id}-${index}`}>
            <strong>{slide.title}:</strong> {slide.body}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex gap-2">
        <button className="rounded bg-emerald-600 px-3 py-2 text-sm text-white">Approve</button>
        <button className="rounded bg-indigo-600 px-3 py-2 text-sm text-white">Publish</button>
      </div>
    </article>
  );
}
