import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import * as React from 'react';

export function Loader() {
  return (
    <Container maxWidth="md" component="main">
      <Grid container justifyContent="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </Container>
  );
}
