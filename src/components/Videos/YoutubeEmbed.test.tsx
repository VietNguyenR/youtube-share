/* eslint-disable jest/no-mocks-import */
/* eslint-disable no-var */
import { render, screen } from '@testing-library/react';

import { YoutubeEmbed } from './YoutubeEmbed';

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
  render(<YoutubeEmbed embedId="ocu9qECN8Os" />);
  expect(screen.getByTestId('youtube-embed')).toBeInTheDocument();
});
