import { Article } from '@/lib/types';

export const buildUserPrompt = (article: Article) => `Article metadata:\nTitle: ${article.title}\nCategory: ${article.category}\nPublishedAt: ${article.publishedAt}\nSummary: ${article.summary}\nBody: ${article.body}\n\nGenerate Instagram-ready science content for an educated general audience.`;
