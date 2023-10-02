/* eslint-disable no-var */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import SigninPage from './page';

var mockSigninResponse: jest.Mock;
var mockRouterReplace: jest.Mock = jest.fn();

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest
    .fn()
    .mockImplementation(() => ({ replace: mockRouterReplace })),
}));

jest.mock('next-auth/react', () => {
  mockSigninResponse = jest.fn();
  return {
    ...jest.requireActual('next-auth/react'),
    signIn: mockSigninResponse,
  };
});

test('Should render signin page', () => {
  render(<SigninPage />);

  expect(screen.getByText('Sign in')).toBeInTheDocument();
  expect(screen.getByText('Email Address / Username')).toBeInTheDocument();
});

describe('Test signin functional', () => {
  it('Should login failed', async () => {
    mockSigninResponse.mockImplementationOnce(() => ({ error: 'error' }));
    render(<SigninPage />);

    const idInput = screen.getByTestId('signinId');
    const passwordInput = screen.getByTestId('password');
    const signinButton = screen.getByRole('button');

    await userEvent.type(idInput, 'wrong@email.com');
    await userEvent.type(passwordInput, 'wrong_password');
    await userEvent.click(signinButton);

    expect(
      screen.getByText(
        'Your email/username or password is incorrect. Please try again.',
      ),
    ).toBeInTheDocument();
  });

  it('Should login success', async () => {
    mockSigninResponse.mockImplementationOnce(() => ({ error: undefined }));
    render(<SigninPage />);

    const idInput = screen.getByTestId('signinId');
    const passwordInput = screen.getByTestId('password');
    const signinButton = screen.getByRole('button');

    await userEvent.type(idInput, 'some_username');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(signinButton);

    expect(mockRouterReplace).toHaveBeenCalledWith('/');
  });
});
