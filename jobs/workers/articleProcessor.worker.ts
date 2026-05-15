import { Worker } from 'bullmq';
import { ARTICLE_PROCESSING_QUEUE } from '@/jobs/queue/articleProcessing.queue';
import { connection } from '@/lib/redis';
import { getArticleById } from '@/lib/articles';
import { generateSocialContent } from '@/services/ai/openai.service';
import { generateCarouselImages } from '@/services/media/carousel.service';
import { generateVideoAsset } from '@/services/media/video.service';
import { prisma } from '@/lib/prisma';

type ArticleJob = { articleId: string };

const worker = new Worker<ArticleJob>(
  ARTICLE_PROCESSING_QUEUE,
  async (job) => {
    const article = getArticleById(job.data.articleId);
    if (!article) throw new Error(`Article not found: ${job.data.articleId}`);

    const content = await generateSocialContent(article);
    const slideImageUrls = await generateCarouselImages(article.id, content.carouselSlides);
    const videoUrl = await generateVideoAsset(article.id, content.videoScript);

    await prisma.generatedContent.create({
      data: {
        articleId: article.id,
        articleTitle: article.title,
        status: 'generated',
        caption: content.caption,
        hashtags: content.hashtags,
        carouselSlides: content.carouselSlides,
        slideImageUrls,
        videoScript: content.videoScript,
        videoUrl
      }
    });
  },
  { connection }
);

worker.on('completed', (job) => {
  console.log(`Processed article job ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});

console.log('Article processing worker started');
