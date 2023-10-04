/* eslint-disable no-var */
import { render, screen } from '@testing-library/react';

import { Hero } from './Hero';

var mockUsePathname: jest.Mock;
jest.mock('next/navigation', () => {
  mockUsePathname = jest.fn();
  return {
    usePathname: mockUsePathname,
  };
});

test('Should render Hero component', () => {
  mockUsePathname.mockImplementationOnce(() => '/');
  render(<Hero />);
  expect(screen.getByText('Interesting videos')).toBeInTheDocument();
});

test('Should Hero component not render when is not home page', () => {
  mockUsePathname.mockImplementationOnce(() => '/signin');
  render(<Hero />);
  expect(screen.queryByText('Interesting videos')).not.toBeInTheDocument();
});
