import * as React from 'react';

export function YoutubeEmbed({ embedId }: { embedId: string }) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      style={{ border: 'none', width: '100%', height: '100%' }}
    />
  );
}
