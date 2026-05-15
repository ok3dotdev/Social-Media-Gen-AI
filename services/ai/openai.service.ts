import OpenAI from 'openai';
import { buildUserPrompt } from '@/ai/prompts/user.prompt';
import { schemaPrompt } from '@/ai/prompts/schema.prompt';
import { systemPrompt } from '@/ai/prompts/system.prompt';
import { hasOpenAiKey, env } from '@/lib/env';
import { Article, GeneratedPayload } from '@/lib/types';

const mockPayload = (article: Article): GeneratedPayload => ({
  caption: `${article.title}\n\n${article.summary}\n\nWhy it matters: evidence-based science coverage helps the public understand what changed, what is still uncertain, and what comes next.`,
  hashtags: ['#ScienceNews', '#ResearchUpdate', '#STEM', '#EvidenceBased', '#Innovation', '#ScienceCommunication'],
  carouselSlides: [
    { title: 'What happened?', body: article.summary },
    { title: 'Key method', body: 'Researchers used validated methods and multiple evaluation checkpoints to confirm findings.' },
    { title: 'Main result', body: 'The reported outcome is promising but should be interpreted with the limits described by the study team.' },
    { title: 'Why it matters', body: 'The findings can influence future research priorities, policy conversations, and public understanding.' },
    { title: 'What comes next', body: 'Independent replication, larger datasets, and longer follow-up are needed before broad real-world adoption.' }
  ],
  videoScript: `Today in science: ${article.title}. Researchers report ${article.summary.toLowerCase()} The team used rigorous measurement and emphasized limits in interpretation. This is important because strong science communication highlights both progress and uncertainty. Next steps include follow-up studies, independent replication, and real-world validation before major adoption.`
});

export const generateSocialContent = async (article: Article): Promise<GeneratedPayload> => {
  if (!hasOpenAiKey) return mockPayload(article);

  const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model: 'gpt-4.1-mini',
    input: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `${buildUserPrompt(article)}\n\n${schemaPrompt}` }
    ]
  });

  const text = response.output_text;
  return JSON.parse(text) as GeneratedPayload;
};
