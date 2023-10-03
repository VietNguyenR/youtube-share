'use client';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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
      <Toolbar>
        <Grid container flexWrap="nowrap" justifyContent="space-between">
          <Grid item display={{ xs: 'none', md: 'flex' }}>
            <LinkButton
              href="/"
              label="Youtube Sharing App"
              startIcon={<PlayCircleIcon />}
              size="large"
              sx={{ my: 1, mx: 1.5 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={6}>
            <Grid container justifyContent="flex-end" alignItems="center">
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
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
