'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export function Hero() {
  return (
    <Container
      disableGutters
      maxWidth="sm"
      component="main"
      sx={{ pt: 8, pb: 6 }}
    >
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Interesting videos
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        component="p"
      >
        Here are some interesting videos that you can watch. If you have
        something interesting to share, please do so.
      </Typography>
    </Container>
  );
}
