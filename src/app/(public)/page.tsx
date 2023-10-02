'use client';

import Container from '@mui/material/Container';
import * as React from 'react';

import { VideoItem } from '@/components/Videos/Item';

export default function Home() {
  return (
    <Container maxWidth="md" component="main">
      <VideoItem youtubeId="1uzlBSL7-UM" title="" description="" sharedBy="" />
    </Container>
  );
}
