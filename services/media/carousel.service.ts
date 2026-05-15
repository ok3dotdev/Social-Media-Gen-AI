import fs from 'node:fs/promises';
import path from 'node:path';

export const generateCarouselImages = async (
  articleId: string,
  slides: Array<{ title: string; body: string }>
): Promise<string[]> => {
  const outputDir = path.join(process.cwd(), 'public', 'generated', 'slides', articleId);
  await fs.mkdir(outputDir, { recursive: true });

  const urls: string[] = [];
  for (let i = 0; i < slides.length; i += 1) {
    const fileName = `slide-${i + 1}.svg`;
    const filePath = path.join(outputDir, fileName);
    const safeTitle = slides[i].title.replace(/&/g, '&amp;');
    const safeBody = slides[i].body.replace(/&/g, '&amp;');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080"><rect width="1080" height="1080" fill="#0f172a"/><text x="80" y="160" fill="#22d3ee" font-size="48" font-family="Arial">${safeTitle}</text><foreignObject x="80" y="220" width="920" height="700"><div xmlns="http://www.w3.org/1999/xhtml" style="color:#e2e8f0;font-size:38px;line-height:1.4;font-family:Arial;">${safeBody}</div></foreignObject></svg>`;

    await fs.writeFile(filePath, svg, 'utf8');
    urls.push(`/generated/slides/${articleId}/${fileName}`);
  }

  return urls;
};
