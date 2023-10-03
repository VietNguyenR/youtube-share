import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import * as React from 'react';

import useSharedContext from '@/shared/store';
import { getYoutubeId } from '@/utils/common';

import { VideoItem } from './Item';

export default function Review() {
  const {
    state: { videos },
  } = useSharedContext();
  const { data: userData } = useSession();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Video details
      </Typography>
      <VideoItem
        youtubeId={getYoutubeId(videos.youtubeUrl) ?? ''}
        title={videos.videoInfo.title}
        description={videos.videoInfo.description}
        shared_by={userData?.user?.email ?? ''}
      />
    </>
  );
}
