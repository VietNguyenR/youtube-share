'use client';

import type { AlertColor } from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import type { SnackbarOrigin } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { useState } from 'react';

interface SnackBarProps {
  message: string;
  status: AlertColor;
}

interface State extends SnackbarOrigin {
  open: boolean;
}

export function SnackBar({ message, status = 'success' }: SnackBarProps) {
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
