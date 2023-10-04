'use client';

import { Grid } from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
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
        data-testid="youtube-embed"
      />
    </Grid>
  );
}
