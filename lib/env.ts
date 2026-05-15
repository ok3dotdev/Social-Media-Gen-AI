export const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  REDIS_URL: process.env.REDIS_URL ?? 'redis://localhost:6379',
  DATABASE_URL: process.env.DATABASE_URL
};

export const hasOpenAiKey = Boolean(env.OPENAI_API_KEY);
