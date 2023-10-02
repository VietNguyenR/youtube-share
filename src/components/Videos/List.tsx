/* eslint-disable no-underscore-dangle */
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import type { VideoListProps } from '@/shared/type';

import { VideoItem } from './Item';

export function VideoList({ videos }: VideoListProps) {
  const haveVideos = videos.length > 0;
  return (
    <Grid
      container
      direction="row"
      spacing={2}
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        py: [3, 6],
        mb: 6,
      }}
    >
      {!haveVideos && (
        <Grid container item justifyContent="center">
          <Typography variant="h5" component="h2">
            No videos found
          </Typography>
        </Grid>
      )}
      {haveVideos &&
        videos.map((video) => (
          <Grid item key={video._id.toString()}>
            <VideoItem {...video} />
          </Grid>
        ))}
    </Grid>
  );
}
