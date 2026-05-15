import articles from '@/lib/sample-data/articles.json';
import { Article } from '@/lib/types';

export const getAllArticles = (): Article[] => articles;

export const getArticleById = (articleId: string): Article | undefined =>
  articles.find((article) => article.id === articleId);
