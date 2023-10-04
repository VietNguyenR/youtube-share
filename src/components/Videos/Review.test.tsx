/* eslint-disable jest/no-mocks-import */
/* eslint-disable no-var */
import { render, screen } from '@testing-library/react';
import _set from 'lodash/set';
import type { ReducerWithoutAction } from 'react';

import { mockSession } from '@/__mocks__/Session';
import { mockFetchVideoInfo } from '@/__mocks__/Video';
import ComponentWithContext from '@/shared/ComponentWithContext';
import {
  addVideoReducer,
  initialState as storeInitialState,
} from '@/shared/store';

import Review from './Review';

var mockUseSession: jest.Mock;

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  mockUseSession = jest.fn();
  return {
    __esModule: true,
    ...originalModule,
    useSession: mockUseSession,
  };
});

jest.mock('@mui/material/styles/useTheme', () => ({
  __esModule: true,
  default: () => {
    return {
      breakpoints: {
        down: () => true,
      },
    };
  },
}));

jest.mock('@mui/material/useMediaQuery', () => {
  return () => true;
});

test('Should render Review component', () => {
  mockUseSession.mockImplementation(() => ({
    data: mockSession,
    status: 'authenticated',
  }));
  const videoState = _set(
    storeInitialState,
    'videos.videoInfo',
    mockFetchVideoInfo,
  );
  render(
    <ComponentWithContext
      reducer={addVideoReducer as ReducerWithoutAction<any>}
      initialState={videoState}
    >
      <Review />
    </ComponentWithContext>,
  );
  expect(screen.getByText('vietnguyen010@gmail.com')).toBeInTheDocument();
});
