/* eslint-disable jest/no-mocks-import */
/* eslint-disable no-var */
import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import _set from 'lodash/set';
import React from 'react';

import { mockSession } from '@/__mocks__/Session';
import { mockFetchVideoInfo } from '@/__mocks__/Video';
import { GlobalContext } from '@/shared/store';

import Add from '../app/(secure)/video/add/page';

var mockRouterReplace: jest.Mock = jest.fn();
var mockUseSession: jest.Mock;
var mockDispatch: jest.Mock = jest.fn();

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest
    .fn()
    .mockImplementation(() => ({ replace: mockRouterReplace })),
}));

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

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  mockUseSession = jest.fn();
  return {
    __esModule: true,
    ...originalModule,
    useSession: mockUseSession,
  };
});

jest.mock('@mui/material/useMediaQuery', () => {
  return () => true;
});

const renderWithContext = (
  ui: React.ReactElement,
  { providerProps, ...renderOptions }: any = {},
) =>
  render(
    <GlobalContext.Provider {...providerProps}>{ui}</GlobalContext.Provider>,
    renderOptions,
  );

const providerProps = {
  value: {
    state: {
      videos: {
        youtubeUrl: '',
        videoInfo: {},
        errors: {},
        // errors: { field: 'youtubeUrl', message: 'Youtube URL is invalid' },
      },
    },
    dispatch: mockDispatch,
  },
};

fetchMock.enableMocks();

test('Should render signup page', () => {
  mockUseSession.mockImplementationOnce(() => ({
    data: mockSession,
    status: 'authenticated',
  }));
  renderWithContext(<Add />, {
    providerProps,
  });
  expect(screen.getByText('Share a video')).toBeInTheDocument();
});

test('Should redirect unauthenticated request', () => {
  mockUseSession.mockImplementationOnce(() => ({
    data: undefined,
    status: 'unauthenticated',
  }));
  renderWithContext(<Add />, {
    providerProps,
  });
  expect(mockRouterReplace).toHaveBeenCalledWith('/signin');
});

describe('Test AddVideo functional', () => {
  beforeAll(() => {
    mockUseSession.mockImplementation(() => ({
      data: mockSession,
      status: 'authenticated',
    }));
  });

  it('Should dispatching error when youtube URL is invalid', async () => {
    renderWithContext(<Add />, {
      providerProps,
    });

    const youtubeUrlInput = screen.getByRole('textbox');
    fireEvent.change(youtubeUrlInput, { target: { value: 'invalid_url' } });

    const nextButton = screen.getByRole('button');
    await userEvent.click(nextButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { field: 'youtubeUrl', message: 'Youtube URL is invalid' },
      type: 'SET_ERRORS',
    });
  });

  it('Should successfully fetching the youtube infomation and share the video', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([mockFetchVideoInfo]));
    const storeValueWithVideoUrl = _set(
      providerProps,
      'value.state.videos.youtubeUrl',
      'https://www.youtube.com/watch?v=yOMAzZHxMiU',
    );
    renderWithContext(<Add />, {
      providerProps: storeValueWithVideoUrl,
    });

    const nextButton = screen.getByRole('button');
    await userEvent.click(nextButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: expect.arrayContaining([
        expect.objectContaining({ youtubeId: 'yOMAzZHxMiU' }),
      ]),
      type: 'SET_VIDEO_INFO',
    });
    expect(screen.getByText('Video details')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[1]);
    expect(mockRouterReplace).toHaveBeenCalledWith('/');
  });

  it('Should back button work', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([mockFetchVideoInfo]));
    const storeValueWithVideoUrl = _set(
      providerProps,
      'value.state.videos.youtubeUrl',
      'https://www.youtube.com/watch?v=yOMAzZHxMiU',
    );
    renderWithContext(<Add />, {
      providerProps: storeValueWithVideoUrl,
    });

    const nextButton = screen.getByRole('button');
    await userEvent.click(nextButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: expect.arrayContaining([
        expect.objectContaining({ youtubeId: 'yOMAzZHxMiU' }),
      ]),
      type: 'SET_VIDEO_INFO',
    });
    expect(screen.getByText('Video details')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[1]);
    expect(screen.getByText('Share a video')).toBeInTheDocument();
  });
});
