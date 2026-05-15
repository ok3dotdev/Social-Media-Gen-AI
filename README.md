# Science Social AI MVP

A Next.js + Node.js MVP that ingests science articles and generates Instagram-ready content through a queued AI pipeline.

## Architecture

- `app/api/ai/process-article`: ingestion API endpoint.
- `jobs/queue`: BullMQ queue configuration.
- `jobs/workers`: async worker for AI/media generation and persistence.
- `services/ai`: OpenAI integration with local mock fallback.
- `services/media`: carousel image and video placeholder generators.
- `ai/prompts`: reusable system/user/schema prompts.
- `lib/sample-data`: mock science articles used for ingestion.
- `app/admin/ai-content`: lightweight admin review dashboard.

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env template:
   ```bash
   cp .env.example .env
   ```
3. Start PostgreSQL + Redis locally.
4. Push Prisma schema:
   ```bash
   npm run db:push
   ```
5. Start Next.js app:
   ```bash
   npm run dev
   ```
6. Start worker in another terminal:
   ```bash
   npm run worker
   ```

## End-to-end flow

1. POST to `/api/ai/process-article` with `{ "articleId": "art-001" }`.
2. API validates sample article and enqueues a BullMQ job.
3. Worker fetches article, generates AI content (or mock output), creates slide image files, simulates video generation, and writes to Postgres.
4. `/admin/ai-content` shows generated entries with review actions.

## Real API replacement points

- `services/ai/openai.service.ts`: replace fallback and improve schema validation/retry logic.
- `services/media/carousel.service.ts`: switch SVG placeholders to Puppeteer/Canvas rendered assets.
- `services/media/video.service.ts`: integrate TTS, subtitle renderer, and ffmpeg composition pipeline.

## Scaling to thousands of articles/day

- Run multiple BullMQ workers with concurrency and queue partitioning by publication/category.
- Move generated assets to object storage (S3/GCS) with CDN delivery.
- Add idempotency keys and deduplication per `articleId` + version.
- Add observability (structured logs, tracing, queue lag dashboards, failure alerts).
- Store prompt/version metadata to support re-generation and quality audits.
