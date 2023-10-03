'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { useState } from 'react';

import AddVideoForm from '@/components/Videos/Add';
import Review from '@/components/Videos/Review';
import useSharedContext, {
  resetVideoState,
  setVideoInfo,
  setYoutubeURLError,
} from '@/shared/store';
import { getYoutubeId } from '@/utils/common';

export default function Add() {
  const [activeStep, setActiveStep] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);
  const steps = ['Add Video', 'Review infomation'];
  const {
    state: { videos: videosContext },
    dispatch,
  } = useSharedContext();
  const { data: userData, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    return router.replace('/signin');
  }

  const handleNext = async () => {
    setButtonDisable(true);
    // Fetching youtube video info
    const youtubeId = getYoutubeId(videosContext.youtubeUrl);
    if (activeStep === 0) {
      if (youtubeId?.length === 0) {
        dispatch(setYoutubeURLError('Youtube URL is invalid'));
        setButtonDisable(false);
        return;
      }
      const getYoutubeInfo = await fetch('/api/videos/get-youtube-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtubeId }),
      });
      const videoInfo = await getYoutubeInfo.json();
      dispatch(setVideoInfo(videoInfo));
    }
    // Adding video to database
    if (activeStep === 1) {
      await fetch('/api/videos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...videosContext.videoInfo,
          youtubeId,
          shared_by: userData?.user?.email,
        }),
      });
      router.replace('/');
    }
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
    setButtonDisable(false);
  };

  const handleBack = () => {
    if (activeStep === 1) dispatch(resetVideoState());
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddVideoForm />;
      case 1:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Container maxWidth="md" component="main">
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Share a video
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={buttonDisable}
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === steps.length - 1 ? 'Share video' : 'Next'}
            </Button>
          </Box>
        </>
      </Paper>
    </Container>
  );
}
