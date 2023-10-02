'use client';

import Container from '@mui/material/Container';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { Loader } from '@/components/Loader';
import { VideoList } from '@/components/Videos/List';
import type { VideoItemResponseProps } from '@/shared/type';

export default function Home() {
  const [videos, setVideos] = useState<VideoItemResponseProps[] | undefined>();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/videos/get');
      const data = await response.json();
      setVideos(data);
    })();
  }, []);

  if (!videos) return <Loader />;

  return (
    <Container maxWidth="md" component="main">
      <VideoList videos={videos} />
    </Container>
  );
}
