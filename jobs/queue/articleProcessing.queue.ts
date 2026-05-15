import { Queue } from 'bullmq';
import { connection } from '@/lib/redis';

export const ARTICLE_PROCESSING_QUEUE = 'article-processing';

export const articleProcessingQueue = new Queue(ARTICLE_PROCESSING_QUEUE, { connection });
