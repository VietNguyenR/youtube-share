'use client';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import { LinkButton } from './commons/LinkButton';

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
          <LinkButton
            href="/"
            label="Youtube Sharing App"
            startIcon={<PlayCircleIcon />}
            size="large"
            sx={{ my: 1, mx: 1.5 }}
          />
        </Typography>
        <Typography>{userData?.user?.email}</Typography>
        {authenticated ? (
          <>
            <LinkButton
              href="/video/add"
              type="button"
              variant="contained"
              label="Share a video"
              sx={{ my: 1, mx: 1.5 }}
            />
            <Button
              onClick={() => signOut()}
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
            >
              Sign out
            </Button>
          </>
        ) : (
          <LinkButton
            href="/signin"
            type="button"
            variant="outlined"
            label="Signin"
            sx={{ my: 1, mx: 1.5 }}
            size="large"
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
