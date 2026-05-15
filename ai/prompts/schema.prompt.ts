export const schemaPrompt = `JSON schema:
{
  "caption": "string",
  "hashtags": ["#string"],
  "carouselSlides": [{ "title": "string", "body": "string" }],
  "videoScript": "string"
}
Constraints:
- 1 caption under 2200 chars
- 6-10 hashtags
- Exactly 5 carouselSlides
- videoScript should be 90-120 words`;
