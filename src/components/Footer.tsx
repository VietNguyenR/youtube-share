'use client';

import Container from '@mui/material/Container';
import * as React from 'react';

import { Copyright } from './Copyright';

export function Footer() {
  return (
    <Container maxWidth="md" component="footer">
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
