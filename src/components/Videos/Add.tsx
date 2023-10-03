import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';

import useSharedContext, { setYoutubeURL } from '@/shared/store';

export default function AddVideoForm() {
  const {
    state: { videos: { errors } = {} },
    dispatch,
  } = useSharedContext();
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (!errors) return;
    if (errors.field === 'youtubeUrl') {
      setError(errors.message);
    }
  }, [errors]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: youtubeUrl } = event.target;
    dispatch(setYoutubeURL(youtubeUrl));
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Provide youtube video URL
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            error={!!error}
            helperText={error}
            onChange={handleChange}
            onKeyDown={() => setError('')}
            required
            id="youtubeUrl"
            label="Youtube URL"
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
