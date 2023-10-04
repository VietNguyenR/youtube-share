/* eslint-disable jest/no-mocks-import */
/* eslint-disable no-var */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockSession } from '@/__mocks__/Session';

import { TopHeader } from './TopHeader';

var mockUseSession: jest.Mock;
var mockSignout: jest.Mock;
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  mockUseSession = jest.fn();
  mockSignout = jest.fn();
  return {
    __esModule: true,
    ...originalModule,
    useSession: mockUseSession,
    signOut: mockSignout,
  };
});

test('Should render TopHeader component when not authenticated', () => {
  mockUseSession.mockImplementationOnce(() => ({
    data: undefined,
    status: 'unauthenticated',
  }));
  render(<TopHeader />);
  expect(screen.getByText('Signin')).toBeInTheDocument();
});

test('Should render TopHeader component when authenticated', async () => {
  mockUseSession.mockImplementationOnce(() => ({
    data: mockSession,
    status: 'authenticated',
  }));

  render(<TopHeader />);
  expect(screen.getByText('Sign out')).toBeInTheDocument();
  expect(screen.getByText('Share a video')).toBeInTheDocument();

  const signOutButton = screen.getAllByRole('button')[2];
  await userEvent.click(signOutButton);

  expect(mockSignout).toHaveBeenCalled();
});
