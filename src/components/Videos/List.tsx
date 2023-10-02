/* eslint-disable no-underscore-dangle */
import Grid from '@mui/material/Grid';

import type { VideoListProps } from '@/shared/type';

import { VideoItem } from './Item';

export function VideoList({ videos }: VideoListProps) {
  return (
    <Grid container direction="row" spacing={2}>
      {videos.map((video) => (
        <Grid item key={video._id.toString()}>
          <VideoItem {...video} />
        </Grid>
      ))}
    </Grid>
  );
}
