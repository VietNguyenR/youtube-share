import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import * as React from 'react';

import type { VideoItemProps } from '@/shared/type';

import { YoutubeEmbed } from './YoutubeEmbed';

export function VideoItem({
  youtubeId,
  title,
  description,
  shared_by,
}: VideoItemProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4} sx={{ height: 180 }}>
        <YoutubeEmbed embedId={youtubeId} />
      </Grid>
      <Grid container item xs={6} md={8} alignContent="start">
        <Typography variant="h5" component="h2" color="red">
          {title ?? 'Youtube video title'}
        </Typography>
        <Grid container>
          <Typography variant="body2" fontWeight="bold" paddingRight={1}>
            Shared by:
          </Typography>
          <Typography variant="body2">{shared_by ?? 'Unknow'}</Typography>
        </Grid>
        <Typography variant="body2" fontWeight="bold">
          Description:
        </Typography>
        <Typography variant="body2">
          {description
            ? description.substring(0, 299).concat('...')
            : 'Youtube video description'}
        </Typography>
      </Grid>
    </Grid>
  );
}
