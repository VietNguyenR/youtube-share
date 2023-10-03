'use client';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { useState } from 'react';

export default function SignIn() {
  const [signinError, setSigninError] = useState<boolean>(false);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const router = useRouter();

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSigninError(false);
    setButtonDisable(true);
    const data = new FormData(event.currentTarget);
    const signinId = data?.get('signinId') as string;
    const idForSignin = signinId.includes('@') ? 'email' : 'username';
    const signinRequest = await signIn('credentials', {
      redirect: false,
      [idForSignin]: signinId,
      password: data?.get('password') as string,
    });
    setButtonDisable(false);
    if (!signinRequest?.error) {
      return router.replace('/');
    }
    setSigninError(true);
  };

  return (
    <main>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {signinError && (
            <Alert severity="error">
              Your email/username or password is incorrect. Please try again.
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="signinId"
              label="Email Address / Username"
              name="signinId"
              autoFocus
              data-testid="signinId"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              data-testid="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={buttonDisable}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup">
                  <Typography variant="body2">
                    Don&apos;t have an account? Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </main>
  );
}
