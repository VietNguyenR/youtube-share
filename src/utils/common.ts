export const getTimestamp = () => Math.floor(Date.now() / 1000);

export const getYoutubeId = (url: string) => {
  if (!url) return null;
  const { searchParams, pathname } = new URL(url);
  const youtubeId = searchParams.get('v');
  if (youtubeId) {
    return youtubeId;
  }
  if (pathname !== '/watch') {
    return pathname.substring(1);
  }
  return null;
};
