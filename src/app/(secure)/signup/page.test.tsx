/* eslint-disable no-var */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import React from 'react';

import SignupPage from './page';

var mockRouterReplace: jest.Mock = jest.fn();

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest
    .fn()
    .mockImplementation(() => ({ replace: mockRouterReplace })),
}));

fetchMock.enableMocks();

test('Should render signup page', () => {
  render(<SignupPage />);
  expect(screen.getByText('Sign up')).toBeInTheDocument();
});

describe('Test signup functional', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('Should signup failed when all require fields are not filled', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        errors: [
          {
            code: 'too_small',
            minimum: 3,
            type: 'string',
            inclusive: true,
            exact: false,
            message: 'String must contain at least 3 character(s)',
            path: ['username'],
          },
        ],
      }),
    );
    render(<SignupPage />);

    const signupButton = screen.getByRole('button');
    await userEvent.click(signupButton);

    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('Should register success', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        errors: undefined,
      }),
    );
    render(<SignupPage />);

    const signupButton = screen.getByRole('button');
    await userEvent.click(signupButton);

    expect(mockRouterReplace).toHaveBeenCalledWith('/signin');
  });
});
