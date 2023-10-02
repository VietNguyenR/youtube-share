import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://google.com/">
        Youtube Sharing App
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
