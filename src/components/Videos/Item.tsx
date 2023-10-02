import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import * as React from 'react';

import type { VideoItemProps } from '@/collections/videos';

import { YoutubeEmbed } from './YoutubeEmbed';

interface VideoItemPropsExtend extends VideoItemProps {
  sharedBy: string;
}

export function VideoItem({
  youtubeId,
  title,
  description,
  sharedBy,
}: VideoItemPropsExtend) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4} sx={{ height: 180 }}>
        <YoutubeEmbed embedId={youtubeId} />
      </Grid>
      <Grid container item xs={6} md={8}>
        <Typography variant="h4" component="h2">
          {title ?? 'Youtube video title'}
        </Typography>
        <Grid container>
          <Typography variant="body2" fontWeight="bold" paddingRight={1}>
            Shared by:
          </Typography>
          <Typography variant="body2">{sharedBy ?? 'Unknow'}</Typography>
        </Grid>
        <Typography variant="body2" fontWeight="bold">
          Description:
        </Typography>
        <Typography variant="body2">
          {description ?? 'Youtube video description'}
        </Typography>
      </Grid>
    </Grid>
  );
}
