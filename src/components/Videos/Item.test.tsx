import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { VideoItem } from './Item';

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

test('Should render VideoItem component', () => {
  render(
    <VideoItem
      youtubeId="yOMAzZHxMiU"
      title="example title"
      description="example description"
    />,
  );
  expect(screen.getByText('example title')).toBeInTheDocument();
});

test('Should render VideoItem with show more description button', async () => {
  render(
    <VideoItem
      youtubeId="yOMAzZHxMiU"
      title="example title"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    />,
  );
  expect(screen.getByText('Show more')).toBeInTheDocument();
  const showMoreButton = screen.getByRole('button');
  await userEvent.click(showMoreButton);

  expect(screen.getByText('Show less')).toBeInTheDocument();
});
