import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _set from 'lodash/set';
import type { ReducerWithoutAction } from 'react';

import ComponentWithContext from '@/shared/ComponentWithContext';
import {
  addVideoReducer,
  initialState as storeInitialState,
} from '@/shared/store';

import AddVideoForm from './Add';

/*
  NOTE: All the actions mostly covered in integration tests.
  in this test, should only coverage the missing one on line 19, 39
*/

test('Should render AddVideoForm component', () => {
  render(<AddVideoForm />);
  expect(screen.getByText('Youtube URL')).toBeInTheDocument();
});

test('Should show error on the input field', async () => {
  const errorState = _set(storeInitialState, 'videos.errors', {
    field: 'youtubeUrl',
    message: 'Youtube URL is invalid',
  });

  render(
    <ComponentWithContext
      reducer={addVideoReducer as ReducerWithoutAction<any>}
      initialState={errorState}
    >
      <AddVideoForm />
    </ComponentWithContext>,
  );

  const videoUrlInput = screen.getByRole('textbox');
  expect(videoUrlInput).toBeInTheDocument();

  fireEvent.change(videoUrlInput, {
    target: { value: 'invalid_url' },
  });

  expect(await screen.findByText('Youtube URL is invalid')).toBeInTheDocument();

  // Should error be cleared after typing
  await userEvent.type(videoUrlInput, 'valid_url');
  expect(screen.queryByText('Youtube URL is invalid')).not.toBeInTheDocument();
});
