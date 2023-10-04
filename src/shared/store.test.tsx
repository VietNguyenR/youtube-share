/* eslint-disable jest/no-mocks-import */
import { act, renderHook } from '@testing-library/react';
import type { ReducerWithoutAction } from 'react';

import { mockFetchVideoInfo } from '@/__mocks__/Video';

import ComponentWithContext from './ComponentWithContext';
import {
  addVideoReducer,
  resetVideoState,
  setVideoInfo,
  setYoutubeURL,
  setYoutubeURLError,
} from './store';

describe('Test video reducer context', () => {
  // eslint-disable-next-line jest/expect-expect
  const initialState = {
    videos: {
      youtubeUrl: '',
      videoInfo: {},
      errors: {},
    },
  };

  it('Should setYoutubeURLError work', () => {
    const { result } = renderHook(() =>
      ComponentWithContext({
        reducer: addVideoReducer as ReducerWithoutAction<any>,
        initialState,
      }),
    );

    act(() => {
      result.current.props.value.dispatch(
        setYoutubeURLError('Youtube URL is invalid'),
      );
    });
    expect(result.current.props.value.state.videos.errors).toEqual({
      field: 'youtubeUrl',
      message: 'Youtube URL is invalid',
    });
  });

  it('Should setYoutubeURL work', () => {
    const { result } = renderHook(() =>
      ComponentWithContext({
        reducer: addVideoReducer as ReducerWithoutAction<any>,
        initialState,
      }),
    );
    const youtubeUrl = 'https://www.youtube.com/watch?v=Vv2mtx5ZWwE';
    act(() => {
      result.current.props.value.dispatch(setYoutubeURL(youtubeUrl));
    });
    expect(result.current.props.value.state.videos.youtubeUrl).toEqual(
      youtubeUrl,
    );
  });

  it('Should setVideoInfo work', () => {
    const { result } = renderHook(() =>
      ComponentWithContext({
        reducer: addVideoReducer as ReducerWithoutAction<any>,
        initialState,
      }),
    );
    act(() => {
      result.current.props.value.dispatch(setVideoInfo(mockFetchVideoInfo));
    });
    expect(result.current.props.value.state.videos.videoInfo).toEqual(
      mockFetchVideoInfo,
    );
  });

  it('Should resetVideoState work', () => {
    const { result } = renderHook(() =>
      ComponentWithContext({
        reducer: addVideoReducer as ReducerWithoutAction<any>,
        initialState,
      }),
    );
    act(() => {
      result.current.props.value.dispatch(resetVideoState());
    });
    expect(result.current.props.value.state.videos).toEqual(
      initialState.videos,
    );
  });
});
