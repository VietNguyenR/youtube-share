import type React from 'react';
import { createContext, useContext } from 'react';

export type VideoState = {
  youtubeUrl: string;
  videoInfo: Record<string, any>;
  errors: Record<string, any>;
};

export type State = {
  videos: VideoState;
};

export const initialState = {
  videos: {
    youtubeUrl: '',
    videoInfo: {},
    errors: {},
  },
};

export const setYoutubeURLError = (message: string) => ({
  type: 'SET_ERRORS',
  payload: { field: 'youtubeUrl', message },
});

export const setYoutubeURL = (youtubeUrl: string) => ({
  type: 'SET_YOUTUBE_URL',
  payload: youtubeUrl,
});

export const setVideoInfo = (videoInfo: Record<string, any>) => ({
  type: 'SET_VIDEO_INFO',
  payload: videoInfo,
});

export const resetVideoState = () => ({
  type: 'VIDEO_RESET',
  payload: {},
});

export const addVideoReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_YOUTUBE_URL':
      return {
        ...state,
        videos: {
          ...state.videos,
          youtubeUrl: action.payload,
        },
      };
    case 'SET_VIDEO_INFO':
      return {
        ...state,
        videos: {
          ...state.videos,
          videoInfo: action.payload,
        },
      };
    case 'SET_ERRORS':
      return {
        ...state,
        videos: {
          ...state.videos,
          errors: action.payload,
        },
      };
    case 'VIDEO_RESET':
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const useSharedContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('Error with useQcContext');
  }
  return context;
};

export default useSharedContext;
