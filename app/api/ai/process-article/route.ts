import { NextRequest, NextResponse } from 'next/server';
import { getArticleById } from '@/lib/articles';
import { articleProcessingQueue } from '@/jobs/queue/articleProcessing.queue';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { articleId?: string };

  if (!body.articleId) {
    return NextResponse.json({ error: 'articleId is required' }, { status: 400 });
  }

  const article = getArticleById(body.articleId);
  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  const job = await articleProcessingQueue.add('process-article', { articleId: body.articleId });

  return NextResponse.json({
    message: 'Article queued for AI processing',
    articleId: body.articleId,
    jobId: job.id
  });
}
