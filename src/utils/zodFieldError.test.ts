import { isFieldError } from './zodFieldError';

const errorResponse = [
  {
    validation: 'email',
    code: 'invalid_string',
    message: 'Invalid email',
    path: ['email'],
  },
];

test('Should field error return empty', () => {
  const fieldErrors = isFieldError('email', []);
  expect(fieldErrors).toMatchObject({});
});

test('Should field error return correct data', () => {
  const fieldErrors = isFieldError('email', errorResponse);
  expect(fieldErrors).toMatchObject({
    error: true,
    helperText: 'Invalid email',
  });
});
