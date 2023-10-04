/* eslint-disable jest/no-mocks-import */
/* eslint-disable no-var */
import '@testing-library/jest-dom';

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import React from 'react';

import { mockFetchVideoInfo } from '@/__mocks__/Video';

import Home from '../app/(public)/page';

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

fetchMock.enableMocks();

test('Should home page render with no videos data', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([]));

  render(<Home />);
  const progressbar = await screen.findByRole('progressbar');
  await waitForElementToBeRemoved(progressbar);
  expect(screen.getByText('No videos found')).toBeInTheDocument();
});

test('Should home page render with videos data', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([mockFetchVideoInfo]));

  render(<Home />);
  const progressbar = await screen.findByRole('progressbar');
  await waitForElementToBeRemoved(progressbar);

  expect(screen.queryByText('No videos found')).not.toBeInTheDocument();
  expect(screen.getByText('mocker up video title')).toBeInTheDocument();
});

test('Should home page render with corrupted videos data', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        _id: '651c34d1cb1037f58e553f1b',
        youtubeId: 'Vv2mtx5ZWwE',
        created_at: '1970-01-20T15:12:27.345Z',
        __v: 0,
      },
    ]),
  );

  render(<Home />);
  const progressbar = await screen.findByRole('progressbar');
  await waitForElementToBeRemoved(progressbar);

  expect(screen.getByText('Youtube video title')).toBeInTheDocument();
  expect(screen.getByText('Unknow')).toBeInTheDocument();
});
