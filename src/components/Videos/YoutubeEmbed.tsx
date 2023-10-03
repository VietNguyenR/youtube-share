'use client';

import { Grid, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';

export function YoutubeEmbed({ embedId }: { embedId: string }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const dynamicStyles = {
    ...(matches && { height: '300px' }),
  };
  return (
    <Grid container justifyContent="center" sx={{ ...dynamicStyles }}>
      <iframe
        src={`https://www.youtube.com/embed/${embedId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{ border: 'none', width: '100%' }}
      />
    </Grid>
  );
}
