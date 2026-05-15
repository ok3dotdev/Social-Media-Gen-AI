export const generateVideoAsset = async (articleId: string, script: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const scriptHash = Buffer.from(script).toString('base64url').slice(0, 8);
  return `/generated/videos/${articleId}-${scriptHash}.mp4`;
};
