export type Article = {
  id: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  featuredImage: string;
  publishedAt: string;
};

export type GeneratedPayload = {
  caption: string;
  hashtags: string[];
  carouselSlides: Array<{ title: string; body: string }>;
  videoScript: string;
};
