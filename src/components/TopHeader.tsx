'use client';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';

export function TopHeader() {
  const { data: userData, status } = useSession();
  const authenticated = status === 'authenticated';
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Youtube Sharing App
        </Typography>
        <Typography>{userData?.user?.email}</Typography>
        {authenticated ? (
          <>
            <Button
              onClick={() => signOut()}
              variant="contained"
              sx={{ my: 1, mx: 1.5 }}
            >
              Share a video
            </Button>
            <Button
              onClick={() => signOut()}
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button href="/signin" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
